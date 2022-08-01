import React from "react";
import { Button, Col, Modal, Rate, Row } from "antd";

import NeedHelpEnum from "../models/NeedHelpEnum";
import getMainUser from "../chrome/GetMainUser";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import YouTubeEmbed from "./YoutubeEmbed";
import { AppContext } from "../../home/Home";
//import VideoDefaultValues from "../constants/VideoDefaultValues";
import Icons from "./Icons";

var youtubeThumbnail = require("youtube-thumbnail");

class NeedHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoVisible: false,
      videoTutorialReviewGiven: false
    };
  }

  handleOk = e => {
    this.setState({
      videoVisible: false
    });
  };

  handleCancel = e => {
    this.setState({
      videoVisible: false
    });
  };

  showVideoModal = async (topicName) => {
    let mainUser = await getMainUser();
    let username = mainUser.viewer.username;
    ReactGA.event({
      category: AnalyticsCategoryEnum.TUTORIAL_BUTTON_CLICKED,
      action: `topic: ${topicName}`,
      label: `username: ${username}`
    });
    this.setState({ videoVisible: true });
  };

  onRate = async (rateValue) => {
    let mainUser = await getMainUser();
    let username = mainUser.viewer.username;
    let topicName = this.props.type;
    this.setState({ videoTutorialReviewGiven: true });
    ReactGA.event({
      category: AnalyticsCategoryEnum.TUTORIAL_RATE,
      action: `topic: ${topicName}`,
      label: `username: ${username}, rating: ${rateValue}`
    });
  };

  render() {
    let videoID, heading;
    const HelpMapper = this.props.context.videos;
    switch (this.props.type) {


    }

    let button = <div style={{
      backgroundColor: "#FF8089",
      color: "#FFF",

      fontWeight: "bold",
      borderRadius: 6,
      width: "100%",
      padding: 12,
      fontSize: "120%"
    }}>
      <a onClick={() => this.showVideoModal(this.props.type)} style={{ color: "#FFF" }}>
        <Row>
          <Col span={6}>{Icons.VIDEO}</Col>
          <Col span={18}>
            How to use?
          </Col>
        </Row>
      </a>

    </div>;
    //   <Button type="primary" icon="video-camera" onClick={}>
    //   Video Tutorial
    // </Button>;
    if (this.props.explainer) {
      button = <Button icon="video-camera" onClick={() => this.showVideoModal(this.props.type)}>
        Watch 1 min Explainer Video
      </Button>;
    }


    if (this.props.onlyVideo) {
      return <YouTubeEmbed
        id={videoID}
        autoplay={false}
      />;
    }

    return (
      <React.Fragment>

        {button}


        <Modal
          title={heading}
          visible={this.state.videoVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={850}
          footer={[
            <Row key="video_footer">
              {this.state.videoTutorialReviewGiven ? <Col span={8}>Thanks for your Review</Col> :
                <Col span={8} style={{ textAlign: "left" }}>Please Rate the tutorial:<br/> <Rate
                  onChange={(value) => this.onRate(value, "video-tutorial")}/></Col>}
              <Col span={10}/>
              <Col span={6} style={{ textAlign: "right" }}><Button key="submit" type="primary" onClick={this.handleOk}>
                Ok
              </Button></Col>
            </Row>

          ]}
        >
          {this.state.videoVisible ? <YouTubeEmbed
            id={videoID}
            autoplay={true}
          /> : <div/>}
        </Modal>
      </React.Fragment>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {context => <NeedHelp context={context} {...props} />}
  </AppContext.Consumer>
);

