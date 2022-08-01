import Icons from "../../components/Icons";
import { Col, Row, Tooltip } from "antd";
import React from "react";
import unfollowUser from "../../api_call/UnfollowUser";
import SpeedOptionsEnum from "../SpeedOptionsEnum";
import GetRandomNumberFrom1ToN from "../../Helpers/GetRandomNumber";
import moment from "moment";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../../constants/AnalyticsCategoryEnum";
import ConcatToArray from "../../store/ConcatToArray";
import DatabaseKeys from "../DatabaseKeys";

class UnfollowUserTask {
  constructor(type, userID, username, profileURL, origin, userOrigin, isManual = false) {
    this.type = type;
    this.userID = userID;
    this.username = username;
    this.profileURL = profileURL;
    this.origin = origin;
    this.isManual = isManual;
    this.completedDateTime = null;
    this.userOrigin = userOrigin;
  }

  static timeForTask(speed) {
    let jitter = GetRandomNumberFrom1ToN(20);
    switch (speed) {
      case SpeedOptionsEnum.SLOW:
        return 120 + jitter;
      case SpeedOptionsEnum.MEDIUM:
        return 70 + jitter;
      case SpeedOptionsEnum.FAST:
        return 50 + jitter;
    }
  }

  static actualTimeForTask(speed) {
    let value =
      UnfollowUserTask.timeForTask(speed) + Math.floor(Math.random() * 10);
  }

  setCompletedDateTime(dateTimeInEpoch) {
    this.completedDateTime = dateTimeInEpoch;
  }

  display() {
    return (
      <div>
        Task: <strong>Unfollow</strong> &nbsp; {Icons.FOLLOW}
      </div>
    );
  }

  commentDisplay() {
    return <div />;
  }

  getURL() {
    return `https://www.instagram.com/${this.username}/`;
  }

  openPostInNewTab = () => {
    let url = this.getURL();
    if (this.completedDateTime) {
      window.open(url, "_blank")
    }
    ConcatToArray(DatabaseKeys.TASKS_TO_OPEN,{ task: `Unfollow ${this.username}`, url: url, type: "UNFOLLOW", origin: "You followed them. We remember that it's time for them to be unfollowed if you want. ", fullTask: this, completedTaskString: "Already Unfollows this User. Unfollow them if you haven't"  }).then(() => {
      window.open(url, "_blank");
    });
  };

  postImage() {
    if (this.profileURL) {
      return this.profileURL;
    } else {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqZAHqwqJLeHJsdiiNsJWGBXNypmZx09hNnzMkXWtmp8iz4v4O"
    }
  }

  displayDescription() {
    return <React.Fragment>
      <Row>
        <Col span={16}>Task: <strong>Unfollow</strong></Col>
        <Col span={4} />
        <Col span={4}>{Icons.UNFOLLOW}</Col>
      </Row>
    </React.Fragment>
  }

  async perform() {
    try {
      await unfollowUser(this.userID);
      ReactGA.event({
        category: AnalyticsCategoryEnum.UNFOLLOW_TASK_SUCCESSFUL,
        action: `Username: ${this.username}`
      });
      this.completedDateTime = new Date().getTime();
    } catch (e) {
      // console.log(e, `could not unfollow user ${this.userID} - username ${this.username}`);
      return false;
    }
    return true;
  }

  async hasBadOwner(filter) {
    return { isBad: false };
  }

  readableDate() {
    return new moment(this.completedDateTime).format("h:mm A, MMMM Do YYYY");
  }
}

export default UnfollowUserTask;
