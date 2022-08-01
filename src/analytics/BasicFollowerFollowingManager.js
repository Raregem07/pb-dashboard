import React from "react";
import { Card, Col, Icon, Row, Select } from "antd";
import UserDisplayWithActions from "./UserDisplayWithActions";

const { Option } = Select;

// BasicFollowerFollowingManager takes username, list of Users as data prop and
// a handleAction as prop. This Manager shows the users with the options of choosing the conditions
// such as youFollowSubject, subjectFollowsUser, userFollowsSubject. Here the subject refers to the
// individual users of in User model while user is the one whom we have queried to get the data while
// viewer is the person who has logged in the instagram account.
class BasicFollowerFollowingManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      youFollowSubject: "any"
    };
    this.handleFollowedByYou = this.handleFollowedByYou.bind(this);
    this.handleSubjectFollowsUser = this.handleSubjectFollowsUser.bind(this);
    this.handleUserFollowsSubject = this.handleUserFollowsSubject.bind(this);
  }

  handleFollowedByYou(value) {
    this.setState({
      youFollowSubject: value
    });
  }

  handleSubjectFollowsUser(value) {
    this.props.handleSubjectFollowsUser(value);
  }

  handleUserFollowsSubject(value) {
    this.props.handleUserFollowsSubject(value);
  }

  render() {
    return (
      <div>
        <UserDisplayWithActions
          data={this.conditionalData()}
          isDetailed={false}
          handleActions={this.props.handleActions}
          username={this.props.username}
          location={this.props.location}
          removeUsers={this.props.removeUsers}
          paginatedDownload={true}
        />
      </div>
    );
  }

  conditionalData() {
    let finalUsers = [];
    let j = 0;
    for (let i = 0; i < this.props.data.length; i++) {
      let u = this.props.data[i];
      if (
        u.checkFollowedByViewer(this.state.youFollowSubject) &&
        u.checkUserFollowsSubject(this.props.followerFollowingToShowSettings.userFollowsSubject) &&
        u.checkSubjectFollowsUser(this.props.followerFollowingToShowSettings.subjectFollowsUser)
      ) {
        u["key"] = j++;
        finalUsers.push(u);
      }
    }
    return finalUsers;
  }
}

export default BasicFollowerFollowingManager;
