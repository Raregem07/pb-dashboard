import React from 'react';
import EnterPost from "../common/components/EnterPost";
import GetPostFromShortcode from "../common/api_call/GetPostFromShortcode";
import getCommentersOfAPost from "../common/api_call/new_api_calls/GetCommentersOfAPost";
import { Spin } from "antd";
import GiveawayDownload from "./GiveawayDownload";
import GiveawayOptions from "./GiveawayOptions";
import SendEvent from "../common/Helpers/SendEvent";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import AddLevel2Calls from "../common/Helpers/AddLevel2Calls";
import GetObject from "../common/chrome/GetObject";
import DatabaseKeys from "../common/models/DatabaseKeys";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";

class GiveawayWinner extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      shortcode: "",
      post: null,
      commentersLoading: false,
      commenters: []
    }
  }

  getCommenters = async (shortcode) => {
    let nextPageToken = null;
    let commenters = [];
    this.setState({ commentersLoading: true });
    while (true) {
      let obj = await getCommentersOfAPost(shortcode, nextPageToken);
      await AddLevel2Calls(obj.users.length);
      commenters = commenters.concat(obj.users);
      this.setState({ commenters });
      nextPageToken = obj.nextPageToken;
      if (!nextPageToken) {
        break;
      }
    }
    this.setState({ commentersLoading: false });
  };

  getShortCodeLikeComment = async (shortcode, like, comment) => {
    SendEvent(AnalyticsCategoryEnum.GIVEAWAY_WINNER, `shortcode: ${shortcode}`, "");

    let post = await GetPostFromShortcode(shortcode);
    this.setState({ shortcode, post });
    this.getCommenters(shortcode);
  };

  getUsers = () => {
    let mainPost = this.state.post;
    let users = {};
    if (this.state.commenters.length > 0) {
      let commentedUsersForPost = this.state.commenters;
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
    return usersArray.map(u => {u['profileURL'] = u.profilePic; return u;});
  };

  render() {
    return <React.Fragment>
      <EnterPost
        help={NeedHelpEnum.GIVEAWAY_WINNER}
        getShortCodeLikeComment={this.getShortCodeLikeComment}
        showOptions={false}
      />
      <br />
      {this.state.commentersLoading ? <div className="center"><Spin /></div> : <React.Fragment />}
      <GiveawayOptions post={this.state.post} users={this.getUsers()} /><br />
      <GiveawayDownload users={this.getUsers()}/>

    </React.Fragment>
  }

}

export default GiveawayWinner;
