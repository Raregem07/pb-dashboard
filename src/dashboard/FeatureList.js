/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Col, Row } from "antd";
import detailed_user from '../common/images/detailed_users_black.png'
import followerIcon from '../common/images/follower_following_black.png';
import hashtagIcon from '../common/images/hashtag_black.png';
import locationIcon from '../common/images/location.png';
import likerIcon from '../common/images/post_liker_commenter_black.png';
import similarIcon from '../common/images/similar_account_black.svg';
import emailIcon from '../common/images/email_icon_black_white.png';
import websiteIcon from '../common/images/website_icon.png';
import folFolIcon from '../common/images/follower_post_counts.png';
import engagementRateIcon from '../common/images/engagement_rate.png';
import phoneIcon from '../common/images/call_icon.png';

function FeatureList(props) {
  let features = props.features;
  let i = 0;
  if (props.oneIcon) {
    let featuresLI = features.map(f => {
      i++;
      let icon = <img src={f.img} alt="icon_image" width={"70%"}/>;
      return <div
        style={{
          fontWeight: "bold",
          font: "Medium 18px/48px Roboto",
          color: "#1F1F1F",
          fontSize: "110%",
          marginTop: "8%",
          textAlign: "left",
          marginBottom: "8%",
        }}
        key={i}
      >
        <Row>
          <Col span={4}>{icon}</Col>
          <Col span={20} style={{paddingTop: "0.5%"}}></Col>
        </Row>
      </div>
    });
    return <React.Fragment>
      {/* <div
        style={{
          fontWeight: "bold",
          font: "Medium 18px/48px Roboto",
          color: "#1F1F1F",
          fontSize: "110%",
          marginTop: "6%",
          textAlign: "left",
          marginBottom: "6%",
        }}
        key={"detailed_1"}
      > */}
        {/*Apart from Emails, also get*/}
        {/*/!*<Row>*!/*/}
        {/*/!*  <Col span={4} style={{paddingTop: "2%"}}><img src={detailed_user} alt="icon_image" width={"70%"}/></Col>*!/*/}
        {/*/!*  <Col span={20} >Key data points for a list of usernames </Col>*!/*/}
        {/*/!*</Row>*!/*/}
        {/*<div style={{*/}
        {/*  marginTop: "1%",*/}
        {/*  marginRight: "1%"*/}
        {/*}}>*/}
          {/* {featuresLI} */}
        {/*</div>*/}
        <div style={{color:"#ffff", fontSize:"16px"}}>
      {/* Email */}
      <div style={{display:"flex",alignItems:"baseline",gap:"12px"}}>
        <div>
          <img src={emailIcon} width="20" />
        </div>
        <div>Email</div>
      </div>
      {/* Website */}
      <div style={{display:"flex",alignItems:"baseline",gap:"12px"}}>
        <div>
          <img src={websiteIcon} width="20" />
        </div>
        <div>Website</div>
      </div>
      {/* Follower - Following Counts */}
      <div style={{display:"flex",alignItems:"baseline",gap:"12px"}}>
        <div>
          <img src={folFolIcon} width="20" />
        </div>
        <div>Follower - Following Counts</div>
      </div>
      {/* Engagement Rate */}
      <div style={{display:"flex",alignItems:"baseline",gap:"12px"}}>
        <div>
          <img src={engagementRateIcon} width="20" />
        </div>
        <div>Engagement Rate</div>
      </div>
      {/* Contact Numbers and Much more... */}
      <div style={{display:"flex",alignItems:"baseline",gap:"12px"}}>
        <div>
          <img src={phoneIcon} width="20" />
        </div>
        <div>Contact Numbers and Much more...</div>
      </div>
    </div>
        
      {/* </div> */}
    </React.Fragment>
  }

  let featurUI = features.map(feature => {
    i++;
    let icon = <img src={feature.img} alt="icon_image" width={"70%"}/>;

  

    // return <div
    //   style={{
    //     fontWeight: "bold",
    //     font: "Medium 18px/48px Roboto",
    //     color: "#1F1F1F",
    //     fontSize: "110%",
    //     marginTop: "6%",
    //     textAlign: "left",
    //     marginBottom: "6%",
    //   }}
    //   key={i}
    // >
    //   <Row>
    //     <Col span={4}>{icon}</Col>
    //     <Col span={20} style={{paddingTop: "0.5%"}}>{feature.TEXT}</Col>
    //   </Row>
    // </div>
  });
  return <React.Fragment>
    {/* {featurUI} */}
    <div style={{color:"#ffff", fontSize:"16px"}}>
      {/* follower-following */}
      <div style={{display:"flex",alignItems:"baseline",gap:"12px"}}>
        <div>
          <img src={followerIcon} width="20" />
        </div>
        <div>Follower-Following</div>
      </div>
      {/* Hashtags */}
      <div style={{display:"flex",alignItems:"baseline",gap:"12px"}}>
        <div>
          <img src={hashtagIcon} width="20" />
        </div>
        <div>Hashtags</div>
      </div>
      {/* Locations */}
      <div style={{display:"flex",alignItems:"baseline",gap:"12px"}}>
        <div>
          <img src={locationIcon} width="20" />
        </div>
        <div>Locations</div>
      </div>
      {/* Likers/Commenters of Post */}
      <div style={{display:"flex",alignItems:"baseline",gap:"12px"}}>
        <div>
          <img src={likerIcon} width="20" />
        </div>
        <div>Likers/Commenters of Post</div>
      </div>
      {/* Similar Account */}
      <div style={{display:"flex",alignItems:"baseline",gap:"12px"}}>
        <div>
          <img src={similarIcon} width="20" />
        </div>
        <div>Similar Account</div>
      </div>
    </div>
  </React.Fragment>
}

export default FeatureList;
