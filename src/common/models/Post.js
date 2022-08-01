import MediaAgeEnum from "./MediaAgeEnum";
import getLikedUsersForAPostWithSaving from "../api_call/GetLikedUsersForAPostWithSaving";
import getCommentedUsersForAPostWithoutPostOwner from "../api_call/GetCommentedUsersForAPostWithoutPostOwner";
import moment from "moment";
import ReplaceSubstring from "../Helpers/ReplaceSubstring";

/*
OwnerObj: {
            "id": "2095657187",
            "is_verified": false,
            "profile_pic_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/61546858_465671664182189_1676786851907633152_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=Sewd6kb0A4cAX9DnnAy&oh=3610ea2a191dc9200acb40d7aec3fcf1&oe=5EA519A9",
            "username": "abhnv_rai",
            "blocked_by_viewer": false,
            "followed_by_viewer": true,
            "full_name": "Abhinav Rai",
            "has_blocked_viewer": false,
            "is_private": false,
            "is_unpublished": false,
            "requested_by_viewer": false
          },
 */

class Post {
  constructor(instagram_graph_ql_data) {
    if (!instagram_graph_ql_data) {
      return;
    }
    let data = instagram_graph_ql_data.node;
    this.id = data.id;
    this.dimensions = data.dimensions;
    this.display_url = data.display_url;
    this.is_video = data.is_video;
    if (data.edge_media_to_comment) {
      this.comment_count=data.edge_media_to_comment.count;
    } else {
      this.comment_count = 0;
    }
    this.video_url = data.video_url;
    this.video_view_count = data.video_view_count;
    if (!this.video_view_count) {
      this.video_view_count = 0;
    }
    this.taken_at_timestamp = data.taken_at_timestamp;
    this.day = this.getDayFromEpoch(this.taken_at_timestamp);
    if (data.edge_media_preview_like) {
      this.like_count = data.edge_media_preview_like.count;
    } else {
      this.like_count = 0;
    }
    if (data.owner) {
      this.owner_id=data.owner.id;
      if (data.owner.username) {
        this.ownerObj = data.owner;
      }
    }
    this.shortcode = data.shortcode;
    if (data.edge_media_to_caption && data.edge_media_to_caption.edges.length>0) {
      this.text = data.edge_media_to_caption.edges[0].node.text;
    } else {
      this.text="";
    }
    this.text = ReplaceSubstring(ReplaceSubstring(ReplaceSubstring(this.text, ",", "-"), '"','<quote>'), "\n", " | ")
    this.commentsDisabled = data.comments_disabled;

    this.locationName = "";
    if (data.location) {
      this.locationName = data.location.name;
    }

    this.commentedUsers = data.commentedUsers;
    if (!data.commentedUsers) {
      this.commentedUsers = [];
    }

    this.likedUsers = data.likedUsers;
    if (!data.likedUsers) {
      this.likedUsers = [];
    }

    this.user = null;

    this.recoveryOptions = data.recoveryOptions;
  }

  setUser = (user) => {
    this.user = user;
  };

  fillDataInPost(d) {
    this.id = d.id;
    this.dimensions = d.dimensions;
    this.display_url = d.display_url;
    this.is_video = d.is_video;
    this.comment_count = d.comment_count;
    this.video_url = d.video_url;
    this.video_view_count = d.video_view_count;
    this.taken_at_timestamp = d.taken_at_timestamp;
    this.day = d.day;
    this.like_count = d.like_count;
    this.owner_id = d.owner_id;
    this.shortcode = d.shortcode;
    this.text = d.text;
    this.commentsDisabled = d.commentsDisabled;
    this.locationName = d.locationName;
    this.origin=d.origin;
    this.userOrigin=d.userOrigin;
  }

  getDayFromEpoch(epochInSeconds) {
    let dayIndex = new Date(epochInSeconds*1000).getDay();
    switch (dayIndex) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";

    }
  }

  setValues(commentCount, likeCount, text, commentsDisabled, ownerID) {
    this.comment_count = commentCount;
    this.like_count = likeCount;
    this.text = text;
    this.commentsDisabled = commentsDisabled;
    this.owner_id = ownerID;
  };

  // saving for the commenters happens for a post in this.commentedUsers
  async getNonPostUserCommenters(count, commentersFinished) {
    // console.log(`######## get commenters for post ${this.id} called with count ${count} ############`);
    if (this.commentedUsers.length >= count) {
      return this.commentedUsers.splice(0,count);
    }
    let finalCount = count - this.commentedUsers.length;
    let response = await getCommentedUsersForAPostWithoutPostOwner(this.shortcode, finalCount, this.recoveryOptions, this.owner_id);
    if (response && !response.recoveryOptions.has_next_page) {
      commentersFinished(this.id);
    }
    let previousCommenters = JSON.parse(JSON.stringify(this.commentedUsers));
    let commenters = previousCommenters.concat(response.commenters);
    this.commentedUsers = response.overflowing;
    this.recoveryOptions = response.recoveryOptions;
    // console.log(commenters, `@@@@@@@@@@@ returned commenters for post ${this.id} @@@@@@@@@`);
    return commenters;
  }

  // saving for the likers for the post happens here in this.likedUsers
  async getLikersWhomTheUserIsNotFollowing(count, likersFinished) {
    // console.log(`######## get likers for post ${this.id} called with count ${count} ############`);
    if (this.likedUsers.length >= count) {
      return this.likedUsers.splice(0,count);
    }
    let finalCount = count - this.likedUsers.length;
    let response = await getLikedUsersForAPostWithSaving(this.shortcode, finalCount, this.recoveryOptions);
    if (response && !response.recoveryOptions.has_next_page) {
      likersFinished(this.id);
    }
    let previousLikers = JSON.parse(JSON.stringify(this.likedUsers));
    let likers = previousLikers.concat(response.likers);
    // console.log(response, this.shortcode, 'Class: Post, Function: , Line 38 response(): ');
    this.likedUsers = response.overflowing;
    this.recoveryOptions = response.recoveryOptions;
    // console.log(likers, `@@@@@@@@@@@ returned likers for post ${this.id} @@@@@@@@@`);
    return likers;
  }


  setOrigin(origin) {
    this.origin = origin;
  }

  substringConditionMet(substring) {
    if (substring.trim() === "") {
      return true;
    }
    return this.text.indexOf(substring) !== -1;
  }

  mediaAgeConditionMet(mediaAge) {
    let secondsDifference = Math.floor(new Date().getTime()/1000) - this.taken_at_timestamp;
    if (mediaAge === MediaAgeEnum.UPTO_1_HOUR && secondsDifference < 3601) {
      return true;
    }
    if (mediaAge === MediaAgeEnum.ONE_DAY && secondsDifference < 86401) {
      return true;
    }

    if (mediaAge === MediaAgeEnum.THREE_DAYS && secondsDifference < 259201) {
      return true;
    }

    if (mediaAge === MediaAgeEnum.ONE_WEEK && secondsDifference < 604801) {
      return true;
    }

    if (mediaAge === MediaAgeEnum.ONE_MONTH && secondsDifference < 2592001) {
      return true;
    }

    if (mediaAge === MediaAgeEnum.ANY) {
      return true;
    }

    return false;
  }

  setPostOwner(ownerUser) {
    this.owner = ownerUser;
  }

  isVideoPostInString() {
    if (this.is_video) {
      return "true";
    }
    return "false";
  }

  likesConditionMet(minLikesGreaterThanEqualTo, maxLikes) {
    let likeCount = this.like_count;
    if (this.likedUsers.length !== 0) {
      likeCount = this.likedUsers.length;
    }
    if(likeCount >= minLikesGreaterThanEqualTo && likeCount < maxLikes) {
      return true;
    }
    return false;
  }

  commentsConditionMet(minCommentsGreaterThanEqualTo, maxComments) {
    if(this.comment_count >= minCommentsGreaterThanEqualTo && this.comment_count < maxComments) {
      return true;
    }
    return false;
  }

  setLikedUsers(users) {
    this.likedUsers = users;
  }

  setCommentedUsers(users) {
    this.commentedUsers = users;
  }

  postDateInReadableFormat() {
    return new moment(this.taken_at_timestamp*1000).format('h:mm A, MMMM Do YYYY').replace(/,/g, '-');
  }


  setUserOrigin(userOrigin) {
    this.userOrigin = userOrigin;
  }
}

export default Post;
