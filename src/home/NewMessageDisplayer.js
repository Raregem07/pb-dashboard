import React from "react";
import Icons from "../common/components/Icons";
import { Col, Row } from "antd";
import Typewriter from "typewriter-effect";


class NewMessageDisplayer extends React.Component{
  render() {
    let messageObj = this.props.messageObj;
    //stevess
    console.log(messageObj);

    let level = messageObj.LEVEL;
    let message = messageObj.MESSAGE;
    if (message.length === 0) {
      return <React.Fragment />
    }

    let linkURL = messageObj.LINK;
    let backgroundColor, icon;
    if (level === "info") {
      backgroundColor = "#17A2B8";
      icon = Icons.INFO;
    } else if (level === "warning") {
      backgroundColor = "#FF8801";
      icon = Icons.WARNING;
    } else if (level === "error") {
      backgroundColor = "#DC3445";
      icon = Icons.WARNING;
    }

    return (
      <div
        style={{
          width: "93%",

          paddingTop: "1%",
          paddingBottom: "1%",
          paddingLeft: 16,
          marginLeft: 16,
          marginBottom: 16,

          backgroundColor: backgroundColor,
          color: "#FFF",

          boxShadow: "0px 3px 6px #00000029",
          borderRadius: 11,
          font: "Medium 32px/38px Roboto",

          fontSize: 24
        }}
      >
        <Row>
          <Col span={1}>
            {icon}
          </Col>
          <Col span={22}>
            <Typewriter
              options={{
                delay: 35,
                loop: true
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(`${message}`)
                  .pauseFor(25000)
                  .deleteAll(0.9)
                  .start();
              }}
            />

          </Col>
          {linkURL.length > 1 ? <Col span={1}>
            <a style={{color: "#FFF"}} href={linkURL} target="_blank">{Icons.DOWNLOAD}</a>
          </Col> : <React.Fragment /> }
        </Row>
      </div>
    );
  }
}

export default NewMessageDisplayer;
