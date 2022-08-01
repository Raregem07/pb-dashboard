import FeatureDetails from "../../FeatureDetails";
import React from "react";
import { Col, Row } from "antd";
import AnalyticsFeaturePageCard from "../analytics/AnalyticsFeaturePageCard";

function TargetLeadsFeatureCards(props) {
  const featuresDetails =
    FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS.TARGETED_LEADS;

  let cardColor = featuresDetails.CARD_COLOR;
  const features = featuresDetails.FEATURES;

  return (
    <React.Fragment>
      <Row>
        <Col span={8} className="center">
          <div>
            <div style={{
              textAlign: "left",
              marginLeft: 17,
              font: "Black 23px/28px Roboto",
              fontWeight: "bold",
              fontSize: 18
            }}>
              Step 1
            </div>
            <AnalyticsFeaturePageCard
              name={features.SET_CONFIGURATIONS.CARD_NAME}
              identifier={features.SET_CONFIGURATIONS.IDENTIFIER}
              backgroundColor={cardColor}
              action={features.SET_CONFIGURATIONS.ACTION}
              isMostUsed={features.SET_CONFIGURATIONS.IS_MOST_USED}
            />
          </div>
        </Col>

        <Col span={8} className="center">
          <div>
            <div style={{
              textAlign: "left",
              marginLeft: 17,
              font: "Black 23px/28px Roboto",
              fontWeight: "bold",
              fontSize: 18
            }}>
              Step 2
            </div>
            <AnalyticsFeaturePageCard
              backgroundColor={cardColor}
              name={features.TASKS_TO_COMPLETES.CARD_NAME}
              identifier={features.TASKS_TO_COMPLETES.IDENTIFIER}
              action={features.TASKS_TO_COMPLETES.ACTION}
              isMostUsed={features.TASKS_TO_COMPLETES.IS_MOST_USED}
            />
          </div>
        </Col>
        <Col span={8} className="center">
          <div>
            <div style={{
              textAlign: "left",
              marginLeft: 17,
              font: "Black 23px/28px Roboto",
              fontWeight: "bold",
              fontSize: 18
            }}>
              Step 3
            </div>
            <AnalyticsFeaturePageCard
              backgroundColor={cardColor}
              name={features.COMPLETED_TASKS.CARD_NAME}
              identifier={features.COMPLETED_TASKS.IDENTIFIER}
              action={features.COMPLETED_TASKS.ACTION}
              isMostUsed={features.COMPLETED_TASKS.IS_MOST_USED}
            />
          </div>

        </Col>
      </Row>
    </React.Fragment>
  );
}

export default TargetLeadsFeatureCards;
