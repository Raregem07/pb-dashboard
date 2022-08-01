import React from "react";
import { Avatar, Card, Col, Divider, Icon, Row, Tooltip } from "antd";
import Icons from "../common/components/Icons";
import timediff from "timediff";
import DownloadPostAsFile from "../common/api_call/DownloadPostAsFile";
import GetDetailsOfAPost from "../common/api_call/GetDetailsOfAPost";

const { Meta } = Card;

async function onPostDownload(post) {
  if (post.is_video && !post.video_url) {
    try {
      post = await GetDetailsOfAPost(post.shortcode);
    } catch (e) {
    }
  }

  DownloadPostAsFile(
    post.is_video,
    post.display_url,
    post.video_url,
    post.taken_at_timestamp
  );
}

function getTimeDifference(post) {
  let epochTimeInSec = post.taken_at_timestamp;
  let postDate = new Date(epochTimeInSec * 1000);
  let { years, months, days, hours, minutes } = timediff(
    postDate,
    new Date(),
    "YMDHm"
  );
  let valueToReturn;
  if (years !== 0) {
    valueToReturn = `${years} Years`;
  }
  if (months !== 0 && months === 1) {
    valueToReturn = `${months} month`;
  }
  if (months !== 0 && months > 1) {
    valueToReturn = `${months} months`;
  }
  if (days !== 0) {
    valueToReturn = `${days} days`;
  }
  if (hours !== 0) {
    valueToReturn = `${hours} hours`;
  }
  valueToReturn = `${minutes} minutes`;
  return valueToReturn;
}

function PostCard(props) {
  let tooltipForPostCaption = `Post Caption - ${props.post.text}`;

  let buttonName = "Download";
  if (props.post.is_video) {
    buttonName = "Download Video";
  }
  let downloadActionUI = [
    <div onClick={() => onPostDownload(props.post)}>
      {buttonName} <Icon type="download" key="download"/>
    </div>
  ];

  let likeCount = props.post.like_count;
  if (likeCount === -1) {
    likeCount = "NA";
  }
  let likeCommentsUI = (
    <React.Fragment>
      <Divider dashed={true}/>
      <Row>
        <Col span={7}>
          {Icons.LIKE}: {likeCount}
        </Col>
        <Col span={6}>
          {Icons.COMMENT}: {props.post.comment_count}
        </Col>
        <Col span={11}>
          {Icons.DATE}: {getTimeDifference(props.post)}{" "}
        </Col>
      </Row>
    </React.Fragment>
  );

  let title = props.post.origin;
  if (props.post.is_video) {
    title = (
      <div>
        {props.post.origin} {Icons.VIDEO}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Card
        hoverable
        style={{ width: 280, padding: 4 }}
        actions={downloadActionUI}
        cover={
          <div className="center">
            <Tooltip title="Click to open the post in new tab">
              <Avatar
                size={260}
                alt="Image of relevant post"
                src={props.post.display_url}
                shape="square"
                onClick={() => {
                  window.open(`https://www.instagram.com/p/${props.post.shortcode}`, "_blank");
                }}
              />
            </Tooltip>
          </div>
        }
      >
        <Meta
          title={title}
          description={
            <Tooltip title={tooltipForPostCaption}>
              {props.post.text.slice(0, 40) + " ..."}
            </Tooltip>
          }
        />
        {likeCommentsUI}
      </Card>
      ,
    </React.Fragment>
  );
}

export default PostCard;
