import React from 'react';
import { Col, Row } from "antd";
import Timer from "react-compound-timer";

function DaysLeft(props) {
  let maxExpiryTime = new Date();
  maxExpiryTime.setDate(maxExpiryTime.getDate() - 10000);
  for (let key in props.timeRemaining) {
    if (props.timeRemaining[key] > maxExpiryTime) {
      maxExpiryTime = props.timeRemaining[key];
    }
  }

  let status;

  if (maxExpiryTime > new Date()) {
    status = <Timer
      initialTime={maxExpiryTime - new Date()}
      direction="backward"
    >
      {() => (
        <React.Fragment>
          <Timer.Days/>
        </React.Fragment>
      )}
    </Timer>;
  } else {
    status = "0";
  }

  return <React.Fragment>
    <div style={{textAlign: 'center', paddingTop: 4, fontSize: 24, fontWeight: "bold"}}>
    <Row>
      <Col span={24}>{status}</Col>
    </Row>
    <Row>
      <Col span={24}>Days left</Col>
    </Row>
    </div>
  </React.Fragment>
}

export default DaysLeft;
