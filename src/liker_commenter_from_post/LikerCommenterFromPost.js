/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Card, Divider, Spin } from "antd";
import getCommentersOfAPost from "../common/api_call/new_api_calls/GetCommentersOfAPost";
import getLikersOfAPost from "../common/api_call/new_api_calls/GetLikersOfAPost";
import AnalysePostsDisplayEnum from "../analyse_posts/AnalysePostsDisplayEnum";
import UsersDisplayer from "../analyse_posts/UsersDisplayer";
import GetPostFromShortcode from "../common/api_call/GetPostFromShortcode";
import PostAnalysisDownloader from "../analyse_posts/PostAnalysisDownloader";
import EnterPost from "../common/components/EnterPost";
import ShowPost from "./ShowPost";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
//import GetPostFromShortcodeAnonymously from "../common/api_call/GetPostFromShortCodeAnonymously";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import SendEvent from "../common/Helpers/SendEvent";
import { AppContext } from "../home/Home";
import { Prompt } from "react-router-dom";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import AddLevel2Calls from "../common/Helpers/AddLevel2Calls";
import ReactMarkdown from "react-markdown";
import sleep from "../common/Sleep";
import NewNotification from "../common/components/NewNotification";

class LikerCommenterFromPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      post: null,
      like: true,
      comment: true,
      likers: [],
      commenters: [],
      rateLimitOccurred: false
    };
  }

  static async getLikers(
    shortcode,
    isPrivate,
    sleepStatusChanged,
    stopApiCallsCallback,
    addLikers,
    rateLimited = () => {
    }
  ) {
    let nextPageToken = null;
    let likers = [];
    while (true) {
      if (stopApiCallsCallback()) {
        return;
      }
      let obj;
      try {
        obj = await getLikersOfAPost(shortcode, nextPageToken, true);
      } catch (e) {
        sendNotification(
          NotificationTypeEnum.Failure,
          "Wait for 24 hours | Max done for the day"
        );
        rateLimited(true);
        return;
      }
      likers = likers.concat(obj.users);
      await sleep(2000);
      await AddLevel2Calls(obj.users.length);
      SendEvent(AnalyticsCategoryEnum.GETTING_LIKERS, `Likers successful`, "");
      addLikers(likers);
      nextPageToken = obj.nextPageToken;
      if (!nextPageToken) {
        break;
      }
    }
  }

  static async getCommenters(
    shortcode,
    isPrivate,
    sleepStatusChanged,
    stopApiCallsCallback,
    addCommenters,
    rateLimited = () => {
    }
  ) {
    let nextPageToken = null;
    let commenters = [];
    while (true) {
      if (stopApiCallsCallback()) {
        return;
      }
      let obj;
      try {
        obj = await getCommentersOfAPost(shortcode, nextPageToken, true);
      } catch (e) {
        sendNotification(
          NotificationTypeEnum.Failure,
          "Wait for 24 hours | Max done for the day"
        );
        rateLimited(true);
        return;
      }
      commenters = commenters.concat(obj.users);
      await sleep(2000);
      await AddLevel2Calls(obj.users.length);
      SendEvent(AnalyticsCategoryEnum.GETTING_COMMENTERS, `Commenters call successful`, "");
      addCommenters(commenters);
      nextPageToken = obj.nextPageToken;
      if (!nextPageToken) {
        break;
      }
    }
  }

  static getUsers(post, likeNeeded, likers, commentNeeded, commenters) {
    let users = {};
    let mainPost = post;

    if (likeNeeded && likers.length > 0) {
      let likedUsersForPost = likers;
      likedUsersForPost.map(u => {
        u.commentedPosts = [];
        u.commentedValues = [];
        u.likedPosts = [];
      });

      mainPost.setLikedUsers(likedUsersForPost);
      for (let j = 0; j < likedUsersForPost.length; j++) {
        if (likedUsersForPost[j].username in users) {
          users[likedUsersForPost[j].username].addLikedPost(mainPost);
        } else {
          likedUsersForPost[j].addLikedPost(mainPost);
          users[likedUsersForPost[j].username] = likedUsersForPost[j];
        }
      }
    }

    if (commentNeeded && commenters.length > 0) {
      let commentedUsersForPost = commenters;
      commentedUsersForPost.map(u => {
        u.commentedPosts = [];
        u.commentedValues = [];
        u.likedPosts = [];
      });

      mainPost.setCommentedUsers(commentedUsersForPost);
      for (let j = 0; j < commentedUsersForPost.length; j++) {
        if (commentedUsersForPost[j].username in users) {
          users[commentedUsersForPost[j].username].addCommentedPost(
            mainPost,
            commentedUsersForPost[j].commentValue
          );
        } else {
          commentedUsersForPost[j].addCommentedPost(
            mainPost,
            commentedUsersForPost[j].commentValue
          );
          users[commentedUsersForPost[j].username] = commentedUsersForPost[j];
        }
      }
    }

    let usersArray = [];
    for (let user in users) {
      usersArray.push(users[user]);
    }
    return usersArray.map(u => {
      u["profileURL"] = u.profilePic;
      return u;
    });
  }

  makeRateLimited = (v) => {
    this.setState({ rateLimitOccurred: v });
  };

  likersLoading = boolValue => {
    this.setState({ likersLoading: boolValue });
  };

  addLikers = likers => {
    this.setState({ likers });
  };

  addCommenters = commenters => {
    this.setState({ commenters });
  };

  componentWillUnmount() {
    this.stopApiCalls = true;
  }

  stopApiCallback = () => {
    return this.stopApiCalls;
  };

  getShortCodeLikeComment = async (shortcode, like, comment) => {
    SendEvent(AnalyticsCategoryEnum.LIKER_COMMENTER_FROM_POST, `Scraping Liker Commenter for shortcode ${shortcode}`, "");
    let post;
    try {
      post = await GetPostFromShortcode(shortcode);
    } catch (e) {
      NewNotification("Please rotate account. This account limits are over for getting likers/commenters of post")
      return
    }
    let postOwner = post.ownerObj;
    let isPrivate = postOwner.is_private;


    this.setState({ shortcode, post });
    if (like) {
      this.likersLoading(true);
      LikerCommenterFromPost.getLikers(
        shortcode,
        isPrivate,
        this.props.sleepStatusChanged,
        this.stopApiCallback,
        this.addLikers,
        this.makeRateLimited
      );
      this.likersLoading(false);
    }
    if (comment) {
      this.setState({ commentersLoading: true });
      LikerCommenterFromPost.getCommenters(
        shortcode,
        isPrivate,
        this.props.sleepStatusChanged,
        this.stopApiCallback,
        this.addCommenters,
        this.makeRateLimited
      );
      this.setState({ commentersLoading: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Prompt
          message="You will lose this data. You can open another tab also. Press Profile bud extension again"
          when={
            this.state.likers.length + this.state.commenters.length > 0
          }
        />

        {this.props.context.mainMessages.post_liker_commenter === "" ? <React.Fragment/> :
          <div className="main-message">
            <ReactMarkdown source={this.props.context.mainMessages.post_liker_commenter}/>
          </div>
        }

        <EnterPost
          help={NeedHelpEnum.ANALYSE_POST_LIKER_COMMENTER}
          getShortCodeLikeComment={this.getShortCodeLikeComment}
          showOptions={true}
        />

        {this.state.rateLimitOccurred ?
          <React.Fragment>
            <Card
              bordered={true}
              style={{
                margin: "2%",
                backgroundColor: "#fbfbfb",
              }}
            >
              <div
                style={{
                  paddingLeft: "5%",
                  fontSize: "150%",
                  paddingBottom: "1%"
                }}
              >
                <strong>
                  Daily Limits Over. Download data
                </strong>
                <br/>
                This limit is from instagram and per instagram account. Use a different instagram
                account to reset daily limit or wait. Step by Step{" "}
                <a
                  href={"https://blog.profilebuddy.io/how-to-rotate-instagram-accounts-to-reset-limits-in-profilebuddy.html"}
                  target="_blank"
                >
                  here
                </a>
              </div>
            </Card>
          </React.Fragment>
          : <React.Fragment />}
        <Divider/>
        {this.state.likersLoading || this.state.commentersLoading ? (
          <div className="center">
            <Spin/>
          </div>
        ) : (
          <div/>
        )}
        <br/>
        <ShowPost post={this.state.post}/>
        <br/>
        <PostAnalysisDownloader
          users={LikerCommenterFromPost.getUsers(
            this.state.post,
            this.state.like,
            this.state.likers,
            this.state.comment,
            this.state.commenters
          )}
        />
        <UsersDisplayer
          users={LikerCommenterFromPost.getUsers(
            this.state.post,
            this.state.like,
            this.state.likers,
            this.state.comment,
            this.state.commenters
          )}
          whatToShow={AnalysePostsDisplayEnum.USERS}
          posts={["Something"]}
          singlePost={true}
        />
      </React.Fragment>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {context => <LikerCommenterFromPost context={context} {...props} />}
  </AppContext.Consumer>
);
