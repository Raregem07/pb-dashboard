import React from "react";
import {Button, Input, Modal, Spin, Steps, Typography} from "antd";
import UsernamesBox from "../analytics/UsernamesBox";
import SendEvent from "../common/Helpers/SendEvent";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import StarHighlight from "./StarHighlight";
import FieldsToDownload from "../analytics/FieldsToDownload";
import getMainUser from "../common/chrome/GetMainUser";
import DetailedDataBrain from "./DetailedDataBrain";
import { AppContext } from "../home/Home";
import GetEmail from "../common/api_call/GetEmail";
import sleep from "../common/Sleep";
import GetRandomNumberFrom1ToN from "../common/Helpers/GetRandomNumber";
import EmailOption from "../analytics/EmailOption";
import DetailedFollowerFollowingManager from "../analytics/DetailedFollowerFollowingManager";
import DetailedUserViewer from "./DetailedUserViewer";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import Messages from "../common/Messages";
import GetObject from "../common/chrome/GetObject";
import DatabaseKeys from "../common/models/DatabaseKeys";
import DetailedUser from "../common/models/DetailedUser";
import { Prompt } from "react-router-dom";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import ReactMarkdown from "react-markdown";
import CheckRateLimit from "./CheckRateLimit";
import SaveObject from "../common/chrome/SaveObject";
import GetOrSetValue from "../common/store/GetOrSetValue";
import EmailPauseMessage from "./EmailPauseMessage";
import GetDailyBasicUserSadamCalls from "./GetDailyBasicUserSadamCalls";
import AddDailyLevel3Limit from "./AddDailyLevel3Limit";
import GetDailyLevel3LimitRemaining from "./GetDailyLevel3LimitRemaining";
import EmailPauseDailyCallsOver from "./EmailPauseDailyCallsOver";
import NewNotification from "../common/components/NewNotification";
import CollectEmail from "./CollectEmail";
import UnprocessedUsernames from "./UnprocessedUsernames";
import Icons from "../common/components/Icons";

const { Step } = Steps;
const { Title } = Typography;

class EmailExtractor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRateLimitedCurrently: false,
      rateLimitTimeRemainingInMS: 0,
      current: 0,
      users: [],
      detailedUsers: [],
      emailUsers: [],
      emailState: true,
      username: "",
      detailedUsersScraped: 0,
      detailedAnalysisState: true,
      dummyUsersStarted: false,
      campaignName: "",
      maxUsers: 10000,
      processStoppedModalOpened: false,
      fieldsToDownload: ["biography", "followerCount", "followingCount", "isBusinessAccount", "isPrivate", "username", "fullName", "externalURL", "businessCategoryName", "postCount", "id", "engagementRate", "email", "phoneNumber", "phoneCountryCode", "city", "postLocations"]
    };
    this.stopAPICalls = false;
    this.emailProcessGoingOn = false;
    this.detailedBrain = new DetailedDataBrain();
  }

  async componentDidMount() {
    let mainUser = await getMainUser();
    this.setState({ username: mainUser.viewer.username });
    // TODO: Get this value from Context
    let sadamCallsLeft = await GetObject(DatabaseKeys.SADAM_CALLS_LEFT);
    let isPremium = this.props.context.permission === "PREMIUM";
    let freeSadamCalls = await GetDailyBasicUserSadamCalls(1250);
    let isBadUser = await GetOrSetValue(DatabaseKeys.IS_USER_BAD, false);
    if (isBadUser) {
      if (!isPremium || sadamCallsLeft === 0) {
        freeSadamCalls = await GetDailyBasicUserSadamCalls(1250);
      }
      SendEvent(AnalyticsCategoryEnum.BAD_USER, `Is Bad user`, `Is premium: ${isPremium}`);
      if (freeSadamCalls !== 0) {
        SendEvent(AnalyticsCategoryEnum.FREE_SADAM_CALLS, `Given`, `Value: ${freeSadamCalls}`);
      } else {
        SendEvent(AnalyticsCategoryEnum.FREE_SADAM_CALLS, `Over`, `Value: ${freeSadamCalls}`);
      }
      // console.log("BAD USER | SADAM CAlls: ", freeSadamCalls, 'Class: EmailExtractor, Function: , Line 81 "BAD USER | SADAM CAlls: ", freeSadamCalls(): ');
    }

    console.log(sadamCallsLeft, freeSadamCalls, 'Line 88 | Class: EmailExtractor | Function: componentDidMount: ')

    let maxDailyEmailLimits = this.props.context.maxDailyEmailLimits;
    let maxUsers = await GetDailyLevel3LimitRemaining(maxDailyEmailLimits);
    console.log(maxDailyEmailLimits, maxUsers, 'Line 90 | Class: EmailExtractor | Function: componentDidMount: ')
    // console.log("MAX USERS",maxUsers, 'Class: EmailExtractor, Function: , Line 86 "MAX USERS",maxUsers(): ');
    this.setState({ maxUsers });
    SendEvent(AnalyticsCategoryEnum.MAX_DAILY_USER_CALLS, `Remaining daily limit: ${maxUsers}`, "");
    await this.rateLimitCheck();
    this.detailedBrain = new DetailedDataBrain(this.reflectDetailedUsersProgress, this.getDetailedUserCallback, sadamCallsLeft, mainUser.viewer.id, isPremium, this.dummyUsersStartedCallback, this.trialOverCallback, this.waitForSomeTimeCallback, freeSadamCalls);
  }

  rateLimitCheck = async () => {
    let lastScrapeCompletionTime = await GetOrSetValue(DatabaseKeys.BAD_USER_LAST_SCRAPE_TIME, 0);
    if (lastScrapeCompletionTime !== 0 && new Date().getTime() - lastScrapeCompletionTime < ApplicationConstants.RATE_LIMIT_EMAIL_CONFIG.TIME_IN_HOUR_FOR_SLEEP * 3600 * 1000) {
      // console.log("setting rate limited state", 'Class: EmailExtractor, Function: , Line 94 "setting rate limited state"(): ');
      // console.log(ApplicationConstants.RATE_LIMIT_EMAIL_CONFIG.TIME_IN_HOUR_FOR_SLEEP * 3600 * 1000 - (new Date().getTime() - lastScrapeCompletionTime), 'Class: EmailExtractor, Function: , Line 95 (): ');
      // console.log(lastScrapeCompletionTime, 'Class: EmailExtractor, Function: , Line 96 lastScrapeCompletionTime(): ');
      this.setState({
        isRateLimitedCurrently: true,
        rateLimitTimeRemainingInMS: ApplicationConstants.RATE_LIMIT_EMAIL_CONFIG.TIME_IN_HOUR_FOR_SLEEP * 3600 * 1000 - (new Date().getTime() - lastScrapeCompletionTime)
      });
    }
  };

  componentWillUnmount() {
    this.stopAPICalls = true;
    this.detailedBrain.stopProcess();
  }

  dummyUsersStartedCallback = () => {
    this.props.passMessage(...Messages.INCREASE_SPEED_OF_CALLS_PURCHASE_MESSAGE);
    this.setState({ dummyUsersStarted: true });
  };

  waitForSomeTimeCallback = () => {
    this.props.passMessage(...Messages.WAIT_FOR_SOME_TIME_USERNAME_TO_USER_ID_FAILED);
  };

  trialOverCallback = () => {
    this.props.passMessage(...Messages.TRIAL_OVER_LEVEL_3_CALLS);
    sendNotification(NotificationTypeEnum.Failure, "Trial Over. Buy ProfileBuddy Subscription to get more data");
  };

  reflectDetailedUsersProgress = (i, total) => {
    this.setState({
      detailedUsersScraped: i
    });
  };

  next = () => {
    if (this.state.current === 2) {
      sendNotification(NotificationTypeEnum.Success, "Process is starting. Keep this tab open and active. Make sure your computer doesn't go to sleep.", true);
    }
    this.setState({ current: this.state.current + 1 });
  };


  onStepCliked = (currentStep) => {

  };

  setUsernames = (uniqueUsers) => {
    SendEvent(AnalyticsCategoryEnum.DETAILED_USERS, `${uniqueUsers.length} unique Usernames Set for email analysis. Is Premium: ${this.props.context.permission === "PREMIUM"}`, "");
    // sendNotification(NotificationTypeEnum.Success, "Keep this tab in Foreground else the process will become slow", true)
    // if (this.props.context.permission === "NORMAL" && uniqueUsers.length > ApplicationConstants.MAX_EMAIL_USERS_TO_BE_ENTERED.NORMAL) {
    //   sendNotification(NotificationTypeEnum.Failure, `Please enter less than ${ApplicationConstants.MAX_EMAIL_USERS_TO_BE_ENTERED.NORMAL} Usernames at a time`, true);
    //   return;
    // }
    // if (this.props.context.permission !== "NORMAL" && uniqueUsers.length > ApplicationConstants.MAX_EMAIL_USERS_TO_BE_ENTERED.PRO) {
    //   sendNotification(NotificationTypeEnum.Failure, `Please enter less than ${ApplicationConstants.MAX_EMAIL_USERS_TO_BE_ENTERED.PRO} Usernames at a time`, true);
    //   return;
    // }

    if (uniqueUsers.length > this.state.maxUsers) {
      let message = `Your daily users remaining for account @${this.state.username} are ${this.state.maxUsers}. This limit will reset tomorrow. Please enter less than ${this.state.maxUsers} usernames or use a different Account by changing it in Members area`;
      NewNotification(message, "", true);
      // sendNotification(NotificationTypeEnum.Failure, message, true);
      if (this.props.context.permission !== "PREMIUM") {
        NewNotification("Also, You can increase the daily limit by 5 times with much higher speed by investing in Profilebuddy's VIP Searches", "", true);
      }
      return;
    }

    this.setState({ users: uniqueUsers });
    this.next();
  };

  getDetailedUserCallback = (newDetailedUsers) => {
    AddDailyLevel3Limit(newDetailedUsers.length);
    let p = ApplicationConstants.CONVERT_USERS_TO_SADAM_USERS_PROBABILITY;
    // Here we increased the daily limits per IG Account
    let finalUsers = newDetailedUsers.map(nu => {
      return nu;
    })
    let detailedUsers = this.state.detailedUsers.concat(finalUsers);
    this.setState({ detailedUsers }, () => {
      this.getEmails();
    });
  };

  render() {
    const instagramUsernameComponent = this.getInstagramUsernameComponent();
    const selectFieldsToChooseComponent = this.getSelectFieldsToChooseComponent();
    const mainExtractorProcessComponent = this.getMainExtractorProcessComponent();
    const giveUsersNameComponent = this.getGiveUsersNameComponent();

    return <React.Fragment>
      <Prompt
        message="You will lose this data. Download this data first. Do you want to continue?"
        when={this.state.current >= 3}
      />
      {this.props.context.mainMessages.email_extractor === "" ? <React.Fragment/> :
        <div className="main-message">
          <ReactMarkdown source={this.props.context.mainMessages.email_extractor}/>
        </div>
      }

      {this.state.isRateLimitedCurrently && this.props.rateLimitTimeRemainingInMS !== 0 ?
        <EmailPauseMessage
          isPremium={this.props.context.permission === "PREMIUM"}
          isRateLimitedCurrently={this.state.isRateLimitedCurrently}
          rateLimitTimeRemainingInMS={this.state.rateLimitTimeRemainingInMS}
          username={this.state.username}
        />
        : <React.Fragment/>}


      {this.state.maxUsers === 0 ?
        <EmailPauseDailyCallsOver
          isPremium={this.props.context.permission === "PREMIUM"}
        />
        : <React.Fragment/>}


      <Steps
        direction="vertical"
        current={this.state.current}
        onChange={this.onStepCliked}
      >
        <Step title={<Title level={4}>Enter Instagram Usernames for which you want to get Data</Title>}
              description={instagramUsernameComponent}/>
        <Step title={<Title level={4}>Give these users a name</Title>}
              description={giveUsersNameComponent}/>
        <Step title={<Title level={4}>Select Fields to Download</Title>} description={selectFieldsToChooseComponent}/>
        <Step title={<Title level={4}>Download Data</Title>} description={mainExtractorProcessComponent}/>
      </Steps>

      <Modal
        title={"Process stuck for long time?"}
        visible={this.state.processStoppedModalOpened}
        onOk={this.handleProcessStoppedOk}
        onCancel={this.handleProcessStoppedCancel}
        width={700}
      >
        <ul>

          <li>
            <strong>Check if it is stuck for more than 10 minutes?</strong> If less than that, please wait.
          </li>
          <br />
          <li>
            Make sure your computer didn't go to sleep. If your computer goes to sleep/hibernate mode, then chrome freezes the tabs and process is stopped.
          </li>
          <br />
          <li>
            <strong>Check your logged in Instagram account</strong> on <a href={"https://www.instagram.com"} target={"_blank"}>https://www.instagram.com</a> and see if it is logged in well.
          </li>
          <br />
          <li>
            Now Download the already Scraped data first by clicking on <strong>Download All Data</strong> button in Download Data section (scroll down and you will find download section).
          </li>
          <br />
          <li>
            Also <strong>Download usernames which didn't get processed</strong> from below button and rotate the account <a href={"https://profilemate.wordpress.com/2020/10/02/how-to-rotate-instagram-accounts-to-reset-limits-in-profilemate/"} target={"_blank"}> (Step by Step here)</a> and put these usernames there.
            <UnprocessedUsernames
              allUsernames={this.state.users}
              processedUsernames={this.concatDetailedAndEmail()}
            />
          </li>
        </ul>

      </Modal>
    </React.Fragment>;
  }

  usersSubmitted = () => {
    return this.state.users.length >= 1;
  };


  getInstagramUsernameComponent = () => {
    let isRateLimited = this.state.isRateLimitedCurrently || this.state.rateLimitTimeRemainingInMS !== 0;
    return <React.Fragment>
      {!this.usersSubmitted() ?
        <React.Fragment>
          <StarHighlight/>
          <UsernamesBox
            isAllowed={!isRateLimited && this.state.maxUsers !== 0}
            setUsernames={this.setUsernames} completedUsers={null}/></React.Fragment> : <React.Fragment/>
      }    </React.Fragment>;
  };


  startProcess = () => {
    this.detailedBrain.setUsernames(this.state.users);
    this.detailedBrain.setDataFieldsToDownload(this.state.fieldsToDownload);
    this.detailedBrain.changeRunningState(true);
    this.next();
  };

  changeEmailProcessState = (emailState) => {
    this.setState({ emailState }, () => {
      if (emailState) {
        this.getEmails();
      }
    });
  };

  changeDetailedAnalysisState = (newState) => {
    this.setState({ detailedAnalysisState: newState }, () => {
      if (newState) {
        this.detailedBrain.changeRunningState(true);
      } else {
        this.detailedBrain.changeRunningState(false);
      }
    });
  };

  concatDetailedAndEmail = () => {
    let emailUsers = this.state.emailUsers;
    let emailUsersMap = {};
    emailUsers.map(eu => {
      emailUsersMap[eu.id] = eu;
    });
    let detailedUsers = this.state.detailedUsers;
    let newDetailedUsers = [];
    detailedUsers.map(d => {
      let u = new DetailedUser(d.biography, d.followerCount, d.followingCount, d.followsViewer, d.followedByViewer, d.isBusinessAccount, d.isPrivate, d.profileURL, d.profilePicURLHD, d.username, d.fullName, d.externalURL, d.mutualConnectionCount, d.timelineMedia, d.mutualConnections, d.id, d.blockedByViewer, d.businessCategoryName);
      u.dummy = d.dummy;
      u.engagementRate = d.engagementRate;
      u.postCount = d.postCount;
      u.businessCategoryName = d.businessCategoryName;
      u.email = d.email;
      u.publicPhoneNumber = d.publicPhoneNumber;
      u.isVerified = d.isVerified;
      newDetailedUsers.push(u);
    });
    return newDetailedUsers.map(du => {
      if (emailUsersMap[du.id]) {
        du.isEmailUser = true;
        if (du.dummy) {
          du.setEmailUserForDummyUser(emailUsersMap[du.id]);
        } else {
          du.setEmailUser(emailUsersMap[du.id]);
        }
      }
      return du;
    });
  };

  getEmails = async () => {
    if (this.emailProcessGoingOn) {
      return;
    }
    if (this.stopAPICalls) {
      return;
    }
    this.emailProcessGoingOn = true;
    let detailedUsers = this.state.detailedUsers;
    let businessUsers = detailedUsers.filter(u => u.isBusinessAccount === true);
    // get start value of i
    let emailUsersMap = {};
    this.state.emailUsers.map(u => {
      emailUsersMap[u.username] = true;
    });

    let i;
    for (i = 0; i < businessUsers.length; i++) {
      let bUser = businessUsers[i];
      if (!emailUsersMap[bUser.username]) {
        break;
      }
    }
    // console.log(i, businessUsers, "Class: DetailedUsername, Function: , Line 88 i(): ");

    for (; i < businessUsers.length; i++) {
      // console.log(i, businessUsers[i], "Class: DetailedUsername, Function: , Line 97 i, businessUsers[i](): ");
      this.props.sleepStatusChanged(false);
      if (i >= businessUsers.length) {
        break;
      }

      if (this.stopAPICalls) {
        break;
      }

      if (!this.state.emailState) {
        break;
      }

      let bUser = businessUsers[i];
      let emailUser;
      try {
        emailUser = await GetEmail(bUser.id);
        try {
          await CollectEmail(emailUser, this.state.detailedUsers, this.state.campaignName);
        } catch (e) {
          console.log("error in collect email", e, "Class: EmailExtractor, Function: , Line 344 \"error in collect email\"(): ");
        }
        SendEvent(AnalyticsCategoryEnum.EMAIL, `Business Username - ${bUser.username} | ID - ${bUser.id}`, "email");
        await sleep(2000 + GetRandomNumberFrom1ToN(1500));
      } catch (e) {
        // console.log(e, "Class: DetailedUsername, Function: , Line 118 e(): ");
        // this.props.sleepStatusChanged(
        //   true,
        //   new SleepArgs(false, "EMAIL_CALL")
        // );
        let userBecomeBad = await CheckRateLimit();
        // console.log(userBecomeBad, 'Class: EmailExtractor, Function: , Line 354 userBecomeBad(): ');
        SendEvent(AnalyticsCategoryEnum.API_ERROR, "Email call failed", e.toString());
        SendEvent(AnalyticsCategoryEnum.BAD_USER, "Bad user Rate Limit Check", `Is Bad?: ${userBecomeBad}`);
        if (userBecomeBad) {
          await SaveObject(DatabaseKeys.IS_USER_BAD, true);
          await SaveObject(DatabaseKeys.BAD_USER_LAST_SCRAPE_TIME, new Date().getTime());
          await this.rateLimitCheck();
          this.detailedBrain.stopProcess();
          this.stopAPICalls = true;
          break;
        }
        await sleep(ApplicationConstants.SLEEP_TIME_FOR_EMAIL_CALL_IN_SEC * 1000);
        continue;
      }

      this.setState({ emailUsers: this.state.emailUsers.concat([emailUser]) });

      businessUsers = this.state.detailedUsers.filter(u => u.isBusinessAccount === true);
    }

    this.emailProcessGoingOn = false;

  };

  getSelectFieldsToChooseComponent = () => {
    if (this.state.current !== 2) {
      return <React.Fragment/>;
    }
    return <React.Fragment>
      <FieldsToDownload
        changeFieldsToDownload={this.changeFieldsToDownload}
        fieldsToDownload={this.state.fieldsToDownload}
        next={this.startProcess}
      />
    </React.Fragment>;
  };

  changeFieldsToDownload = (fieldName, value) => {
    let fieldExists = false;
    this.state.fieldsToDownload.map(f => {
      if (f === fieldName) {
        fieldExists = true;
      }
    });
    if (fieldExists && !value) {
      let newFields = this.state.fieldsToDownload.filter(f => f !== fieldName);
      this.setState({ fieldsToDownload: newFields });
    }
    if (!fieldExists && value) {
      this.setState({ fieldsToDownload: this.state.fieldsToDownload.concat([fieldName]) });
    }
  };

  getGiveUsersNameComponent = () => {
    if (this.state.current !== 1) {
      return <React.Fragment/>;
    }
    return <div>
      <Input style={{ width: 300 }} placeholder="Eg: follower_of_ronaldo" onChange={(e) => {
        this.setState({ campaignName: e.target.value });
      }}/>
      &nbsp;&nbsp;&nbsp;<Button onClick={this.setCampaignName}>Set</Button>
    </div>;
  };

  setCampaignName = () => {
    if (this.state.campaignName.length < 1) {
      sendNotification(NotificationTypeEnum.Failure, "Please enter the campaign name for the above entered usernames");
      return;
    }
    let name = this.state.campaignName;
    let spaceRemovedName = name.split(" ").join("_");
    this.setState({ campaignName: spaceRemovedName });
    this.next();
  };

  getMainExtractorProcessComponent = () => {
    if (this.state.current !== 3) {
      return <React.Fragment/>;
    }
    return <React.Fragment>
      {!this.state.isRateLimitedCurrently ? <Spin /> :
        <div className="center">
          <h2>Maximum Done for the day | Download Data</h2><br />
          <UnprocessedUsernames
            allUsernames={this.state.users}
            processedUsernames={this.concatDetailedAndEmail()}
          />
        </div>}
      <div className="center">
        <Button type="danger" onClick={() => {this.setState({processStoppedModalOpened: true})}}>{Icons.WARNING} Process stuck for long time & not moving?</Button>
      </div>

      {this.state.detailedUsers.length >= this.state.users.length ? <React.Fragment/> :
        <React.Fragment>
          {this.state.dummyUsersStarted ? <React.Fragment/> : <DetailedUserViewer
            usersScrapedSoFar={this.state.detailedUsersScraped}
            totalUsers={this.state.users.length}
            detailedAnalysisState={this.state.detailedAnalysisState}
            changeDetailedUserState={this.changeDetailedAnalysisState}
          />}
        </React.Fragment>}


      <EmailOption
        detailedUsers={this.state.detailedUsers}
        users={this.state.users}
        data={this.concatDetailedAndEmail()}
        emailUsers={this.state.emailUsers}
        changeEmailProcessState={this.changeEmailProcessState}
        emailState={this.state.emailState}
      />

      <DetailedFollowerFollowingManager
        fieldsToDownload={this.state.fieldsToDownload}
        location={this.props.location}
        data={this.concatDetailedAndEmail()}
        username={this.props.username}
        campaignName={this.state.campaignName}
        handleActions={this.props.handleActions}
      />


    </React.Fragment>;
  };

  handleProcessStoppedOk = () => {
    this.setState({
      processStoppedModalOpened: false
    });
  }

  handleProcessStoppedCancel = () => {
    this.setState({
      processStoppedModalOpened: false
    });
  }


}


export default props => (
  <AppContext.Consumer>
    {context => <EmailExtractor context={context} {...props} />}
  </AppContext.Consumer>
);

