/* eslint-disable no-useless-constructor */
import React from 'react';
import FeaturePageAnalyticsHeading from "../analytics/FeaturePageAnalyticsHeading";
import FeaturePageAnalyticsNote from "../analytics/FeaturePageAnalyticsNote";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
//import SelfFeaturePageAnalyticsCards from "../analytics/SelfFeaturePageAnalyticsCards";
import FeatureDetails from "../../FeatureDetails";
import Tier1FeatureCards from "./Tier1FeatureCards";

class Tier1LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const details = FeatureDetails.TIER_1;

    return <React.Fragment>
      <FeaturePageAnalyticsHeading
        backgroundColor={details.COLOR_CODE}
        text={details.FEATURE_PAGE_HEADING}
      />
      <FeaturePageAnalyticsNote
        note={details.FEATURE_PAGE_NOTE}
      />

      <div style={{ marginLeft: "3%", marginTop: "2%" }}>
        <Breadcrumb style={{ fontSize: "110%", fontWeight: "bold"}}>
          <Breadcrumb.Item>
            <Link className="link" to={`/`}>
              Dashboard
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Analyse Account Reports
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div style={{ marginTop: "5%", marginLeft: "2%", marginRight: "1.5%" }}>
        <Tier1FeatureCards/>
      </div>
    </React.Fragment>;
  }

}

export default Tier1LandingPage;
