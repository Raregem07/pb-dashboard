import React from "react";
import { Button, Col, Row } from "antd";
import { CSVLink } from "react-csv";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import ReplaceSubstring from "../common/Helpers/ReplaceSubstring";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";
import DownloadAPI from "../common/DownloadAPI";

class PostAnalysisDownloader extends React.Component {
  constructor(props) {
    super(props);
  }

  static sendDatadownloaderAnalyticsEvent(type) {
    ReactGA.event({
      category: type,
      action: `Downloaded`
    });
  }

  getPostWiseCSVData() {
    let likedRows = [];
    let commentedRows = [];
    let posts = this.props.posts;
    for (let i = 0; i < posts.length; i++) {
      let postID = posts[i].id;
      let postLikeCount = posts[i].like_count;
      let postDateTime = posts[i].postDateInReadableFormat();
      let postCommentCount = posts[i].comment_count;
      let isVideo = posts[i].isVideoPostInString();
      let postCaption = ReplaceSubstring(
        ReplaceSubstring(
          ReplaceSubstring(posts[i].text, ",", "-"),
          '"',
          "<quote>"
        ),
        "\n",
        " | "
      );
      let postURL = posts[i].display_url;
      for (let j = 0; j < posts[i].likedUsers.length; j++) {
        let row = [];
        row.push(
          postURL,
          postID,
          postLikeCount,
          postDateTime,
          postCommentCount,
          isVideo,
          postCaption,
          posts[i].likedUsers[j].username,
          posts[i].likedUsers[j].profileURL,
          posts[i].likedUsers[j].fullName,
          ""
        );
        likedRows.push(row);
      }
      for (let j = 0; j < posts[i].commentedUsers.length; j++) {
        let row = [];
        row.push(
          postURL,
          postID,
          postLikeCount,
          postDateTime,
          postCommentCount,
          isVideo,
          postCaption,
          posts[i].commentedUsers[j].username,
          posts[i].commentedUsers[j].profileURL,
          posts[i].commentedUsers[j].fullName,
          ReplaceSubstring(
            ReplaceSubstring(
              ReplaceSubstring(
                posts[i].commentedUsers[j].commentValue,
                ",",
                "-"
              ),
              '"',
              "<quote>"
            ),
            "\n",
            " | "
          )
        );
        commentedRows.push(row);
      }
    }
    return {
      liked: likedRows,
      commented: commentedRows
    };
  }

  getUserWiseCSVData() {
    let likedRows = [];
    let commentedRows = [];
    let users = this.props.users;
    for (let i = 0; i < users.length; i++) {
      let username = users[i].username;
      let profileURL = users[i].profileURL;
      let likedPosts = users[i].likedPosts;
      let commentedPosts = users[i].commentedPosts;
      for (let j = 0; j < likedPosts.length; j++) {
        let row = [];
        row.push(
          username,
          "https://www.instagram.com/p/"+likedPosts[j].shortcode+"/",
          likedPosts[j].isVideoPostInString(),
          likedPosts[j].like_count,
          likedPosts[j].comment_count,
          likedPosts[j].postDateInReadableFormat(),
          "https://www.instagram.com/"+username,
          ""
        );
        likedRows.push(row);
      }
      for (let j = 0; j < commentedPosts.length; j++) {
        let row = [];
        row.push(
          username,
          "https://www.instagram.com/p/"+commentedPosts[j].shortcode+"/",
          commentedPosts[j].isVideoPostInString(),
          commentedPosts[j].like_count,
          commentedPosts[j].comment_count,
          commentedPosts[j].postDateInReadableFormat(),
          "https://www.instagram.com/"+username,
          ReplaceSubstring(
            ReplaceSubstring(
              ReplaceSubstring(users[i].commentedValues[j], ",", "-"),
              '"',
              "<quote>"
            ),
            "\n",
            " | "
          )
        );
        commentedRows.push(row);
      }
    }
    return {
      liked: likedRows,
      commented: commentedRows
    };
  }

  render() {
    if (this.props.users.length === 0) {
      return <React.Fragment />;
    }

    let usersLikedFilename = `liked_users`;
    let usersCommentedFilename = `commented_users`;

    let likedColummns = [
      { label: "Username", value: "username" },
      { label: "User Link", value: "user_link" },
      { label: "post_date_time", value: "post_date_time" },
      { label: "Post Likes' Count", value: "like_count" },
      { label: "Is Video Post?", value: "is_video_post"},
      { label: "Post Link", value: "post_link" },
    ];

    let commentedColummns = [
      { label: "Username", value: "username" },
      { label: "User Link", value: "user_link" },
      { label: "Post Likes' Count", value: "like_count" },
      { label: "post_date_time", value: "post_date_time" },
      { label: "Is Video Post?", value: "is_video_post"},
      { label: "Post Link", value: "post_link" },
      { label: "Comment Value", value: "comment_value" },
    ];

    let userWiseCSVData = this.getUserWiseCSVData();
    let likedUserWiseData = userWiseCSVData["liked"];
    let likedUserDownloadData = likedUserWiseData.map(d => {
      return {
        username: d[0],
        like_count: d[3],
        comment_count: d[4],
        post_date_time: d[5],
        is_video_post: d[2],
        post_link: d[1],
        user_link: d[6],
        comment_value: d[7]
      }
    });
    let commentedUserWiseData = userWiseCSVData["commented"];
    let commentedUserDownloadData = commentedUserWiseData.map(d => {
      return {
        username: d[0],
        like_count: d[3],
        comment_count: d[4],
        post_date_time: d[5],
        is_video_post: d[2],
        post_link: d[1],
        user_link: d[6],
        comment_value: d[7]
      }
    });

    return (
      <div
        style={{
          padding: 5,
          backgroundColor: "#FFF",
          textAlign: "center",
          boxShadow: "0px 3px 6px #00000029",
          borderRadius: 11,
          height: 50
        }}
      >
        <Row gutter={12}>
          <Col span={12}>

            <Button
              icon="download"
              onClick={() => {
                PostAnalysisDownloader.sendDatadownloaderAnalyticsEvent(
                  AnalyticsCategoryEnum.DOWNLOAD_LIKERS
                );
                DownloadAPI(likedUserDownloadData, likedColummns, usersLikedFilename);
              }}
            >
              Download Likers
            </Button>

          </Col>
          <Col span={12}>
            <Button
              icon="download"
              onClick={() => {
                PostAnalysisDownloader.sendDatadownloaderAnalyticsEvent(
                  AnalyticsCategoryEnum.DOWNLOAD_COMMENTERS
                );
                DownloadAPI(commentedUserDownloadData, commentedColummns, usersCommentedFilename);
              }}
            >
              Download Commenters
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PostAnalysisDownloader;
