import React from "react";
import InstagramSearch from "../common/components/InstagramSearch";
import SearchType from "../home/SearchType";
import { Button, Col, Divider, Row, Spin } from "antd";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import getPostsForAUser from "../common/api_call/GetPostsForAUser";
import getDetailedUserObjectFromUsername from "../common/api_call/GetDetailedUserObjectFromUsername";
import ProgressBar from "../common/components/ProgressBar";
import { Prompt } from "react-router-dom";
import UserStats from "./UserStats";
import HashtagsStats from "./HashtagsStats";
import { AppContext, Home } from "../home/Home";
import I18 from "../common/chrome/I18";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import LocationStats from "./LocationStats";
import MentionStats from "./MentionStats";
import PostsByDays from "./PostsByDays";
import AverageLikeAndCommentOnPostDayWise from "./AverageLikeAndCommentOnPostDayWise";
import Top3PostsMetricWise from "./Top3PostsMetricWise";
import LikeAndCommentHistory from "./LikeAndCommentHistory";
import TimeForRateLimitMessage from "../common/components/TimeForRateLimitMessage";
//import getPostsForAUserAnonyMously from "../common/api_call/GetPostsOfAUserAnonymously";
import getMainUser from "../common/chrome/GetMainUser";
import SearchUser from "../common/models/SearchUser";
import MonthlyTrends from "./MonthlyTrends";
import ReactToPrint from "react-to-print";
import DayWiseTimeTrends from "./DayWiseTimeTrends";
import Messages from "../common/Messages";
import AddUserForAnalysis from "../common/store/AddUserForAnalysis";
import SaveUserDetails from "../common/store/SaveUserDetails";
import UserFollowerFollowingGraph from "./UserFollowerFollowingGraph";
import SendEvent from "../common/Helpers/SendEvent";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import GetDetailsFromSadam from "../common/api_call/new_api_calls/GetDetailsFromSadam";

// sleepStatusChanged, isSleeping,
class AnalyseUser extends React.Component {
  constructor(props) {
    console.log("@AnalyseUser class constructor:");
    super(props);
    this.state = {
      userObj: null,
      arePostsReceived: false,
      posts: [],
      detailedUser: null,
      progressPercentForPosts: 0,
      isLoading: false,
      likeCountDisabled: false,
    };
    this.permission = true;
    this.stopAPICalls = false;

  }

  getDetailsAboutUser = async (username, searchUser) => {
    console.log("@getDetailsAboutUser function: username =", username, ", searchUser =", searchUser);
    this.setState({ loading: true });
    let detailedUser = null;
    try {
      detailedUser = await getDetailedUserObjectFromUsername(username);
      await SaveUserDetails(username, detailedUser);
    } catch {
      try {
        let mainUser = await getMainUser();
        let igID = mainUser.viewer.id;
        detailedUser = await GetDetailsFromSadam([username], igID, []);
      } catch (e) {
        // this.props.passMessage(...Messages.DETAILED_USER_CALL_FAILED);
      }
    }
    this.getPosts(searchUser, detailedUser);
    this.setState({ detailedUser: detailedUser });
  };

  componentWillUnmount() {
    this.stopAPICalls = true;
  }

  progressStatusForPosts = (percent) => {
    this.setState({ progressPercentForPosts: percent });
  };

  stopAPICallCheck = () => {
    return this.stopAPICalls;
  };

  getPosts = async (userObj, detailedUser) => {
    let someMaxNumberForPosts = 1000000;
    let posts;

    posts = await getPostsForAUser(
      userObj.pk,
      someMaxNumberForPosts,
      this.props.sleepStatusChanged,
      this.progressStatusForPosts,
      this.stopAPICallCheck
    );


    let likeCountDisabled = false;
    if (posts.length > 0 && posts[0].like_count === -1) {
      likeCountDisabled = true;
      this.props.passMessage(...Messages.LIKES_DISABLED);
      sendNotification(NotificationTypeEnum.Failure, `${this.state.userObj.username} is Private. So we cannot get likes for the posts`, true);
    }
    this.setState({
      posts: posts,
      arePostsReceived: true,
      loading: false,
      likeCountDisabled: likeCountDisabled
    });
  };

  onUsernameSelected = searchUser => {
    SendEvent(AnalyticsCategoryEnum.ANALYSE_USER, `Searched User ${searchUser.username}`, "");
    this.setState({ userObj: searchUser });
    this.getDetailsAboutUser(searchUser.username, searchUser);
  };

  noPermissions = () => {
    if (this.permission) {
      SendEvent(AnalyticsCategoryEnum.TRIAL_OVER, `Trial over so cannot user analyse user`, "");
      sendNotification(NotificationTypeEnum.Failure, I18("analytics_trial_over_message"), true);
    }
    this.permission = false;
  };

  setSelfUser = async () => {
    let mainUser = await getMainUser();
    let viewer = mainUser.viewer;
    let { username, id, full_name } = viewer;
    let searchUser = new SearchUser();
    searchUser.username = username;
    searchUser.fullName = full_name;
    searchUser.pk = id;
    this.onUsernameSelected(searchUser);
  };

  render() {
    let onUsernameEnteredCallback = (searchUser) => {
      AddUserForAnalysis(searchUser.username);
      this.onUsernameSelected(searchUser);
    };

    let permissions = {analytics: true};
    if (!permissions.analytics) {
      onUsernameEnteredCallback = this.noPermissions;
    }

    let searchElement = <InstagramSearch
      type={SearchType.USERS}
      analyticsCategory={AnalyticsCategoryEnum.ANALYSE_USER}
      onSelect={onUsernameEnteredCallback}
      placeholder="Enter Instagram Username here & select from the list"
      clearStateOnSelection={false}
    />;
    if (this.props.self && !permissions.analytics) {
      this.noPermissions();
      searchElement = <React.Fragment/>;
    }

    if (this.props.self && permissions.analytics) {
      if (!this.state.userObj) {
        this.setSelfUser();
      }
      searchElement = <React.Fragment/>;
    }
    return <React.Fragment>
      <Prompt
        message="You will lose this data. You can open another tab also. Press Profile bud extension again"
        when={
          this.state.progressPercentForPosts > 0
        }
      />
      <Row>
        <Col span={19}>
          <div style={{ textAlign: "center" }}>
            {searchElement}
          </div>
        </Col>
      </Row>
      <Divider/>


      {this.state.loading ? <div className="center"><Spin/></div> : <div/>}
      <ProgressBar
        percentage={this.state.progressPercentForPosts}
        title="Analysing user posts"
        notShowOnZero={true}
      />


      {this.state.arePostsReceived && this.state.loading === false ?

        <div ref={el => (this.componentRef = el)}>
          {/*<ReactToPrint*/}
          {/*  trigger={() => <Button>Print Full report in PDF</Button>}*/}
          {/*  content={() => this.componentRef}*/}
          {/*/>*/}
          <UserStats posts={this.state.posts} detailedUser={this.state.detailedUser}
                     likeCountDisabled={this.state.likeCountDisabled}/>
          <MonthlyTrends posts={this.state.posts}/>
          <HashtagsStats posts={this.state.posts}/>
          <LocationStats posts={this.state.posts}/>
          <MentionStats posts={this.state.posts}/>
          <PostsByDays posts={this.state.posts}/>
          <DayWiseTimeTrends posts={this.state.posts}/>
          <AverageLikeAndCommentOnPostDayWise posts={this.state.posts}
                                              likeCountDisabled={this.state.likeCountDisabled}/>
          <LikeAndCommentHistory posts={this.state.posts} likeCountDisabled={this.state.likeCountDisabled}/>
          <UserFollowerFollowingGraph username={this.state.userObj.username}/>

          <Top3PostsMetricWise type="best" metric="like" posts={this.state.posts}
                               likeCountDisabled={this.state.likeCountDisabled}/>
          <Top3PostsMetricWise type="best" metric="comment" posts={this.state.posts}/>
          <Top3PostsMetricWise type="worst" metric="like" posts={this.state.posts}
                               likeCountDisabled={this.state.likeCountDisabled}/>
          <Top3PostsMetricWise type="worst" metric="comment" posts={this.state.posts}/>

        </div>
        : <div/>}
    </React.Fragment>;
  }
}

export default (props) => (<AppContext.Consumer>
  {context =>
    <AnalyseUser context={context} {...props} />
  }
</AppContext.Consumer>);
