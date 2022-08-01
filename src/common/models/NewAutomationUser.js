class NewAutomationUser {
  constructor(data) {
    if (data && data.length === 0) {
      this.hasStory = false;
    } else if (data) {
      this.hasStory = true;
      let d = data[0];
      if (d.user) {
        this.username=d.user.username;
        this.profileURL = d.user.profile_pic_url;
        this.id=d.user.id;
      }
      this.storyExpiryTime = d.expiring_at;
      if (d.followed_by_viewer) {
        this.followedByViewer = d.followed_by_viewer.followed_by_viewer;
      }
    }
    this.origin = null;
    this.post = null;
    this.userOrigin = null;
    this.postPic = null;
    this.detailedUser = null;
  }

  setUser(hasStory, username, profileURL, id, followed_by_viewer) {
    this.hasStory = hasStory;
    this.username = username;
    this.profileURL = profileURL;
    this.id = id;
    this.followedByViewer = followed_by_viewer;
  }

  setDetailedUser(detailedUser) {
    this.detailedUser = detailedUser;
  }

  setOrigin(origin) {
    this.origin = origin;
  }

  setPost(post) {
    this.post = post;
    this.postPic = post.display_url;
  }

  setUserOrigin(userOrigin) {
    this.userOrigin = userOrigin;
  }
}

export default NewAutomationUser;
