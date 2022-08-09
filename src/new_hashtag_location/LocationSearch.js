import React from "react";
import { Button, Col, Row } from "antd";
import InstagramSearch from "../common/components/InstagramSearch";
import SearchType from "../home/SearchType";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import { AppContext } from "../home/Home";
import SendEvent from "../common/Helpers/SendEvent";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";

class LocationSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locSelected: null
    };
  }

  noPermissions = () => {
    SendEvent(AnalyticsCategoryEnum.TRIAL_OVER, "Trial over received in Location", "");
    sendNotification(
      NotificationTypeEnum.Failure,
      "Please Purchase Upgraded ProfileBuddy Extension from JVZoo",
      true
    );
  };

  onSelect = (place) => {
    // console.log(place, 'Class: Location, Function: , Line 33 ht(): ');
    this.setState({ locSelected: place });
  };

  onSubmit = () => {
    this.props.onLocationChosen(this.state.locSelected);
  };

  render() {
    return <React.Fragment>
      <Row>
        <Col span={16}>
          <div style={{ textAlign: "center" }}>
            <InstagramSearch
              type={SearchType.PLACES}
              onSelect={this.onSelect}
              placeholder="Enter Location name and then select one from the list ..."
              clearStateOnSelection={false}
              analyticsCategory={
                AnalyticsCategoryEnum.LOCATION
              }
            />
          </div>
        </Col>
        <Col span={3}>
          <AppContext.Consumer>
            {value => {
              let permission = value.permission;
              let isPermissionThere = true;
              let buttonOnClickCallback = this.onSubmit;
              return (
                <Button
                  onClick={buttonOnClickCallback}
                  type="primary"
                  style={{
                    marginTop: 12
                  }}
                  disabled={
                    !this.state.locSelected
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
    </React.Fragment>;
  }
}


export default LocationSearch;
