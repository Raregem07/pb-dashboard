import React from "react";

import QueryBox from "./QueryBox";
import InstagramAnalyser from "./InstagramAnalyser";
import FollowerFollowingManager from "./FollowerFollowingManager";
import { Prompt } from "react-router-dom";
import Divider from "antd/es/divider";
import GetFollowerFollowing from "./GetFollowerFollowing";
import Messages from "../common/Messages";
import { AppContext } from "../home/Home";
import TimeForPause from "./TimeForPause";
import AddFollowerCallForMaxLimit from "../common/Helpers/AddFollowerCallForMaxLimit";
import ReactMarkdown from "react-markdown";

// Props: location, sleepStatusChanged, handleActions
class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userForAnalysis: null,
      isUserSet: false,
      detailedUser: null,
      isDataReceived: false,
      detailedData: null,
      followerFollowingToShowSettings: { subjectFollowsUser: "any", userFollowsSubject: "any" },
      data: { followers: [], following: [], userObj: null }, // data = {'followers': null, 'following': null, 'userObj': null};
      followersProgressTracker: { scraped: 0, total: 0 },
      followingProgressTracker: { scraped: 0, total: 0 },
      showIsDetailed: false,
      detailedAnalysisComplete: false,
      detailedAnalysisStarted: false,
      showFollowerTimeMessage: false,
      timeInSecondsBeforeFollowerScrape: 0,
      fieldsToDownload: ["biography", "followerCount", "followingCount", "followsViewer", "followedByViewer", "isBusinessAccount", "isPrivate", "profileURL", "profilePicURLHD", "username", "fullName", "externalURL", "mutualConnectionCount", "businessCategoryName", "postCount", "id"]
    };
    this.setUserForAnalysis = this.setUserForAnalysis.bind(this);
    this.detailedUsersInfo = this.detailedUsersInfo.bind(this);
    this.stopAPICalls = false;
    this.stopAPICallCheck = this.stopAPICallCheck.bind(this);
  }

  componentWillUnmount() {
    this.stopAPICalls = true;
  }


  componentDidMount() {
    this.evaluateFollowersScrapedPerTime();
  }

  stopAPICallCheck() {
    return this.stopAPICalls;
  }

  evaluateFollowersScrapedPerTime = async () => {
    let obj = await AddFollowerCallForMaxLimit(0, true);
    if (!obj.success) {
      // console.log(obj, 'Class: Analytics, Function: , Line 109 obj(): ');
      let timeInSecondsBeforeFollowerScrape = obj.timeInSec;
      this.setState({
        showFollowerTimeMessage: true,
        timeInSecondsBeforeFollowerScrape: timeInSecondsBeforeFollowerScrape
      });
    } else {
      this.setState({
        showFollowerTimeMessage: false
      });
    }
  };

  stopDeepApiCallCheck = () => {
    return this.stopAPICalls || this.state.detailedAnalysisComplete;
  };

  updateFollowers = (followers) => {
    let earlierFollowing = this.state.data.following;
    let earlierFollowers = this.state.data.followers;
    this.setState({
      data: {
        followers: earlierFollowers.concat(followers),
        following: earlierFollowing
      }
    });
  };

  updateFollowing = (following) => {
    let earlierFollowers = this.state.data.followers;
    let earlierFollowing = this.state.data.following;
    this.setState({
      data: {
        followers: earlierFollowers,
        following: earlierFollowing.concat(following)
      }
    });
  };

  followerProgressTracker = (scraped, total) => {
    this.setState({
      followersProgressTracker: { scraped: scraped, total: total }
    });
  };

  followingProgressTracker = (scraped, total) => {
    this.setState({
      followingProgressTracker: { scraped: scraped, total: total }
    });
  };

  maxFollowersScrapedMessage = (messageType, messageValue) => {
    if (messageType === "max_users_scraped") {
      this.props.passMessage(...Messages.MAX_USERS_SCRAPED);
    } else if (messageType === "max_followers_in_time") {
      // this.props.passMessage(messageValue,"#","info")
      this.evaluateFollowersScrapedPerTime();
    } else if (messageType === "max_followings_in_time") {
      this.props.passMessage(messageValue, "#", "info");
    } else {
      this.props.passMessage(...Messages.MAX_USERS_SCRAPED_TOTAL);
    }
  };


  setUserForAnalysis = async (value) => {
    // value is {userObj: {SearchUser}, followers: true, following: true}
    this.evaluateFollowersScrapedPerTime();
    this.setState(
      {
        userForAnalysis: value,
        isUserSet: true,
        data: { followers: [], following: [], userObj: value.userObj }
      }
    );
    let continueDetails = value.continueDetails;
    let totalUsers = 0, nextPageToken = null;
    if (continueDetails) {
      totalUsers = continueDetails.doneTill;
      nextPageToken = continueDetails.pageToken;
    }
    let isPayedUser = this.props.context.isPayedUser;
    let getFollowerFollowingObj = new GetFollowerFollowing(value.userObj, value.followers, value.following, this.updateFollowers, this.updateFollowing, this.props.sleepStatusChanged, this.followerProgressTracker, this.followingProgressTracker, this.stopAPICallCheck, this.maxFollowersScrapedMessage, isPayedUser, nextPageToken, totalUsers);
    getFollowerFollowingObj.start();
  };

  removeUsers = (users, callback) => {
    let followers = this.state.data.followers;
    let followings = this.state.data.following;
    let usersToBeDeleted = {};
    for (let i = 0; i < users.length; i++) {
      usersToBeDeleted[users[i].username] = true;
    }
    let newFollowers = [], newFollowings = [];
    for (let i = 0; i < followers.length; i++) {
      if (!usersToBeDeleted[followers[i].username]) {
        newFollowers.push(followers[i]);
      }
    }
    for (let i = 0; i < followings.length; i++) {
      if (!usersToBeDeleted[followings[i].username]) {
        newFollowings.push(followings[i]);
      }
    }
    this.setState(
      {
        data: { followers: newFollowers, following: newFollowings, userObj: this.state.data.userObj }
      }, () => {
        callback();
      }
    );
  };


  detailedUsersInfo(users) {
    this.setState({
      detailedData: users,
      detailedAnalysisStarted: true
    });
  }

  // subject is vanditi, dhruv while user is abhnv_rai
  setFollowerFollowingToShowSettings = (subjectFollowsUser, userFollowsSubject) => {
    let settings = {
      subjectFollowsUser: subjectFollowsUser,
      userFollowsSubject: userFollowsSubject
    };
    this.setState({ followerFollowingToShowSettings: settings });
  };

  handleUserFollowsSubject = (value) => {
    let settings = this.state.followerFollowingToShowSettings;
    settings.userFollowsSubject = value;
    this.setState({ followerFollowingToShowSettings: settings });
  };

  handleSubjectFollowsUser = (value) => {
    let settings = this.state.followerFollowingToShowSettings;
    settings.subjectFollowsUser = value;
    this.setState({ followerFollowingToShowSettings: settings });
  };

  getUsername = () => {
    if (this.state.userForAnalysis) {
      return this.state.userForAnalysis["userObj"].username;
    }
    return null;
  };

  setShowIsDetailed = (showIsDetailed) => {
    this.setState({ showIsDetailed });
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

  setDetailedAnalysisComplete = () => {
    this.setState({ detailedAnalysisComplete: true });
  };


  render() {
    //steve
    console.log(this.props.context);
    return (
      <div>
        <Prompt
          message="You will lose this data. Download this data first. Do you want to continue?"
          when={this.state.isUserSet || this.state.isDataReceived}
        />

        <TimeForPause
          showFollowerTimeMessage={this.state.showFollowerTimeMessage}
          timeInSecondsBeforeFollowerScrape={this.state.timeInSecondsBeforeFollowerScrape}
        />

        {this.props.context.mainMessages.follower_following === "" ? <React.Fragment/> :
          <div className="main-message">
            <ReactMarkdown source={this.props.context.mainMessages.follower_following}/>
          </div>
        }


        {this.state.isUserSet ? <React.Fragment/> :
          <QueryBox setUserForAnalysis={this.setUserForAnalysis} self={this.props.self}/>}
        <Divider/>

        {/*{this.state.isUserSet ? <AttractiveMessageBox text="Get Emails & other details for these users from Analyse Users option"/> : <React.Fragment />}*/}

        <InstagramAnalyser
          username={this.getUsername()}
          isUserSet={this.state.isUserSet}
          followersProgressTracker={this.state.followersProgressTracker}
          followingProgressTracker={this.state.followingProgressTracker}
        />

        {/*<Statistics*/}
        {/*  isUserSet={this.state.isUserSet}*/}
        {/*  username={this.getUsername()}*/}
        {/*  data={this.state.data}*/}
        {/*  detailedUser={this.state.detailedUser}*/}
        {/*  onfollowerFollowingSettingsChange={this.setFollowerFollowingToShowSettings}*/}
        {/*/>*/}

        <FollowerFollowingManager
          fieldsToDownload={this.state.fieldsToDownload}
          detailedAnalysisComplete={this.state.detailedAnalysisComplete}
          location={this.props.location}
          isUserSet={this.state.isUserSet}
          data={this.state.data}
          username={this.getUsername()}
          detailedUserInfo={this.state.detailedData}
          handleActions={this.props.handleActions}
          followerFollowingToShowSettings={this.state.followerFollowingToShowSettings}
          handleUserFollowsSubject={this.handleUserFollowsSubject}
          handleSubjectFollowsUser={this.handleSubjectFollowsUser}
          showIsDetailed={this.state.showIsDetailed}
          removeUsers={this.removeUsers}
        />
      </div>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {context => <Analytics context={context} {...props} />}
  </AppContext.Consumer>
);