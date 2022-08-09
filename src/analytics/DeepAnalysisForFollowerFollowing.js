import React from "react";
import { Card, Col, Icon, Progress, Row } from "antd";
import getDetailedUserObjectFromUsername from "../common/api_call/GetDetailedUserObjectFromUsername";
import StartStopButton from "../common/components/StartStopButton";
import getOptions from "../common/GetOptions";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import SleepArgs from "../common/models/SleepArgs";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import AddLevel3Calls from "../common/Helpers/AddLevel3Calls";
import GetObject from "../common/chrome/GetObject";
import DatabaseKeys from "../common/models/DatabaseKeys";
import SendEvent from "../common/Helpers/SendEvent";
import Messages from "../common/Messages";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";

class DeepAnalysisForFollowerFollowing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleScraped: 0,
      latestScrapedFollowerName: "",
      percentage: 0,
      isDeepAnalysisRunning: false
    };
    this.stop = false;
    this.loading = true;
    this.reserve = {
      count: 0,
      detailedUsers: []
    };
  }


  reflectProgress = (peopleScraped, latestScrapedFollowerName, totalUsers) => {
    let percentage = Math.floor((peopleScraped / totalUsers) * 100);
    this.setState({
      peopleScraped: peopleScraped,
      percentage: percentage,
      latestScrapedFollowerName: latestScrapedFollowerName
    });
  };

  startStopDetailedUsersProcess = () => {
    let oldDeepAnalysisStatus = this.state.isDeepAnalysisRunning;
    ReactGA.event({
      category: AnalyticsCategoryEnum.ANALYSE_FOLLOWER_FOLLOWING,
      action: `Detailed Analysis Button Pressed`,
      label: `status - ${oldDeepAnalysisStatus}`
    });
    this.setState({ isDeepAnalysisRunning: !oldDeepAnalysisStatus }, () => {
      if (oldDeepAnalysisStatus === false) {
        // console.log(this.reserve, this.users, 'Class: DeepAnalysisForFollowerFollowing, Function: , Line 41 "deep analysis running"(): ');
        this.getDeepAnalysisForUsers(
          this.users,
          this.reserve.count,
          this.reserve.detailedUsers
        );
      }
    });
  };

  resetState() {
    this.loading = true;
    this.props.setDetailedAnalysisComplete();
  }

  checkIfComponentUnmounted() {
    return !!this.props.stopAPICallCheck();
  }

  async getMultipleAtOnce(usernames) {
    let [a, b, c, d] = await Promise.all([
      getDetailedUserObjectFromUsername(usernames[0], false),
      getDetailedUserObjectFromUsername(usernames[1], false),
      getDetailedUserObjectFromUsername(usernames[2], false),
      getDetailedUserObjectFromUsername(usernames[3], false),
    ]);
    return [a, b, c, d];
  }

  async getDeepAnalysisForUsers(users, count, detailedUsers) {
    let shouldGetFast = true;
    if (!this.props.isPayedUser && this.props.triesLeft <= 0) {
      shouldGetFast = false;
    }
    this.props.sleepStatusChanged(false);
    let userLength = users.length;
    let i;
    let user;
    for (i = count; i < userLength; i++) {
      if (this.checkIfComponentUnmounted()) {
        return;
      }

      let callsData = await GetObject(DatabaseKeys.CALLS_DATA);
      if (callsData.level3Calls >= callsData.level3AllowedCalls) {
        SendEvent(AnalyticsCategoryEnum.DETAILED_USERS, `Already scraped max users ${callsData.level3AllowedCalls}`, "");
        this.props.passMessage(...Messages.MAX_USERS_SCRAPED_TOTAL);
        sendNotification(NotificationTypeEnum.Failure, `Max users ${callsData.level3AllowedCalls} scraped. Purchase ProfileBuddy to continue & unlock full power`, true);
        return;
      }

      userLength = this.users.length;
      if (!this.state.isDeepAnalysisRunning) {
        break;
      }
      let detailedUsersBunch = [];
      try {
        if (i + 3 < userLength && shouldGetFast) {
          detailedUsersBunch = await this.getMultipleAtOnce([
            users[i],
            users[i + 1],
            users[i + 2],
            users[i + 3],
          ]);
          i = i + 3;
        } else {
          user = await getDetailedUserObjectFromUsername(users[i], false);
        }
      } catch (error) {
        let options = await getOptions();
        this.props.sleepStatusChanged(
          true,
          new SleepArgs(true, "DETAILED_USER_ANALYTICS")
        );
        await sleep(options.sleepTimeFor429InSeconds * 1000);
        return await this.getDeepAnalysisForUsers(users, i + 1, detailedUsers);
      }
      let bunchCall = detailedUsersBunch.length !== 0;
      if (bunchCall) {
        await AddLevel3Calls(4);
        this.reflectProgress(
          i + 1,
          `${users[i - 3]}, ${users[i - 2]}, ${users[i - 1]}, ${users[i]}`,
          userLength
        );
        detailedUsers = detailedUsers.concat(detailedUsersBunch);
      } else {
        await AddLevel3Calls(1);
        this.reflectProgress(i + 1, users[i], userLength);
        detailedUsers.push(user);
      }
      this.props.detailedUserInfo(detailedUsers);
      let options = await getOptions();
      await sleep(
        options.intervalBetweenRequestsToGetDetailedInfoInSeconds * 1000
      );
    }
    if (this.state.isDeepAnalysisRunning) {
      // this.props.detailedUserInfo(detailedUsers);
      this.resetState();
    } else {
      this.reserve = {
        count: i,
        detailedUsers: detailedUsers
      };
    }
  }


  render() {
    if (this.props.detailedAnalysisComplete) {
      return <div/>;
    }
    this.users = this.props.users;
    if (this.loading && this.users.length > 0) {
      this.loading = false;
      this.stop = false;
      this.getDeepAnalysisForUsers(this.users, 0, []);
      this.startStopDetailedUsersProcess();
    }
    return (
      <Card
        title={
          <div>
            <Row>
              <Col span={1}><Icon type="dot-chart"/></Col>
              <Col span={5}>Detailed Analysis</Col>
            </Row>
          </div>
        }
        style={{ margin: 4, backgroundColor: "#fbfbfb" }}
      >


        {this.props.users.length === 0 ? (
          <React.Fragment/>
        ) : (
          <div
            style={{
              textAlign: "center",
              margin: 10,
              padding: 10,
              backgroundColor: "#fbfbfb"
            }}
          >
            <Row style={{ textAlign: "left" }}>
              <Col span={18}>
                Scraping: {this.state.latestScrapedFollowerName}
              </Col>
              <Col span={6}>
                Status: {this.state.peopleScraped} / {this.users.length}
              </Col>
            </Row>
            <Progress percent={this.state.percentage} status="active"/> <br/>
            <div>
              Click on the Detailed view button below Also use free vpn proxy
              like Browsec.{" "}
              <a
                href={ApplicationConstants.blogs.VPN}
                target="_blank"
              >
                Blog here
              </a>
            </div>
            <StartStopButton
              action={this.startStopDetailedUsersProcess}
              processName={"Detailed Analysis"}
              processState={this.state.isDeepAnalysisRunning}
            />
          </div>
        )}
      </Card>
    );
  }
}

function sleep(timeInMS) {
  return new Promise(res => {
    setTimeout(() => {
      res("ok");
    }, timeInMS);
  });
}

export default DeepAnalysisForFollowerFollowing;
