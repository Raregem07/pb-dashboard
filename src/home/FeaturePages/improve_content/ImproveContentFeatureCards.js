import React from "react";
import { Col, Row } from "antd";
import AnalyticsFeaturePageCard from "../analytics/AnalyticsFeaturePageCard";
import FeatureDetails from "../../FeatureDetails";

function ImproveContentFeatureCards(props) {
  const improveContentDetails = FeatureDetails.IMPROVE_CONTENT;
  let cardColor = improveContentDetails.CARD_COLOR;
  const features = improveContentDetails.FEATURES;

  return <React.Fragment>
    <Row>
      <Col span={8}>
        <AnalyticsFeaturePageCard
          name={features.GET_TRENDING_CONTENT.CARD_NAME}
          identifier={features.GET_TRENDING_CONTENT.IDENTIFIER}
          backgroundColor={cardColor}
          action={features.GET_TRENDING_CONTENT.ACTION}
          isMostUsed={features.GET_TRENDING_CONTENT.IS_MOST_USED}
        />
      </Col>
      <Col span={8}>
        <AnalyticsFeaturePageCard
          backgroundColor={cardColor}
          name={features.TRENDING_RELATED_HASHTAGS.CARD_NAME}
          identifier={features.TRENDING_RELATED_HASHTAGS.IDENTIFIER}
          action={features.TRENDING_RELATED_HASHTAGS.ACTION}
          isMostUsed={features.TRENDING_RELATED_HASHTAGS.IS_MOST_USED}
        />
      </Col>
      <Col span={8}>
        <AnalyticsFeaturePageCard
          backgroundColor={cardColor}
          name={features.GIVEAWAY_WINNER.CARD_NAME}
          identifier={features.GIVEAWAY_WINNER.IDENTIFIER}
          action={features.GIVEAWAY_WINNER.ACTION}
          isMostUsed={features.GIVEAWAY_WINNER.IS_MOST_USED}
        />
      </Col>
    </Row><br />
    <Row>
      <Col span={8}>
        <AnalyticsFeaturePageCard
          backgroundColor={cardColor}
          name={features.HEART_YOUR_IMAGE.CARD_NAME}
          identifier={features.HEART_YOUR_IMAGE.IDENTIFIER}
          action={features.HEART_YOUR_IMAGE.ACTION}
          isMostUsed={features.HEART_YOUR_IMAGE.IS_MOST_USED}
        />
      </Col>
      <Col span={8}>
        <AnalyticsFeaturePageCard
          backgroundColor={cardColor}
          name={features.SPLIT_IMAGE.CARD_NAME}
          identifier={features.SPLIT_IMAGE.IDENTIFIER}
          action={features.SPLIT_IMAGE.ACTION}
          isMostUsed={features.SPLIT_IMAGE.IS_MOST_USED}
        />
      </Col>
    </Row>

  </React.Fragment>
}

export default ImproveContentFeatureCards;
