import React from "react";
import DeepAnalysisForFollowerFollowing from "./DeepAnalysisForFollowerFollowing";
import UsernamesBox from "./UsernamesBox";
import DetailedFollowerFollowingManager from "./DetailedFollowerFollowingManager";
import { Col } from "antd";
import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import { AppContext } from "../home/Home";
import SendEvent from "../common/Helpers/SendEvent";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import { Link, Prompt } from "react-router-dom";
import { Row } from "antd/es";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import EmailOption from "./EmailOption";
import GetEmail from "../common/api_call/GetEmail";
import getOptions from "../common/GetOptions";
import SleepArgs from "../common/models/SleepArgs";
import sleep from "../common/Sleep";
import GetRandomNumberFrom1ToN from "../common/Helpers/GetRandomNumber";
import FeatureDetails from "../home/FeatureDetails";
import FieldsToDownload from "./FieldsToDownload";
import StarIcon from "../common/images/star_icon.png";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";

class DetailedUsername extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldsToDownload: ["biography", "followerCount", "followingCount", "isBusinessAccount", "isPrivate", "profileURL", "username", "fullName", "externalURL", "businessCategoryName", "postCount", "id", "engagementRate", "email", "phoneNumber", "phoneCountryCode", "city"],
      users: [], // users is array of usernames
      detailedUsers: [],
      emailUsers: [],
      detailedAnalysisComplete: false,
      completedUsers: null,
      triesLeft: 0,
      emailState: true
    };
    this.stopAPICalls = false;
    this.emailProcessGoingOn = false;
  }

  componentWillUnmount() {
    this.stopAPICalls = true;
  }

  async componentDidMount() {
    let triesLeft = await GetOrSetValue(DatabaseKeys.FAST_DETAILED_ANALYSIS, ApplicationConstants.detailedAnalysis.WITHOUT_PAID_TRIES);
    this.setState({ triesLeft });
  }

  changeFieldsToDownload = (fieldName, value) => {
    let fieldExists = false;
    this.state.fieldsToDownload.map(f => {
      if (f === fieldName) {
        fieldExists = true;
      }
    });
    if (fieldExists && !value) {
      let newFields = this.state.fieldsToDownload.filter(f => f !== fieldName);
      this.setState({ fieldsToDownload: newFields });
    }
    if (!fieldExists && value) {
      this.setState({ fieldsToDownload: this.state.fieldsToDownload.concat([fieldName]) });
    }
  };

  setDetailedAnalysisComplete = () => {
    this.setState({ detailedAnalysisComplete: true });
  };

  getEmails = async () => {
    if (this.emailProcessGoingOn) {
      return;
    }
    this.emailProcessGoingOn = true;
    let detailedUsers = this.state.detailedUsers;
    // console.log(detailedUsers, "Class: DetailedUsername, Function: , Line 79 detailedUsers(): ");
    let businessUsers = detailedUsers.filter(u => u.isBusinessAccount === true);

    // get start value of i
    let emailUsersMap = {};
    this.state.emailUsers.map(u => {
      emailUsersMap[u.username] = true;
    });

    let i;
    for (i = 0; i < businessUsers.length; i++) {
      let bUser = businessUsers[i];
      if (!emailUsersMap[bUser.username]) {
        break;
      }
    }
    // console.log(i, businessUsers, "Class: DetailedUsername, Function: , Line 88 i(): ");

    for (; i < businessUsers.length; i++) {
      // console.log(i, businessUsers[i], "Class: DetailedUsername, Function: , Line 97 i, businessUsers[i](): ");
      this.props.sleepStatusChanged(false);
      if (i >= businessUsers.length) {
        break;
      }

      if (this.stopAPICalls) {
        break;
      }

      if (!this.state.emailState) {
        break;
      }

      let bUser = businessUsers[i];
      let emailUser;
      try {
        emailUser = await GetEmail(bUser.id);
        SendEvent(AnalyticsCategoryEnum.EMAIL, `Business Username - ${bUser.username} | ID - ${bUser.id}`, "email");
        await sleep(1400 + GetRandomNumberFrom1ToN(1500));
      } catch (e) {
        console.log(e, "Class: DetailedUsername, Function: , Line 118 e(): ");
        let options = await getOptions();
        this.props.sleepStatusChanged(
          true,
          new SleepArgs(false, "EMAIL_CALL")
        );
        SendEvent(AnalyticsCategoryEnum.API_ERROR, "Email call failed", "email");
        await sleep(options.sleepTimeFor429InSeconds * 1000);
        continue;
      }

      this.setState({ emailUsers: this.state.emailUsers.concat([emailUser]) });

      businessUsers = this.state.detailedUsers.filter(u => u.isBusinessAccount === true);
    }

    this.emailProcessGoingOn = false;

  };

  detailedUsersInfo = (detailedUsers) => {
    let completedUsers = {};
    for (let i = 0; i < detailedUsers.length; i++) {
      completedUsers[detailedUsers[i].username] = true;
    }
    this.setState({ detailedUsers, completedUsers }, () => {
      this.getEmails();
    });
  };

  setUsernames = (users) => {
    SendEvent(AnalyticsCategoryEnum.DETAILED_USERS, `${users.length} Usernames Set. Starting Detailed Analysis`, `Super Boosts left: ${this.state.triesLeft}`);
    sendNotification(NotificationTypeEnum.Success, "Keep this tab in Foreground else the process will become slow", true)
    this.setState({ users });
  };

  stopDeepApiCallCheck = () => {
    return this.stopAPICalls || this.state.detailedAnalysisComplete;
  };

  changeEmailProcessState = (emailState) => {
    this.setState({ emailState }, () => {
      if (emailState) {
        this.getEmails();
      }
    });
  };

  concatDetailedAndEmail = () => {
    let emails = this.state.emailUsers;
    let emailUsersMap = {};
    emails.map(eu => {
      emailUsersMap[eu.username] = eu;
    });
    let detailedUser = this.state.detailedUsers;
    return detailedUser.map(du => {
      if (emailUsersMap[du.username]) {
        du.setEmailUser(emailUsersMap[du.username]);
      }
      return du;
    });
  };


  render() {
    let isPayedUser = this.props.context.isPayedUser;

    let messageComp = <React.Fragment>
      Download <Link to={FeatureDetails.TIER_2.ACTION} className="attractive-box-text">Targeted users
      (Followers,Likers etc)</Link> first and paste the usernames here
    </React.Fragment>;

    if (this.state.users.length > 0) {
      messageComp = <React.Fragment>Keep this Tab in Foreground else the process might become slow</React.Fragment>
    }

    return <React.Fragment>
      <Prompt
        message="You will lose this data. You can open another tab also. Press Profile bud extension again"
        when={
          this.state.users.length > 0
        }
      />
      <Row>
        <Col span={19}>
          <div
            style={{
              width: "95%",

              paddingTop: "2%",
              paddingBottom: "2%",
              paddingLeft: "2%",
              paddingRight: "1%",
              marginLeft: "2%",

              backgroundColor: "#F0C156",
              color: "#FFF",


              boxShadow: "0px 3px 6px #00000029",
              borderRadius: 6,
              font: "Black 29px/35px Roboto",

              fontSize: "130%",
              fontWeight: "bold",
              marginBottom: 4
            }}
          >
            <Row>
              <Col span={2}>
                <img src={StarIcon} height={32} width={32} alt={"star"}/>
              </Col>
              <Col span={22}>
                {messageComp}
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={5}>
          <NeedHelp type={NeedHelpEnum.DETAILED_USER_ANALYSIS}/>
        </Col>
      </Row>

      {this.state.users.length < 1 ?
        <UsernamesBox setUsernames={this.setUsernames} completedUsers={this.state.completedUsers}/> : <React.Fragment/>
      }

      {this.state.users.length > 0 ? <DeepAnalysisForFollowerFollowing
        users={this.state.users}
        detailedUserInfo={this.detailedUsersInfo}
        sleepStatusChanged={this.props.sleepStatusChanged}
        stopAPICallCheck={this.stopDeepApiCallCheck}
        detailedAnalysisComplete={this.state.detailedAnalysisComplete}
        setDetailedAnalysisComplete={this.setDetailedAnalysisComplete}
        triesLeft={this.state.triesLeft}
        isPayedUser={isPayedUser}
        passMessage={this.props.passMessage}
      /> : <React.Fragment/>}


      <EmailOption
        detailedUsers={this.state.detailedUsers}
        users={this.state.users}
        emailUsers={this.state.emailUsers}
        changeEmailProcessState={this.changeEmailProcessState}
        emailState={this.state.emailState}
      />

      <FieldsToDownload
        changeFieldsToDownload={this.changeFieldsToDownload}
        fieldsToDownload={this.state.fieldsToDownload}
      />

      <DetailedFollowerFollowingManager
        fieldsToDownload={this.state.fieldsToDownload}
        location={this.props.location}
        data={this.concatDetailedAndEmail()}
        username={this.props.username}
        handleActions={this.props.handleActions}
      />
    </React.Fragment>;
  }

}

export default props => (
  <AppContext.Consumer>
    {context => <DetailedUsername context={context} {...props} />}
  </AppContext.Consumer>
);

