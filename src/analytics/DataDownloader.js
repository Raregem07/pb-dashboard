import React from "react";
import { Button, Card, Checkbox, Col, Divider, Icon, Row } from "antd";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import SendEvent from "../common/Helpers/SendEvent";
import { Link } from "react-router-dom";
import FeatureDetails from "../home/FeatureDetails";
import DownloadAPI from "../common/DownloadAPI";
import ReplaceSubstring from "../common/Helpers/ReplaceSubstring";


class DataDownloader extends React.Component {
  constructor(props) {
    super(props);
    this.downloadState = 1;
    this.downloadHappened = 0;
    this.state = {
      downloadData: [],
      removePrivateUsers: true,
    };
  }

  onRemovePrivateUserToggle = (e) => {
    this.setState({removePrivateUsers: e.target.checked});
  };

  static makeTrueFalseAsString(v) {
    if (!v) {
      return "False";
    }
    return "True";
  }

  sendDatadownloaderAnalyticsEvent = () => {
    SendEvent(AnalyticsCategoryEnum.DOWNLOAD_DATA_IN_CSV, "Download users", "");
  };

  onDownloadComplete = () => {
    this.downloadState -= 1;
  };

  getDownloadChunkData = shouldDo => {
    if (!shouldDo) {
      return [false, null];
    }
    let userObjects = this.props.data;
    if (
      userObjects.length >
      ApplicationConstants.followerFollowing.MAX_USERS_TO_KEEP_IN_MEMORY
    ) {
      this.props.removeUsers(
        userObjects.slice(
          0,
          ApplicationConstants.followerFollowing.DOWNLOAD_USER_SEGMENT
        ),
        this.onDownloadComplete
      );
      return [false, null];
    }

    if (
      userObjects.length >
      ApplicationConstants.followerFollowing.DOWNLOAD_USER_SEGMENT *
      this.downloadState
    ) {
      SendEvent(
        AnalyticsCategoryEnum.DOWNLOAD_DATA_IN_CSV,
        "Automatic download",
        ""
      );
      let dataToDownload = this.props.data.slice(
        (this.downloadState - 1) *
        ApplicationConstants.followerFollowing.DOWNLOAD_USER_SEGMENT,
        this.downloadState *
        ApplicationConstants.followerFollowing.DOWNLOAD_USER_SEGMENT
      );
      let deepCopyData = JSON.parse(JSON.stringify(dataToDownload));
      this.downloadState = this.downloadState + 1;
      let [filename, data, columns] = this.getFileNameDataAndColumns(deepCopyData);
      DownloadAPI(data, columns, `${this.downloadHappened+1}_${filename}`);
      this.downloadHappened += 1;
      return [true, null];
    }
    return [false, null];
  };


  getFileNameDataAndColumns = (userObjects) => {
    let username = this.props.username;
    let filename = `${username}_ALL_follower_following`;
    if (this.state.removePrivateUsers) {
      filename = `${username}_PUBLIC_follower_following`
    }
    let downloadData = userObjects.map(u => {
        u["instagramProfileURL"] = "https://www.instagram.com/" + u.username + "/";
        u.isVerified = DataDownloader.makeTrueFalseAsString(u.isVerified);
        // u.isPrivate = DataDownloader.makeTrueFalseAsString(u.isPrivate);
        // u.fullName =  ReplaceSubstring(ReplaceSubstring(u.fullName, ",", " - "), "\n", " | ")

      return u;
      }
    );

    let columns = [
      { label: "Username", value: "username" },
      { label: "Fullname", value: "fullName" },
      { label: "Instagram id", value: "id" },
      { label: "Is Private", value: "isPrivate" },
      { label: `Profile URL`, value: "instagramProfileURL" }
    ];


    if (this.state.removePrivateUsers) {
      downloadData = downloadData.filter(
        u => !u.isPrivate
      )
    }
    return [filename, downloadData, columns];
  };

  render() {
    if (!this.props.isDataReceived) {
      return <div/>;
    }
    let username = this.props.username;
    let userObjects = this.props.data;

    let a = this.getFileNameDataAndColumns(userObjects);

    let filename = a[0];


    let downloadData = a[1];

    let privateUsers = userObjects.filter(
      u => u.isPrivate
    );
    let privateUsersCount = privateUsers.length;
    let publicUsersCount = userObjects.length - privateUsersCount;

    let columns = a[2];

    let [shouldDownload, _] = this.getDownloadChunkData(
      this.props.paginatedDownload
    );
    return (
      <React.Fragment>
        <Card
          title={
            <Row>
              <Col span={1}>
                <Icon type="download"/>
              </Col>
              <Col span={5}>Download</Col>
            </Row>
          }
          style={{ marginTop: 6, backgroundColor: "#fbfbfb" }}
        >
          <div style={{ padding: 5, textAlign: "center" }}>
            <Row>
              <Col span={12}>
                Public Accounts: {publicUsersCount}
              </Col>
              <Col span={12}>
                Private Accounts: {privateUsersCount}
              </Col>
            </Row>
            <Divider />
            <Row gutter={12}>
              <Col span={12}>
                Download only Public Users: <Checkbox checked={this.state.removePrivateUsers} onChange={this.onRemovePrivateUserToggle} />
              </Col>
              <Col span={8}>
                <Button
                  type="primary"
                  icon="download"
                  style={{ fontSize: 18 }}
                  onClick={() => {
                    this.sendDatadownloaderAnalyticsEvent("CSV");
                    DownloadAPI(downloadData, columns, filename);
                  }}
                >
                  Download Followers/Followings
                </Button>
              </Col>
            </Row>
          </div>
        </Card>
        <div
          style={{
            width: "90%",

            paddingTop: "1%",
            paddingBottom: "1%",
            paddingLeft: "2%",
            paddingRight: "1%",
            marginLeft: "6%",

            backgroundColor: "#F0C156",
            color: "#FFF",

            boxShadow: "0px 3px 6px #00000029",
            borderRadius: 6,
            font: "Black 29px/35px Roboto",

            fontSize: "120%",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "2%",
            marginBottom: "2%"
          }}
        >
          Download data & Go to <Link to={FeatureDetails.TIER_3.ACTION} className="attractive-box-text" >Analyse Users</Link> to get <strong>Emails</strong> & other details of these users.
        </div>

      </React.Fragment>
    );
  }
}

export default DataDownloader;
