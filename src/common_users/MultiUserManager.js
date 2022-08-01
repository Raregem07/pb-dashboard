import React from "react";
import { Card, Icon, Select } from "antd";
import FollowerFollowingSelect from "./FollowerFollowingSelect";
import UserDisplayWithActions from "../analytics/UserDisplayWithActions";

const { Option } = Select;


class MultiUserManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      youFollowSubject: "any",
      subjectFollowsUser1: "any",
      subjectFollowsUser2: "any",
      subjectFollowsUser3: "any",
      subjectFollowsUser4: "any",
      user1FollowsSubject: "any",
      user2FollowsSubject: "any",
      user3FollowsSubject: "any",
      user4FollowsSubject: "any"

    };
    this.handleFollowedByYou = this.handleFollowedByYou.bind(this);
    this.handleSubjectFollowsUser1 = this.handleSubjectFollowsUser1.bind(this);
    this.handleUser1FollowsSubject = this.handleUser1FollowsSubject.bind(this);
    this.handleSubjectFollowsUser2 = this.handleSubjectFollowsUser2.bind(this);
    this.handleUser2FollowsSubject = this.handleUser2FollowsSubject.bind(this);
    this.handleSubjectFollowsUser3 = this.handleSubjectFollowsUser3.bind(this);
    this.handleUser3FollowsSubject = this.handleUser3FollowsSubject.bind(this);
    this.handleSubjectFollowsUser4 = this.handleSubjectFollowsUser4.bind(this);
    this.handleUser4FollowsSubject = this.handleUser4FollowsSubject.bind(this);
  }

  handleFollowedByYou(value) {
    this.setState({
      youFollowSubject: value
    });
  }

  handleSubjectFollowsUser1(value) {
    this.setState({
      subjectFollowsUser1: value
    });
  }

  handleSubjectFollowsUser2(value) {
    this.setState({
      subjectFollowsUser2: value
    });
  }

  handleSubjectFollowsUser3(value) {
    this.setState({
      subjectFollowsUser3: value
    });
  }

  handleSubjectFollowsUser4(value) {
    this.setState({
      subjectFollowsUser4: value
    });
  }

  handleUser1FollowsSubject(value) {
    this.setState({
      user1FollowsSubject: value
    });
  }

  handleUser2FollowsSubject(value) {
    this.setState({
      user2FollowsSubject: value
    });
  }

  handleUser3FollowsSubject(value) {
    this.setState({
      user3FollowsSubject: value
    });
  }

  handleUser4FollowsSubject(value) {
    this.setState({
      user4FollowsSubject: value
    });
  }

  render() {
    if (!this.props.isUserSet) {
      return <div/>;
    }


    return (
      <React.Fragment>
        <Card
          title={<div><Icon type="setting"/> &nbsp;&nbsp;&nbsp; Choose the followers/following filters from here and
            perform actions which suit you the best</div>}
          style={{ margin: 4, backgroundColor: "#fbfbfb", paddingTop: 8, marginTop: 16 }}
        >
          <div style={{ textAlign: "center" }}>
            <strong>Followed by you:</strong>&nbsp;&nbsp;&nbsp;
            <Select defaultValue={this.state.youFollowSubject} style={{ width: 120 }}
                    onChange={this.handleFollowedByYou}>
              <Option value="any">Any</Option>
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
            <FollowerFollowingSelect
              userObj={this.props.userObj1}
              defaultValueSubjectFollowsUser={this.state.subjectFollowsUser1}
              defaultValueUserFollowsSubject={this.state.user1FollowsSubject}
              onSubjectFollowsUserChange={this.handleSubjectFollowsUser1}
              onUserFollowsSubjectChange={this.handleUser1FollowsSubject}
            />
            <FollowerFollowingSelect
              userObj={this.props.userObj2}
              defaultValueSubjectFollowsUser={this.state.subjectFollowsUser2}
              defaultValueUserFollowsSubject={this.state.user2FollowsSubject}
              onSubjectFollowsUserChange={this.handleSubjectFollowsUser2}
              onUserFollowsSubjectChange={this.handleUser2FollowsSubject}
            />
            <FollowerFollowingSelect
              userObj={this.props.userObj3}
              defaultValueSubjectFollowsUser={this.state.subjectFollowsUser3}
              defaultValueUserFollowsSubject={this.state.user3FollowsSubject}
              onSubjectFollowsUserChange={this.handleSubjectFollowsUser3}
              onUserFollowsSubjectChange={this.handleUser3FollowsSubject}
            />
            <FollowerFollowingSelect
              userObj={this.props.userObj4}
              defaultValueSubjectFollowsUser={this.state.subjectFollowsUser4}
              defaultValueUserFollowsSubject={this.state.user4FollowsSubject}
              onSubjectFollowsUserChange={this.handleSubjectFollowsUser4}
              onUserFollowsSubjectChange={this.handleUser4FollowsSubject}
            />
          </div>
        </Card>
        <br/>
        <UserDisplayWithActions
          data={this.conditionalData()}
          isDetailed={false}
          handleActions={this.props.handleActions}
          username="common_users_"
          location={this.props.location}
          paginatedDownload={false}
        />
      </React.Fragment>
    );
  }

  getUsername = (userObj) => {
    if (!userObj) {
      return null;
    }
    return userObj.username;
  };

  conditionalData() {
    let finalUsers = [];
    let j = 0;
    for (let i = 0; i < this.props.commonUsers.length; i++) {
      let u = this.props.commonUsers[i];
      if (
        u.checkFollowedByViewer(this.state.youFollowSubject) &&
        u.checkSubjectFollowsUser(this.state.subjectFollowsUser1, this.getUsername(this.props.userObj1)) &&
        u.checkSubjectFollowsUser(this.state.subjectFollowsUser2, this.getUsername(this.props.userObj2)) &&
        u.checkSubjectFollowsUser(this.state.subjectFollowsUser3, this.getUsername(this.props.userObj3)) &&
        u.checkSubjectFollowsUser(this.state.subjectFollowsUser4, this.getUsername(this.props.userObj4)) &&
        u.checkUserFollowsSubject(this.state.user1FollowsSubject, this.getUsername(this.props.userObj1)) &&
        u.checkUserFollowsSubject(this.state.user2FollowsSubject, this.getUsername(this.props.userObj2)) &&
        u.checkUserFollowsSubject(this.state.user3FollowsSubject, this.getUsername(this.props.userObj3)) &&
        u.checkUserFollowsSubject(this.state.user4FollowsSubject, this.getUsername(this.props.userObj4))
      ) {
        u["key"] = j++;
        finalUsers.push(u);
      }
    }
    return finalUsers;
  }

}

export default MultiUserManager;
