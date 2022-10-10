import React from 'react';
import { AppContext } from "../home/Home";
import { Col, Divider, Row, Spin } from "antd";
import getMainUser from "../common/chrome/GetMainUser";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";

class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSet: false
    }
  }

  async componentDidMount() {
    let user = await getMainUser();
    let sadamCallsRemaining = await GetOrSetValue(DatabaseKeys.SADAM_CALLS_LEFT, 1500);
    this.setState({user: user.viewer, isSet: true, sadamCallsRemaining: sadamCallsRemaining})
  }

  render() {
    return <React.Fragment>
      <div style={{
        fontSize: "300%",
        marginLeft: "6%",
        marginTop: "1%",
        font: "Black 64px/77px Roboto",
        color: "#001529",
        fontWeight: "bold"
      }}>
        My Account
      </div>
      <br /><br />
      {!this.state.isSet ? <div className="vertically-center"><Spin /></div> :
        <div style={{ marginLeft: "4%", fontSize: "140%" }}>
          <Divider />
          <Row>
            <Col span={10}>Instagram Username subscribed</Col>
            <Col span={14}>
              <strong>@{this.state.user.username}</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            <Col span={10}>ProfileBuddy Product type</Col>
            <Col span={14}>
              <strong>{this.props.context.permission === "NORMAL" ? <React.Fragment><React.Fragment>Basic</React.Fragment> &nbsp;&nbsp;<React.Fragment>(Upgrade to Premium? Click <a href={ApplicationConstants.JVZOO.PREMIUM_PURCHASE_LINK} target="_blank">here</a>)</React.Fragment></React.Fragment> : <React.Fragment>Premium</React.Fragment> }</strong>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={11}>Premium Super Fast Monthly Users Left</Col>
            <Col span={13}>
              <strong>{this.state.sadamCallsRemaining}</strong>
            </Col>
          </Row>
          <Divider />
        </div>
        }
    </React.Fragment>
  }
}


export default props => (
  <AppContext.Consumer>
    {context => <Account context={context} {...props} />}
  </AppContext.Consumer>
);