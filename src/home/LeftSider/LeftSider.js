import React from "react";
import { Button, Col, Menu, Row, Tooltip } from "antd";
import MainLeftSiderButton from "./MainLeftSiderButton";
import DaysLeft from "./DaysLeft";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll/modules";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../../common/constants/AnalyticsCategoryEnum";
import grambuddyLogo from "../../common/images/profilemate_logo.png";
import ApplicationConstants from "../../common/constants/ApplicationConstants";
import SendEvent from "../../common/Helpers/SendEvent";
import FeatureDetails from "../FeatureDetails";
import getMainUser from "../../common/chrome/GetMainUser";
import FakeNotifications from "../../fake_notifications/FakeNotifications";
import { AppContext } from "../Home";

const { SubMenu } = Menu;

class LeftSider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      id: ""
    };
  }

  async componentDidMount() {
    let u = await getMainUser();
    this.setState({ username: u.viewer.username, id: u.viewer.id.toString() });
  }

  render() {
    let selectedKeys = [this.props.location];
    if (selectedKeys[0].length === 0) {
      selectedKeys[0] = "dashboard";
    }

    let suggestedComponent = <Menu.Item className="main-left-sider-button select-no-change"
                                        key="main_dashboard">
      {/*<Link*/}
      {/*  className="link"*/}
      {/*  to={`/tools`}*/}
      {/*  onClick={() => {*/}
      {/*    ReactGA.event({*/}
      {/*      category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,*/}
      {/*      action: `/tools`*/}
      {/*    });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <MainLeftSiderButton name="Free Tools" icon="tools" selectedKeys={selectedKeys}/>*/}
      {/*</Link>*/}
    </Menu.Item>;
    switch (selectedKeys[0]) {


      case "analytics/other/follower_following":
        suggestedComponent = <Menu.Item className="main-left-sider-button select-no-change"
                                        key="/analytics/other/follower_following">
          <Link
            className="link"
            to={`/analytics/other/detailed_analysis`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                action: `/analytics/other/detailed_analysis`
              });
            }}
          >
            <MainLeftSiderButton name="Emails" icon="email" selectedKeys={selectedKeys}/>
          </Link>
        </Menu.Item>;
        break;
      case "analytics/self/follower_following":
        suggestedComponent = <Menu.Item className="main-left-sider-button select-no-change"
                                        key="/analytics/self/follower_following">
          <Link
            className="link"
            to={`/analytics/other/detailed_analysis`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                action: `/analytics/self/detailed_analysis`
              });
            }}
          >
            <MainLeftSiderButton name="Emails" icon="email" selectedKeys={selectedKeys}/>
          </Link>
        </Menu.Item>;
        break;
      case "analytics/other/likers_commenters_post":
        suggestedComponent = <Menu.Item className="main-left-sider-button select-no-change"
                                        key="/analytics/self/follower_following">
          <Link
            className="link"
            to={`/analytics/other/detailed_analysis`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                action: `/analytics/self/detailed_analysis`
              });
            }}
          >
            <MainLeftSiderButton name="Emails" icon="email" selectedKeys={selectedKeys}/>
          </Link>
        </Menu.Item>;
        break;
      case "analytics/self/likers_commenters_user":
        suggestedComponent = <Menu.Item className="main-left-sider-button select-no-change"
                                        key="/analytics/self/follower_following">
          <Link
            className="link"
            to={`/analytics/other/detailed_analysis`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                action: `/analytics/self/detailed_analysis`
              });
            }}
          >
            <MainLeftSiderButton name="Emails" icon="email" selectedKeys={selectedKeys}/>
          </Link>
        </Menu.Item>;
        break;
      case "analytics/other/detailed_analysis":
        suggestedComponent = <Menu.Item className="main-left-sider-button select-no-change"
                                        key="analytics/other/detailed_analysis">
          <Link
            className="link"
            to={`${FeatureDetails.TIER_2.ACTION}`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                action: `${FeatureDetails.TIER_2.ACTION}`
              });
            }}
          >
            <MainLeftSiderButton name="Target Users" icon="suggested" selectedKeys={selectedKeys}/>
          </Link>
        </Menu.Item>;
        break;
      case "analytics/other/likers_commenters_user":
        suggestedComponent = <Menu.Item className="main-left-sider-button select-no-change"
                                        key="/analytics/self/follower_following">
          <Link
            className="link"
            to={`/analytics/other/detailed_analysis`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                action: `/analytics/self/detailed_analysis`
              });
            }}
          >
            <MainLeftSiderButton name="Emails" icon="email" selectedKeys={selectedKeys}/>
          </Link>
        </Menu.Item>;
        break;
      case "analytics/self/dead_followers":
        suggestedComponent = <Menu.Item className="main-left-sider-button select-no-change"
                                        key="/analytics/self/dead_followers">
          <Link
            className="link"
            to={`/analytics/other/detailed_analysis`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                action: `/analytics/self/detailed_analysis`
              });
            }}
          >
            <MainLeftSiderButton name="Emails" icon="email" selectedKeys={selectedKeys}/>
          </Link>
        </Menu.Item>;
        break;
      case "analytics/other/dead_followers":
        suggestedComponent = <Menu.Item className="main-left-sider-button select-no-change"
                                        key="/analytics/other/dead_followers">
          <Link
            className="link"
            to={`/analytics/other/detailed_analysis`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                action: `/analytics/other/detailed_analysis`
              });
            }}
          >
            <MainLeftSiderButton name="Emails" icon="email" selectedKeys={selectedKeys}/>
          </Link>
        </Menu.Item>;
        break;

      case "engage_with_target_audience/common_users":
        suggestedComponent = <Menu.Item className="main-left-sider-button select-no-change"
                                        key="/engage_with_target_audience/common_users">
          <Link
            className="link"
            to={`/analytics/other/detailed_analysis`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                action: `/analytics/other/detailed_analysis`
              });
            }}
          >
            <MainLeftSiderButton name="Emails" icon="email" selectedKeys={selectedKeys}/>
          </Link>
        </Menu.Item>;
        break;
    }

    return <React.Fragment>
      <Tooltip title="Click to go to https://profilemate.com" placement="topRight">
        <a href="https://profilemate.com" target="_blank">
          <img
            alt="Grambuddy Logo"
            src={grambuddyLogo}
            style={{
              width: "95%",
              height: "auto",
              paddingLeft: "8%",
              marginTop: "10%"
            }}
          />
        </a>
      </Tooltip>
      <div style={{
        backgroundColor: "white",
        marginTop: "20%"
      }}>

        <Menu selectedKeys={selectedKeys}>
          <Menu.Item className="main-left-sider-button select-no-change" key="dashboard">
            <Link
              className="link"
              to={`/`}
              onClick={() => {
                scroll.scrollTo(0);
                ReactGA.event({
                  category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                  action: `dashboard`
                });
              }}
            >
              <MainLeftSiderButton name="Dashboard" icon="dashboard" selectedKeys={selectedKeys}/>
            </Link>
          </Menu.Item>
          <Menu.Item className="main-left-sider-button select-no-change" key="faq">
            <Link
              className="link"
              to={`/faq`}
              onClick={() => {
                scroll.scrollTo(0);
                ReactGA.event({
                  category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                  action: `faq`
                });
              }}
            >
              <MainLeftSiderButton name="FAQ" icon="faq" selectedKeys={selectedKeys}/>
            </Link>
          </Menu.Item>
          <Menu.Item className="main-left-sider-button select-no-change" key="tutorial">
            <Link
              className="link"
              to={`/tutorial`}
              onClick={() => {
                scroll.scrollTo(0);
                ReactGA.event({
                  category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                  action: `tutorial`
                });
              }}
            ><MainLeftSiderButton name="Training" icon="tutorial" selectedKeys={selectedKeys}/>
            </Link>
          </Menu.Item>

          <Menu.Item
            className="main-left-sider-button select-no-change"
            key="main_dashboard"
          >
            <Link
              className="link"
              to={`/tools`}
              onClick={() => {
                ReactGA.event({
                  category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                  action: `/tools`
                });
              }}
            >
              <MainLeftSiderButton
                name="VIP Bonus"
                icon="tools"
                selectedKeys={selectedKeys}
              />
            </Link>
          </Menu.Item>
          {suggestedComponent}


        </Menu>
      </div>


      <div
        style={{
          backgroundColor: "white",
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "17%",
          minWidth: "17%"
        }}>
        <Row>

          <Col span={14}>
            <Menu theme="dark" selectedKeys={selectedKeys}>
              <Menu.Item key="account" className="center dont-select-menu left-sider-contact">
                <Link
                  to={`/account`}
                  className="link"
                  onClick={() => {
                    ReactGA.event({
                      category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                      action: `account`
                    });
                  }}
                >
                  <span style={{ fontSize: "120%", fontWeight: "bold" }}>My Account</span>
                </Link>
              </Menu.Item>

            </Menu>
          </Col>
          <Col span={10}>


            <Menu theme="dark" selectedKeys={selectedKeys}>
              <Menu.Item key="support" className="center dont-select-menu left-sider-contact">
                <Link
                  to={`/support`}
                  className="link"
                  onClick={() => {
                    ReactGA.event({
                      category: AnalyticsCategoryEnum.NAVBAR_LINK_PRESSED,
                      action: `account`
                    });
                  }}
                >
                  <span style={{ fontSize: "120%", fontWeight: "bold" }}>Support</span>


                </Link>
              </Menu.Item>

            </Menu>
          </Col>

        </Row>

      </div>
    </React.Fragment>;
  }
}


export default props => (
  <AppContext.Consumer>
    {context => <LeftSider context={context} {...props} />}
  </AppContext.Consumer>
);
