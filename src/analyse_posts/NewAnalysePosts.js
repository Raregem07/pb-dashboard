import React from "react";
import { Prompt } from "react-router-dom";
import { AppContext, Home } from "../home/Home";
import MessageDisplayer from "../common/components/MessageDisplayer";
import { Col, Divider, Row, Spin } from "antd";
import InstagramSearch from "../common/components/InstagramSearch";
import SearchType from "../home/SearchType";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import ProgressBar from "../common/components/ProgressBar";
import getDetailedUserObjectFromUsername from "../common/api_call/GetDetailedUserObjectFromUsername";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
//import PageMessageDisplayTypeEnum from "../common/models/PageMessageDisplayTypeEnum";
import GetLimitedPostsOfAUserBestWay from "../common/api_call/new_api_calls/GetLimitedPostsOfAUserBestWay";
import getLimitedPostsOfAUser from "../common/api_call/new_api_calls/GetPostsOfAUser";
import NewShowPosts from "./NewShowPosts";
import AnalysePosts from "./AnalysePosts";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import getMainUser from "../common/chrome/GetMainUser";
import SearchUser from "../common/models/SearchUser";
import I18 from "../common/chrome/I18";
import Messages from "../common/Messages";
import SendEvent from "../common/Helpers/SendEvent";

class NewAnalysePosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj: null,
      detailedUser: null,
      isGettingPostsDetailStarted: false,
      posts: [],
      likeCountDisabled: false,
      progressPercentForPosts: 0
    };
    this.permission = true;
  }

  noPermissions = () => {
    if (this.permission) {
      sendNotification(NotificationTypeEnum.Failure, I18("analytics_trial_over_message") , true)
    }
    this.permission = false;
  };

  getDetailedUser = async userObj => {
    let detailedUser;
    try {
      detailedUser = await getDetailedUserObjectFromUsername(userObj.username);
      this.setState({ detailedUser });
    } catch (e) {
      this.props.passMessage(...Messages.DETAILED_USER_CALL_FAILED);
    }
    this.setState({ detailedUser: detailedUser });
    return detailedUser;
  };

  getPosts = async (userObj, detailedUser) => {
    let shouldMakeAnonymysed = NewAnalysePosts.shouldMakeAnonymysed(detailedUser);
    this.setState({ isGettingPostsDetailStarted: true });
    let posts = [],
      nextPageToken;

    let totalPosts = 0;
    if (detailedUser) {
      totalPosts = detailedUser.postCount;
    }

    if (shouldMakeAnonymysed) {
      while (true) {
        let userCaseObject;
        try {
          userCaseObject = await GetLimitedPostsOfAUserBestWay(
            userObj.pk,
            nextPageToken
          );
        } catch (e) {
          break;
        }
        let posts1 = userCaseObject.posts;
        nextPageToken = userCaseObject.nextPageToken;
        posts = posts.concat(posts1);
        this.setState({
          posts: posts,
          likeCountDisabled: NewAnalysePosts.likeCountDisabled(posts),
          progressPercentForPosts: NewAnalysePosts.getProgressPercentage(
            posts.length,
            totalPosts
          )
        });
        if (!nextPageToken) {
          break;
        }
      }
    } else {
      while (true) {
        let userCaseObject;
        try {
          userCaseObject = await getLimitedPostsOfAUser(
            userObj.pk,
            nextPageToken
          );
        } catch (e) {
          break;
        }
        let posts1 = userCaseObject.posts;
        posts = posts.concat(posts1);
        nextPageToken = userCaseObject.nextPageToken;
        this.setState({
          posts: posts,
          likeCountDisabled: NewAnalysePosts.likeCountDisabled(posts),
          progressPercentForPosts: NewAnalysePosts.getProgressPercentage(
            posts.length,
            totalPosts
          )
        });
        if (!nextPageToken) {
          break;
        }
      }
    }

    if (NewAnalysePosts.likeCountDisabled(posts)) {
      this.props.passMessage(...Messages.LIKES_DISABLED);
    }

    this.setState({
      isGettingPostsDetailStarted: false
    });
  };

  onUsernameSelected = async searchUser => {
    SendEvent(AnalyticsCategoryEnum.NEW_ANALYSE_POSTS, `Searched User ${searchUser.username}`, "");
    this.setState({ userObj: searchUser });
    let detailedUser = await this.getDetailedUser(searchUser);
    this.getPosts(searchUser, detailedUser);
  };

  setSelfUser = async() => {
    let mainUser = await getMainUser();
    let viewer = mainUser.viewer;
    let {username, id, full_name} = viewer;
    let searchUser = new SearchUser();
    searchUser.username = username;
    searchUser.fullName = full_name;
    searchUser.pk = id;
    this.onUsernameSelected(searchUser);
  };

  render() {
    let onUsernameEnteredCallback = this.onUsernameSelected;
    let permissions = {analytics: true};

    if (!permissions.analytics) {
      onUsernameEnteredCallback = this.noPermissions;
    }
    let searchElement = <InstagramSearch
      type={SearchType.USERS}
      onSelect={onUsernameEnteredCallback}
      placeholder="Enter Instagram Username here & Select from list"
      clearStateOnSelection={false}
      analyticsCategory={AnalyticsCategoryEnum.ANALYSE_POST}
    />;
    if (this.props.self && !permissions.analytics) {
      this.noPermissions();
      searchElement =  <React.Fragment />;
    }

    if (this.props.self && permissions.analytics) {
      if (!this.state.userObj) {
        this.setSelfUser();
      }
      searchElement =  <React.Fragment />;
    }
    return (
      <div>
        <Prompt
          message="You will lose this data. You can open another tab also. Press Profile bud extension again"
          when={this.state.progressPercentForPosts > 0}
        />

        <Row>
          <Col span={19}>
            <div style={{ textAlign: "center" }}>
              {searchElement}
            </div>
          </Col>
        </Row>
        <Divider />


        {this.state.isGettingPostsDetailStarted ? (
          <div className="center">
            <Spin />
          </div>
        ) : (
          <div />
        )}

        <ProgressBar
          percentage={this.state.progressPercentForPosts}
          title="Getting posts"
          notShowOnZero={true}
        />

        <NewShowPosts
          detailedUser={this.state.detailedUser}
          posts={this.state.posts}
          likeCountDisabled={this.state.likeCountDisabled}
          username={this.props.username}
        />
      </div>
    );
  }

  static likeCountDisabled(posts) {
    return posts.length > 0 && posts[0].like_count === -1;
  }

  static getProgressPercentage(postsScraped, totalPosts) {
    if (totalPosts === 0) {
      return 0;
    }
    return Math.ceil(((postsScraped + 1) / totalPosts) * 100);
  }

  static shouldMakeAnonymysed(detailedUser){
    let anonymousCall = false;
    if (detailedUser) {
      if (!detailedUser.isPrivate) {
        anonymousCall = true;
      }
    }
    return anonymousCall;
  }
}

export default props => (
  <AppContext.Consumer>
    {context => <NewAnalysePosts context={context} {...props} />}
  </AppContext.Consumer>
);
