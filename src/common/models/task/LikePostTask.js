import Icons from "../../components/Icons";
import React from "react";
import { Col, Row, Tooltip } from "antd";
import likePost from "../../api_call/LikePost";
import SpeedOptionsEnum from "../SpeedOptionsEnum";
import FollowUserTask from "./FollowUserTask";
import GetRandomNumberFrom1ToN from "../../Helpers/GetRandomNumber";
import moment from "moment";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../../constants/AnalyticsCategoryEnum";
import SaveObject from "../../chrome/SaveObject";
import DatabaseKeys from "../DatabaseKeys";
import ConcatToArray from "../../store/ConcatToArray";
import PostOrigin from "../../../action_queue/PostOrigin";

class LikePostTask {
  constructor(type, postID, postURL, postText, username, userProfileImage, origin, userOrigin, shortcode, userID, isManual = false) {
    this.type = type;
    this.postID = postID;
    this.postURL = postURL;
    this.postText = postText;
    this.username = username;
    this.profileURL = userProfileImage;
    this.origin = origin;
    this.shortcode = shortcode;
    this.isManual = isManual;
    this.completedDateTime = null;
    this.userID = userID;
    this.userOrigin = userOrigin;
  }

  setCompletedDateTime(dateTimeInEpoch) {
    this.completedDateTime = dateTimeInEpoch;
  }

  static timeForTask(speed) {
    let jitter = GetRandomNumberFrom1ToN(15);
    switch (speed) {
      case SpeedOptionsEnum.SLOW:
        return 80+jitter;
      case SpeedOptionsEnum.MEDIUM:
        return 60+jitter;
      case SpeedOptionsEnum.FAST:
        return 40+jitter;
    }
  }

  display() {
    return <div>
      Task: Like &nbsp; {Icons.LIKE}
    </div>
  }

  commentDisplay() {
    return <div/>
  }

  displayDescription() {
    return <React.Fragment>
      <Row>
        <Col span={16}>Task: <strong>Like Post</strong></Col>
        <Col span={4} />
        <Col span={4}>{Icons.LIKE}</Col>

      </Row>
    </React.Fragment>
  }

  getURL() {
    return `https://www.instagram.com/p/${this.shortcode}/`
  }

  openPostInNewTab = () => {
    let url = this.getURL();
    if (this.completedDateTime) {
      window.open(url, "_blank")
    }
    ConcatToArray(DatabaseKeys.TASKS_TO_OPEN,{task: "Like this Post", url: url, type: "LIKE", origin: this.origin, fullTask: this, completedTaskString: "Already Liked this Post. Like it if you haven't" }, ).then(() => {
      window.open(url, "_blank")
    })

  };

  postImage() {
    return this.postURL;
  }

  shortenedPostText() {
    let tooltip = `Post Caption - ${this.postText}`;
    return <Tooltip title={tooltip}>{this.postText.slice(0, 40) + " ..."}</Tooltip>;
  }

  async perform() {
    try {
      await likePost(this.postID);
      ReactGA.event({
        category: AnalyticsCategoryEnum.LIKE_TASK_SUCCESSFUL,
        action: `Username: ${this.username}`,
      });
    } catch (e) {
      return false;
    }
    this.completedDateTime = new Date().getTime();
    return true;
  }

  async hasBadOwner(filter) {
    let ownerDetalils = await FollowUserTask.checkRatioAndSettings(filter, this.username, this.userID);
    if (ownerDetalils.detailedUser) {
      this.username = ownerDetalils.detailedUser.username;
      this.profileURL = ownerDetalils.detailedUser.profileURL;
      this.detailedUser = ownerDetalils.detailedUser;
      // if (ownerDetalils.detailedUser.followsViewer) {
      //   return {isBad: true, message: `Not performing Like Task. ${this.username} already follows you!`}
      // }
    }
    return {isBad: ownerDetalils.isBad, message: this.leaveTaskMessage()+"   \n"+ownerDetalils.message};

  }

  leaveTaskMessage() {
    let username = this.username || "Given User";
    return `Leaving task to Like on ${username} because of high chances of user not following you back`;
  }

  readableDate() {
    return new moment(this.completedDateTime).format('h:mm A, MMMM Do YYYY');
  }

}

export default LikePostTask;
