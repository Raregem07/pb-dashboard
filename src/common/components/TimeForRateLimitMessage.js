import React from "react";
import ApplicationConstants from "../constants/ApplicationConstants";
import NewMessageDisplayer from "../../home/NewMessageDisplayer";
import install_browsec from "../../common/images/install_browsec.gif"
import { Button, Col, Modal, Rate, Row } from "antd";
import Typewriter from "typewriter-effect";
import Icons from "./Icons";
import SendEvent from "../Helpers/SendEvent";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";

class TimeForRateLimitMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      countDown: ApplicationConstants.SLEEP_TIME_BEFORE_NEXT_REQUEST,
      modalVisible: false,

    };
  }

  handleOk = e => {
    this.setState({
      modalVisible: false
    });
  };

  handleCancel = e => {
    this.setState({
      modalVisible: false
    });
  };

  componentDidMount() {
    if (this.props.isSleeping !== false) {
      this.startTimer();
    }
  }

  startTimer = () => {
    if (this.state.countDown === 0) {
      return;
    }
    this.setState({ countDown: this.state.countDown - 1 });
    setTimeout(this.startTimer, 1000);
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.isSleeping === true && this.props.isSleeping === false) {
      this.setState({ countDown: ApplicationConstants.SLEEP_TIME_BEFORE_NEXT_REQUEST }, () => {
        this.startTimer();
      });
    }
    return true;
  }

  openVPNTutorialModal = () => {
    SendEvent(AnalyticsCategoryEnum.RATE_LIMIT_GIF_OPENED, "Gif opened", "");
    this.setState({modalVisible: true})
  };


  render() {
    if (!this.props.isSleeping) {
      return <div/>;
    }
    let messageObj, messageObj2;
    messageObj = {
      LINK: ApplicationConstants.blogs.RATE_LIMIT,
      MESSAGE: `Too Many Requests | Pausing for 7 min | Will continue automatically`,
      LEVEL: "warning"
    };
    messageObj2 = {
      LINK: "",
      MESSAGE: `This cycle continues till process is completed. Open ProfileBuddy in new tab to do some other work`,
      LEVEL: "info"
    };
    if (this.props.sleepArgs && this.props.sleepArgs.isSolvedByVPN) {
      messageObj = {
        LINK: ApplicationConstants.blogs.BROWSEC,
        MESSAGE: `Paused | Use a VPN | Install Free VPN (Browsec) from link to continue`,
        LEVEL: "warning"
      };
      messageObj2 = {
        LINK: ApplicationConstants.blogs.VPN,
        MESSAGE: `Use a VPN like Browsec, NordVPN and keep changing their locations for best results. Read more in the link.`,
        LEVEL: "info"
      };
      return <div className="center">
        <Modal
          title={"How to Install a Free VPN (Eg: Browsec)"}
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}
        >
          <img src={ApplicationConstants.VPN_TUTORIAL_GIF_LINK}  alt="VPN tutorial GIF"/>
        </Modal>
        <NewMessageDisplayer messageObj={messageObj}/>
        <div
          style={{
            width: "93%",

            paddingTop: "1%",
            paddingBottom: "1%",
            paddingLeft: 16,
            marginLeft: 16,
            marginBottom: 16,

            backgroundColor: "#3DB2FE",
            color: "#FFF",

            boxShadow: "0px 3px 6px #00000029",
            borderRadius: 11,
            font: "Medium 32px/38px Roboto",

            fontSize: 24
          }}
        >
          <Row>
            <Col span={1}>
              {Icons.INFO}
            </Col>
            <Col span={23}>
              Click <a className="attractive-box-text" onClick={this.openVPNTutorialModal}>here</a> to see step by step on how to Install a free VPN and solve this error. Read <a href={ApplicationConstants.blogs.VPN} target="_blank" className="attractive-box-text">this</a> blog to know more.
            </Col>
          </Row>
        </div>
      </div>;
    }
    return <React.Fragment>
      <NewMessageDisplayer messageObj={messageObj}/>
      <NewMessageDisplayer messageObj={messageObj2}/>
    </React.Fragment>;

  }
}

export default TimeForRateLimitMessage;
