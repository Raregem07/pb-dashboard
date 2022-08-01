import React from "react";
import { Col, Rate, Row, Slider } from "antd";

function StrategyBrain(props) {
  return (
    <React.Fragment>
      <Row>
        <Col span={12}>
          <strong>Hashtags</strong>: <Slider min={0} max={10} defaultValue={props.hashtags}
                                             onChange={props.onChangeStrategyHashtags}/>
        </Col>
        <Col span={12}>
          <strong>Location</strong>: <Slider min={0} max={10} defaultValue={props.location}
                                             onChange={props.onChangeStrategyLocation}/>
        </Col>
      </Row> <br/>
      <Row>
        <Col span={12}>
          <strong>Commenters</strong> on <strong>posts of your competitors</strong>:
          <Slider min={0} max={10} defaultValue={props.commentersSimilarAccount}
                  onChange={props.onChangeCommentersSimilarAccount}/>
        </Col>
        <Col span={12}>
          <strong>Likers</strong> on <strong>posts of your competitors</strong>:
          <Slider min={0} max={10} defaultValue={props.likersSimilarAccount}
                  onChange={props.onChangeLikersSimilarAccount}/>
        </Col>
      </Row> <br/>
      <Row>
        <Col span={12}>
          <strong>Followers</strong> of <strong>your competitors</strong>:
          <Slider min={0} max={10} defaultValue={props.followersSimilarAccounts}
                  onChange={props.onChangeFollowersSimilarAccount}/>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default StrategyBrain;