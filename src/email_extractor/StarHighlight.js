import React from 'react';
import { Col } from "antd";
import { Row } from "antd/es";
import StarIcon from "../common/images/star_icon.png";
import { Link } from "react-router-dom";
import FeatureDetails from "../home/FeatureDetails";

function StarHighlightEmail(props) {
  let messageComp = <React.Fragment>
    Download <Link to={FeatureDetails.TIER_2.ACTION} className="attractive-box-text">Targeted users
    (Followers, Hashtag users, Likers etc)</Link> first and paste the usernames here
  </React.Fragment>;
  return <Row>
    <Col span={24}>
      <div
        style={{
          width: "95%",

          paddingTop: "1%",
          paddingBottom: "0.5%",
          paddingLeft: "2%",
          paddingRight: "1%",
          marginLeft: "1%",

          backgroundColor: "#F0C156",
          color: "#FFF",


          boxShadow: "0px 3px 6px #00000029",
          borderRadius: 6,
          font: "Black 29px/35px Roboto",

          fontSize: "130%",
          fontWeight: "bold",
          marginBottom: 4
        }}
      >
        <Row>
          <Col span={2}>
            <img src={StarIcon} height={32} width={32} alt={"star"}/>
          </Col>
          <Col span={22}>
            {messageComp}
          </Col>
        </Row>
      </div>
    </Col>
  </Row>
}

export default StarHighlightEmail;

