import React from "react";
import { Card, Col, Row } from "antd";
import Icons from "../common/components/Icons";
import InstagramEmbed from "react-instagram-embed";
import InstagramPostDisplay from "./InstagramPostDisplay";
import RelatedHashtags from "../related_hashtags/RelatedHashtags";

function getPostsMetricWise(metric, posts, type) {
  let sortedPosts;
  if (metric === "like" && type === "best") {
    sortedPosts = posts.sort((p1,p2) => {return (p1.like_count < p2.like_count ? 1 : -1)})
  }
  if (metric === "comment" && type === "best") {
    sortedPosts = posts.sort((p1,p2) => {return (p1.comment_count < p2.comment_count ? 1 : -1)})
  }
  if (metric === "like" && type === "worst") {
    sortedPosts = posts.sort((p1,p2) => {return (p1.like_count > p2.like_count ? 1 : -1)})
  }
  if (metric === "comment" && type === "worst") {
    sortedPosts = posts.sort((p1,p2) => {return (p1.comment_count > p2.comment_count ? 1 : -1)})
  }
  return sortedPosts;
}

function Top3PostsMetricWise(props) {
  if (props.likeCountDisabled) {
    return <div />
  }
  let title, icon;
  if (props.type === "best") {
    title = `Top 6 posts ${props.metric} wise`;
    icon = Icons.TOP_POSTS;
  } else {
    icon= Icons.WORST_POSTS;
    title = `Worst 6 posts ${props.metric} wise`;
  }
  let posts = getPostsMetricWise(props.metric, props.posts, props.type);
  let topPost1 = <div />, topPost2 = <div />, topPost3 = <div />, topPost4 = <div />, topPost5 = <div />, topPost6 = <div />;
  if (posts.length > 0) {
    topPost1 = <InstagramPostDisplay
      post={posts[0]}
    />
  }
  if (posts.length > 1) {
    topPost2 = <InstagramPostDisplay
      post={posts[1]}
    />
  }
  if (posts.length > 2) {
    topPost3 = <InstagramPostDisplay
      post={posts[2]}
    />
  }
  if (posts.length > 3) {
    topPost4 = <div><InstagramPostDisplay
      post={posts[3]}
    /></div>
  }
  if (posts.length > 4) {
    topPost5 = <div><InstagramPostDisplay
      post={posts[4]}
    /></div>
  }
  if (posts.length > 5) {
    topPost6 = <div><InstagramPostDisplay
      post={posts[5]}
    /></div>
  }
  return <Card
    title={<div>{icon} &nbsp;&nbsp;&nbsp;{title}</div>}
    style={{ margin: 12, backgroundColor: "#fbfbfb" }}
  >
    <Row gutter={8}>
      <Col span={8}>
        {topPost1}
      </Col>
      <Col span={8}>
        {topPost2}
      </Col>
      <Col span={8}>
        {topPost3}
      </Col>
    </Row>
    <br />
    <Row gutter={8}>
      <Col span={8}>
        {topPost4}
      </Col>
      <Col span={8}>
        {topPost5}
      </Col>
      <Col span={8}>
        {topPost6}
      </Col>
    </Row>
  </Card>;
}

export default Top3PostsMetricWise;
