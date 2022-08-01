import React from 'react';
import { Col, Row } from "antd";
import StarIcon from "../images/star_icon.png";

function AttractiveMessageBox(props) {
  return <div
    style={{
      width: "70%",

      paddingTop: "2%",
      paddingBottom: "2%",
      paddingLeft: "2%",
      paddingRight: "1%",
      marginLeft: "16%",



      backgroundColor: "#F0C156",
      color: "#FFF",

      boxShadow: "0px 3px 6px #00000029",
      borderRadius: 6,
      font: "Black 29px/35px Roboto",

      fontSize: "130%",
      fontWeight: "bold",
    }}
  >
    <Row>
      <Col span={2}>
        <img src={StarIcon} height={32} width={32}/>
      </Col>
      <Col span={22}>
        {props.text}
      </Col>
    </Row>
  </div>
}

export default AttractiveMessageBox;
