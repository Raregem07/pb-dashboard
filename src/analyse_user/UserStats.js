import React from "react";
import { Card, Col, Divider, Icon, Row, Tooltip } from "antd";
import Icons from "../common/components/Icons";
import comment from "../common/images/comment.png";
import like from "../common/images/likes.png";
import engagementRate from "../common/images/engagement_rate.png";
import posts from "../common/images/posts.png";
import first_post_image from "../common/images/first_post_image.png";
import WebsiteIcon from "../common/images/website_icon.png";
import followers from "../common/images/followers.png";
import followerFollowingRatio from "../common/images/follower_following_ratio_icon.png";

function Box(props) {
  return (
    <div className="center">
      <strong>{props.name}</strong> &nbsp;&nbsp;{props.tooltipValue ? <Tooltip
      title={props.tooltipValue}>
      <Icon type="question-circle-o"/>
    </Tooltip> : <React.Fragment/>} <br/> <br/>
      <img src={props.img} alt="User Details" height={50} width={50}/> <br/> <br/>
      <strong>{props.value}</strong>
    </div>
  );
}

function getAverage(posts, key) {
  if (posts.length === 0) {
    return 0;
  }
  let count = 0;
  for (let i = 0; i < posts.length; i++) {
    count += posts[i][key];
  }
  return Math.round(count * 100 / posts.length) / 100;
}

class UserStats extends React.Component {
  render() {
    let props = this.props;
    let engagementRateValue = "NA", followerCount = "NA";
    if (props.detailedUser) {
      if (props.likeCountDisabled) {
        engagementRateValue = `${Math.round((getAverage(props.posts, "comment_count")) * 10000 / props.detailedUser.followerCount) / 100}%`;
      } else {
        engagementRateValue = `${Math.round((getAverage(props.posts, "comment_count") + getAverage(props.posts, "like_count")) * 10000 / props.detailedUser.followerCount) / 100}%`;
      }
      followerCount = props.detailedUser.followerCount;
    }
    let averageLikePostBox = <Col span={0}/>;
    if (!props.likeCountDisabled) {
      averageLikePostBox = <Col span={5}>
        <Box
          img={like}
          name="Average Like / post"
          value={getAverage(props.posts, "like_count")}
        />
      </Col>;
    }

    let sortedPosts = props.posts.sort((a, b) => {
      return a.taken_at_timestamp < b.taken_at_timestamp ? -1 : 1;
    });

    return (
      <Card
        title={<div>{Icons.USER} &nbsp;&nbsp;&nbsp;User Stats</div>}
        style={{ margin: 12, backgroundColor: "#fbfbfb" }}
      >
        <Row gutter={16}>
          <Col span={5}>
            <Box
              img={comment}
              name="Average Comments / post"
              value={getAverage(props.posts, "comment_count")}
            />
          </Col>
          {averageLikePostBox}
          <Col span={5}>
            <Box
              tooltipValue={
                <div>Average Engagement w.r.t Followers <br/> >1M -> 1.97% <br/>100K - 1M -> 2.05% <br/> 20K - 100K ->
                  2.15% <br/> 5K - 20K -> 2.43% <br/> 1K - 5K -> 5.60%
                </div>}
              img={engagementRate}
              name={props.likeCountDisabled ? "Comment Only Engagement Rate" : "Engagement Rate"}
              value={engagementRateValue}
            />
          </Col>
          <Col span={5}>
            <Box
              img={followers}
              name="Followers"
              value={followerCount}
            />
          </Col>
          <Col span={4}>
            <Box
              img={posts}
              name="Posts"
              value={props.posts.length}
            />
          </Col>
        </Row>
        <Divider/>
        <Row gutter={16}>
          <Col span={5}>
            <Box
              img={first_post_image}
              name="First Post Date"
              value={sortedPosts.length > 0 ? sortedPosts[0].postDateInReadableFormat() : "No Post"}
            />
          </Col>
          {props.detailedUser ? <Col span={5}>
            <Box
              img={WebsiteIcon}
              name="Website in Bio"
              value={!props.detailedUser.externalURL ? "Not Mentioned" : props.detailedUser.externalURL}
            />
          </Col> : <React.Fragment/>}
          <Col span={5}>
            <Box
              img={followerFollowingRatio}
              name="Follower-Following Ratio"
              value={(props.detailedUser.followerCount / props.detailedUser.followingCount).toFixed(2)}
            />
          </Col>
          <Col span={5}>
            <Box
              img={followers}
              name="Followings"
              value={props.detailedUser.followingCount}
            />
          </Col>
        </Row>

      </Card>
    )
      ;
  }
}

export default UserStats;
