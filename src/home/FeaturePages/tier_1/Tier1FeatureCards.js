import React from 'react';
import { Col, Row } from "antd";
import AnalyticsFeaturePageCard from "../analytics/AnalyticsFeaturePageCard";
import FeatureDetails from "../../FeatureDetails";

function Tier1FeatureCards(props) {
  const features = FeatureDetails.TIER_1_FEATURES;
  return <React.Fragment>
    <Row>
      <Col span={8}>
        <AnalyticsFeaturePageCard
          name={features.ANALYSE_USER.CARD_NAME}
          identifier={features.ANALYSE_USER.IDENTIFIER}
          isMostUsed={features.ANALYSE_USER.IS_MOST_USED}
          backgroundColor={features.ANALYSE_USER.CARD_COLOR}
          action={features.ANALYSE_USER.ACTION}
        />
      </Col>
      <Col span={8}>
        <AnalyticsFeaturePageCard
          backgroundColor={features.USER_POST_ANALYTICS.CARD_COLOR}
          name={features.USER_POST_ANALYTICS.CARD_NAME}
          identifier={features.USER_POST_ANALYTICS.IDENTIFIER}
          isMostUsed={features.USER_POST_ANALYTICS.IS_MOST_USED}
          action={features.USER_POST_ANALYTICS.ACTION}
        />
      </Col>
      <Col span={8}>
        <AnalyticsFeaturePageCard
          backgroundColor={features.GIVEAWAY_WINNER.CARD_COLOR}
          name={features.GIVEAWAY_WINNER.CARD_NAME}
          identifier={features.GIVEAWAY_WINNER.IDENTIFIER}
          action={features.GIVEAWAY_WINNER.ACTION}
          isMostUsed={features.GIVEAWAY_WINNER.IS_MOST_USED}
        />
      </Col>
    </Row>

  </React.Fragment>
}

export default Tier1FeatureCards;
