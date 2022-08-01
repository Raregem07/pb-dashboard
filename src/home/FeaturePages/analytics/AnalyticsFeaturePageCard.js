import React from "react";
import DetailedAnalysisOfAccountIcon from "../../../common/icons/DetailedAnalysisOfAccountIcon";
import FollowerFollowingIcon from "../../../common/icons/FollowerFollowingIcon";
import DeadFollowerIcon from "../../../common/icons/DeadFollowerIcon";
import AnalysePostStatsIcon from "../../../common/icons/AnalysePostStatsIcon";
import BestAndTrendingPostsIcon from "../../../common/icons/BestAndTrendingPostsIcon";
import RelatedHashtagsIcon from "../../../common/icons/RelatedHashtagsIcon";
import giveAwayWinner from "../../../common/images/give_away_winner.png";
import similarAccount from "../../../common/images/similar_account.png";
import splitImage from "../../../common/images/split_image.png";
import heartTool from "../../../common/images/heart_tool.png";
import sleepStories from "../../../common/images/stories_while_you_sleep.png";
import commonFollower from "../../../common/images/common_followers.png";
import mostUsedFeatureImg from "../../../common/images/MostUsedImg.png";
import detailedUsernames from "../../../common/images/driver_license.png";
import hashtag from "../../../common/images/hashtag_white.png";
import location from "../../../common/images/location_white_resize.png";
import TasksToEngageIcon from "../../../common/icons/TasksToEngageIcon";
import ConfigurationSettingsIcon from "../../../common/icons/ConfigurationSettingsIcon";
import CompletedTasksNewIcon from "../../../common/icons/CompletedTasksNewIcon";
import { Col, Row } from "antd";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../../../common/constants/AnalyticsCategoryEnum";
import { Link } from "react-router-dom";
import AnalyseUserLikerCommenterIcon from "../../../common/icons/AnalyseUserLikerCommenterIcon";
import AnalysePostLikerCommenterIcon from "../../../common/icons/AnalysePostLikerCommenterIcon";
import SendEvent from "../../../common/Helpers/SendEvent";


function AnalyticsFeaturePageCard(props) {
  let icon = <div/>;
  let isMostUsed = props.isMostUsed;

  let mostUsedIcon = <React.Fragment/>;

  if (props.identifier === "profile_report") {
    icon = <DetailedAnalysisOfAccountIcon/>;
  } else if (props.identifier === "fans_and_brats_analysis") {
    icon = <img src={commonFollower} alt="Split Image" height={72} width={72}/>;
  } else if (props.identifier === "follower_following") {
    icon = <FollowerFollowingIcon/>;
  } else if (props.identifier === "dead_followers") {
    icon = <DeadFollowerIcon/>;
  } else if (props.identifier === "post_stats") {
    icon = <AnalysePostStatsIcon/>;
  } else if (props.identifier === "user_likers_commenters") {
    icon = <AnalyseUserLikerCommenterIcon/>;
  } else if (props.identifier === "post_likers_commenters") {
    icon = <AnalysePostLikerCommenterIcon/>;
  } else if (props.identifier === "best_posts") {
    icon = <BestAndTrendingPostsIcon/>;
  } else if (props.identifier === "related_hashtags") {
    icon = <RelatedHashtagsIcon/>;
  } else if (props.identifier === "giveaway_winner") {
    icon = <img src={giveAwayWinner} alt="Giveaway winner" height={64} width={64}/>;
  } else if (props.identifier === "heart_image") {
    icon = <img src={heartTool} alt="Heart your Image tool" height={64} width={64}/>;
  } else if (props.identifier === "split_image_tool") {
    icon = <img src={splitImage} alt="Split Image" height={64} width={64}/>;
  } else if (props.identifier === "tasks_to_engage_with_audience") {
    icon = <TasksToEngageIcon/>;
  } else if (props.identifier === "sleep_stories") {
    icon = <img src={sleepStories} alt="Split Image" height={66} width={66}/>;
  } else if (props.identifier === "common_follower") {
    icon = <img src={commonFollower} alt="Split Image" height={72} width={72}/>;
  } else if (props.identifier === "set_configurations") {
    icon = <ConfigurationSettingsIcon/>;
  } else if (props.identifier === "get_tasks") {
    icon = <TasksToEngageIcon/>;
  } else if (props.identifier === "completed_tasks") {
    icon = <CompletedTasksNewIcon/>;
  } else if (props.identifier === "detailed_usernames") {
    icon = <img src={detailedUsernames} alt="Split Image" height={64} width={64}/>;
  } else if (props.identifier === "hashtag") {
    icon = <img src={hashtag} alt="Hashtag" height={64} width={64}/>;
  } else if (props.identifier === "location") {
    icon = <img src={location} alt="Location" height={64} width={64}/>;
  } else if (props.identifier === "similar_account") {
    icon = <img src={similarAccount} alt="Similar Account" height={64} width={64}/>;
  }
  // TODO Add Targeted leads icons

  let heightOfText = 80;
  let width = "90%";

  if (isMostUsed) {
    mostUsedIcon =
      <img src={mostUsedFeatureImg} alt="Most Used" height={48} width={48}/>;
  }

  if (props.cardBig) {
    heightOfText = 80;
    width = "65%";
  }

  return (
    <React.Fragment>
      <Link
        className="link"
        to={props.action}
        onClick={() => {
          SendEvent(AnalyticsCategoryEnum.FEATURE_CARD_CLICKED, props.action, "");
        }}
      >
        <div
          style={{
            width: width,
            backgroundColor: props.backgroundColor,
            borderRadius: 11,
            paddingBottom: "3%"
          }}
        >

          <Row>
            <Col span={2}>
              <div style={{
                textAlign: "left",
                marginLeft: 16,
                marginTop: 4
              }}>
                {mostUsedIcon}
              </div>
            </Col>
            <Col span={20}>
              <div style={{
                textAlign: "center",
                marginTop: 20,
                marginRight: 8
              }}>{icon}</div>
            </Col>
          </Row>


          <div
            style={{
              font: "Black 26px/32px Roboto",
              color: "#FFF",
              textAlign: "center",
              fontSize: 25,
              fontWeight: "bold",

              height: heightOfText,
              paddingTop: 16,
              padding: 4
            }}
          >
            {props.name}
          </div>
          <div style={{
            marginLeft: 12,
            backgroundColor: "#FFF",
            width: "90%",
            textAlign: "center",
            borderRadius: 11,

            color: props.backgroundColor,
            fontWeight: "bold",
            fontSize: 28,
          }}>
            GO
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
}

export default AnalyticsFeaturePageCard;
