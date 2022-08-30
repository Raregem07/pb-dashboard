import React from "react";
import FeaturePageAnalyticsNote from "./analytics/FeaturePageAnalyticsNote";
import { Breadcrumb, Button, Checkbox, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom";
import FeaturePageHeading from "./common/FeaturePageHeading";
import EngageWithTargetAudienceFeatureCards from "./engage_with_target_audience/EngageWithTargetAudienceFeatureCards";
import FeatureDetails from "../FeatureDetails";
import GetOrSetValue from "../../common/store/GetOrSetValue";
import DatabaseKeys from "../../common/models/DatabaseKeys";
import DateInReadableFormat from "../../common/Helpers/DateInReadableFormat";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import getMainUser from "../../common/chrome/GetMainUser";
import SendMessage from "../../common/chrome/SendMessage";
import YouTubeEmbed from "../../common/components/YoutubeEmbed";
import SaveObject from "../../common/chrome/SaveObject";
import NeedHelp from "../../common/components/NeedHelp";
import NeedHelpEnum from "../../common/models/NeedHelpEnum";

class EngageWithTargetAudienceFeaturePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      username: "",
      videoVisible: false,
      neverShowAgain: true,
    };
  }

  async componentDidMount() {

    let videoShown = await GetOrSetValue(DatabaseKeys.ENGAGEMENT_VIDEO, false);
    if (!videoShown) {
      this.setState({videoVisible: true});
    }

    let mainUser = await getMainUser();
    await SendMessage("startBackgroundScrape");
    let usersDataObj = await GetOrSetValue(DatabaseKeys.USERS_DATA, {});
    let selectedUserData = usersDataObj[mainUser.viewer.username];
    this.setState({ userData: selectedUserData, username: mainUser.viewer.username });
  }

  getData() {
    let i = 0;
    return this.state.userData.map(u => {
      u["dateTime"] = DateInReadableFormat(u.timeCaptured);
      u["key"] = i++;
      return u;
    });
  }

  onNeverShowChange = e => {
    let neverShowAgain = e.target.checked;
    this.setState({neverShowAgain});
  };

  handleOk = async e => {
    await SaveObject(DatabaseKeys.ENGAGEMENT_VIDEO, this.state.neverShowAgain);
    this.setState({
      videoVisible: false
    });
  };

  handleCancel = async e => {
    await SaveObject(DatabaseKeys.ENGAGEMENT_VIDEO, this.state.neverShowAgain);
    this.setState({
      videoVisible: false
    });
  };


  render() {
    const engagementFeatures = FeatureDetails.PERFORM_ENGAGEMENT;

    return <React.Fragment>
      <FeaturePageHeading
        backgroundImage={`linear-gradient(to right, ${engagementFeatures.COLOR_CODE_2} , ${engagementFeatures.COLOR_CODE})`}
        text={engagementFeatures.FEATURE_PAGE_HEADING}
      />
      <FeaturePageAnalyticsNote
        note={engagementFeatures.FEATURE_PAGE_NOTE}
      />

      <Row>
        <Col span={16}>
          <div style={{ marginLeft: 32, marginTop: "1.5%" }}>
            <Breadcrumb style={{ fontSize: 20, fontWeight: "bold"}}>
              <Breadcrumb.Item>
                <Link className="link" to={`/`}>
                  Dashboard
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Engage with your Audience
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Col>
        <Col span={8}>
          <div style={{ marginLeft: 32, marginTop: "1.5%", paddingTop: "1.5%" }}>
            <NeedHelp type={NeedHelpEnum.EXPLAINER_ENGAGE} explainer={true} />
          </div>
        </Col>
      </Row>



      <div style={{ marginTop: "1.5%", marginLeft: 32 }}>
        <EngageWithTargetAudienceFeatureCards/>
      </div>
      <br />
      <div style={{ paddingTop: 16, margin: 16, backgroundColor: "#FFF" }}>
        <LineChart
          width={700}
          height={200}
          data={this.getData()}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="dateTime"/>
          <YAxis domain={['dataMax - 5', 'dataMax']}/>
          <Tooltip/>
          <Legend/>
          <Line type="monotone" dataKey="followerCount" stroke="#82ca9d"/>
        </LineChart>
      </div>

      <Modal
        title={"1 min Explainer video for how to increase your followers by using ProfileBuddy"}
        visible={this.state.videoVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={"60%"}
        footer={[
          <Row key="video_footer">
            {
              <Col span={8} style={{ textAlign: "left" }}>
                Never Show Again: <Checkbox checked={this.state.neverShowAgain} onChange={this.onNeverShowChange} />
              </Col>
            }
            <Col span={10} />
            <Col span={6} style={{ textAlign: "right" }}>
              <Button key="submit" type="primary" onClick={this.handleOk}>
                Ok
              </Button>
            </Col>
          </Row>
        ]}
      >
        {this.state.videoVisible ? <YouTubeEmbed autoplay={true} id={"6XlpR8iEoXU"} /> : <div />}
      </Modal>
    </React.Fragment>;
  }
}

export default EngageWithTargetAudienceFeaturePage;
