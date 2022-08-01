import React from "react";
import Icons from "../../components/Icons";
import { Col, Row, Tooltip } from "antd";
import followUser from "../../api_call/FollowUser";
import SpeedOptionsEnum from "../SpeedOptionsEnum";
import getDetailedUserObjectFromUsername from "../../api_call/GetDetailedUserObjectFromUsername";
import getUserFromID from "../../api_call/GetUserFromID";
import ConcatToArray from "../../store/ConcatToArray";
import DatabaseKeys from "../DatabaseKeys";
import UserMessage from "../UserMessage";
import UserMessageSeverityEnum from "../UserMessageSeverityEnum";
import GetRandomNumberFrom1ToN from "../../Helpers/GetRandomNumber";
import moment from "moment";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../../constants/AnalyticsCategoryEnum";

class FollowUserTask {
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
    let jitter = GetRandomNumberFrom1ToN(25);
    switch (speed) {
      case SpeedOptionsEnum.SLOW:
        return 120 + jitter;
      case SpeedOptionsEnum.MEDIUM:
        return 70 + jitter;
      case SpeedOptionsEnum.FAST:
        return 50 + jitter;
    }
  }

  static async checkRatioAndSettings(filter, username, userID) {
    let detailedUser;
    try {
      if (username) {
        detailedUser = await getDetailedUserObjectFromUsername(username);
      } else {
        detailedUser = await getUserFromID(userID);
      }
    } catch (e) {
      // console.log(e, "Call failed for detailed user");
      return { isBad: false, detailedUser: null };
    }
    // console.log(detailedUser, filter, username, 'Class: FollowUserTask, Function: , Line 161 detailedUser, filter, username(): ');
    let followFollowingRatioObj = FollowUserTask.followerFollowingRatioSatisfied(detailedUser);
    let deviationObj = FollowUserTask.notMajorDeviationFromValues(detailedUser, filter);

    if (
      followFollowingRatioObj.isSatisfied && deviationObj.isSatisfied
    ) {
      return { isBad: false, detailedUser: detailedUser, message: "" };
    }
    if (!followFollowingRatioObj.isSatisfied) {
      return { isBad: true, detailedUser: detailedUser, message: followFollowingRatioObj.message };
    }
    if (!deviationObj.isSatisfied) {
      return { isBad: true, detailedUser: detailedUser, message: deviationObj.message };
    }
  }

  static followerFollowingRatioSatisfied(detailedUser) {
    return { isSatisfied: true, message: "" };

    let followers = detailedUser.followerCount;
    let following = detailedUser.followingCount;
    let expectedRatio = 2.5;
    if (followers < 100) {
      expectedRatio = 5;
    }
    if (followers / following < expectedRatio) {
      return { isSatisfied: true, message: "" };
    } else {
      let errorMessage = `Bad Follower/Following Ratio: Followers: ${followers}, Following ${following}`;
      // console.log(errorMessage);
      return { isSatisfied: false, message: errorMessage };
    }
  }

  static notMajorDeviationFromValues(detailedUser, filter) {
    if (!detailedUser) {
      return { isSatisfied: true, message: "" };
    }
    let followers = detailedUser.followerCount;
    let following = detailedUser.followingCount;
    if (filter.minFollowers >= filter.maxFollowers || filter.minFollowing >= filter.maxFollowing) {
      ConcatToArray(
        DatabaseKeys.USER_MESSAGE,
        [
          new UserMessage(UserMessageSeverityEnum.WARN,
            "Wrong Settings Set. More min followers/following greater than max follower/following in automation settings")
        ]);
      return { isSatisfied: true, message: "" };
    }
    let checkFollowersObj = FollowUserTask.checkForFollowers(filter, followers, 1);
    let checkFollowingobj = FollowUserTask.checkForFollowing(filter, following, 1);

    if (checkFollowersObj.isSatisfied && checkFollowingobj.isSatisfied) {
      return { isSatisfied: true, message: "" };
    }
    if (!checkFollowersObj.isSatisfied) {
      return { isSatisfied: false, message: checkFollowersObj.message };
    }
    if (!checkFollowingobj.isSatisfied) {
      return { isSatisfied: false, message: checkFollowingobj.message };
    }
  }

  static checkForFollowers(filter, followers, factor) {
    let diff = (filter.maxFollowers - filter.minFollowers) * factor;
    let followerCheckPassed = followers > filter.minFollowers - diff && followers < filter.maxFollowers + diff;
    if (followerCheckPassed) {
      return { isSatisfied: true, message: "" };
    } else {
      let errorMessage = `Follower requirement failed. FollowersCount: ${followers}. min Followers: ${filter.minFollowers} - max Followers: ${filter.maxFollowers}`;
      // console.log(errorMessage);
      return { isSatisfied: false, message: errorMessage };
    }
  }

  static checkForFollowing(filter, following, factor) {
    let diff = (filter.maxFollowing - filter.minFollowing) * factor;
    let followingCheckPassed = following > filter.minFollowing - diff && following < filter.maxFollowing + diff;
    if (followingCheckPassed) {
      return { isSatisfied: true, message: "" };
    } else {
      let errorMessage = `Following requirement failed. Following: ${following}. Min Following: ${filter.minFollowing} - Max Following: ${filter.maxFollowing}`;
      // console.log(errorMessage);
      return { isSatisfied: false, message: errorMessage };
    }
  }

  setCompletedDateTime(dateTimeInEpoch) {
    this.completedDateTime = dateTimeInEpoch;
  }

  display() {
    return <div>Task: Follow &nbsp; {Icons.FOLLOW}</div>;
  }

  commentDisplay() {
    if (this.detailedUser) {
      return <div style={{ textAlign: "center" }}>
        Posts: {this.detailedUser.postCount} <br/>
        Followers: {this.detailedUser.followerCount} <br/>
        Following: {this.detailedUser.followingCount}
      </div>;
    }
    return <div/>;
  }

  getURL() {
    return  `https://www.instagram.com/${this.username}/`;
  }

  openPostInNewTab = () => {
    let url = this.getURL();
    if (this.completedDateTime) {
      window.open(url, "_blank");
    }
    ConcatToArray(DatabaseKeys.TASKS_TO_OPEN, {
      task: `Follow ${this.username}`,
      url: url,
      type: "FOLLOW",
      origin: this.origin,
      fullTask: this,
      completedTaskString: "Already performed follow on this user. Follow them if you haven't"
    }).then(() => {
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
        <Col span={12}>Task: <strong>Follow</strong></Col>
        <Col span={8} />
        <Col span={4}>{Icons.FOLLOW}</Col>
      </Row>
    </React.Fragment>
  }

  async perform() {
    try {
      await followUser(this.userID);
      ReactGA.event({
        category: AnalyticsCategoryEnum.FOLLOW_TASK_SUCCESSFUL,
        action: `Username: ${this.username}`
      });
    } catch (e) {
      // console.log(
      //   e,
      //   `could not follow the user ${this.userID} - username - ${this.username}`
      // );
      return false;
    }
    this.completedDateTime = new Date().getTime();
    return true;
  }

  moreThanNDaysOld(n) {
    const diffTime = Math.abs(new Date() - new Date(this.completedDateTime));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > n) {
      return true;
    }
    return false;
  }

  async hasBadOwner(filter) {
    let ownerDetalils = await FollowUserTask.checkRatioAndSettings(filter, this.username, this.userID);
    if (ownerDetalils.detailedUser) {
      this.username = ownerDetalils.detailedUser.username;
      this.profileURL = ownerDetalils.detailedUser.profileURL;
      this.detailedUser = ownerDetalils.detailedUser;
      // if (ownerDetalils.detailedUser.followsViewer) {
      //   return {isBad: true, message: `Not Following ${this.username}. ${this.username} already follows you!`}
      // }
    }
    return { isBad: ownerDetalils.isBad, message: this.leaveTaskMessage() + "   \n" + ownerDetalils.message };

  }

  leaveTaskMessage() {
    let username = this.username || "Given User";
    return `Leaving task to follow user ${username} because of high chances of user not following you back`;
  }

  readableDate() {
    return new moment(this.completedDateTime).format("h:mm A, MMMM Do YYYY");
  }
}

export default FollowUserTask;
