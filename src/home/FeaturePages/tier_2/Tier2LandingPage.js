import React from 'react';
import FeaturePageAnalyticsHeading from "../analytics/FeaturePageAnalyticsHeading";
import FeaturePageAnalyticsNote from "../analytics/FeaturePageAnalyticsNote";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
//import SelfFeaturePageAnalyticsCards from "../analytics/SelfFeaturePageAnalyticsCards";
import FeatureDetails from "../../FeatureDetails";
import Tier2FeatureCards from "./Tier2FeatureCards";

class Tier2LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const details = FeatureDetails.TIER_2;

    return <React.Fragment>
      <FeaturePageAnalyticsHeading
        backgroundColor={details.COLOR_CODE}
        text={details.FEATURE_PAGE_HEADING}
      />
      {/*<FeaturePageAnalyticsNote*/}
      {/*  note={details.FEATURE_PAGE_NOTE}*/}
      {/*/>*/}

      <div style={{ marginLeft: "3%", marginTop: "1%" }}>
        <Breadcrumb style={{ fontSize: "150%", fontWeight: "bold" }}>
          <Breadcrumb.Item>
            <Link className="link" to={`/`}>
              Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Target Users
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div style={{ marginTop: "2%", marginLeft: "2%", marginRight: "1.5%" }}>
        <Tier2FeatureCards/>
      </div>
    </React.Fragment>;
  }

}

export default Tier2LandingPage;
