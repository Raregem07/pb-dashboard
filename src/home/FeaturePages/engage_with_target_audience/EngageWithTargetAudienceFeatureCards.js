import React from "react";
import { Col, Row } from "antd";
import AnalyticsFeaturePageCard from "../analytics/AnalyticsFeaturePageCard";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../../../common/constants/AnalyticsCategoryEnum";
import { Link } from "react-router-dom";
import FeatureDetails from "../../FeatureDetails";

function EngageWithTargetAudienceFeatureCards(props) {
  const featuresDetails = FeatureDetails.PERFORM_ENGAGEMENT;

  let cardColor = featuresDetails.CARD_COLOR;
  const features = featuresDetails.FEATURES;

  return (
    <React.Fragment>
      <Row>
        <Col span={12} className="center">
          <Link
            className="link"
            to={`/engage_with_target_audience/tasks`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.ENGAGE_WITH_AUDIENCE,
                action: `Tasks Button clicked`
              });
            }}
          >
            <AnalyticsFeaturePageCard
              name={features.GET_TARGETED_LEADS.CARD_NAME}
              identifier={features.GET_TARGETED_LEADS.IDENTIFIER}
              backgroundColor={cardColor}
              cardBig={true}
              action={features.GET_TARGETED_LEADS.ACTION}
              isMostUsed={features.GET_TARGETED_LEADS.IS_MOST_USED}
            />
          </Link>
        </Col>

        <Col span={12} className="center">
          <AnalyticsFeaturePageCard
            backgroundColor={cardColor}
            name={features.COMMON_USERS.CARD_NAME}
            identifier={features.COMMON_USERS.IDENTIFIER}
            cardBig={true}
            action={features.COMMON_USERS.ACTION}
            isMostUsed={features.COMMON_USERS.IS_MOST_USED}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default EngageWithTargetAudienceFeatureCards;
