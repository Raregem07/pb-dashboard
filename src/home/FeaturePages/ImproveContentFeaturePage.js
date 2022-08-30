import React from "react";
import FeaturePageHeading from "./common/FeaturePageHeading";
import FeaturePageAnalyticsNote from "./analytics/FeaturePageAnalyticsNote";
import { Breadcrumb, Button, Checkbox, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom";
import ImproveContentFeatureCards from "./improve_content/ImproveContentFeatureCards";
import FeatureDetails from "../FeatureDetails";
import YouTubeEmbed from "../../common/components/YoutubeEmbed";
import GetOrSetValue from "../../common/store/GetOrSetValue";
import DatabaseKeys from "../../common/models/DatabaseKeys";
import SaveObject from "../../common/chrome/SaveObject";
import NeedHelp from "../../common/components/NeedHelp";
import NeedHelpEnum from "../../common/models/NeedHelpEnum";

class ImproveContentFeaturePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      videoVisible: false,
      neverShowAgain: true,
    };
  }

  async componentDidMount() {
    let videoShown = await GetOrSetValue(DatabaseKeys.IMPROVE_CONTENT_VIDEO, false);
    if (!videoShown) {
      this.setState({videoVisible: true});
    }
  }

  onNeverShowChange = e => {
    let neverShowAgain = e.target.checked;
    this.setState({neverShowAgain});
  };

  handleOk = async e => {
    await SaveObject(DatabaseKeys.IMPROVE_CONTENT_VIDEO, this.state.neverShowAgain);
    this.setState({
      videoVisible: false
    });
  };

  handleCancel = async e => {
    await SaveObject(DatabaseKeys.IMPROVE_CONTENT_VIDEO, this.state.neverShowAgain);
    this.setState({
      videoVisible: false
    });
  };

  render() {
    const improveContentDetails = FeatureDetails.IMPROVE_CONTENT;

    return (
      <React.Fragment>
        {/* HERO */}
        <FeaturePageHeading
          backgroundImage={`linear-gradient(to right, ${improveContentDetails.COLOR_CODE_2} , ${improveContentDetails.COLOR_CODE})`}
          text={improveContentDetails.FEATURE_PAGE_HEADING}
        />
        <FeaturePageAnalyticsNote
          note={improveContentDetails.FEATURE_PAGE_NOTE}
        />

        <Row>
          <Col span={14}>
            <div
              style={{
                marginLeft: "4%", marginTop: "1.5%"
              }}
            >
              <Breadcrumb style={{ fontSize: "110%", fontWeight: "bold"}}>
                <Breadcrumb.Item>
                  <Link className="link" to={`/`}>
                    Dashboard
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Improve your Content</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Col>
          <Col span={10}>
            <div style={{ paddingTop: "2%" }}>
              <NeedHelp type={NeedHelpEnum.EXPLAINER_IMPROVE_CONTENT} explainer={true}/>
            </div>
          </Col>
        </Row>
        <div style={{ marginTop: 16, marginLeft: 16 }}>
          <ImproveContentFeatureCards />
        </div>

        <Modal
          title={"1 min Explainer Video on how ProfileBuddy can help you improve your Post"}
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
          {this.state.videoVisible ? <YouTubeEmbed autoplay={true} id={"h2w05kT4358"} /> : <div />}
        </Modal>

      </React.Fragment>
    );
  }

}

export default ImproveContentFeaturePage;
