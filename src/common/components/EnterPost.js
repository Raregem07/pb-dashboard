import React from "react";
import { Button, Checkbox, Col, Input, Row } from "antd";
import { AppContext } from "../../home/Home";
import sendNotification from "../SendNotification";
import NotificationTypeEnum from "../models/NotificationTypeEnum";
import I18 from "../chrome/I18";
import NeedHelpEnum from "../models/NeedHelpEnum";
import NeedHelp from "./NeedHelp";

class EnterPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      like: true,
      comment: true,
      url: ""
    };
  }

  urlChanged = e => {
    this.setState({ url: e.target.value });
  };

  checkPostUrl() {
    let { url } = this.state;

    if (!url.startsWith("https://www.instagram.com/p/")) {
      return false;
    }
    let urlsSubstring = url.split("/");
    if (
      urlsSubstring.length < 5 ||
      (urlsSubstring.length === 5 && urlsSubstring[4] === "")
    ) {
      return false;
    }
    return true;
  }

  getShortCodeFromUrl = url => {
    let urlsSubstring = url.split("/");
    return urlsSubstring[4];
  };

  errorInUrl = () => {
    let { url } = this.state;
    if (url.length === 0 || this.checkPostUrl(url)) {
      return "";
    }
    return "Wrong Post link entered. Use Eg: https://www.instagram.com/p/B1hOPEfHBvd/";
  };

  onChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  };

  noPermissionsAnalytics = () => {
    sendNotification(NotificationTypeEnum.Failure, I18("analytics_trial_over_message"), true);
  };

  noPermissions = () => {
    sendNotification(NotificationTypeEnum.Failure, I18("trial_over_message"), true);
  };


  render() {
    return (
      <div>
        <Row gutter={16}>
          <div
            style={{
              padding: 8,
              backgroundColor: "#FFF",
              textAlign: "center",
              boxShadow: "0px 3px 6px #00000029",
              borderRadius: 11,
              height: 70,
              paddingTop: 16
            }}
          >
            <Col span={2}><strong>Post Link</strong></Col>
            <Col span={9}>
              <Input
                type="url"
                onChange={this.urlChanged}
                placeholder="Eg: https://www.instagram.com/p/B1hOPEfHBvd/"
              />
              <br/>
              <div style={{ color: "red" }}>{this.errorInUrl()}</div>
            </Col>
            {this.props.showOptions ? <Col span={5}>
              <Checkbox onChange={this.onChangeCheckbox} name="like"
                        checked={this.state.like}>Likers</Checkbox> &nbsp;&nbsp;&nbsp;
              <Checkbox onChange={this.onChangeCheckbox} name="comment"
                        checked={this.state.comment}>Commenters</Checkbox>

            </Col> : <React.Fragment/>
            }

            <Col span={3}>

              <AppContext.Consumer>
                {value => {
                  let permissions = {analytics: true};
                  let buttonOnClickCallback = () => this.props.getShortCodeLikeComment(this.getShortCodeFromUrl(this.state.url), this.state.like, this.state.comment);
                  return <Button
                    type="primary"
                    disabled={!this.checkPostUrl()}
                    onClick={buttonOnClickCallback}
                  >
                    Submit
                  </Button>
                }}
              </AppContext.Consumer>
            </Col>
            {/*<Col span={5}>*/}
            {/*  <NeedHelp type={this.props.help} />*/}
            {/*</Col>*/}

          </div>
        </Row>
      </div>
    );
  }
}

export default EnterPost;
