import axios from 'axios';
import sleep from "../Sleep";

class User {
  constructor(profileURL, username, fullName, id, followedByViewer, followedByUser, followsUser, isVerified, isPrivate=null) {
    this.profileURL = profileURL;
    this.username = username;
    this.fullName = fullName;
    this.id = id;
    this.followedByViewer = followedByViewer;
    this.userFollowsSubject = followedByUser;
    this.subjectFollowsUser = followsUser;
    this.isVerified = isVerified;
    this.likedPosts = [];
    this.commentedPosts = [];
    this.commentValue = "";
    this.commentedValues = [];
    this.isPrivate = isPrivate;
  }

  bulkSetLikedPosts(posts) {
    this.likedPosts = posts;
  }

  setCommentValue(value) {
    this.commentValue = value;
  }

  bulkSetCommentedPosts(posts) {
    this.commentedPosts = posts;
  }

  addLikedPost(post) {
    this.likedPosts.push(post);
  }

  addCommentedPost(post, commentValue) {
    this.commentedPosts.push(post);
    this.commentedValues.push(commentValue)
  }

  checkFollowedByViewer(uiValue) {
    if (uiValue === 'yes' && !this.followedByViewer) {
      return false;
    }
    if (uiValue === 'no' && this.followedByViewer) {
      return false;
    }
    return true;
  }

  // user is the one whom we got all the followers and followings.
  // Subject is the this user which is this class obj.
  checkUserFollowsSubject(uiValue) {
    if (uiValue === 'yes' && !this.userFollowsSubject) {
      return false;
    }
    if (uiValue === 'no' && this.userFollowsSubject) {
      return false;
    }
    return true;
  }

  // user is the one whom we got all the followers and followings.
  // Subject is the this user which is this class obj.
  checkSubjectFollowsUser(uiValue) {
    if (uiValue === 'yes' && !this.subjectFollowsUser) {
      return false;
    }
    if (uiValue === 'no' && this.subjectFollowsUser) {
      return false;
    }
    return true;
  }

  setParent(value) {
    this.parent = value;
  }
}

export default User;