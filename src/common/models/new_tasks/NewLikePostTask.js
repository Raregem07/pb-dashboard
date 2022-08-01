/*global chrome*/

import FollowUserTask from "../task/FollowUserTask";
import Icons from "../../components/Icons";
import React from "react";
import moment from "moment";

// userOrigin is {type: UserPostEnum.HASHTAGS, value: "nature"} for hashtag
// origin is string - eg: "Has posted with hashtag #nature"
class NewLikePostTask {
  constructor(type, userID, username, profileURL, origin, expiryTime, userOrigin, postPic, completedDatTime = null) {
    this.type = type;
    this.userID = userID;
    this.username = username;
    this.profileURL = profileURL;
    this.origin = origin;
    this.completedDateTime = completedDatTime;
    this.expiryTime = expiryTime;
    this.userOrigin = userOrigin;
    this.postPic = postPic;
    this.isNew = true;
  }

  setCompletedDateTime(epoch) {
    this.completedDateTime = epoch;
  }

  isExpired() {
    let currentEpochTime = new Date().getTime() / 1000;
    return currentEpochTime > this.expiryTime;
  }

  displayDescription() {
    return <div>
      User whose post is Liked: <strong>{this.username}</strong>
    </div>;
  }

  display() {
    return <div>
      Task: Story {Icons.STORY} + Like &nbsp; {Icons.LIKE}
    </div>;
  }

  leaveTaskMessage() {
    let username = this.username;
    return `Leaving task to Like post of user ${username} because of high chances of user not following/liking you back`;
  }

  postImage() {
    if (this.postPic) {
      return this.postPic;
    }
    return this.profileURL;
  }

  performTask() {
    let msgObject = { type: "performAutomation", storyUrl: `https://www.instagram.com/stories/${this.username}/`, task: "LIKE", taskObj: this  };
    if (process.env.NODE_ENV !== "development") {
      chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, msgObject);
        });
      });
    }
  }

  async hasBadOwner(filter) {
    let ownerDetalils = await FollowUserTask.checkRatioAndSettings(filter, this.username, this.userID);
    if (ownerDetalils.detailedUser) {
      this.detailedUser = ownerDetalils.detailedUser;
      if (ownerDetalils.detailedUser.followsViewer) {
        return { isBad: true, message: `Not performing Like Task. ${this.username} already follows you!` };
      }
    }
    return { isBad: ownerDetalils.isBad, message: this.leaveTaskMessage() + "   \n" + ownerDetalils.message };

  }

  readableDate() {
    return new moment(this.completedDateTime).format('h:mm A, MMMM Do YYYY');
  }
}

export default NewLikePostTask;
