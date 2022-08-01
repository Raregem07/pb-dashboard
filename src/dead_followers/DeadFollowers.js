import React from "react";
import { Prompt } from "react-router-dom";
import { Col, Divider, Row } from "antd";
import getPostsForAUser from "../common/api_call/GetPostsForAUser";
import AnalysePosts from "../analyse_posts/AnalysePosts";
import { getFollowersV2 } from "../common/api_call/GetFollowerAndFollowing";
import ProgressBar from "../common/components/ProgressBar";
import UserDisplayWithActions from "../analytics/UserDisplayWithActions";
import DeadFollowersOptions from "./DeadFollowersOptions";
import MessageDisplayer from "../common/components/MessageDisplayer";
import { AppContext, Home } from "../home/Home";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import TimeForRateLimitMessage from "../common/components/TimeForRateLimitMessage";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import NeedHelp from "../common/components/NeedHelp";
import getDetailedUserObjectFromUsername from "../common/api_call/GetDetailedUserObjectFromUsername";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import Messages from "../common/Messages";
import getLikedUsersForAPostAnonymously from "../common/api_call/GetLikedUsersForAPostAnonymously";
import getLikedUsersForAPost from "../common/api_call/GetLikedUsersForAPost";
import getCommentedUsersForAPost from "../common/api_call/GetCommentedUsersForAPost";
import SendEvent from "../common/Helpers/SendEvent";
import GetObject from "../common/chrome/GetObject";
import DatabaseKeys from "../common/models/DatabaseKeys";
import NewMessageDisplayer from "../home/NewMessageDisplayer";

const Status = {
  INITIAL: "initial",
  UNDER_PROGRESS: "underProgress",
  FINISHED: "finished"
};

class DeadFollowers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj: null,
      postStatus: Status.INITIAL,
      likerCommenterStatus: Status.INITIAL,
      followerStatus: Status.INITIAL,
      progressPercentForLikeAndComment: 0,
      progressPercentForPosts: 0,
      progressStatusForFollowerFollowing: 0,
      postsLikersCommentersUsers: [],
      followers: []
    };
    this.stopAPICalls = false;
  }

  onOptionsSubmit = async (userObj, like, comment, maxPosts) => {
    SendEvent(AnalyticsCategoryEnum.DEAD_FOLLOWERS, "Get Dead followers button pressed", `Like ${like} | comment ${comment} | maxPosts ${maxPosts}`);

    let callsData = await GetObject(DatabaseKeys.CALLS_DATA);
    if (callsData.level2Calls >= callsData.level2AllowedCalls) {
      SendEvent(AnalyticsCategoryEnum.DEAD_FOLLOWERS, `Already scraped max users ${callsData.level2Calls}`, "");
      this.props.passMessage(...Messages.MAX_USERS_SCRAPED_TOTAL);
      sendNotification(NotificationTypeEnum.Failure, `Max users ${callsData.level2Calls} scraped. Purchase ProfileMate to continue & unlock full power`, true)
      return
    }

    this.setState({ userObj: userObj });
    this.getPostsLikersAndCommenters(userObj, like, comment, maxPosts);
    this.getFollowers(userObj);
  };

  progressStatusForPosts = percent => {
    this.setState({ progressPercentForPosts: percent });
  };

  stopAPICallCheck = () => {
    return this.stopAPICalls;
  };

  componentWillUnmount() {
    this.stopAPICalls = true;
  }

  progressStatusForLikesAndComments = percent => {
    this.setState({ progressPercentForLikeAndComment: percent });
  };

  progressStatusForFollowerFollowing = percent => {
    this.setState({ progressStatusForFollowerFollowing: percent });
  };

  static shouldMakeAnonymysed(detailedUser) {
    let anonymousCall = false;
    if (detailedUser) {
      if (!detailedUser.isPrivate) {
        anonymousCall = true;
      }
    }
    return anonymousCall;
  }

  static async getUsersFromPostsOld(posts, likeAnalysisNeeded, commentAnalysisNeeded, progressStatusForLikesAndComments, sleepStatusChanged, stopAPICallCheck, detailedUser, updateUsersArray) {
    let users = {};
    let usersArray = [];
    let shouldMakeAnonymysed = DeadFollowers.shouldMakeAnonymysed(detailedUser);
    for (let i = 0; i < posts.length; i++) {
      if (likeAnalysisNeeded) {
        let likedUsersForPost;
        if (shouldMakeAnonymysed) {
          likedUsersForPost = await getLikedUsersForAPostAnonymously(
            posts[i].shortcode,
            sleepStatusChanged,
            stopAPICallCheck
          )
        } else {
          likedUsersForPost = await getLikedUsersForAPost(
            posts[i].shortcode,
            sleepStatusChanged,
            stopAPICallCheck
          );
        }

        likedUsersForPost.map(u => {
          u.commentedPosts = [];
          u.commentedValues = [];
          u.likedPosts = [];
        });

        posts[i].setLikedUsers(likedUsersForPost);
        for (let j = 0; j < likedUsersForPost.length; j++) {
          if (likedUsersForPost[j].username in users) {
            users[likedUsersForPost[j].username].addLikedPost(posts[i]);
          } else {
            likedUsersForPost[j].addLikedPost(posts[i]);
            users[likedUsersForPost[j].username] = likedUsersForPost[j];
          }
        }
      }

      if (posts[i].comment_count > 0 && commentAnalysisNeeded) {
        let commentedUsersForPost = await getCommentedUsersForAPost(
          posts[i].shortcode,
          sleepStatusChanged,
          stopAPICallCheck
        );

        commentedUsersForPost.map(u => {
          u.commentedPosts = [];
          u.commentedValues = [];
          u.likedPosts = [];
        });

        posts[i].setCommentedUsers(commentedUsersForPost);
        for (let j = 0; j < commentedUsersForPost.length; j++) {
          if (commentedUsersForPost[j].username in users) {
            users[commentedUsersForPost[j].username].addCommentedPost(
              posts[i],
              commentedUsersForPost[j].commentValue
            );
          } else {
            commentedUsersForPost[j].addCommentedPost(
              posts[i],
              commentedUsersForPost[j].commentValue
            );
            users[commentedUsersForPost[j].username] = commentedUsersForPost[j];
          }
        }
      }
      progressStatusForLikesAndComments(
        Math.ceil(((i + 1) / posts.length) * 100)
      );
      for (let user in users) {
        usersArray.push(users[user]);
      }
      updateUsersArray(usersArray);
    }
    return usersArray;
  }

  async getPostsLikersAndCommenters(searchUser, likeAnalysisNeeded, commentAnalysisNeeded, maxPosts) {
    let someMaxNumberForPosts = maxPosts;
    this.setState({ postStatus: Status.UNDER_PROGRESS });
    let detailedUser;
    try {
      detailedUser = await getDetailedUserObjectFromUsername(searchUser.username);
    } catch (e) {
      this.props.passMessage(...Messages.DETAILED_USER_CALL_FAILED);
    }
    let posts = await getPostsForAUser(
      searchUser.pk,
      someMaxNumberForPosts,
      this.props.sleepStatusChanged,
      this.progressStatusForPosts,
      this.stopAPICallCheck
    );
    this.setState({
      postStatus: Status.FINISHED,
      likerCommenterStatus: Status.UNDER_PROGRESS
    });
    let users = await DeadFollowers.getUsersFromPostsOld(
      posts,
      likeAnalysisNeeded,
      commentAnalysisNeeded,
      this.progressStatusForLikesAndComments,
      this.props.sleepStatusChanged,
      this.stopAPICallCheck,
      detailedUser,
      () => {}
    );
    this.setState({
      postsLikersCommentersUsers: users,
      likerCommenterStatus: Status.FINISHED
    });
  }

  async getFollowers(userObj) {
    this.setState({ followerStatus: Status.UNDER_PROGRESS });
    let followers = await getFollowersV2(
      userObj.pk,
      this.progressStatusForFollowerFollowing,
      this.props.sleepStatusChanged,
      this.stopAPICallCheck
    );
    this.setState({ followers: followers, followerStatus: Status.FINISHED });
  }

  getDeadUsers() {
    let followers = this.state.followers;
    let likersCommenters = this.state.postsLikersCommentersUsers;
    let userMap = new Map();
    for (let i = 0; i < followers.length; i++) {
      userMap.set(followers[i].username, { isDead: true, user: followers[i] });
    }
    for (let i = 0; i < likersCommenters.length; i++) {
      if (userMap.has(likersCommenters[i].username)) {
        let follower = userMap.get(likersCommenters[i].username);
        userMap.set(likersCommenters[i].username, { isDead: false, user: follower });
      }
    }
    let deadUsers = [];
    for (let key of userMap.keys()) {
      let data = userMap.get(key);
      if (data.isDead) {
        deadUsers.push(data.user);
      }
    }
    let k = 0;
    return deadUsers.map(u => {
      u["key"] = (k++).toString();
      return u;
    });
  };

  render() {
    let warningMsgObj = {
      LEVEL: "warning",
      MESSAGE: "Use this only for accounts less than 24k followers as a safe limit ... (Instagram reduced their per day limit 😔)",
      LINK: "#"
    };
    return (
      <React.Fragment>
        <Prompt
          message="You will lose this data. You can open another tab also. Press Profile bud extension again"
          when={
            this.state.postStatus !== Status.INITIAL || this.state.likerCommenterStatus !== Status.INITIAL || this.state.followerStatus !== Status.INITIAL
          }
        />
        <NewMessageDisplayer messageObj={warningMsgObj}/>
        <br />

        <Row>
          <Col span={19}>
            <div style={{ textAlign: "center" }}>
              <DeadFollowersOptions onOptionsSubmit={this.onOptionsSubmit} self={this.props.self}/>
            </div>
          </Col>
          <Col span={5}>
            <NeedHelp type={NeedHelpEnum.DEAD_FOLLOWERS}/>
          </Col>
        </Row>
        <Divider/>

        {this.state.postStatus === Status.UNDER_PROGRESS ? (
          <ProgressBar
            title="Fetching Posts of the user"
            percentage={this.state.progressPercentForPosts}
            notShowOnZero={true}
          />
        ) : (
          <div/>
        )}

        {this.state.likerCommenterStatus === Status.UNDER_PROGRESS ? (
          <ProgressBar
            title="Fetching Likers/Commenters for all these posts"
            percentage={this.state.progressPercentForLikeAndComment}
            notShowOnZero={true}
          />
        ) : (
          <div/>
        )}
        {this.state.followerStatus === Status.UNDER_PROGRESS ? (
          <ProgressBar
            title="Fetching Followers"
            percentage={this.state.progressStatusForFollowerFollowing}
            notShowOnZero={true}
          />
        ) : (
          <div/>
        )}
        {this.state.followerStatus === Status.FINISHED &&
        this.state.likerCommenterStatus === Status.FINISHED ? (
          <div>
            <UserDisplayWithActions
              data={this.getDeadUsers()}
              isDetailed={false}
              handleActions={this.props.handleActions}
              username={this.state.userObj.username}
              location={this.props.location}
              paginatedDownload={false}
            />
          </div>
        ) : (
          <div/>
        )}
      </React.Fragment>
    );
  }
}

export default DeadFollowers;
