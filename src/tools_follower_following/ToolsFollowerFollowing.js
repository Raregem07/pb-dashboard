import React from "react";
import { Button, Card, Col, Divider, Icon, Row, Steps, Tooltip, Typography, Upload } from "antd";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import * as Papa from "papaparse";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import SendEvent from "../common/Helpers/SendEvent";
import DownloadAPI from "../common/DownloadAPI";
import FeatureDetails from "../home/FeatureDetails";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Step } = Steps;
const { Dragger } = Upload;

class ToolsFollowerFollowing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      followers: [],
      followings: []
    };
  }

  next = () => {
    this.setState({ current: this.state.current + 1 });
  };


  onStepCliked = (currentStep) => {
  };

  addFollowers = (result) => {
    let data = result.data.filter(d => d.Username.length > 0);
    this.setState({ followers: this.state.followers.concat(data) });
  };

  addFollowings = (result) => {
    let data = result.data.filter(d => d.Username.length > 0);
    this.setState({ followings: this.state.followings.concat(data) });
  };

  followersUploaded = (file) => {
    Papa.parse(file, {
      complete: this.addFollowers,
      header: true
    });
    return false;

  };

  followingUploaded = (file) => {
    Papa.parse(file, {
      complete: this.addFollowings,
      header: true
    });
    return false;
  };


  getAskIfTheyHaveFilesComponent = () => {
    if (this.state.current !== 0) {
      return <React.Fragment/>;
    }
    return <React.Fragment>
      <Card>
        <Title level={4}>How to get the files</Title>
        <ol>
          <li>Get the Followers and Following files of the user from <Link
            to={FeatureDetails.TIER_2_FEATURES.ANALYSE_FOLLOWER_FOLLOWING.OTHER_ACTION}
            className="attractive-box-text">here</Link></li>
          <li>Download the followers and following by entering the username and downloading the files</li>
        </ol>
      </Card>
      <br/>
      <Button type="primary" onClick={this.next}>Yes I Have the files for the user</Button>
    </React.Fragment>;
  };

  onGetAnalysisButtonPressed = () => {
    if (this.state.followers.length < 1) {
      sendNotification(NotificationTypeEnum.Failure, "No followers File uploaded or it is in wrong format");
      return;
    }
    if (this.state.followings.length < 1) {
      sendNotification(NotificationTypeEnum.Failure, "No followings File uploaded or it is in wrong format");
      return;
    }
    this.next();
  };

  getSubmitFilesComponent = () => {
    if (this.state.current !== 1) {
      return <React.Fragment/>;
    }
    return <React.Fragment>

      <h2>Upload Followers File(s) here</h2>
      <Dragger
        multiple={true}
        beforeUpload={this.followersUploaded}
        name="file"
      >
        <p className="ant-upload-drag-icon">
          <Icon type="inbox"/>
        </p>
        <p className="ant-upload-text">
          Click or drag followers file to this area to upload
        </p>
      </Dragger>

      <Divider/>
      <h2>Upload Following File(s) here</h2>
      <Dragger
        multiple={true}
        beforeUpload={this.followingUploaded}
        name="file"
      >
        <p className="ant-upload-drag-icon">
          <Icon type="inbox"/>
        </p>
        <p className="ant-upload-text">
          Click or drag Followings file to this area to upload
        </p>
      </Dragger>
      <br/>
      <Button onClick={this.onGetAnalysisButtonPressed}>Get Analysis</Button>


    </React.Fragment>;
  };

  getBratsFansAnalysisCount = () => {
    let users = {};
    this.state.followers.map(fo => {
      if (!users[fo.Username]) {
        users[fo.Username] = {
          mainUser: fo
        };
      }
      users[fo.Username]["follower"] = true;
    });
    this.state.followings.map(fw => {
      if (!users[fw.Username]) {
        users[fw.Username] = {
          mainUser: fw
        };
      }
      users[fw.Username]["following"] = true;
    });
    let brats = 0, fans = 0, mutual = 0;
    for (let u in users) {
      if (users[u]["follower"] && users[u]["following"]) {
        mutual += 1;
      } else if (users[u]["follower"]) {
        fans += 1;
      } else {
        brats += 1;
      }
    }
    return {
      fans: fans,
      brats: brats,
      mutual: mutual
    };
  };

  changeFollowerSettings = (type) => {
    let users = {};
    this.state.followers.map(fo => {
      if (!users[fo.Username]) {
        users[fo.Username] = {
          mainUser: fo
        };
      }
      users[fo.Username]["follower"] = true;
    });
    this.state.followings.map(fw => {
      if (!users[fw.Username]) {
        users[fw.Username] = {
          mainUser: fw
        };
      }
      users[fw.Username]["following"] = true;
    });
    let mutuals = [], fans = [], brats = [];
    for (let u in users) {
      if (users[u]["follower"] && users[u]["following"]) {
        mutuals.push(users[u]["mainUser"]);
      } else if (users[u]["follower"]) {
        fans.push(users[u]["mainUser"]);
      } else {
        brats.push(users[u]["mainUser"]);
      }
    }
    let columns = [
      { label: "Username", value: "Username" },
      { label: "FullName", value: "Fullname" },
      { label: "Instagram ID", value: "Instagram id" },
      { label: "Is Private", value: "Is Private" },
      { label: "Profile URL", value: "Profile URL" }
    ];
    if (type === "brats") {
      DownloadAPI(brats, columns, "brats");
    }
    if (type === "fans") {
      DownloadAPI(fans, columns, "fans");
    }
    if (type === "mutual") {
      DownloadAPI(mutuals, columns, "mutuals");
    }
  };

  getBratsFansAnalysis = () => {

    if (this.state.current !== 2) {
      return <React.Fragment/>;
    }
    return <React.Fragment>
      <Card
        title={
          <div>
            <Icon type="pie-chart"/> &nbsp;&nbsp;&nbsp;Follower - Following Analysis
          </div>
        }
        style={{ backgroundColor: "#fbfbfb" }}
      >
        <Row gutter={4}>
          <Col span={8}>
            <Card
              title={
                <span>Brats &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Tooltip title={`User follow them but they don't follow User back`}><Icon
                    type="question-circle-o"/></Tooltip></span>}
              style={{ backgroundColor: "#fafafa" }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32 }}>
                  {this.getBratsFansAnalysisCount().brats}
                  <br/>
                  <Button
                    onClick={() => {
                      SendEvent(AnalyticsCategoryEnum.ANALYSE_FOLLOWER_FOLLOWING, "Show brats button clicked", "");
                      this.changeFollowerSettings("brats");
                    }}
                  >
                    Download Brats
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title={
                <span>Fans &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Tooltip title={`They follow User but User doesn't follow them back`}><Icon type="question-circle-o"/></Tooltip></span>}
              style={{ backgroundColor: "#fafafa" }}
            >
              <div style={{ textAlign: "center" }}>

                <div style={{ fontSize: 32 }}>
                  {this.getBratsFansAnalysisCount().fans}
                  <br/>
                  <Button
                    onClick={() => {
                      SendEvent(AnalyticsCategoryEnum.ANALYSE_FOLLOWER_FOLLOWING, "Show fans button clicked", "");
                      this.changeFollowerSettings("fans");
                    }}
                  >
                    Download Fans
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title={
                <div>Mutual &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Tooltip title={`User follows them and they also follow User back`}><Icon
                    type="question-circle-o"/></Tooltip></div>}
              style={{ backgroundColor: "#fafafa" }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32 }}>
                  {this.getBratsFansAnalysisCount().mutual}
                  <br/>
                  <Button
                    onClick={() => {
                      SendEvent(AnalyticsCategoryEnum.ANALYSE_FOLLOWER_FOLLOWING, "Show mutuals button clicked", "");
                      this.changeFollowerSettings("mutual");
                    }}
                  >
                    Download Mutual
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>


      <br/>
      {/*<Table*/}
      {/*  expandedRowRender={record => (*/}
      {/*    <ExpandedRowShowDetailedUser username={record.username}/>*/}
      {/*  )}*/}
      {/*  pagination={{*/}
      {/*    pageSize: 500,*/}
      {/*    pageSizeOptions: ["50", "100", "500", "1000", "10000"],*/}
      {/*    showSizeChanger: true*/}
      {/*  }}*/}
      {/*  dataSource={this.props.data.slice(0,1000)}*/}
      {/*>*/}
      {/*  <Column*/}
      {/*    title="Profile Image"*/}
      {/*    dataIndex="profileURL"*/}
      {/*    key="profileURL"*/}
      {/*    render={(cell, row, index) => {*/}
      {/*      return <Avatar size={64} src={cell}/>;*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <Column title="Username" dataIndex="username" key="username"/>*/}
      {/*  <Column title="Full Name" dataIndex="fullName" key="fullName"/>*/}
      {/*</Table>*/}
    </React.Fragment>;
  };

  render() {
    const askIfTheyHaveFilesComponent = this.getAskIfTheyHaveFilesComponent();
    const submitFilesComponent = this.getSubmitFilesComponent();
    const bratsFansAnalysis = this.getBratsFansAnalysis();
    return <React.Fragment>
      <Card>
        <Title level={4}>Fans - They follow the User but User does not follow them back</Title><br/>
        <Title level={4}>Brats - User follows them but they do not follow the user back</Title>
      </Card>
      <div style={{
        margin: "1%"
      }}>
        <Steps
          direction="vertical"
          current={this.state.current}
          onChange={this.onStepCliked}
        >
          <Step title={<Title level={4}>Do you have the follower - following files for the user?</Title>}
                description={askIfTheyHaveFilesComponent}/>
          <Step title={<Title level={4}>Submit the files</Title>}
                description={submitFilesComponent}/>
          <Step title={<Title level={4}>Get Brats & Fan's Analysis</Title>} description={bratsFansAnalysis}/>
        </Steps>
      </div>

    </React.Fragment>;
  }


}

export default ToolsFollowerFollowing;
