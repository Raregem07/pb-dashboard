import React from "react";
import CommonUsersForm from "./CommonUsersForm";
import MultiUserInstagramAnalyser from "./MultiUserInstagramAnalyser";
import makeUserObjects from "../common/MakeUserObjectForFollowerFollowing";
import CommonUser from "../common/models/CommonUser";
import MultiUserManager from "./MultiUserManager";
import { Prompt } from "react-router-dom";
import { AppContext, Home } from "../home/Home";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import GetFollowerFollowing from "../analytics/GetFollowerFollowing";
import Messages from "../common/Messages";
import AttractiveMessageBox from "../common/components/AttractiveMessageBox";


// Props: location, handleAction, sleepStatusChanged
class CommonUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isUserSet: false,
      user1Data: { followers: [], following: [], userObj: null },
      user2Data: { followers: [], following: [], userObj: null },
      user3Data: { followers: [], following: [], userObj: null },
      user4Data: { followers: [], following: [], userObj: null },
      followersProgressTracker1: { scraped: 0, total: 0 },
      followingProgressTracker1: { scraped: 0, total: 0 },
      followersProgressTracker2: { scraped: 0, total: 0 },
      followingProgressTracker2: { scraped: 0, total: 0 },
      followersProgressTracker3: { scraped: 0, total: 0 },
      followingProgressTracker3: { scraped: 0, total: 0 },
      followersProgressTracker4: { scraped: 0, total: 0 },
      followingProgressTracker4: { scraped: 0, total: 0 },
      data: []
    };
    this.commonUsersState = 2;
    this.stopAPICall = false;
  }

  return1OnNonNullElse0(obj) {
    if (obj !== null) {
      return 1;
    }
    return 0;
  }

  progressFollowerFollowingTracker = (scraped, total, stateName) => {
    this.setState({ [stateName]: { scraped: scraped, total: total } });
  };


  updateUserFollowers = (followers, stateName, userObj) => {
    let earlierFollowers = this.state[stateName].followers;
    this.setState({
      [stateName]: {
        followers: earlierFollowers.concat(followers),
        following: this.state[stateName].following,
        userObj: userObj
      }
    });
  };

  updateUserFollowings = (followings, stateName, userObj) => {
    let earlierFollowing = this.state[stateName].following;
    this.setState({
      [stateName]: {
        following: earlierFollowing.concat(followings),
        followers: this.state[stateName].followers,
        userObj: userObj
      }
    });
  };

  stopAPICallCheck = () => {
    return this.stopAPICall;
  };

  componentWillUnmount() {
    this.stopAPICall = true;
  }

  maxFollowersScrapedMessage = (messageType) => {
    if (messageType === "max_users_scraped") {
      this.props.passMessage(...Messages.MAX_USERS_SCRAPED)
    } else {
      this.props.passMessage(...Messages.MAX_USERS_SCRAPED_TOTAL)
    }
  };

  getFollowerFollowingForUser = (userObj, followerFollowingStateName, followerProgressStateName, followingProgressStateName) => {
    let isPayedUser = this.props.context.isPayedUser;
    let getFollowerFollowing = new GetFollowerFollowing(
      userObj.userObj,
      userObj.follower,
      userObj.following,
      followers => {
        this.updateUserFollowers(followers, followerFollowingStateName, userObj.userObj);
      },
      following => {
        this.updateUserFollowings(following, followerFollowingStateName, userObj.userObj);
      },
      this.props.sleepStatusChanged,
      (scraped, total) => {
        this.progressFollowerFollowingTracker(scraped, total, followerProgressStateName);
      },
      (scraped, total) => {
        this.progressFollowerFollowingTracker(scraped, total, followingProgressStateName);
      },
      this.stopAPICallCheck,
      this.maxFollowersScrapedMessage,
      isPayedUser
    );
    getFollowerFollowing.start();
  };

  onSubmit = (values) => {
    let userCount = 2 + this.return1OnNonNullElse0(values.userObj3) + this.return1OnNonNullElse0(values.userObj3);
    ReactGA.event({
      category: AnalyticsCategoryEnum.COMMON_USERS,
      action: `Get Common Users button pressed`,
      label: `Common users count - ${userCount}`
    });
    this.commonUsersState = 2;
    // userObj1 is {userObj: SearchUser, follower: true, following: false}
    this.setState({
      userObj1: values.userObj1,
      userObj2: values.userObj2,
      userObj3: values.userObj3,
      userObj4: values.userObj4,
      isUserSet: true
    });

    this.getFollowerFollowingForUser(values.userObj1, "user1Data", "followersProgressTracker1", "followingProgressTracker1");
    this.getFollowerFollowingForUser(values.userObj2, "user2Data", "followersProgressTracker2", "followingProgressTracker2");

    if (values.userObj3.userObj) {
      this.getFollowerFollowingForUser(values.userObj3, "user3Data", "followersProgressTracker3", "followingProgressTracker3");
    }

    if (values.userObj4.userObj) {
      this.getFollowerFollowingForUser(values.userObj4, "user4Data", "followersProgressTracker4", "followingProgressTracker4");
    }
  };


  render() {
    return (
      <div>
        <Prompt
          message="You will lose this data. You can open another tab also. Press Profile bud extension again"
          when={this.state.isUserSet}/>
        <CommonUsersForm onSubmit={this.onSubmit}/>
        {this.state.isUserSet ? <AttractiveMessageBox text="Get Emails for these users from Email Extractor Option"/> : <React.Fragment />}
        <MultiUserInstagramAnalyser
          isUserSet={this.state.isUserSet}
          userObj1={this.state.user1Data.userObj}
          userObj2={this.state.user2Data.userObj}
          userObj3={this.state.user3Data.userObj}
          userObj4={this.state.user4Data.userObj}
          followersProgressTracker1={this.state.followersProgressTracker1}
          followingProgressTracker1={this.state.followingProgressTracker1}
          followersProgressTracker2={this.state.followersProgressTracker2}
          followingProgressTracker2={this.state.followingProgressTracker2}
          followersProgressTracker3={this.state.followersProgressTracker3}
          followingProgressTracker3={this.state.followingProgressTracker3}
          followersProgressTracker4={this.state.followersProgressTracker4}
          followingProgressTracker4={this.state.followingProgressTracker4}
        />
        <MultiUserManager
          isUserSet={this.state.isUserSet}
          location={this.props.location}
          commonUsers={this.getData()}
          userObj1={this.state.user1Data.userObj}
          userObj2={this.state.user2Data.userObj}
          userObj3={this.state.user3Data.userObj}
          userObj4={this.state.user4Data.userObj}
          handleActions={this.props.handleActions}
        />
      </div>
    );
  }

  getData() {
    let data = [
      this.state.user1Data,
      this.state.user2Data
    ];
    if (this.state.user3Data.userObj) {
      data.push(this.state.user3Data);
    }
    if (this.state.user4Data.userObj) {
      data.push(this.state.user4Data);
    }
    return this.getCommonUsersFromAllFollowersFollowings(data);
  }

  // data is [{followers: [FollowerUser, FollowerUser, ..], following: [FollowerUser, FollowerUser, FollowerUser, ...], userObj: SearchUser}]
  getCommonUsersFromAllFollowersFollowings(data) {
    let users = [];
    for (let i = 0; i < data.length; i++) {
      let tempUsers = makeUserObjects(data[i].followers, data[i].following);
      for (let j = 0; j < tempUsers.length; j++) {
        tempUsers[j].setParent(data[i].userObj.username);
      }
      users = users.concat(tempUsers);
    }

    let commonUsers = [];
    let userCountDict = {};
    /*
    {
      'abhnv_rai': {
        'userObjects': [User, User, User],
        'count': 3
      },
      ...
    }
     */

    for (let i = 0; i < users.length; i++) {
      if (users[i].username in userCountDict) {
        userCountDict[users[i].username].count++;
        userCountDict[users[i].username].userObjects.push(users[i]);
      } else {
        userCountDict[users[i].username] = { "userObjects": [users[i]], "count": 1 };
      }
    }
    for (let key in userCountDict) {
      if (userCountDict[key].count >= this.commonUsersState) {
        let u = userCountDict[key].userObjects[0];
        let commonUser = new CommonUser(
          u.profileURL,
          u.username,
          u.fullName,
          u.id,
          u.isVerified
        );
        let commonUserObjects = userCountDict[key].userObjects;
        for (let i = 0; i < commonUserObjects.length; i++) {
          commonUser.addParent(
            commonUserObjects[i].parent,
            commonUserObjects[i].followedByViewer,
            commonUserObjects[i].subjectFollowsUser,
            commonUserObjects[i].userFollowsSubject
          );
        }
        commonUsers.push(commonUser);
      }
    }
    return commonUsers;
  }
}


export default props => (
  <AppContext.Consumer>
    {context => <CommonUsers context={context} {...props} />}
  </AppContext.Consumer>
);
