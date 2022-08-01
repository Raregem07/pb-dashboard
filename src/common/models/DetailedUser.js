import Post from "./Post";
import Min from "../Helpers/Min";
import GetRandomNumberFrom1ToN from "../Helpers/GetRandomNumber";

class DetailedUser {
  constructor(
    biography, followerCount, followingCount, followsViewer, followedByViewer,
    isBusinessAccount, isPrivate, profilePicURL, profilePicURLHD, username, fullName,
    externalURL, mutualConnectionCount, timelineMedia, mutualConnections, id, blockedByViewer,
    businessCategoryName
  ) {
    this.biography = biography;
    if (biography) {
      let emailsArrayOrNull = biography.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
      if (emailsArrayOrNull) {
        this.email = emailsArrayOrNull.join("|");
      }
    } else {
      this.biography = "";
    }
    this.followerCount = followerCount;
    this.followingCount = followingCount;
    this.followsViewer = followsViewer;
    this.followedByViewer = followedByViewer;
    this.isBusinessAccount = isBusinessAccount;
    this.isPrivate = isPrivate;
    this.profileURL = profilePicURL;
    this.profilePicURLHD = profilePicURLHD;
    this.username = username;
    this.fullName = fullName

    if (!this.fullName) {
      this.fullName = "";
    }
    this.externalURL = externalURL;
    this.mutualConnectionCount = mutualConnectionCount;

    this.timelineMedia = timelineMedia;
    this.mutualConnections = mutualConnections;
    this.id = id;
    this.blockedByViewer = blockedByViewer;
    this.businessCategoryName = businessCategoryName;
    if (!this.businessCategoryName) {
      this.businessCategoryName = "";
    }
    if (timelineMedia) {
      this.postCount = timelineMedia.count;
    }
    this.timeCaptured = Math.ceil(new Date().getTime() / 1000);
    this.engagementRate = 0;
    this.dummy = false;
    this.isEmailUser = false;
  }

  setAsDummy() {
    this.dummy = true;
  }

  getFollowerFollowingRatio() {
    return (this.followerCount / this.followingCount).toFixed(2);
  }

  setPostCount = (pc) => {
    this.postCount = pc;
  };

  setEngagementRate = (er) => {
    this.engagementRate = er/10;
  };

  getPosts() {
    if (!this.timelineMedia) {
      return [];
    }
    let edges = this.timelineMedia.edges;
    if (!edges) {
      return [];
    }
    return edges.map(
      e => {
        return new Post(e);
      }
    );
  }

  getEngagementRate() {
    if (this.engagementRate && this.engagementRate > 0) {
      return this.engagementRate;
    }
    let posts = this.getPosts();
    if (posts.length === 0) {
      return 0;
    }
    let likeCommentCount = posts.reduce((a, post) => {
      return a + post.like_count + post.comment_count;
    }, 0);
    return (likeCommentCount * 1000 / (this.followerCount * 100)).toFixed(2);
  }

  addV2Details(detailedUser) {
    this.businessEmail = detailedUser.business_email;
    this.publicPhoneNumber = detailedUser.business_phone_number;

  }

  setCategory(categoryName) {
    this.categoryName = categoryName;
  }

  getRandomPost() {
    if (!this.timelineMedia) {
      return null;
    }
    let edges = this.timelineMedia.edges;
    if (edges.length < 1) {
      return null;
    }
    let totalPosts = Min(11, this.timelineMedia.count);
    let postIndex = GetRandomNumberFrom1ToN(totalPosts) - 1;
    return new Post(edges[postIndex]);
  }

  setSubjectFollowsUser(value) {
    this.subjectFollowsUser = value;
  }

  setUserFollowsSubject(value) {
    this.userFollowsSubject = value;
  }

  followedByYou(value) {
    if (value === "yes" && !this.followedByViewer) {
      return false;
    }
    if (value === "no" && this.followedByViewer) {
      return false;
    }
    return true;
  }

  followsYou(value) {
    if (value === "yes" && !this.followsViewer) {
      return false;
    }
    if (value === "no" && this.followsViewer) {
      return false;
    }
    return true;
  }

  subjectFollowsUserCheck(value) {
    if (value === "yes" && !this.subjectFollowsUser) {
      return false;
    }
    if (value === "no" && this.subjectFollowsUser) {
      return false;
    }
    return true;
  }

  userFollowsSubjectCheck(value) {
    if (value === "yes" && !this.userFollowsSubject) {
      return false;
    }
    if (value === "no" && this.userFollowsSubject) {
      return false;
    }
    return true;
  }

  isBusinessAccountCheck(value) {
    if (value === "yes" && !this.isBusinessAccount) {
      return false;
    }
    if (value === "no" && this.isBusinessAccount) {
      return false;
    }
    return true;
  }

  followerGreaterThan(value) {
    if (this.followerCount >= value) {
      return true;
    }
    return false;
  }

  followerLessThan(value) {
    if (this.followerCount < value) {
      return true;
    }
    return false;
  }

  followingGreaterThan(value) {
    if (this.followingCount >= value) {
      return true;
    }
    return false;
  }

  followingLessThan(value) {
    if (this.followingCount < value) {
      return true;
    }
    return false;
  }

  postsGreaterThanCheck(value) {
    if (this.postCount >= value) {
      return true;
    }
    return false;
  }

  isPrivateAccountCheck(value) {
    if (value === "yes" && !this.isPrivate) {
      return false;
    }
    if (value === "no" && this.isPrivate) {
      return false;
    }
    return true;
  }

  isEmailThere = (value) => {
    if (value === "yes" && (!this.email || this.email.length === 0)) {
      return false;
    }
    if (value === "no" && (this.email && this.email.length > 1)) {
      return false;
    }
    return true;
  };

  isWebsiteThere = (value) => {
    if (value === "yes" && (!this.externalURL || this.externalURL.length === 0)) {
      return false;
    }
    if (value === "no" && (this.externalURL && this.externalURL.length > 0)) {
      return false;
    }
    return true;
  };


  setEmailUser(emailUser) {
    if (!this.email) {
      this.email = emailUser.email;
    }
    this.userTagsCount = emailUser.userTagsCount;
    this.igtvVideos = emailUser.igtvVideos;
    this.publicPhoneNumber = emailUser.publicPhoneNumber;
    this.publicPhoneCountryCode = emailUser.publicPhoneCountryCode;
    this.cityName = emailUser.cityName;
  }

  setEmailUserForDummyUser(emailUser) {
    this.id = emailUser.id;
    this.username=emailUser.username;
    this.fullName = emailUser.fullName;
    this.isPrivate = emailUser.isPrivate;
    this.profileURL = emailUser.profileURL;
    this.isVerified = emailUser.isVerified;
    this.postCount = emailUser.postCount;
    this.followerCount = emailUser.followerCount;
    this.followingCount = emailUser.followingCount;
    if (emailUser.biography) {
      let emailsArrayOrNull = emailUser.biography.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
      if (emailsArrayOrNull) {
        this.email = emailsArrayOrNull.join("|");
      }
      this.biography = emailUser.biography;
    } else {
      this.biography = emailUser.biography;
    }
    this.isBusinessAccount = emailUser.isBusiness;
    this.businessCategoryName = emailUser.businessCategoryName;
    this.externalURL = emailUser.externalURL;
    this.dummy = false;
    this.setEmailUser(emailUser);
  }
}

export default DetailedUser;
