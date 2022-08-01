import Icons from "../../components/Icons";
import React from "react";
import moment from "../task/FollowUserTask";

class NewUnfollowUserTask {
  constructor(type, userID, username, profileURL, origin, userOrigin, postPic, completedDateTime = null) {
    this.type = type;
    this.userID = userID;
    this.username = username;
    this.profileURL = profileURL;
    this.origin = origin;
    this.completedDateTime = completedDateTime;
    this.userOrigin = userOrigin;
    this.postPic = postPic;
    this.isNew = true;
  }

  setCompletedDateTime(epoch) {
    this.completedDateTime = epoch;
  }

  isExpired() {
    return false;
  }

  // TODO: Make this
  performTask() {
  }

  async hasBadOwner(filter) {
    return { isBad: false };
  }

  displayDescription() {
    return (
      <div>
        User to Unfollow: <strong>{this.username}</strong>
      </div>
    );
  }

  display() {
    return (
      <div>
        Task: <strong>Unfollow</strong> &nbsp; {Icons.FOLLOW}
      </div>
    );
  }


  postImage() {
    return this.profileURL;
  }

  readableDate() {
    return new moment(this.completedDateTime).format('h:mm A, MMMM Do YYYY');
  }

}

export default NewUnfollowUserTask;
