import React from 'react';
import Icons from "../common/components/Icons";
import { Avatar, Button, Card, Col, Divider, Row, Tooltip } from "antd";
import DownloadPostAsFile from "../common/api_call/DownloadPostAsFile";
import RelatedHashtags from "../related_hashtags/RelatedHashtags";

function InstagramPostDisplay(props) {
  let postLink = "https://www.instagram.com/p/"+props.post.shortcode+"/";
  let likeCount = props.post.like_count;
  let commentCount = props.post.comment_count;
  let displayURL = props.post.display_url;
  let postText = props.post.text;
  let hashtags = RelatedHashtags.extractTokensFromPosts([props.post], "#").map(obj => {return obj.name});
  const reducer = (accumulator, currentValue) => accumulator + currentValue + ", ";
  let hashtagString = hashtags.reduce(reducer, "");
  if (hashtagString === "") {
    hashtagString = "None Used";
  }
  return <div
    style={{
      width: "90%",
      backgroundColor: "#FFF",
      margin: 12,
      boxShadow: "0px 3px 6px #00000029",
      borderRadius: 11,
    }}
  >
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#001429",
        height: "10%",
        color: "#fff",
        paddingTop: 6,
        borderTopRightRadius: 11,
        borderTopLeftRadius: 11,
      }}
    >
      <Row>
        <Col span={12}>
          Likes: <strong>{likeCount}</strong>
        </Col>
        <Col span={12}>
          Comments: <strong>{commentCount}</strong>
        </Col>
      </Row>
    </div>

    <div
      style={{
        textAlign: "center",
        height: "72%"
      }}
    >
      <Tooltip placement="right" title="Click to open the post in new tab">
        <img
          src={displayURL}
          width="100%"
          alt="post image"
          onClick={() => {
            window.open(
              postLink,
              "_blank"
            );
          }}
        />
      </Tooltip>
    </div>
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#001429",
        color: "#fff",
        paddingBottom: 4,
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11
      }}
    >
      <div style={{backgroundColor: "#000"}}>
        <strong>Hashtags Used</strong>: {hashtagString}
      </div>
      <br />
      <div style={{backgroundColor: "#001429"}}>
        {props.post.postDateInReadableFormat()}
      </div>
      <br />
      <div style={{backgroundColor: "#000",        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11 }}>
      <Tooltip title={postText} placement="bottom">
        <strong>Post Caption</strong>: {postText.slice(0,80)}....
      </Tooltip>
      </div>
    </div>
  </div>

  // return <Card
  //   style={{ margin: 12, backgroundColor: "#FFFFFF" }}
  //   cover={
  //     <Tooltip title="Click on the image to open the post"><img src={props.image} alt="instagram post image" onClick={() => {window.open(postLink, "_blank")}}/></Tooltip>
  //   }
  // >
  //   <strong>Likes: {props.likeCount} &nbsp;&nbsp;&nbsp; Comments: {props.commentCount}</strong>
  //   <Divider />
  //   {props.postText}
  // </Card>
}

export default InstagramPostDisplay;
