import React from "react";
import { Button, Card, Col, Icon, Row } from "antd";
import ReactExport from "react-data-export";
import ReplaceSubstring from "../common/Helpers/ReplaceSubstring";
import DownloadAPI from "../common/DownloadAPI";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class DetailedDataDownloader extends React.Component {

  getColumns = () => {
    let fieldsToDownload = this.props.fieldsToDownload;
    let columns = [
      { label: "Username", value: "username" },
      { label: "FullName", value: "fullName" },
      { label: "Instagram ID", value: "id" },
      { label: "Link to Account", value: "linkToAccount" }
    ];

    let b = fieldsToDownload.map(f => {
      let column = { label: "", value: "" };
      switch (f) {
        case "biography":
          column.label = "User Bio";
          column.value = "biography";
          break;
        case "email":
          column.label = "Public Email";
          column.value = "email";
          break;
        case "followerCount":
          column.label = "Follower Count";
          column.value = "followerCount";
          break;
        case "followingCount":
          column.label = "Following Count";
          column.value = "followingCount";
          break;
        case "postCount":
          column.label = "Total Posts";
          column.value = "postCount";
          break;
        case "engagementRate":
          column.label = "Engagement Rate oF account";
          column.value = "engagementRate";
          break;
        case "isBusinessAccount":
          column.label = "Is business Account";
          column.value = "isBusinessAccountString";
          break;
        case "isPrivate":
          column.label = "Is Private Account";
          column.value = "isPrivate";
          break;
        case "externalURL":
          column.label = "Website in URL";
          column.value = "externalURL";
          break;
        case "businessCategoryName":
          column.label = "Business Category name";
          column.value = "businessCategoryName";
          break;
        case "profilePicURLHD":
          column.label = "Profile URL in HD";
          column.value = "profilePicURLHD";
          break;
        case "phoneNumber":
          column.label = "Public Phone Number";
          column.value = "publicPhoneNumber";
          break;
        case "phoneCountryCode":
          column.label = "Phone Country Code";
          column.value = "publicPhoneCountryCode";
          break;
        case "city":
          column.label = "City";
          column.value = "cityName";
          break;
        default:
          column.label = f;
          column.value = f;
      }
      return column;
    });

    columns = columns.concat(b);

    let order = [
      "username",
      "fullName",
      "followerCount",
      "followingCount",
      "email",
      "engagementRate",
      "externalURL",
      "postCount",
      "businessCategoryName",
      "publicPhoneCountryCode",
      "publicPhoneNumber",
      "cityName",
      "linkToAccount",
      "isPrivate",
      "isBusinessAccountString",
      "biography",
      "id"
    ];

    let mp = {};
    columns.map(c => {
      mp[c.value] = c;
    });

    let finalCol = [];
    order.map(o => {
      if (mp[o]) {
        finalCol.push(mp[o]);
      }
    });

    return finalCol;

  };

  getData = (users) => {
    let finalUsers = users.filter(u => !u.dummy );
    return finalUsers.map(u => {
      u["isBusinessAccountString"] = this.makeTrueFalseAsString(u.isBusinessAccount);
      u["isPrivate"] = u.isPrivate;
      u["isVerified"] = this.makeTrueFalseAsString(u.isVerified);
      u["biography"] = ReplaceSubstring(ReplaceSubstring(u.biography, ",", " - "), "\n", " | ");
      u["linkToAccount"] = `https://www.instagram.com/${u.username}/`;
      u["fullName"] = ReplaceSubstring(ReplaceSubstring(u.fullName, ",", " - "), "\n", " | ");
      return u;
    });
  };

  // getCSVData(users) {
  //   let headerRow = ["Username", "Fullname", "Link to Account", "Instagram id"];
  //   let fieldsToDownload = this.props.fieldsToDownload;
  //
  //   let downloadFieldsMap = {};
  //   fieldsToDownload.map(f => {
  //     downloadFieldsMap[f] = true;
  //   });
  //   if ("email" in downloadFieldsMap) {
  //     headerRow.push("Public Email");
  //   }
  //   if ("followerCount" in downloadFieldsMap) {
  //     headerRow.push("Follower Count");
  //   }
  //
  //   if ("followingCount" in downloadFieldsMap) {
  //     headerRow.push("Following Count");
  //   }
  //   if ("postCount" in downloadFieldsMap) {
  //     headerRow.push("Post Count");
  //   }
  //   if ("engagementRate" in downloadFieldsMap) {
  //     headerRow.push("Engagement Rate");
  //   }
  //   if ("isBusinessAccount" in downloadFieldsMap) {
  //     headerRow.push("Is business Account");
  //   }
  //   if ("isPrivate" in downloadFieldsMap) {
  //     headerRow.push("Is Private Account");
  //   }
  //   if ("biography" in downloadFieldsMap) {
  //     headerRow.push("Account Bio");
  //   }
  //   if ("externalURL" in downloadFieldsMap) {
  //     headerRow.push("Link in website");
  //   }
  //   if ("businessCategoryName" in downloadFieldsMap) {
  //     headerRow.push("Business Category name");
  //   }
  //   if ("profilePicURLHD" in downloadFieldsMap) {
  //     headerRow.push("Profile URL in HD");
  //   }
  //
  //   if ("phoneNumber" in downloadFieldsMap) {
  //     headerRow.push("Public Phone Number");
  //   }
  //
  //   if ("phoneCountryCode" in downloadFieldsMap) {
  //     headerRow.push("Phone Country Code");
  //   }
  //
  //
  //   if ("city" in downloadFieldsMap) {
  //     headerRow.push("City");
  //   }
  //
  //
  //   headerRow.push("Is Verified?");
  //
  //
  //   let csvData = [
  //     headerRow
  //   ];
  //   for (let i = 0; i < users.length; i++) {
  //     let row = [];
  //     row.push(
  //       users[i].username,
  //       users[i].fullName,
  //       `https://www.instagram.com/${users[i].username}/`,
  //       users[i].id
  //     );
  //     if ("email" in downloadFieldsMap) {
  //       row.push(users[i].email);
  //     }
  //     if ("followerCount" in downloadFieldsMap) {
  //       row.push(users[i].followerCount);
  //     }
  //     if ("followingCount" in downloadFieldsMap) {
  //       row.push(users[i].followingCount);
  //     }
  //     if ("postCount" in downloadFieldsMap) {
  //       row.push(users[i].postCount);
  //     }
  //     if ("engagementRate" in downloadFieldsMap) {
  //       row.push(users[i].engagementRate);
  //     }
  //     if ("isBusinessAccount" in downloadFieldsMap) {
  //       row.push(this.makeTrueFalseAsString(users[i].isBusinessAccount));
  //     }
  //     if ("isPrivate" in downloadFieldsMap) {
  //       row.push(this.makeTrueFalseAsString(users[i].isPrivate));
  //     }
  //     if ("biography" in downloadFieldsMap) {
  //       row.push(ReplaceSubstring(ReplaceSubstring(users[i].biography, ",", " - "), "\n", " | "));
  //     }
  //     if ("externalURL" in downloadFieldsMap) {
  //       row.push(users[i].externalURL);
  //     }
  //     if ("businessCategoryName" in downloadFieldsMap) {
  //       row.push(users[i].businessCategoryName);
  //     }
  //     if ("profilePicURLHD" in downloadFieldsMap) {
  //       row.push(users[i].profilePicURLHD);
  //     }
  //     if ("phoneNumber" in downloadFieldsMap) {
  //       row.push(users[i].publicPhoneNumber);
  //     }
  //
  //     if ("phoneCountryCode" in downloadFieldsMap) {
  //       row.push(users[i].publicPhoneCountryCode);
  //     }
  //
  //     if ("city" in downloadFieldsMap) {
  //       row.push(users[i].cityName);
  //     }
  //
  //
  //     row.push(this.makeTrueFalseAsString(users[i].isVerified));
  //
  //     csvData.push(row);
  //   }
  //   return csvData;
  // }

  // getXLSData(users) {
  //   let xlsUsers = [];
  //   for (let i = 0; i < users.length; i++) {
  //     xlsUsers.push({
  //       username: users[i].username,
  //       fullName: users[i].fullName,
  //       id: users[i].id,
  //       isVerified: users[i].isVerified,
  //       isPrivate: users[i].isPrivate,
  //       profileURL: users[i].profileURL,
  //       followedByViewer: users[i].followedByViewer,
  //       followsViewer: users[i].followsViewer,
  //       subjectFollowsUser: users[i].subjectFollowsUser,
  //       userFollowsSubject: users[i].userFollowsSubject,
  //       biography: ReplaceSubstring(users[i].biography, ",", " - "),
  //       followerCount: users[i].followerCount,
  //       followingCount: users[i].followingCount,
  //       isBusinessAccount: users[i].isBusinessAccount,
  //       profilePicURLHD: users[i].profilePicURLHD,
  //       externalURL: users[i].externalURL,
  //       mutualConnectionCount: users[i].mutualConnectionCount,
  //       blockedByViewer: users[i].blockedByViewer,
  //       businessCategoryName: users[i].businessCategoryName,
  //       postCount: users[i].postCount
  //     });
  //   }
  //   return xlsUsers;
  // }

  makeTrueFalseAsString(v) {
    if (!v) {
      return "False";
    }
    return "True";
  }

  render() {
    let username = this.props.username;

    let detailedData = this.getData(this.props.detailedData);
    let columns = this.getColumns();

    let conditionalDetailedData = this.getData(this.props.conditionalData);


    let filenameDetailed = `${this.props.campaignName}_data`;
    let filenameQueriedDetailed = `${this.props.campaignName}_queried_data`;
    return (
      <Card
        title={<div><Icon type="download"/> &nbsp;&nbsp;&nbsp;Download Detailed Data</div>}
        style={{ margin: 12, backgroundColor: "#fbfbfb" }}
      >
        <div style={{ textAlign: "center" }}>
          <Row gutter={12}>
            <Col span={12}>
              <Button
                type="primary" icon="download" style={{ fontSize: 18 }}
                onClick={() => DownloadAPI(detailedData, columns, filenameDetailed)}>Download Full data in CSV</Button>
            </Col>
            <Col span={12}>
              <Button
                type="primary" icon="download" style={{ fontSize: 18 }}
                onClick={() => DownloadAPI(conditionalDetailedData, columns, filenameQueriedDetailed)}>Download
                Conditional Data in
                CSV</Button>
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}

export default DetailedDataDownloader;
