import React from "react";
import { Col, Divider, Row } from "antd";
import DashboardCard from "./DashboardCard";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import FeatureDetails from "../home/FeatureDetails";
import arrow from "../common/images/arrow.png"

function DashboardCards(props) {
  // const tier1Card = FeatureDetails.TIER_1.MAIN_CARD;
  const tier2Card = FeatureDetails.TIER_2.MAIN_CARD;
  const tier3Card = FeatureDetails.TIER_3.MAIN_CARD;

  return (
    <React.Fragment>
      <Row style={{ marginLeft: "2%", marginTop: "2%", marginRight: "2%"}} >
        <Col span={2} />
        <Col span={7}>
          <div className="steps-above-card">
            Step 1
          </div>
          <Link
            className="link"
            to={`${FeatureDetails.TIER_2.ACTION}`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.MAIN_DASHBOARD_OPTION_CHOSE,
                action: `analytics`
              });
            }}
          >
            <div style={{textAlign: "center"}}>

              <DashboardCard
                title={tier2Card.TITLE}
                background={tier2Card.BACKGROUND}
                features={tier2Card.FEATURES}
                img={tier2Card.img}
                infoBackground={tier2Card.INFO_BACKGROUND}
                info={tier2Card.INFO}
                key={"C1"}
                oneIcon={tier2Card.ONE_ICON_AND_POINTS}
              />
            </div>
          </Link>
        </Col>
        <Col span={6} style={{textAlign: "center"}}>
          <div style={{
            marginTop: "20vh",
          }}>
            <img src={arrow} height={"15%"} width={"15%"}  alt="arrow"/>
          </div>
          <div style={{
            marginTop: "12vh",
            textAlign: "center"
          }}>
            <img src={arrow} height={"15%"} width={"15%"}  alt="arrow"/>
          </div>
          <div style={{
            marginTop: "12vh",
          }}>
            <img src={arrow} height={"15%"} width={"15%"}  alt="arrow"/>
          </div>
        </Col>

        <Col span={7}>
          <div className="steps-above-card">
            Step 2
          </div>
          <Link
            className="link"
            to={`${FeatureDetails.TIER_3.ACTION}`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.MAIN_DASHBOARD_OPTION_CHOSE,
                action: `analytics`
              });
            }}
          >
            <div style={{textAlign: "center"}}>

              <DashboardCard
                title={tier3Card.TITLE}
                background={tier3Card.BACKGROUND}
                features={tier3Card.FEATURES}
                img={tier3Card.img}
                infoBackground={tier3Card.INFO_BACKGROUND}
                info={tier3Card.INFO}
                key={"C2"}
                oneIcon={tier3Card.ONE_ICON_AND_POINTS}
              />
            </div>
          </Link>
        </Col>
      </Row>
      <br />
    </React.Fragment>
  );
}

export default DashboardCards;
