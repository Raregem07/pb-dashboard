import React from "react";
import Feature from "./Feature";
import FeatureDetails from "../FeatureDetails";

class MostUsedFeatures extends React.Component {
  render() {
    let selectedKeys = [this.props.location];
    if (selectedKeys[0].length === 0) {
      selectedKeys[0] = "dashboard";
    }

    return (
      <React.Fragment>
        <div className="center">
          <div
            style={{
              fontSize: "160%",
              fontWeight: "bold",
              marginTop: "5%",
              marginBottom: "5%",
              color: "#001529"
            }}
          >
            Most Used Features
          </div>

          <div style={{ marginTop: "3%" }}>
            <Feature
              selectedKeys={selectedKeys}
              action={FeatureDetails.ANALYTICS.OTHER.FEATURES.HASHTAG.ACTION}
              text={FeatureDetails.ANALYTICS.OTHER.FEATURES.HASHTAG.RIGHT_SIDER_NAME}
              colorCode={FeatureDetails.ANALYTICS.OTHER.CARD_COLOR}
            />

            <br />

            <Feature
              selectedKeys={selectedKeys}
              action={FeatureDetails.ANALYTICS.OTHER.FEATURES.POST_LIKER_COMMENTER.ACTION}
              text={FeatureDetails.ANALYTICS.OTHER.FEATURES.POST_LIKER_COMMENTER.CARD_NAME}
              colorCode={FeatureDetails.ANALYTICS.OTHER.CARD_COLOR}
            />
            <br />
            <Feature
              selectedKeys={selectedKeys}
              action={
                FeatureDetails.ANALYTICS.OTHER.FEATURES
                  .ANALYSE_FOLLOWER_FOLLOWING.ACTION
              }
              text={
                FeatureDetails.ANALYTICS.OTHER.FEATURES
                  .ANALYSE_FOLLOWER_FOLLOWING.CARD_NAME
              }
              colorCode={FeatureDetails.ANALYTICS.OTHER.CARD_COLOR}
            />
            <br />
            <Feature
              selectedKeys={selectedKeys}
              action={FeatureDetails.TOOLS_FEATURES.ANALYSE_USER.ACTION
              }
              text={
                FeatureDetails.TOOLS_FEATURES.ANALYSE_USER.CARD_NAME
              }
              colorCode={FeatureDetails.ANALYTICS.OTHER.CARD_COLOR}
            />
            <br />

          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MostUsedFeatures;
