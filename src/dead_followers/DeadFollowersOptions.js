import React from "react";
import SearchType from "../home/SearchType";
import InstagramSearch from "../common/components/InstagramSearch";
import { Button, Checkbox, Select } from "antd";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import { AppContext } from "../home/Home";
import I18 from "../common/chrome/I18";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import getMainUser from "../common/chrome/GetMainUser";
import SearchUser from "../common/models/SearchUser";
import Icons from "../common/components/Icons";

const { Option } = Select;

class DeadFollowersOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      like: true,
      comment: true,
      userObj: null,
      postCount: "5"
    };
  }

  onUsernameSelected = userObj => {
    this.setState({ userObj: userObj });
  };

  onSubmit = () => {
    let maxPosts = parseInt(this.state.postCount);
    this.props.onOptionsSubmit(
      this.state.userObj,
      this.state.like,
      this.state.comment,
      maxPosts
    );
  };

  onChangeCheckbox = e => {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  };

  onChangeLastPost = postCount => {
    this.setState({ postCount: postCount });
  };

  noPermissions = () => {
    sendNotification(
      NotificationTypeEnum.Failure,
      I18("analytics_trial_over_message"),
      true
    );
  };

  setSelfUser = async () => {
    let mainUser = await getMainUser();
    let viewer = mainUser.viewer;
    let { username, id, full_name } = viewer;
    let searchUser = new SearchUser();
    searchUser.username = username;
    searchUser.fullName = full_name;
    searchUser.pk = id;
    this.setState({ userObj: searchUser });
  };

  render() {
    let buttonName = "Analyse Dead Followers";
    if (this.props.self) {
      buttonName = "Analyse your Dead Followers";
      this.setSelfUser();
    }
    return (
      <React.Fragment>
        {this.props.self ? (
          <React.Fragment />
        ) : (
          <InstagramSearch
            type={SearchType.USERS}
            onSelect={this.onUsernameSelected}
            placeholder="Enter Instagram Username here & Select from list"
            clearStateOnSelection={false}
            analyticsCategory={AnalyticsCategoryEnum.DEAD_FOLLOWERS}
          />
        )}
        <br /><br />
        <Checkbox
          onChange={this.onChangeCheckbox}
          name="like"
          checked={this.state.like}
        >
          Check Likers
        </Checkbox>{" "}
        &nbsp;&nbsp;&nbsp;
        <Checkbox
          onChange={this.onChangeCheckbox}
          name="comment"
          checked={this.state.comment}
        >
          Check Commenters
        </Checkbox>
        <Select
          defaultValue={this.state.postCount}
          style={{ width: 200 }}
          onChange={this.onChangeLastPost}
        >
          <Option value="5">Latest 5 posts</Option>
          <Option value="10">Latest 10 posts</Option>
          <Option value="20">Latest 20 posts</Option>
          <Option value="40">Latest 40 posts</Option>
          <Option value="1000000">All posts</Option>
        </Select>
        {this.state.postCount === "1000000" || this.state.postCount === "40" ? (
          <div style={{ color: "red" }}>
            {Icons.WARNING} If you have a lot of Likes on posts, it might take some time.
          </div>
        ) : (
          <div />
        )}
        <br />
        <AppContext.Consumer>
          {value => {
            let permissions = value.permissions;
            let onButtonPressedCallback = this.onSubmit;
            if (!permissions.analytics) {
              onButtonPressedCallback = this.noPermissions;
            }
            return (
              <Button
                onClick={onButtonPressedCallback}
                type="primary"
                disabled={
                  !this.state.userObj ||
                  (!this.state.like && !this.state.comment)
                }
              >
                {buttonName}
              </Button>
            );
          }}
        </AppContext.Consumer>
      </React.Fragment>
    );
  }
}

export default DeadFollowersOptions;
