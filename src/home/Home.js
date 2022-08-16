/*global chrome*/

import React from "react";
import { Affix, Layout, Spin } from "antd";
import DatabaseKeys from "../common/models/DatabaseKeys";
import GetOrSetValue from "../common/store/GetOrSetValue";
import AutomationBrain from "./AutomationBrain";
import OptionsDefaultValue from "../common/constants/OptionsDefaultValue";
import GetPermissionsAndMessages from "../common/api_call/GetPermissionsAndMessages";
import getMainUser from "../common/chrome/GetMainUser";
import ReactGA from "react-ga";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import NewAutomationBrain from "./NewAutomationBrain";
import LeftSider from "./LeftSider/LeftSider";
import MainContent from "./MainContent";
import RightSider from "./RightSider/RightSider";
import SaveObject from "../common/chrome/SaveObject";
import I18 from "../common/chrome/I18";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import sleep from "../common/Sleep";
import NoPermission from "./NoPermission";


const { Content, Sider, Footer } = Layout;

export const AppContext = React.createContext({});

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      tasks: [],
      completedTasks: [],
      isSleep: false,
      firstApiCallDone: false,
      isFetchingPosts: false,
      fetchedPosts: [],
      options: OptionsDefaultValue,
      displayErrorMessage: false,

      newTasks: [],
      newCompletedTasks: [],
      isNewAutomationRunning: false,
      timeRemainingForNewTaskToComplete: 0
    };
    this.handleActions = this.handleActions.bind(this);
    this.sleepStatusChanged = this.sleepStatusChanged.bind(this);
    // this.startTimerCommands();
    const automationBrainCallbacks = {
      isFetchingPosts: this.isFetchingPosts,
      updateTasks: this.updateTasks,
      taskCompleted: this.taskCompleted
    };

    const newAutomationBrainCallbacks = {
      isFetchingPosts: this.isFetchingPosts,
      updateTasks: this.newUpdateTasks,
      changeNextTaskTime: this.newChangeNextTaskTime,
      taskCompleted: this.newTaskCompleted,
      onIsAutomationRunningChange: this.onNewAutomationRunningChange
    };

    this.automationBrain = new AutomationBrain(automationBrainCallbacks);
    this.newAutomationBrain = new NewAutomationBrain(
      newAutomationBrainCallbacks
    );
  }

  static confirmExit() {
    return I18("progress_lost");
  }

  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.returnValue = `You would lose the data. Open ProfileBuddy in another tab by pressing the extension button again.`;
    });
  };

  async componentDidMount() {
    this.recordPageForAnalytics();

    if (process.env.NODE_ENV === "production") {
      this.setupBeforeUnloadListener();
    }

    let mainUser = await getMainUser();
    let userID = mainUser.viewer.id; 
    let username = mainUser.viewer.username;

    await GetOrSetValue(DatabaseKeys.CALLS_DATA, {
      level2Calls: 0,
      level3Calls: 0,
      level2AllowedCalls: 100000000,
      level3AllowedCalls: 0
    });
    await GetOrSetValue(DatabaseKeys.SADAM_CALLS_LEFT, 0);
    console.log(userID);
    let permissionsExpiryAndMessagesObj = await GetPermissionsAndMessages(
      userID,
      ApplicationConstants.APP_VERSION
    );


    if (!permissionsExpiryAndMessagesObj.isSuccess && permissionsExpiryAndMessagesObj.retry) {
      sendNotification(NotificationTypeEnum.Failure, "Please check your internet connection | Retrying ...");
      await sleep(5000);
      window.location.reload();
      return;
    }

    if (!permissionsExpiryAndMessagesObj.isSuccess && permissionsExpiryAndMessagesObj.error === "NO_PERMISSION") {
      sendNotification(NotificationTypeEnum.Failure, `Instagram account @${this.state.username} does not have permission`);
      this.setState({
        firstApiCallDone: true,
        errorHappened: true,
        errorReason: permissionsExpiryAndMessagesObj.error,
        username: username
      });
      return;
    }


    if (!permissionsExpiryAndMessagesObj.isSuccess) {
      sendNotification(NotificationTypeEnum.Failure, "Something went wrong");
      this.setState({
        firstApiCallDone: true,
        errorHappened: true,
        errorReason: permissionsExpiryAndMessagesObj.error,
        username: username
      });
      return;
    }

    clearTimeout(this.timer);

    let permissionsExpiryAndMessages = permissionsExpiryAndMessagesObj.value;

    await SaveObject(DatabaseKeys.SADAM_CALLS_LEFT, permissionsExpiryAndMessages.detailedCallsRemaining);
    this.setState({
      firstApiCallDone: true,
      errorHappened: false,
      permissionsAndMessages: permissionsExpiryAndMessages,
      username: username
    });
  }


  recordPageForAnalytics() {
    let url = this.props.location.pathname;
    if (url === "/") {
      url = "/analyse_user";
    }
    ReactGA.pageview(url);
  }

  timerStart(timeInMs) {
    if (this.timer) {
      return;
    }
    this.timer = setTimeout(() => {
      this.setState({ displayErrorMessage: true });
    }, timeInMs);
  }


  render() {
    if (!this.state.firstApiCallDone) {
      this.timerStart(
        ApplicationConstants.home
          .ERROR_MESSAGE_APPEARING_TIME_ON_HOME_SCREEN_IN_MS
      );
      return (
        <div style={{ textAlign: "center" }} className="vertically-center">
          <Spin/> Loading ...
          {this.state.displayErrorMessage ? (
            <div>
              {" "}
              Please check your internet connection. Reload a few times and this error will go. Else Uninstall and Install the extension again.
              <br />
              Else install this free VPN <a href={"https://chrome.google.com/webstore/detail/browsec-vpn-free-vpn-for/omghfjlpggmjjaagoclmmobgdodcjboh?hl=en"} target="_blank">Browsec</a> and run it and then open and close Profilebuddy again
            </div>
          ) : (
            <div/>
          )}
        </div>
      );
    }

    if (this.state.errorHappened) {
      let reason = this.state.errorReason;
      switch (reason) {
        case "NO_PERMISSION":
          return <NoPermission username={this.state.username} />
        case "WRONG_HASH":
          return <div style={{ textAlign: "center" }} className="vertically-center">
            Wrong Extension-Hash detected. Please re-download the extension from members area and use the same.
          </div>;
        case "something_went_wrong":
          return <div style={{ textAlign: "center" }} className="vertically-center">
            Something went wrong. Please close the extension and open again.
          </div>;
      }
    }


    return (
      <AppContext.Provider value={this.state.permissionsAndMessages}>
        <Layout>
          <Sider width="17%" className="left-sider-main-box">
            <Affix>
              <LeftSider
                location={this.props.location.pathname.slice(1)}
                timeRemaining={this.state.permissionsAndMessages.timeRemaining}
              />
            </Affix>
          </Sider>
          <Content>
            <MainContent permissionAndMessages={this.state.permissionsAndMessages}/>
          </Content>
          <Sider width="17%" className="right-sider-main-box">
            <Affix>
              <RightSider location={this.props.location.pathname.slice(1)}/>
            </Affix>
          </Sider>
        </Layout>
      </AppContext.Provider>
    );
  }

  handleActions(tasks) {
    this.automationBrain.addTasks(tasks);
  }

  sleepStatusChanged(isSleeping) {
    let sleepingState = false;
    if (isSleeping) {
      sleepingState = true;
    }
    this.setState({ isSleep: sleepingState });
  }
}
