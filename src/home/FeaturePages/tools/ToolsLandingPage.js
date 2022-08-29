import React from 'react';
import FeaturePageAnalyticsHeading from "../analytics/FeaturePageAnalyticsHeading";
import FeaturePageAnalyticsNote from "../analytics/FeaturePageAnalyticsNote";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
//import SelfFeaturePageAnalyticsCards from "../analytics/SelfFeaturePageAnalyticsCards";
import FeatureDetails from "../../FeatureDetails";
import ToolsFeatureCards from "./ToolsFeatureCards";

class ToolsLandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const details = FeatureDetails.TOOLS;

    return <React.Fragment>
      <FeaturePageAnalyticsHeading
        backgroundColor={details.COLOR_CODE}
        text={details.FEATURE_PAGE_HEADING}
      />
      <FeaturePageAnalyticsNote
        note={details.FEATURE_PAGE_NOTE}
      />

      <div style={{ marginLeft: "3%", marginTop: "4%" }}>
        <Breadcrumb style={{ fontSize: "150%", fontWeight: "bold", cursor: "pointer" }}>
          <Breadcrumb.Item>
            <Link className="link" to={`/`}>
              Dashboard
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Tools
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div style={{ marginTop: "5%", marginLeft: "2%", marginRight: "1.5%" }}>
        <ToolsFeatureCards/>
      </div>
    </React.Fragment>;
  }

}

export default ToolsLandingPage;
