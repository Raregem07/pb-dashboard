import { Card, Col, Divider, Row, Tooltip } from "antd";
import React from "react";
import Icons from "../../components/Icons";
import commentPost from "../../api_call/CommentPost";
import SpeedOptionsEnum from "../SpeedOptionsEnum";
import FollowUserTask from "./FollowUserTask";
import GetRandomNumberFrom1ToN from "../../Helpers/GetRandomNumber";
import moment from "moment";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../../constants/AnalyticsCategoryEnum";
import ConcatToArray from "../../store/ConcatToArray";
import DatabaseKeys from "../DatabaseKeys";

const { Meta } = Card;

class CommentPostTask {
  constructor(
    type,
    postID,
    postURL,
    postText,
    username,
    userProfileImage,
    origin,
    userOrigin,
    shortcode,
    userID,
    isManual = false
  ) {
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

  static timeForTask(speed) {
    let jitter = GetRandomNumberFrom1ToN(30);
    switch (speed) {
      case SpeedOptionsEnum.SLOW:
        return 300 + jitter;
      case SpeedOptionsEnum.MEDIUM:
        return 250 + jitter;
      case SpeedOptionsEnum.FAST:
        return 200 + jitter;
    }
  }

  setCompletedDateTime(dateTimeInEpoch) {
    this.completedDateTime = dateTimeInEpoch;
  }

  setComment(commentValue) {
    this.commentValue = commentValue;
  }

  display() {
    return <div>Task: Comment &nbsp; {Icons.COMMENT}</div>;
  }

  displayDescription() {
    return <React.Fragment>
      <Row>
        <Col span={16}>Task: <strong>Comment</strong></Col>
        <Col span={4} />
        <Col span={4}>{Icons.COMMENT}</Col>
      </Row>
    </React.Fragment>
  }

  commentDisplay() {
    return (
      <div>
        <Meta title="Comment Value" description={this.commentValue}/>
        <Divider dashed={true}/>
      </div>
    );
  }

  getURL() {
    return `https://www.instagram.com/p/${this.shortcode}/`
  }

  openPostInNewTab = () => {
    let url = this.getURL();
    if (this.completedDateTime) {
      window.open(url, "_blank");
    }
    ConcatToArray(DatabaseKeys.TASKS_TO_OPEN, {
      task: "Comment something good on the Post",
      url: url,
      type: "COMMENT",
      origin: this.origin,
      fullTask: this,
      completedTaskString: "Already Commented on this Post. Comment on it if you haven't"
    }).then(() => {
      window.open(url, "_blank");
    });
  };

  postImage() {
    return this.postURL;
  }

  shortenedPostText() {
    let tooltip = `Post Caption - ${this.postText}`;
    return (
      <Tooltip title={tooltip}>{this.postText.slice(0, 40) + " ..."}</Tooltip>
    );
  }

  async perform() {
    try {
      await commentPost(this.postID, this.commentValue);
      ReactGA.event({
        category: AnalyticsCategoryEnum.COMMENT_TASK_SUCCESSFUL,
        action: `Username: ${this.username}`
      });
      this.completedDateTime = new Date().getTime();
    } catch (e) {
      return false;
    }
    return true;
  }

  async hasBadOwner(filter) {
    let ownerDetalils = await FollowUserTask.checkRatioAndSettings(filter, this.username, this.userID);
    if (ownerDetalils.detailedUser) {
      this.username = ownerDetalils.detailedUser.username;
      this.profileURL = ownerDetalils.detailedUser.profileURL;
      this.detailedUser = ownerDetalils.detailedUser;
      // if (ownerDetalils.detailedUser.followsViewer) {
      //   return {isBad: true, message: `Not performing Comment. ${this.username} already follows you!`}
      // }
    }
    return { isBad: ownerDetalils.isBad, message: this.leaveTaskMessage() + "   \n" + ownerDetalils.message };

  }

  leaveTaskMessage() {
    return `Leaving task to Comment on ${this.username} because of high chances of user not following you back`;
  }

  readableDate() {
    return new moment(this.completedDateTime).format("h:mm A, MMMM Do YYYY");
  }

}

export default CommentPostTask;
