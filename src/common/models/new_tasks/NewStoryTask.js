import Icons from "../../components/Icons";
import FollowUserTask from "../task/FollowUserTask";
import moment from "moment";
import React from "react";

class NewStoryTask {
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
      Viewed: <strong>{this.username}'s</strong> story
    </div>;
  }

  display() {
    return <div>
      Task: View Story {Icons.STORY}
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

export default NewStoryTask;
