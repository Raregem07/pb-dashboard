import React from "react";
import { Button, Col, Row, Tooltip } from "antd";
import Icons from "../common/components/Icons";
import DownloadPostAsFile from "../common/api_call/DownloadPostAsFile";
import GetPostFromShortcode from "../common/api_call/GetPostFromShortcode";
import SendEvent from "../common/Helpers/SendEvent";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";

async function getVideoURL(post) {
  let shortcode = post.shortcode;
  let detailedPost = await GetPostFromShortcode(shortcode);
  return detailedPost.video_url;
}

function NewPostCard(props) {
  let post = props.post;
  let engagementRate = props.engagementRate;
  let postURL = post.display_url;
  let postBio = post.text;
  let likeCount = post.like_count;
  let commentCount = post.comment_count;
  let postDate = post.postDateInReadableFormat();
  let isVideo = post.is_video;
  let videoURL = post.video_url;

  return (
    <React.Fragment>
      <div
        style={{
          width: "90%",
          backgroundColor: "#FFF"
        }}
      >
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#001429",
            height: "10%",
            color: "#fff",
            paddingTop: "1%",
            paddingBottom: "1%",
            borderTopRightRadius: 11,
            borderTopLeftRadius: 11,
          }}
        >
          <Row>
            <Col span={3}>{isVideo ? <Tooltip title="Post is a video"> {Icons.VIDEO} </Tooltip>: <React.Fragment />}</Col>
            <Col span={21}>
              Post Engagement: <strong>{engagementRate}%</strong>
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
              src={postURL}
              width={"100%"}
              alt="post image"
              onClick={() => {
                window.open(
                  `https://www.instagram.com/p/${post.shortcode}/`,
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
            paddingTop: "1%",
            paddingBottom: "1%",
            borderBottomLeftRadius: 11,
            borderBottomRightRadius: 11
          }}
        >
          <Row>
            <Col span={7}>
              {Icons.LIKE}: &nbsp;&nbsp;{likeCount}
            </Col>
            <Col span={7}>
              {Icons.COMMENT}: &nbsp;&nbsp;{commentCount}
            </Col>
            <Col span={10}>
              <Button
                style={{ backgroundColor: "#FFF", height: 25 }}
                onClick={async () => {
                  SendEvent(AnalyticsCategoryEnum.NEW_ANALYSE_POSTS, `Download Post Button Clicked`, "");
                  if (isVideo) {
                    videoURL = await getVideoURL(post);
                  }
                  DownloadPostAsFile(isVideo, postURL, videoURL, postDate);
                }}
              >
                Download
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewPostCard;
