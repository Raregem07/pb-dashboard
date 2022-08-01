import React from "react";
import { Col, Row } from "antd";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../../../common/constants/AnalyticsCategoryEnum";
import { Link } from "react-router-dom";
import AnalyticsMainPageCardSelf from "./AnalyticsMainPageCardSelf";
import AnalyticsMainPageCardOther from "./AnalyticsMainPageCardOther";
import FeatureDetails from "../../FeatureDetails";
import SendEvent from "../../../common/Helpers/SendEvent";

function AnalyticsMainPageCards(props) {
  return (
    <div className="center">
      <Row style={{ marginLeft: "3%", marginRight: "1%", textAlign: "center" }}>
        <Col span={12} style={{textAlign: "center"}}>
          <Link
            className="link"
            to={props.selfAction}
            onClick={() => {
              SendEvent(AnalyticsCategoryEnum.SELF_ACCOUNT, "Self", "")
            }}
          >
            <AnalyticsMainPageCardSelf
              name={FeatureDetails.ANALYTICS.SELF.TEXT}
              backgroundColor={FeatureDetails.ANALYTICS.SELF.COLOR_CODE}
            />
          </Link>
        </Col>
        <Col span={12} style={{textAlign: "center"}}>
          <Link
            className="link"
            to={props.otherAction}
            onClick={() => {
              SendEvent(AnalyticsCategoryEnum.OTHER_ACCOUNT, "Other", "")
            }}
          >
            <AnalyticsMainPageCardOther
              name={FeatureDetails.ANALYTICS.OTHER.TEXT}
              backgroundColor={FeatureDetails.ANALYTICS.OTHER.COLOR_CODE}
            />
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default AnalyticsMainPageCards;
