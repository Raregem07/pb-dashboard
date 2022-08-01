import React from "react";
import { Button, Checkbox, Col, Radio, Row } from "antd";
import InstagramSearch from "../common/components/InstagramSearch";
import SearchType from "../home/SearchType";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import { AppContext } from "../home/Home";
import I18 from "../common/chrome/I18";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import getMainUser from "../common/chrome/GetMainUser";
import SearchUser from "../common/models/SearchUser";
import AddUserForAnalysis from "../common/store/AddUserForAnalysis";
import SendEvent from "../common/Helpers/SendEvent";
import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class QueryBoxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userObject: null,
      follower: true,
      following: false,
      continueFromOld: true,
      showContinuePreviousOption: false,
      continueDetails: null,
      followerFollowingValue: "follower"
    };
    this.firstTimeSet = false
  }

  onSelect = async searchUser => {
    this.setState({ userObject: searchUser });
    let followerPoints = await GetOrSetValue(DatabaseKeys.FOLLOWER_SAVE_POINTS, {});
    // console.log(followerPoints, searchUser, 'Class: QueryBoxForm, Function: , Line 40 followerPoints, searchUser(): ');
    if (followerPoints[searchUser.pk.toString()]) {
      this.setState({showContinuePreviousOption: true, continueDetails: followerPoints[searchUser.pk.toString()]});
    } else {
      this.setState({showContinuePreviousOption: false})
    }
  };

  onChangeFollowerFollowing = (e) => {
    let v = e.target.value;
    if (v === "follower") {
      this.setState({follower: true,followerFollowingValue: "follower", following:false })
    }
    if (v === "following") {
      this.setState({following: true, followerFollowingValue: "following", follower: false})
    }
  };

  onChangeCheckbox = e => {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  };

  onSubmit = () => {
    let continueDetails = null;
    if (this.state.continueFromOld) {
      continueDetails = this.state.continueDetails
    }
    let valueToReturn = {
      userObj: this.state.userObject,
      followers: this.state.follower,
      following: this.state.following,
      continueDetails: continueDetails
    };
    SendEvent(AnalyticsCategoryEnum.ANALYSE_FOLLOWER_FOLLOWING, "Button pressed to calculate follower following", "");
    this.props.setUserForAnalysis(valueToReturn);
  };

  noPermissions = () => {
    SendEvent(AnalyticsCategoryEnum.TRIAL_OVER, "Trial over received in follower following", "");
    sendNotification(
      NotificationTypeEnum.Failure,
      I18("analytics_trial_over_message"),
      true
    );
  };

  setSelfUser = async() => {
    if (!this.firstTimeSet) {
      this.firstTimeSet = true;
      let mainUser = await getMainUser();
      let viewer = mainUser.viewer;
      let {username, id, full_name} = viewer;
      let searchUser = new SearchUser();
      searchUser.username = username;
      searchUser.fullName = full_name;
      searchUser.pk = id;
      this.setState({userObject: searchUser});
      let followerPoints = await GetOrSetValue(DatabaseKeys.FOLLOWER_SAVE_POINTS, {});
      // console.log(followerPoints, id, 'Class: QueryBoxForm, Function: , Line 80 followerPoints, id(): ');
      if (followerPoints[id.toString()]) {
        this.setState({showContinuePreviousOption: true, continueDetails: followerPoints[id.toString()]});
      } else {
        this.setState({showContinuePreviousOption: false})
      }
    }

  };

  showContinueOption =  () => {
    if (this.state.showContinuePreviousOption && this.state.follower) {
      return <React.Fragment>
      <Checkbox
        onChange={this.onChangeCheckbox}
        name="continueFromOld"
        checked={this.state.continueFromOld}
      >
        Continue from {this.state.continueDetails.doneTill} followers
      </Checkbox>
      </React.Fragment>
    }
    return <React.Fragment />
  };


  render() {
    let buttonName = "Analyse Follower/Following";
    if (this.props.self) {
      buttonName = "Analyse your Followers/Followings";
      this.setSelfUser();
    }

    return (
      <React.Fragment>
        <Row>
          <Col span={19}>
            <div style={{ textAlign: "center" }}>
              {this.props.self ? <React.Fragment />
                : <InstagramSearch
                  type={SearchType.USERS}
                  onSelect={this.onSelect}
                  placeholder="Enter Instagram Username here & Select from list"
                  clearStateOnSelection={false}
                  analyticsCategory={
                    AnalyticsCategoryEnum.ANALYSE_FOLLOWER_FOLLOWING
                  }
                />}

              <br /><br />
              <Radio.Group onChange={this.onChangeFollowerFollowing} value={this.state.followerFollowingValue}>
                <Radio value={"follower"}>Followers</Radio>&nbsp;&nbsp;&nbsp;

                <Radio value={"following"}>Followings</Radio>
              </Radio.Group>
              {this.showContinueOption()}
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
                      disabled={
                        !this.state.userObject ||
                        (!this.state.follower && !this.state.following)
                      }
                    >
                      {buttonName}
                    </Button>
                  );
                }}
              </AppContext.Consumer>
            </div>
          </Col>
          {/*<Col span={5}>*/}
          {/*  <NeedHelp type={NeedHelpEnum.ANALYSE_FOLLOWER_FOLLOWING} />*/}
          {/*</Col>*/}
        </Row>
      </React.Fragment>
    );
  }
}

export default QueryBoxForm;
