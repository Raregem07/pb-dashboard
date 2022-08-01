import React from 'react';
import {Spin, Card} from 'antd';
import getDetailedUserObjectFromUsername from "../common/api_call/GetDetailedUserObjectFromUsername";

class ExpandedRowShowDetailedUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: null
    }
  }

  async componentDidMount() {
    let user = await getDetailedUserObjectFromUsername(this.props.username);
    this.setState({user: user, isLoading: false});
  }

  static trueOrFalse(obj) {
    if (obj) {
      return "True";
    }
    return "False";
  }

  render() {
    if (this.state.isLoading) {
      return <Spin size="large" />
    }
    return (
      <Card>
        <strong>Followers</strong> Count: {this.state.user.followerCount}<br />
        <strong>Following Count</strong>: {this.state.user.followingCount}<br />
        <strong>Biography</strong>: {this.state.user.biography}<br />
        <strong>Follows You</strong>: {ExpandedRowShowDetailedUser.trueOrFalse(this.state.user.followsViewer)}<br />
        <strong>You follow the user</strong>: {ExpandedRowShowDetailedUser.trueOrFalse(this.state.user.followedByViewer)}<br />
        <strong>Is Business Account</strong>: {ExpandedRowShowDetailedUser.trueOrFalse(this.state.user.isBusinessAccount)}<br />
        <strong>Is Private Account</strong>: {ExpandedRowShowDetailedUser.trueOrFalse(this.state.user.isPrivate)} <br />
        <strong>URL/Website</strong>: {this.state.user.externalURL} <br />
        <strong>Mutual Connections Count</strong>: {this.state.user.mutualConnectionCount} <br />
        <strong>Post Count</strong>: {this.state.user.postCount} <br />
        <strong>Business Category Name</strong>: {this.state.user.businessCategoryName} <br />
        <strong>Profile Pic HD Url</strong>: {this.state.user.profilePicURLHD}
      </Card>
    );
  }
}

export default ExpandedRowShowDetailedUser;