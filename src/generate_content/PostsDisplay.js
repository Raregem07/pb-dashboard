import React from "react";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import { Card, Col, Divider, Row } from "antd";
import PostCard from "./PostCard";
import Icons from "../common/components/Icons";
import ShowHashtags from "./ShowHashtags";

class PostsDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.postsInARow = ApplicationConstants.postDisplay.POSTS_IN_ONE_ROW;
    this.postsInOnePage = ApplicationConstants.postDisplay.POSTS_IN_ONE_PAGE;
  }

  getRowsColumns() {
    let rowCount = Math.ceil(this.props.posts.length / this.postsInARow);
    let final = [];
    let posts = this.props.posts;
    for (let i = 0; i < rowCount; i++) {
      let row = [];
      for (let j = 0; j < this.postsInARow; j++) {
        let key = i * this.postsInARow + j;
        if (key >= posts.length) {
          final.push(
            <div key={key.toString() + "div"}>
              <Row gutter={4}>{row}</Row>
            </div>
          );
          return final;
        }
        row.push(
          <Col span={8} key={key.toString() + "col"}>
            <PostCard
              post={posts[key]}
              key={key}
            />
          </Col>
        );
      }
      final.push(
        <div key={i.toString() + "div"}>
          <Row gutter={4}>{row}</Row>
          <Divider dashed={true}/>
        </div>
      );
    }
    return final;
  }

  render() {
    if (this.props.posts.length <= 0) {
      return <React.Fragment/>;
    }
    return <React.Fragment>
      <ShowHashtags posts={this.props.posts}/>
      <div className="center">Total Posts: {this.props.posts.length}</div>
      <Card
        style={{
          backgroundColor: "#f5f5f5",
          margin: 2,
          padding: 2
        }}
        title={<div>{Icons.TASKS}&nbsp;&nbsp;Targeted Posts</div>}
      >
        {this.getRowsColumns()}
      </Card>
    </React.Fragment>;
  }
}

export default PostsDisplay;
