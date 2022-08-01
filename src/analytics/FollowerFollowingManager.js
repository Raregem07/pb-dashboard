import React from 'react';
import BasicFollowerFollowingManager from './BasicFollowerFollowingManager';
import DetailedFollowerFollowingManager from './DetailedFollowerFollowingManager';
import makeUserObjects from "../common/MakeUserObjectForFollowerFollowing";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";


class FollowerFollowingManager extends React.Component {

  constructor(props) {
    super(props);
    this.users = []
  }

  removeRemovedUsers = () => {
    let followers = this.props.data.followers;
    let followings = this.props.data.following;

    let followerFollowingMap = {};
    followers.map(f => {
      followerFollowingMap[f.username] = true;
    });
    followings.map(f => {
      followerFollowingMap[f.username] = true;
    });

    let newUsers = [];

    for (let i=0;i<this.users.length;i++) {
      if (followerFollowingMap[this.users[i].username]) {
        newUsers.push(this.users[i]);
      }
    }
    this.users = newUsers;
  };


  render() {
    if (!this.props.isUserSet) {
      return <div />
    }
    this.removeRemovedUsers();
    this.users = makeUserObjects(this.props.data.followers, this.props.data.following, this.users);
    return <BasicFollowerFollowingManager
      location={this.props.location}
      data={this.users}
      username={this.props.username}
      handleActions={this.props.handleActions}
      followerFollowingToShowSettings={this.props.followerFollowingToShowSettings}
      handleUserFollowsSubject={this.props.handleUserFollowsSubject}
      handleSubjectFollowsUser={this.props.handleSubjectFollowsUser}
      removeUsers={this.props.removeUsers}
    />
  }
}

export default FollowerFollowingManager;
