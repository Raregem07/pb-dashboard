/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
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
      {/* <FeaturePageAnalyticsHeading
        backgroundColor={details.COLOR_CODE}
        text={details.FEATURE_PAGE_HEADING}
      /> */}
      {/*<FeaturePageAnalyticsNote*/}
      {/*  note={details.FEATURE_PAGE_NOTE}*/}
      {/*/>*/}
      <div sytle={{background:"#97c4c4"}}>
        <div style={{
            fontSize: 25,
            font: "Black 64px/77px Roboto",
            fontWeight: "bold",
            width: "100%",
            height: 121,
            backgroundImage: "linear-gradient(to right,  #0d98ba, #D6E865)",
            paddingLeft: 64,
            marginTop: 70
          }}>
            <h1 style={{color: "#FFFFFF"}}>Target Users</h1>
            <div
              style={{
                width: "93%",
                padding: "1px 13px",
                backgroundColor: "white",
                fontSize: "18px",
                boxShadow: "0px 3px 6px #00000029",
                color: "#707070"
              }}
            >
              <div>Description here...</div>
            </div>
          </div>

      <div style={{ marginLeft: "3%", marginTop: "1%" }}>
        <Breadcrumb style={{ fontSize: "110%", color:"black", fontWeight:"500" , cursor:"pointer"}}>
          <Breadcrumb.Item>
            <Link className="link" to={`/`}>
              Dashboard
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
      </div>
    </React.Fragment>;
  }

}

export default Tier2LandingPage;
