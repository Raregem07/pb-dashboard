import React from 'react';
import { Col, Row } from "antd";
import AnalyticsFeaturePageCard from "../analytics/AnalyticsFeaturePageCard";
import FeatureDetails from "../../FeatureDetails";

function Tier2FeatureCards(props) {
  const features = FeatureDetails.TIER_2_FEATURES;
  return <React.Fragment>
    {/* <Row>
      <Col span={1} />

      <Col span={10}>
        <AnalyticsFeaturePageCard
          name={features.ANALYSE_FOLLOWER_FOLLOWING.CARD_NAME}
          identifier={features.ANALYSE_FOLLOWER_FOLLOWING.IDENTIFIER}
          isMostUsed={features.ANALYSE_FOLLOWER_FOLLOWING.IS_MOST_USED}
          backgroundColor={features.ANALYSE_FOLLOWER_FOLLOWING.CARD_COLOR}
          action={features.ANALYSE_FOLLOWER_FOLLOWING.ACTION}
        />
      </Col>

      <Col span={2} />

      <Col span={10}>
        <AnalyticsFeaturePageCard
          backgroundColor={features.POST_LIKER_COMMENTER.CARD_COLOR}
          name={features.POST_LIKER_COMMENTER.CARD_NAME}
          identifier={features.POST_LIKER_COMMENTER.IDENTIFIER}
          action={features.POST_LIKER_COMMENTER.ACTION}
          isMostUsed={features.POST_LIKER_COMMENTER.IS_MOST_USED}
        />
      </Col>
    </Row><br />
    <Row>
      <Col span={1} />

      <Col span={10}>
        <AnalyticsFeaturePageCard
          name={features.HASHTAG.CARD_NAME}
          identifier={features.HASHTAG.IDENTIFIER}
          isMostUsed={features.HASHTAG.IS_MOST_USED}
          backgroundColor={features.HASHTAG.CARD_COLOR}
          action={features.HASHTAG.ACTION}
        />
      </Col>
      <Col span={2} />

      <Col span={10}>
        <AnalyticsFeaturePageCard
          name={features.SIMILAR_ACCOUNT.CARD_NAME}
          identifier={features.SIMILAR_ACCOUNT.IDENTIFIER}
          isMostUsed={features.SIMILAR_ACCOUNT.IS_MOST_USED}
          backgroundColor={features.SIMILAR_ACCOUNT.CARD_COLOR}
          action={features.SIMILAR_ACCOUNT.ACTION}
        />

      </Col>


    </Row>
    <br />

    <Row>
      <Col span={1} />
      <Col span={10}>
        <AnalyticsFeaturePageCard
          backgroundColor={features.LOCATION.CARD_COLOR}
          name={features.LOCATION.CARD_NAME}
          identifier={features.LOCATION.IDENTIFIER}
          isMostUsed={features.LOCATION.IS_MOST_USED}
          action={features.LOCATION.ACTION}
        />
      </Col>
    </Row> */}

    <div className='gridWrapper'>
      <div className='row-1'>
        <div>
          <AnalyticsFeaturePageCard
              name={features.ANALYSE_FOLLOWER_FOLLOWING.CARD_NAME}
              identifier={features.ANALYSE_FOLLOWER_FOLLOWING.IDENTIFIER}
              isMostUsed={features.ANALYSE_FOLLOWER_FOLLOWING.IS_MOST_USED}
              backgroundColor={features.ANALYSE_FOLLOWER_FOLLOWING.CARD_COLOR}
              action={features.ANALYSE_FOLLOWER_FOLLOWING.ACTION}
            />
        </div>
        <div>
          <AnalyticsFeaturePageCard
              backgroundColor={features.POST_LIKER_COMMENTER.CARD_COLOR}
              name={features.POST_LIKER_COMMENTER.CARD_NAME}
              identifier={features.POST_LIKER_COMMENTER.IDENTIFIER}
              action={features.POST_LIKER_COMMENTER.ACTION}
              isMostUsed={features.POST_LIKER_COMMENTER.IS_MOST_USED}
            />
        </div>
        <div>
          <AnalyticsFeaturePageCard
              name={features.HASHTAG.CARD_NAME}
              identifier={features.HASHTAG.IDENTIFIER}
              isMostUsed={features.HASHTAG.IS_MOST_USED}
              backgroundColor={features.HASHTAG.CARD_COLOR}
              action={features.HASHTAG.ACTION}
            />
        </div>
      </div>
      <div className='row-2'>
        <div></div>
        <div>
          <AnalyticsFeaturePageCard
              name={features.SIMILAR_ACCOUNT.CARD_NAME}
              identifier={features.SIMILAR_ACCOUNT.IDENTIFIER}
              isMostUsed={features.SIMILAR_ACCOUNT.IS_MOST_USED}
              backgroundColor={features.SIMILAR_ACCOUNT.CARD_COLOR}
              action={features.SIMILAR_ACCOUNT.ACTION}
            />
        </div>
        <div>
          <AnalyticsFeaturePageCard
              backgroundColor={features.LOCATION.CARD_COLOR}
              name={features.LOCATION.CARD_NAME}
              identifier={features.LOCATION.IDENTIFIER}
              isMostUsed={features.LOCATION.IS_MOST_USED}
              action={features.LOCATION.ACTION}
            />
        </div>
        <div></div>
      </div>
      
      
    </div>
    <style jsx>{`
      .gridWrapper {
        width: 100%;
        margin: 0 auto;
        grid-gap: 30px;
        margin-top: 40px;
        padding: 20px 20px 50px;
      }

      .row-1 {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
      }

      .row-2 {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 2fr 2fr 1fr;
        align-items: center;
        padding-top: 25px;
      }
      
    `}</style>

  </React.Fragment>
}

export default Tier2FeatureCards;
