import React from "react";
import { Col, Divider, Pagination, Row } from "antd";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import NewPostCard from "./NewPostCard";

// Props: followers, posts, likeCountDisabled
class PostsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.postsInARow = ApplicationConstants.postsStatistics.POSTS_IN_ONE_ROW;
    this.postsInOnePage = ApplicationConstants.postsStatistics.POSTS_IN_ONE_PAGE;
    this.state = {
      pageNumber: 1
    };
  }

  getPostEngagement(post, followerCount) {
    if (followerCount === 0) {
      return "NA";
    }
    let commentCount = post.comment_count;
    let likeCount = post.like_count;
    if (this.props.likeCountDisabled) {
      return ((commentCount)*100/followerCount).toFixed(2);
    }
    return ((commentCount + likeCount)*100/followerCount).toFixed(2);
  }


  getRowsColumns() {
    let rowCount = Math.ceil(this.props.posts.length / this.postsInARow);
    let final = [];
    let posts = this.props.posts.slice(
      (this.state.pageNumber - 1) * this.postsInOnePage,
      this.state.pageNumber * this.postsInOnePage
    );
    let followers = 0;
    if (this.props.detailedUser) {
      followers = this.props.detailedUser.followerCount;
    }
    for (let i = 0; i < rowCount; i++) {
      let row = [];
      for (let j = 0; j < this.postsInARow; j++) {
        let key = i * this.postsInARow + j;
        if (key >= posts.length) {
          final.push(
            <div key={key.toString() + "div"}>
              <Row gutter={8}>{row}</Row>
            </div>
          );
          return final;
        }
        row.push(
          <Col span={8} key={key.toString() + "col"}>
            <NewPostCard
              post={posts[key]}
              engagementRate={this.getPostEngagement(posts[key], followers)}
              key={key}
            />
          </Col>
        );
      }
      final.push(
        <div key={i.toString() + "div"}>
          <Row gutter={4}>{row}</Row>
          <br />
        </div>
      );
    }
    return final;
  }

  changePageNumber = pgNumber => {
    this.setState({ pageNumber: pgNumber });
  };

  render() {
    return <React.Fragment>
      <div style={{marginLeft: 12}}>
      {this.getRowsColumns()}
      <Pagination
        style={{ textAlign: "center" }}
        current={this.state.pageNumber}
        total={this.props.posts.length}
        onChange={this.changePageNumber}
        pageSize={this.postsInOnePage}
      />
      </div>
    </React.Fragment>;
  }

}

export default PostsDisplay;
