import React from 'react';
import { Row, Col, Card, Icon, Button, Checkbox } from "antd";
import InstagramSearch from "../common/components/InstagramSearch";
import SearchType from "../home/SearchType";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import { AppContext } from "../home/Home";
import I18 from "../common/chrome/I18";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import FollowerFollowingCheckbox from "./FollowerFollowingCheckbox";
import SendEvent from "../common/Helpers/SendEvent";


class CommonUsersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj1: null,
      userObj2: null,
      userObj3: null,
      userObj4: null,
      user1FollowerFollowing: {follower: true, following: true},
      user2FollowerFollowing: {follower: true, following: true},
      user3FollowerFollowing: {follower: true, following: true},
      user4FollowerFollowing: {follower: true, following: true}
    }
  }


  onUserSelected = (searchUser, stateName) => {
    this.setState({[stateName]: searchUser});
  };

  onSubmit = () => {
    let users = {
      userObj1: {userObj: this.state.userObj1, follower: this.state.user1FollowerFollowing.follower, following: this.state.user1FollowerFollowing.following},
      userObj2: {userObj: this.state.userObj2, follower: this.state.user2FollowerFollowing.follower, following: this.state.user2FollowerFollowing.following},
      userObj3: {userObj: this.state.userObj3, follower: this.state.user3FollowerFollowing.follower, following: this.state.user3FollowerFollowing.following},
      userObj4: {userObj: this.state.userObj4, follower: this.state.user4FollowerFollowing.follower, following: this.state.user4FollowerFollowing.following},
    };
    // console.log(this.state);

    this.props.onSubmit(users);
  };

  noPermissions = () => {
    sendNotification(NotificationTypeEnum.Failure, I18("engage_trial_over_message") , true)
  };

  onFollowerCheckChanged = (value, name) => {
    this.setState({[name]: {follower: value, following: this.state[name].following}});
  };

  onFollowingCheckChanged = (value, name) => {
    this.setState({[name]: {following: value, follower: this.state[name].follower}});
  };

  render() {
    return (
      <Card
        title={<Row>
          <Col span={1}>
            <Icon type="cluster" />
          </Col>
          <Col span={17}>
            Common Followers/Following between users to get similar taste people
          </Col>
          <Col span={5}>
            <NeedHelp type={NeedHelpEnum.COMMON_USERS} />
          </Col>
        </Row>
        }

        style={{margin: 4, backgroundColor: '#fbfbfb'}}
      >
        <Row gutter={24}>
          <Col span={16}>
            <strong>User 1 (Required) &nbsp;&nbsp;&nbsp; </strong>
            <InstagramSearch
              type={SearchType.USERS}
              onSelect={this.onUserSelected}
              placeholder="Enter Instagram Username here & Select from list"
              clearStateOnSelection={false}
              width="70%"
              name="userObj1"
              analyticsCategory={AnalyticsCategoryEnum.COMMON_USERS}
            />
          </Col>
          <Col span={8}>
            <FollowerFollowingCheckbox
              followersFollowingChecked={this.state.user1FollowerFollowing}
              onFollowerChanged={this.onFollowerCheckChanged}
              onFollowingChanged={this.onFollowingCheckChanged}
              name="user1FollowerFollowing"
            />
          </Col>
        </Row><br />
        <Row gutter={24}>
          <Col span={16}>
            <strong>User 2 (Required) &nbsp;&nbsp;&nbsp; </strong>
            <InstagramSearch
              type={SearchType.USERS}
              onSelect={this.onUserSelected}
              placeholder="Enter Instagram Username here & Select from the list"
              clearStateOnSelection={false}
              width="70%"
              name="userObj2"
              analyticsCategory={AnalyticsCategoryEnum.COMMON_USERS}
            />
          </Col>
          <Col span={8}>
            <FollowerFollowingCheckbox
              followersFollowingChecked={this.state.user2FollowerFollowing}
              onFollowerChanged={this.onFollowerCheckChanged}
              onFollowingChanged={this.onFollowingCheckChanged}
              name="user2FollowerFollowing"
            />
          </Col>
        </Row> <br />
        <Row gutter={24}>
          <Col span={16}>
            <strong>User 3 (Optional) &nbsp;&nbsp;&nbsp; </strong><InstagramSearch
              type={SearchType.USERS}
              onSelect={this.onUserSelected}
              placeholder="Enter Instagram Username here & Select from list"
              clearStateOnSelection={false}
              width="70%"
              name="userObj3"
              analyticsCategory={AnalyticsCategoryEnum.COMMON_USERS}
          />
          </Col>
          <Col span={8}>
            <FollowerFollowingCheckbox
              followersFollowingChecked={this.state.user3FollowerFollowing}
              onFollowerChanged={this.onFollowerCheckChanged}
              onFollowingChanged={this.onFollowingCheckChanged}
              name="user3FollowerFollowing"
            />
          </Col>
        </Row>
        <Row gutter={24}><br />
          <Col span={16}>
            <strong>User 4 (Optional) &nbsp;&nbsp;&nbsp; </strong><InstagramSearch
              type={SearchType.USERS}
              onSelect={this.onUserSelected}
              placeholder="Enter Instagram Username here & Select from list"
              clearStateOnSelection={false}
              width="70%"
              name="userObj4"
              analyticsCategory={AnalyticsCategoryEnum.COMMON_USERS}
          />
          </Col>
          <Col span={8}>
            <FollowerFollowingCheckbox
              followersFollowingChecked={this.state.user4FollowerFollowing}
              onFollowerChanged={this.onFollowerCheckChanged}
              onFollowingChanged={this.onFollowingCheckChanged}
              name="user4FollowerFollowing"
            />
          </Col>
        </Row>
        <div style={{textAlign: 'center', paddingTop: 16}}>
          <AppContext.Consumer>
            { value => {
              let permissions = value.permissions;
              let onButtonClick = this.onSubmit;
              if (!permissions.engage) {
                onButtonClick = this.noPermissions;
              }
              return <Button
                type="primary"
                disabled={!this.state.userObj1 || !this.state.userObj2}
                onClick={onButtonClick}
              >
                Submit
              </Button>
            }}

          </AppContext.Consumer>

        </div>
      </Card>
    );
  }
}

export default CommonUsersForm;
