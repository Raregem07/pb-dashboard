import React from "react";
import AnalyticsMainPageHeading from "./analytics/AnalyticsMainPageHeading";
import AnalyticsMainPageCards from "./analytics/AnalyticsMainPageCards";
import { Breadcrumb, Button, Checkbox, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom";
import FeatureDetails from "../FeatureDetails";
// import YouTube from "react-youtube-embed";
import YouTubeEmbed from "../../common/components/YoutubeEmbed";
import SaveObject from "../../common/chrome/SaveObject";
import DatabaseKeys from "../../common/models/DatabaseKeys";
import GetOrSetValue from "../../common/store/GetOrSetValue";
import NeedHelp from "../../common/components/NeedHelp";
import NeedHelpEnum from "../../common/models/NeedHelpEnum";

class SelfOrOther extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    const data = this.props.data;
    return (
      <React.Fragment>
        <AnalyticsMainPageHeading
          colorCode1={FeatureDetails.ANALYTICS.SELF.COLOR_CODE}
          colorCode2={FeatureDetails.ANALYTICS.OTHER.COLOR_CODE}
          heading={data.SELF_OTHER_HEADING}
          headingText={FeatureDetails.ANALYTICS.HEADING_TEXT}
        />
        <br/>
        <Row>
          <Col span={24}>
            <div
              style={{
                marginLeft: "4%"
              }}
            >
              <Breadcrumb style={{ fontSize: "110%", fontWeight: "bold", cursor: "pointer" }}>
                <Breadcrumb.Item>
                  <Link className="link" to={`/`}>
                    Dashboard
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link className="link" to={`${data.CRUMB_1.ACTION}`}>
                    {data.CRUMB_1.NAME}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Self or any Other Account</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Col>
        </Row>
        <br/>
        <div>
          <AnalyticsMainPageCards
            selfAction={data.SELF_ACTION}
            otherAction={data.OTHER_ACTION}
            label={data.SELF_OTHER_HEADING}
          />
        </div>


      </React.Fragment>
    );
  }
}

export default SelfOrOther;
