import React from 'react';
import { Col, Row } from "antd";
import AnalyticsFeaturePageCard from "../analytics/AnalyticsFeaturePageCard";
import FeatureDetails from "../../FeatureDetails";

function ToolsFeatureCards(props) {
  const features = FeatureDetails.TOOLS_FEATURES;
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
          name={features.TRENDING_RELATED_HASHTAGS.CARD_NAME}
          identifier={features.TRENDING_RELATED_HASHTAGS.IDENTIFIER}
          isMostUsed={features.TRENDING_RELATED_HASHTAGS.IS_MOST_USED}
          backgroundColor={features.TRENDING_RELATED_HASHTAGS.CARD_COLOR}
          action={features.TRENDING_RELATED_HASHTAGS.ACTION}
        />
      </Col>

      <Col span={8}>
        <AnalyticsFeaturePageCard
          backgroundColor={features.SPLIT_IMAGE.CARD_COLOR}
          name={features.SPLIT_IMAGE.CARD_NAME}
          identifier={features.SPLIT_IMAGE.IDENTIFIER}
          action={features.SPLIT_IMAGE.ACTION}
          isMostUsed={features.SPLIT_IMAGE.IS_MOST_USED}
        />
      </Col>
    </Row><br />
    <Row>
      <Col span={8}>
        <AnalyticsFeaturePageCard
          name={features.HEART_YOUR_IMAGE.CARD_NAME}
          identifier={features.HEART_YOUR_IMAGE.IDENTIFIER}
          isMostUsed={features.HEART_YOUR_IMAGE.IS_MOST_USED}
          backgroundColor={features.HEART_YOUR_IMAGE.CARD_COLOR}
          action={features.HEART_YOUR_IMAGE.ACTION}
        />
      </Col>
      <Col span={8}>
        <AnalyticsFeaturePageCard
          backgroundColor={features.FOLLOWER_FOLLOWING_SEGREGATOR.CARD_COLOR}
          name={features.FOLLOWER_FOLLOWING_SEGREGATOR.CARD_NAME}
          identifier={features.FOLLOWER_FOLLOWING_SEGREGATOR.IDENTIFIER}
          isMostUsed={features.FOLLOWER_FOLLOWING_SEGREGATOR.IS_MOST_USED}
          action={features.FOLLOWER_FOLLOWING_SEGREGATOR.ACTION}
        />
      </Col>

      <Col span={8}>
        <AnalyticsFeaturePageCard
          name={features.USER_POST_ANALYTICS.CARD_NAME}
          identifier={features.USER_POST_ANALYTICS.IDENTIFIER}
          isMostUsed={features.USER_POST_ANALYTICS.IS_MOST_USED}
          backgroundColor={features.USER_POST_ANALYTICS.CARD_COLOR}
          action={features.USER_POST_ANALYTICS.ACTION}
        />
      </Col>
    </Row><br />
    <Row>
      <Col span={8}>
        <AnalyticsFeaturePageCard
          backgroundColor={features.GET_TRENDING_CONTENT.CARD_COLOR}
          name={features.GET_TRENDING_CONTENT.CARD_NAME}
          identifier={features.GET_TRENDING_CONTENT.IDENTIFIER}
          isMostUsed={features.GET_TRENDING_CONTENT.IS_MOST_USED}
          action={features.GET_TRENDING_CONTENT.ACTION}
        />
      </Col>
      <Col span={8}>
        <AnalyticsFeaturePageCard
          name={features.GIVEAWAY_WINNER.CARD_NAME}
          identifier={features.GIVEAWAY_WINNER.IDENTIFIER}
          isMostUsed={features.GIVEAWAY_WINNER.IS_MOST_USED}
          backgroundColor={features.GIVEAWAY_WINNER.CARD_COLOR}
          action={features.GIVEAWAY_WINNER.ACTION}
        />
      </Col>
    </Row>

  </React.Fragment>
}

export default ToolsFeatureCards;
