import React from 'react';
import { Col, Row } from "antd";
import detailed_user from '../common/images/detailed_users_black.png'

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
          <Col span={20} style={{paddingTop: "0.5%"}}>{f.TEXT}</Col>
        </Row>
      </div>
    });
    return <React.Fragment>
      <div
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
      >
        {/*Apart from Emails, also get*/}
        {/*/!*<Row>*!/*/}
        {/*/!*  <Col span={4} style={{paddingTop: "2%"}}><img src={detailed_user} alt="icon_image" width={"70%"}/></Col>*!/*/}
        {/*/!*  <Col span={20} >Key data points for a list of usernames </Col>*!/*/}
        {/*/!*</Row>*!/*/}
        {/*<div style={{*/}
        {/*  marginTop: "1%",*/}
        {/*  marginRight: "1%"*/}
        {/*}}>*/}
          {featuresLI}
        {/*</div>*/}
      </div>
    </React.Fragment>
  }

  let featurUI = features.map(feature => {
    i++;
    let icon = <img src={feature.img} alt="icon_image" width={"70%"}/>;

    return <div
      style={{
        fontWeight: "bold",
        font: "Medium 18px/48px Roboto",
        color: "#1F1F1F",
        fontSize: "110%",
        marginTop: "6%",
        textAlign: "left",
        marginBottom: "6%",
      }}
      key={i}
    >
      <Row>
        <Col span={4}>{icon}</Col>
        <Col span={20} style={{paddingTop: "0.5%"}}>{feature.TEXT}</Col>
      </Row>
    </div>
  });
  return <React.Fragment>
    {featurUI}
  </React.Fragment>
}

export default FeatureList;
