import React from "react";
import { Button, Card, Col, Icon, Row, Tooltip } from "antd";
import Icons from "../common/components/Icons";
import followers from "../common/images/followers.png";
import business_account from "../common/images/business_account.png";
import detailed_user from "../common/images/detailed_user.png";
import email from "../common/images/email_clipart.png";
import ProgressBar from "../common/components/ProgressBar";
import Max from "../common/Helpers/Max";

function Box(props) {
  return (
    <div className="center">
      <strong>{props.name}</strong> &nbsp;&nbsp;
      {props.tooltipValue ? (
        <Tooltip title={props.tooltipValue}>
          <Icon type="question-circle-o" />
        </Tooltip>
      ) : (
        <React.Fragment />
      )}{" "}
      <br />
      <img
        style={{ marginTop: "3%", marginBotton: "3%", padding: "1%" }}
        src={props.img}
        alt="User Details"
        height={50}
        width={50}
      />
      <br />
      <strong>{props.value}</strong>
    </div>
  );
}

class EmailOption extends React.Component {
  constructor(props) {
    super(props);
  }

  changeScrapingState = () => {
    this.props.changeEmailProcessState(!this.props.emailState);
  };

  getBusinessAccountCount = () => {
    let c = 0;
    this.props.data.map(u => {
      if (u.isBusinessAccount && !u.dummy) {
        c++;
      }
    });
    return c;
  };

  getDummyAndBusinessAccountCount = () => {
    let c = 0;
    this.props.detailedUsers.map(u => {
      if (u.isBusinessAccount || u.dummy) {
        c++;
      }
    });
    return Max(c, this.props.emailUsers.length) ;
  };

  getEmailCount = () => {
    let c = 0;
    this.props.data.map(u => {
      if (u.email && u.email.length > 0) {
        c++;
      }
    });
    return c;
  };

  // getPhoneNumbersScraped = () => {
  //   this.props.emailUsers.map(u => {
  //     if (u.email && u.email.length > 0) {
  //       c++;
  //     }
  //   });
  //   return c;
  // };

  getButtonClassName = () => {
    if (this.props.emailState) {
      return "danger"
    }
    return "primary";
  };

  getButtonName = () => {
    if (this.props.emailState) {
      return "Stop Extracting Emails"
    }
    return "Continue Extracting Emails";
  };

  render() {

    let emailMap = {};
    this.props.emailUsers.map(u => {
      emailMap[u.id] = u;
    });
    let emailUsers = Object.keys(emailMap).length;

    if (this.props.detailedUsers.length === 0) {
      return <React.Fragment />
    }

    return (
      <React.Fragment>
        <Card
          title={
            <div>
              <Row>
                <Col span={1}>{Icons.EMAIL}</Col>
                <Col span={5}>Email Analysis</Col>
                <Col span={18}>
                    Get Email for business accounts (If mentioned on
                    their Instagram)
                </Col>
              </Row>
            </div>
          }
          style={{ margin: 4, marginBottom: 12, marginTop: 12, backgroundColor: "#fbfbfb" }}
        >

          <Row gutter={16}>
            <Col span={6}>
              <Box
                img={followers}
                name="Total Users Entered"
                value={this.props.users.length}
              />
            </Col>
            <Col span={6}>
              <Box
                img={detailed_user}
                name="Users Processed"
                value={this.props.detailedUsers.length}
              />
            </Col>
            <Col span={6}>
              <Box
                img={business_account}
                name="Business Accounts"
                value={this.getBusinessAccountCount()}
              />
            </Col>
            <Col span={6}>
              <Box
                img={email}
                name="Emails Found"
                value={this.getEmailCount()}
              />
            </Col>
          </Row>
          <div className="center">
            <ProgressBar notShowOnZero={true} percentage={Math.ceil((100 * emailUsers)/this.getDummyAndBusinessAccountCount())}/>
            <div>
              Progress: {emailUsers}/{this.getDummyAndBusinessAccountCount()}
            </div>
            <br />
            <Button onClick={this.changeScrapingState} type={this.getButtonClassName()}>{this.getButtonName()}</Button>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default EmailOption;
