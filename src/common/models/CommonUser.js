class CommonUser {
  constructor(profileURL, username, fullName, id, isVerified) {
    this.profileURL = profileURL;
    this.username = username;
    this.fullName = fullName;
    this.id = id;
    this.isVerified = isVerified;
    this.parents = [];
  }

  addParent(parentName, followedByViewer, subjectFollowsUser, userFollowsSubject) {
    this.parents.push({
      'parentName': parentName,
      'followedByViewer': followedByViewer,
      'subjectFollowsUser': subjectFollowsUser,
      'userFollowsSubject': userFollowsSubject
    });
  }

  checkFollowedByViewer(uiValue) {
    if (uiValue === 'yes' && !this.parents[0].followedByViewer) {
      return false;
    }
    if (uiValue === 'no' && this.parents[0].followedByViewer) {
      return false;
    }
    return true;
  }

  checkSubjectFollowsUser(uiValue, parentName) {
    if (!parentName) {
      return true;
    }
    for (let i = 0; i < this.parents.length; i++) {
      if (this.parents[i].parentName === parentName) {
        if (uiValue === 'yes' && !this.parents[i].subjectFollowsUser) {
          return false;
        }
        if (uiValue === 'no' && this.parents[i].subjectFollowsUser) {
          return false;
        }
        return true;
      }
    }
    return false;
  }

  checkUserFollowsSubject(uiValue, parentName) {
    if (!parentName) {
      return true;
    }
    for (let i = 0; i < this.parents.length; i++) {
      if (this.parents[i].parentName === parentName) {
        if (uiValue === 'yes' && !this.parents[i].userFollowsSubject) {
          return false;
        }
        if (uiValue === 'no' && this.parents[i].userFollowsSubject) {
          return false;
        }
        return true;
      }
    }
    return false;
  }
}

export default CommonUser;
