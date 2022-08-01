import React from 'react';
import {getFollowers, getFollowing} from '../common/api_call/GetFollowerAndFollowing';

import {Progress} from "antd";
//import GraphQLUsernameFollowerFollowing from "../common/models/GraphQLUsernameFollowerFollowing";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import ProgressBar from "../common/components/ProgressBar";


class InstagramAnalyser extends React.Component {

  static getPercentage(progressTracker) {
    if (progressTracker.total === 0) {
      return 0;
    }
    return Math.ceil((progressTracker.scraped/progressTracker.total)*100)
  }

  render() {
    if (!this.props.isUserSet) {
      return <div />
    }

    let followerProgressTracker = this.props.followersProgressTracker;
    let followingProgressTracker = this.props.followingProgressTracker;
    let followerPercentage = InstagramAnalyser.getPercentage(followerProgressTracker);
    let followingPercentage = InstagramAnalyser.getPercentage(followingProgressTracker);
    if (followingPercentage >= 100 && followerPercentage >= 100) {
      return <React.Fragment />
    }
    return (
      <div style={{textAlign: 'center', margin: 10, padding: 10}}>
        {followerPercentage === 0  ? <div /> : <React.Fragment> Followers of <strong>{this.props.username}</strong> discovered so far for : {followerProgressTracker.scraped} / {followerProgressTracker.total} <Progress percent={followerPercentage} status="active"/> <br/></React.Fragment>}
        {followingPercentage === 0  ? <div /> : <React.Fragment> Followings of <strong>{this.props.username}</strong> discovered so far for : {followingProgressTracker.scraped} / {followingProgressTracker.total} <Progress percent={followingPercentage} status="active"/> </React.Fragment> }
      </div>);
  }
}

export default InstagramAnalyser;
