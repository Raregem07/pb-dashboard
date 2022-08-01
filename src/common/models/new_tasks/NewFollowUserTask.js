/*global chrome*/

import FollowUserTask from "../task/FollowUserTask";
import Icons from "../../components/Icons";
import React from "react";
import moment from "moment";

class NewFollowUserTask {
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

  moreThanNDaysOld(n) {
    const diffTime = Math.abs(new Date() - new Date(this.completedDateTime));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > n) {
      return true;
    }
    return false;
  }

  display() {
    return <div>Task: View Story {Icons.STORY}</div>;
  }

  leaveTaskMessage() {
    let username = this.username;
    return `Leaving task to View Story of user ${username} because of high chances of user not following you back`;
  }

  displayDescription() {
    return (
      <div>
        User to follow: <strong>{this.username}</strong>
      </div>
    );
  }


  postImage() {
    if (this.postPic) {
      return this.postPic;
    }
    return this.profileURL;
  }

  isExpired() {
    let currentEpochTime = new Date().getTime() / 1000;
    return currentEpochTime > this.expiryTime;
  }

  performTask() {
    let msgObject = { type: "performAutomation", storyUrl: `https://www.instagram.com/stories/${this.username}/`, task: "FOLLOW", taskObj: this };
    if (process.env.NODE_ENV !== "development") {
      chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, msgObject);
        });
      });
    }
  }

  async hasBadOwner(filter) {
    return {isBad: false, message: "" };
    // let ownerDetalils = await FollowUserTask.checkRatioAndSettings(filter, this.username, this.userID);
    // if (ownerDetalils.detailedUser) {
    //   this.detailedUser = ownerDetalils.detailedUser;
    //   if (ownerDetalils.detailedUser.followsViewer) {
    //     return { isBad: true, message: `Not Following ${this.username}. ${this.username} already follows you!` };
    //   }
    // }
    // return { isBad: ownerDetalils.isBad, message: this.leaveTaskMessage() + "   \n" + ownerDetalils.message };
  }

  readableDate() {
    return new moment(this.completedDateTime).format('h:mm A, MMMM Do YYYY');
  }

}

export default NewFollowUserTask;
