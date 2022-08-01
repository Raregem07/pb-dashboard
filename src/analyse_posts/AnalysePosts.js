import React from "react";
import AnalysePostDisplay from "./AnalysePostDisplay";
import { Prompt } from "react-router-dom";
import ProgressBar from "../common/components/ProgressBar";
import InstagramSearch from "../common/components/InstagramSearch";
import SearchType from "../home/SearchType";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import ShowPostsAndOptions from "./ShowPostsAndOptions";
import { Col, Divider, Row, Spin } from "antd";
import { AppContext, Home } from "../home/Home";
import I18 from "../common/chrome/I18";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import getDetailedUserObjectFromUsername from "../common/api_call/GetDetailedUserObjectFromUsername";
import GetLimitedPostsOfAUserBestWay from "../common/api_call/new_api_calls/GetLimitedPostsOfAUserBestWay";
import getLimitedPostsOfAUser from "../common/api_call/new_api_calls/GetPostsOfAUser";
import getMainUser from "../common/chrome/GetMainUser";
import SearchUser from "../common/models/SearchUser";
import sleep from "../common/Sleep";
import LikerCommenterFromPost from "../liker_commenter_from_post/LikerCommenterFromPost";
import getLikedUsersForAPostAnonymously from "../common/api_call/GetLikedUsersForAPostAnonymously";
import getLikedUsersForAPost from "../common/api_call/GetLikedUsersForAPost";
import getCommentedUsersForAPost from "../common/api_call/GetCommentedUsersForAPost";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import SendEvent from "../common/Helpers/SendEvent";
import GetObject from "../common/chrome/GetObject";
import DatabaseKeys from "../common/models/DatabaseKeys";
import Messages from "../common/Messages";

// Props: isSleeping, sleepStatusChanged, username
class AnalysePosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj: null,
      users: [],
      likers: [],
      commenters: [],
      posts: [],
      likerCommenterPost: {},
      progressPercentForPosts: 0,
      progressPercentForLikeAndComment: 0,
      likeAnalysisNeeded: false,
      commentAnalysisNeeded: false,
      selectedPosts: [],
      isGettingPostsDetailStarted: false,
      detailedUser: null,
      likeCountDisabled: false,
      showPosts: true
    };
    this.progressStatusForLikesAndComments = this.progressStatusForLikesAndComments.bind(this);
    this.stopAPICalls = false;
    this.stopAPICallCheck = this.stopAPICallCheck.bind(this);
  }

  static shouldMakeAnonymysed(detailedUser) {
    let anonymousCall = false;
    if (detailedUser) {
      if (!detailedUser.isPrivate) {
        anonymousCall = true;
      }
    }
    return anonymousCall;
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


  // users is {"username1": User, "username2": User, ... }
  static async getUsersFromPosts(posts, likeAnalysisNeeded, commentAnalysisNeeded, progressStatusForLikesAndComments, sleepStatusChanged, stopAPICallCheck, detailedUser, updateLikers, updateCommenters) {
    let shouldMakeAnonymysed = AnalysePosts.shouldMakeAnonymysed(detailedUser);
    for (let i = 0; i < posts.length; i++) {

      let likerPromise = sleep(1);
      let commenterPromise = sleep(1);
      if (likeAnalysisNeeded) {
        likerPromise = LikerCommenterFromPost.getLikers(posts[i].shortcode, !shouldMakeAnonymysed, sleepStatusChanged, stopAPICallCheck, (likedUsersForPost) => {
          updateLikers(likedUsersForPost, posts[i]);
        });
      }

      if (posts[i].comment_count > 0 && commentAnalysisNeeded) {
        commenterPromise = LikerCommenterFromPost.getCommenters(posts[i].shortcode, !shouldMakeAnonymysed, sleepStatusChanged, stopAPICallCheck, (commentedUsersForPost) => {
          updateCommenters(commentedUsersForPost, posts[i]);
        });
      }
      progressStatusForLikesAndComments(
        Math.ceil(((i + 1) / posts.length) * 100)
      );
      await likerPromise;
      await commenterPromise;
    }
  }

  updateLikers = (likers, post) => {
    let postID = post.id;
    let currentLikerPostValue = { ...this.state.likerCommenterPost };
    let commenters = [];
    if (currentLikerPostValue[postID] && currentLikerPostValue[postID].commenters) {
      commenters = currentLikerPostValue[postID].commenters;
    }
    currentLikerPostValue[postID] = {
      post: post,
      likers: likers,
      commenters: commenters
    };
    this.setState({ likerCommenterPost: currentLikerPostValue });
  };

  updateCommenters = (commenters, post) => {
    let postID = post.id;
    let currentLikerPostValue = { ...this.state.likerCommenterPost };
    let likers = [];
    if (currentLikerPostValue[postID] && currentLikerPostValue[postID].likers) {
      likers = currentLikerPostValue[postID].likers;
    }
    currentLikerPostValue[postID] = {
      post: post,
      likers: likers,
      commenters: commenters
    };
    this.setState({ likerCommenterPost: currentLikerPostValue });
  };

  stopAPICallCheck() {
    return this.stopAPICalls;
  }

  componentWillUnmount() {
    this.stopAPICalls = true;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !(
      nextState.progressPercentForPosts === this.state.progressPercentForPosts &&
      nextState.progressPercentForLikeAndComment === this.state.progressPercentForLikeAndComment &&
      nextState.users === this.state.users &&
      nextState.likers === this.state.likers &&
      nextState.commenters === this.state.commenters &&
      nextState.likerCommenterPost === this.state.likerCommenterPost &&
      nextState.posts === this.state.posts &&
      nextState.isGettingPostsDetailStarted === this.state.isGettingPostsDetailStarted
    );
  }

  progressStatusForLikesAndComments(percent) {
    this.setState({ progressPercentForLikeAndComment: percent });
  }

  getPosts = async (userObj, detailedUser) => {
    let someMaxNumberForPosts = 1000000;
    let shouldMakeAnonymysed = AnalysePosts.shouldMakeAnonymysed(detailedUser);
    this.setState({ isGettingPostsDetailStarted: true });

    let posts = [], nextPageToken;

    let totalPosts = 0;
    if (detailedUser !== null) {
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
          likeCountDisabled: AnalysePosts.likeCountDisabled(posts),
          progressPercentForPosts: AnalysePosts.getProgressPercentage(posts.length, totalPosts)
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
          likeCountDisabled: AnalysePosts.likeCountDisabled(posts),
          progressPercentForPosts: AnalysePosts.getProgressPercentage(posts.length, totalPosts)
        });
        if (!nextPageToken) {
          break;
        }
      }
    }

    this.setState({ isGettingPostsDetailStarted: false });
  };

  updateUsersArray = (users) => {
    this.setState({ users });
  };

  getPostsAnalysis = async () => {
    let posts = this.state.selectedPosts;


    this.setState({ isGettingPostsDetailStarted: true, showPosts: false });
    let usersArray = await AnalysePosts.getUsersFromPosts(posts, this.state.likeAnalysisNeeded, this.state.commentAnalysisNeeded, this.progressStatusForLikesAndComments, this.props.sleepStatusChanged, this.stopAPICallCheck, this.state.detailedUser, this.updateLikers, this.updateCommenters);
    this.setState({ users: usersArray, isGettingPostsDetailStarted: false });
  };

  getDetailedUser = async (userObj) => {
    let detailedUser;
    try {
      detailedUser = await getDetailedUserObjectFromUsername(userObj.username);
      this.setState({ detailedUser });
    } catch (e) {
      this.props.passMessage(...Messages.DETAILED_USER_CALL_FAILED);
      sendNotification(NotificationTypeEnum.Failure, `Please use some proxy VPN. Eg: Free chrome extension - Browsec. You are being rate limited by Instagram.`, true);
    }
    return detailedUser;
  };

  onUsernameSelected = async searchUser => {
    this.setState({ userObj: searchUser });
    let detailedUser = await this.getDetailedUser(searchUser);
    this.getPosts(searchUser, detailedUser);
  };

  selectedPostsAndOptionsForAnalysis = (
    selectedPosts,
    likeAnalysisNeeded,
    commentAnalysisNeeded
  ) => {
    ReactGA.event({
      category: AnalyticsCategoryEnum.ANALYSE_POST,
      action: `Posts selected for analysis & analysis started`,
      label: ` ${selectedPosts.length} Posts selected`
    });
    this.setState(
      {
        likeAnalysisNeeded: likeAnalysisNeeded,
        commentAnalysisNeeded: commentAnalysisNeeded,
        selectedPosts: selectedPosts
      },
      () => {
        this.getPostsAnalysis();
      }
    );
  };

  noPermissions = () => {
    sendNotification(NotificationTypeEnum.Failure, I18("analytics_trial_over_message"), true);
  };

  setSelfUser = async () => {
    let mainUser = await getMainUser();
    let viewer = mainUser.viewer;
    let { username, id, full_name } = viewer;
    let searchUser = new SearchUser();
    searchUser.username = username;
    searchUser.fullName = full_name;
    searchUser.pk = id;
    await this.onUsernameSelected(searchUser);
  };

  showPostsButtonPressed = () => {
    this.setState({ showPosts: true, selectedPosts: [], users: [] });
  };

  getUsers = () => {
    /*
    {
      PID: {post: Post, likers: [], commenters: []},
      PID: {post: Post, likers: [], commenters: []},
      ...
    }
     */
    let likerCommenterPosts = this.state.likerCommenterPost;

    let users = {};
    let usersArray = [];
    for (let postID in likerCommenterPosts) {
      let obj = likerCommenterPosts[postID];
      let post = obj.post;

      let likers = obj.likers;
      likers.map(u => {
        u.commentedPosts = [];
        u.commentedValues = [];
        u.likedPosts = [];
      });

      for (let j = 0; j < likers.length; j++) {
        if (likers[j].username in users) {
          users[likers[j].username].addLikedPost(post);
        } else {
          likers[j].addLikedPost(post);
          users[likers[j].username] = likers[j];
        }
      }

      let commenters = obj.commenters;
      commenters.map(u => {
        u.commentedPosts = [];
        u.commentedValues = [];
        u.likedPosts = [];
      });

      for (let j = 0; j < commenters.length; j++) {
        if (commenters[j].username in users) {
          users[commenters[j].username].addCommentedPost(
            post,
            commenters[j].commentValue
          );
        } else {
          commenters[j].addCommentedPost(
            post,
            commenters[j].commentValue
          );
          users[commenters[j].username] = commenters[j];
        }
      }
    }

    for (let user in users) {
      usersArray.push(users[user]);
    }

    return usersArray.map(u => {
      u["profileURL"] = u.profilePic;
      return u;
    });
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
      searchElement = <React.Fragment/>;
    }

    if (this.props.self && permissions.analytics) {
      if (!this.state.userObj) {
        this.setSelfUser();
      }
      searchElement = <React.Fragment/>;
    }

    return (
      <div>
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
          {/*<Col span={5}>*/}
          {/*  <NeedHelp type={NeedHelpEnum.ANALYSE_USER_LIKER_COMMENTER} />*/}
          {/*</Col>*/}
        </Row>
        <Divider />

        {this.state.isGettingPostsDetailStarted ? <div className="center"><Spin/></div> : <div/>}

        <ProgressBar
          percentage={this.state.progressPercentForPosts}
          title="Getting posts"
          notShowOnZero={true}
        />

        <ShowPostsAndOptions
          showPostsButtonPressed={this.showPostsButtonPressed}
          showPosts={this.state.showPosts}
          detailedUser={this.state.detailedUser}
          posts={this.state.posts}
          selectedPostsAndOptionsForAnalysis={
            this.selectedPostsAndOptionsForAnalysis
          }
          likeCountDisabled={this.state.likeCountDisabled}
          username={this.props.username}
        />

        <ProgressBar
          percentage={this.state.progressPercentForLikeAndComment}
          notShowOnZero={true}
          title="Getting likes/comments for selected post"
        />


        <AnalysePostDisplay
          users={this.getUsers()}
          posts={this.state.selectedPosts}
        />
      </div>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {context => <AnalysePosts context={context} {...props} />}
  </AppContext.Consumer>
);
