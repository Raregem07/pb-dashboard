import React from 'react';
import { Button, Checkbox, Col, Row } from "antd";
import InstagramSearch from "../common/components/InstagramSearch";
import SearchType from "../home/SearchType";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import { AppContext } from "../home/Home";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import SendEvent from "../common/Helpers/SendEvent";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import I18 from "../common/chrome/I18";

class HashtagSearch extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      htSelected: null
    };
  }

  noPermissions = () => {
    SendEvent(AnalyticsCategoryEnum.TRIAL_OVER, "Trial over received in hashtag", "");
    sendNotification(
      NotificationTypeEnum.Failure,
      I18("analytics_trial_over_message"),
      true
    );
  };
  
  onSelect = (ht) => {
    // console.log(ht, 'Class: HashtagSearch, Function: , Line 33 ht(): ');
    this.setState({htSelected: ht});
  };
  
  onSubmit = () => {
    this.props.onHashtagChosen(this.state.htSelected);
  };

  render() {
    return <React.Fragment>
      <Row>
        <Col span={16}>
          <div style={{ textAlign: "center" }}>
            <InstagramSearch
                type={SearchType.HASHTAGS}
                onSelect={this.onSelect}
                placeholder="Enter Hashtag and choose from the list ..."
                clearStateOnSelection={false}
                analyticsCategory={
                  AnalyticsCategoryEnum.HASHTAG
                }
              />
          </div>
        </Col>
        <Col span={3}>
            <AppContext.Consumer>
              {value => {
                let permissions = {analytics: true};
                let buttonOnClickCallback = this.onSubmit;
                if (!permissions.analytics) {
                  buttonOnClickCallback = this.noPermissions;
                }
                return (
                  <Button
                    onClick={buttonOnClickCallback}
                    type="primary"
                    style={{
                      marginTop: 12
                    }}
                    disabled={
                      !this.state.htSelected
                    }
                  >
                    {"Submit"}
                  </Button>
                );
              }}
            </AppContext.Consumer>
        </Col>
        {/*<Col span={5}>*/}
        {/*  <NeedHelp type={NeedHelpEnum.ANALYSE_FOLLOWER_FOLLOWING} />*/}
        {/*</Col>*/}
      </Row>
    </React.Fragment>
  }
}


export default HashtagSearch;
