import React from "react";
import { Card, Col, Icon, InputNumber, Row, Select } from "antd";
import UserDisplayWithActions from "./UserDisplayWithActions";
import DetailedDataDownloader from "./DetailedDataDownloader";

const { Option } = Select;


class DetailedFollowerFollowingManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      youFollowSubject: "any",
      subjectFollowsViewer: "any",
      isBusinessAccount: "any",
      isPrivateAccount: "any",
      followersGreaterThan: 0,
      followingGreaterThan: 0,
      postsGreaterThan: 0,
      followingLessThan: 1000000000,
      followersLessThan: 1000000000,
      isEmailThere: "any",
      isWebsiteThere: "any"
    };
    this.handleFollowedByYou = this.handleFollowedByYou.bind(this);
    this.handleSubjectFollowsUser = this.handleSubjectFollowsUser.bind(this);
    this.handleUserFollowsSubject = this.handleUserFollowsSubject.bind(this);
    this.handleIsBusinessAccount = this.handleIsBusinessAccount.bind(this);
    this.handleFollowersGreaterThan = this.handleFollowersGreaterThan.bind(this);
    this.handleFollowingGreaterThan = this.handleFollowingGreaterThan.bind(this);
    this.handlePostsGreaterThan = this.handlePostsGreaterThan.bind(this);
    this.handleIsPrivateAccount = this.handleIsPrivateAccount.bind(this);
    this.handleFollowsByYou = this.handleFollowsByYou.bind(this);
    this.handleFollowingLessThan = this.handleFollowingLessThan.bind(this);
    this.handleFollowersLessThan = this.handleFollowersLessThan.bind(this);
  }

  render() {
    
    if (this.props.data.length === 0) {
      return <React.Fragment />
    }
    return (
      <div>
        <Card
          title={<div><Icon type="filter"/> &nbsp;&nbsp;&nbsp;Filters</div>}
          style={{ margin: 12, backgroundColor: "#fbfbfb", marginTop: 20 }}
        >
          <div style={{ padding: 5, backgroundColor: "#f5f5f5", marginTop: 5 }}>
            <Row style={{ marginBottom: 8, marginTop: 4 }}>
              <Col className="gutter-row" span={8}>
                Following greater than :
                <InputNumber min={0} max={10000000} defaultValue={0} onChange={this.handleFollowingGreaterThan}/>
              </Col>
              <Col className="gutter-row" span={8}>
                Posts greater than :
                <InputNumber min={0} max={10000000} defaultValue={0} onChange={this.handlePostsGreaterThan}/>
              </Col>
              <Col className="gutter-row" span={8}>
                Followers greater than :
                <InputNumber min={0} max={10000000} defaultValue={0} onChange={this.handleFollowersGreaterThan}/>
              </Col>

            </Row>
            <Row style={{ marginBottom: 4, marginTop: 4 }}>
              <Col className="gutter-row" span={8}>
                Is Private account :
                <Select defaultValue={this.state.isPrivateAccount}
                        onChange={this.handleIsPrivateAccount}>
                  <Option value="any">Any</Option>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Col>
              <Col className="gutter-row" span={8}>
                Is Email there:
                <Select defaultValue={this.state.isEmailThere}
                        onChange={this.handleIsEmailThere}>
                  <Option value="any">Any</Option>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Col>
              <Col className="gutter-row" span={8}>
                Followers less than :
                <InputNumber min={0} max={100000} defaultValue={100000} onChange={this.handleFollowersLessThan}/>
              </Col>

            </Row>
            <Row style={{ marginBottom: 4, marginTop: 4 }}>
              <Col className="gutter-row" span={8}>
                Is Website There :
                <Select defaultValue={this.state.isWebsiteThere}
                        onChange={this.handleIsWebsiteThere}>
                  <Option value="any">Any</Option>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Col>
              <Col className="gutter-row" span={8}>
                Is business account :
                <Select defaultValue={this.state.isBusinessAccount}
                        onChange={this.handleIsBusinessAccount}>
                  <Option value="any">Any</Option>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Col>
              <Col className="gutter-row" span={8}>
                Following less than :
                <InputNumber min={0} max={100000} defaultValue={100000} onChange={this.handleFollowingLessThan}/>
              </Col>
            </Row>
          </div>

          <div style={{ padding: 5, backgroundColor: "#f5f5f5", marginTop: 5, textAlign: "left" }}>
            <DetailedDataDownloader
              fieldsToDownload={this.props.fieldsToDownload}
              detailedData={this.props.data.map(u => {u["engagementRate"] = u.getEngagementRate(); return u})}
              conditionalData={this.conditionalData()}
              campaignName={this.props.campaignName}
              username={this.props.username}/>
          </div>
        </Card>

        <UserDisplayWithActions
          data={this.conditionalData().slice(0,1000)}
          isDetailed={true}
          handleActions={this.props.handleActions}
          location={this.props.location}
        />
      </div>
    );
  }

  conditionalData() {
    let users = this.props.data;
    let finalUsers = [];
    let j = 0;
    for (let i = 0; i < users.length; i++) {
      let u = users[i];
      if (
        u.isBusinessAccountCheck(this.state.isBusinessAccount) &&
        u.followerGreaterThan(this.state.followersGreaterThan) &&
        u.followingGreaterThan(this.state.followingGreaterThan) &&
        u.postsGreaterThanCheck(this.state.postsGreaterThan) &&
        u.isPrivateAccountCheck(this.state.isPrivateAccount) &&
        u.followerLessThan(this.state.followersLessThan) &&
        u.followingLessThan(this.state.followingLessThan) &&
        u.isEmailThere(this.state.isEmailThere) &&
        u.isWebsiteThere(this.state.isWebsiteThere)
      ) {
        u["key"] = j++;
        u["engagementRate"] = u.getEngagementRate();
        finalUsers.push(u);
      }
    }
    return finalUsers;
  }

  handleFollowedByYou(value) {
    this.setState({
      youFollowSubject: value
    });
  }

  handleFollowsByYou(value) {
    this.setState({
      subjectFollowsViewer: value
    });
  }

  handleSubjectFollowsUser(value) {
    this.props.handleSubjectFollowsUser(value);
  }

  handleUserFollowsSubject(value) {
    this.props.handleUserFollowsSubject(value);
  }

  handleIsBusinessAccount(value) {
    this.setState({
      isBusinessAccount: value
    });
  }

  handleFollowersGreaterThan(value) {
    this.setState({
      followersGreaterThan: value
    });
  }

  handleFollowingGreaterThan(value) {
    this.setState({
      followingGreaterThan: value
    });
  }

  handlePostsGreaterThan(value) {
    this.setState({
      postsGreaterThan: value
    });
  }

  handleIsPrivateAccount(value) {
    this.setState({
      isPrivateAccount: value
    });
  }

  handleIsEmailThere = (value) => {
    this.setState({
      isEmailThere: value
    });
  };

  handleIsWebsiteThere = (value) => {
    this.setState({
      isWebsiteThere: value
    });
  };

  handleFollowersLessThan(value) {
    // console.log(value);
    this.setState({
      followersLessThan: value
    });
  }

  handleFollowingLessThan(value) {
    this.setState({
      followingLessThan: value
    });
  }
}


export default DetailedFollowerFollowingManager;
