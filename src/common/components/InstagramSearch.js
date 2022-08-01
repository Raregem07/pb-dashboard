import React from "react";
import { AutoComplete, Button, Icon, Input } from "antd";
import getRelatedSearchQuery from "../api_call/GetRelatedSearchQuery";
import axios from "axios";
import sendNotification from "../SendNotification";
import NotificationTypeEnum from "../models/NotificationTypeEnum";
import SearchType from "../../home/SearchType";
import getMainUser from "../chrome/GetMainUser";
import ReactGA from "react-ga";
import SearchImg from '../images/search.png';
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import commonFollower from "../images/common_followers.png";

/*
Props: width, name, placeholder, type (SearchType.HASHTAGS/ SearchType.PLACES, etc), onSelect(selectedObject - Hashtag/Place/SearchUser)
 is name is not null then onSelect received name as 2nd argument
 */
class InstagramSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDataString: null,
      searchDataObjects: null,
      searchedValue: ""
    };
  }

  handleSearch = async v => {
    if (!v) {
      this.setState({ searchedValue: "" });
      return;
    }
    let searchData;
    this.setState({ searchedValue: v });
    try {
      searchData = await getRelatedSearchQuery(v, this.props.type);
    } catch (e) {
      if (axios.isCancel(e)) {
      } else {
        // console.log("Some error occurred", e.message);
      }
      return;
    }
    let searchDataString = searchData.map(o => {
      return o.readableLine();
    });
    this.setState({
      searchDataString: searchDataString,
      searchDataObjects: searchData
    });
  };

  onSelectOptions = async (value, _) => {
    let searchObj;
    for (let i = 0; i < this.state.searchDataObjects.length; i++) {
      searchObj = this.state.searchDataObjects[i];
      if (searchObj.readableLine() === value) {
        break;
      }
    }
    let mainUser = await getMainUser();
    if (
      this.props.type === SearchType.USERS &&
      searchObj.isPrivate &&
      searchObj.following === false &&
      searchObj.username !== mainUser.viewer.username
    ) {
      ReactGA.event({
        category:
          this.props.analyticsCategory !== null
            ? this.props.analyticsCategory
            : "private_username_selected",
        action: "username_private_selected"
      });
      sendNotification(
        NotificationTypeEnum.Failure,
        `${searchObj.username}'s Profile is Private & they haven't accepted your follow request`, true
      );
      return;
    } else {
      ReactGA.event({
        category:
          this.props.analyticsCategory !== null
            ? this.props.analyticsCategory
            : "username_selected",
        action: "username_public_selected"
      });
    }
    if (this.props.name) {
      this.props.onSelect(searchObj, this.props.name);
    } else {
      this.props.onSelect(searchObj);
    }
    if (this.props.clearStateOnSelection) {
      this.setState({ searchedValue: "" });
    } else {
      this.setState({ searchedValue: searchObj.readableLine() });
    }
  };

  render() {
    return (
      <React.Fragment>
        <AutoComplete
          dataSource={this.state.searchDataString}
          style={{
            width: this.props.width || '80%',
            fontSize: 24,
            boxShadow: "0px 3px 6px #00000029",
          }}
          value={this.state.searchedValue}
          onSearch={this.handleSearch}
          onSelect={this.onSelectOptions}
        >
          <Input.Search
            style={{
              boxShadow: "0px 3px 6px #00000029",
              height: 60,
              backgroundColor: "#FFF",
              fontSize: 24,
              borderRadius: 6
            }}
            size="large"
            placeholder={this.props.placeholder || ""}
          />
        </AutoComplete>
      </React.Fragment>
    );
  }
}

export default InstagramSearch;
