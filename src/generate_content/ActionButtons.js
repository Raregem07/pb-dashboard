import React from 'react';
import { Button, Col, Row } from "antd";
import { AppContext } from "../home/Home";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import I18 from "../common/chrome/I18";

class ActionsButtons extends React.Component {

  noPermissions = () => {
    sendNotification(
      NotificationTypeEnum.Failure,
      I18("trial_over_message"),
      true
    );
  };

  render() {
    return (<React.Fragment>
      <Row>
        <Col span={4}/>
        <Col span={8} className="center">
          <AppContext.Consumer>
            {value => {
              let permissions = {improve_content: true};
              let buttonOnClickCallback = this.props.getPosts;
              if (!permissions.improve_content) {
                buttonOnClickCallback = this.noPermissions;
              }
              return  <Button onClick={buttonOnClickCallback} type="primary">
                Get Best Posts & Your Niche Hashtags
              </Button>
            }}
          </AppContext.Consumer>

        </Col>
        <Col span={8} className="center">
          <Button onClick={this.props.clearPosts} type="primary">
            Clear Posts
          </Button>
        </Col>
        <Col span={4}/>
      </Row>
    </React.Fragment>)
  }

}

export default ActionsButtons;
