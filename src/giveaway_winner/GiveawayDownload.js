import React from "react";
import { Button, Card, Col, Row } from "antd";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import ReplaceSubstring from "../common/Helpers/ReplaceSubstring";
import { CSVLink } from "react-csv";
import Icons from "../common/components/Icons";

class GiveawayDownload extends React.Component {
  downloadFullData = () => {
    ReactGA.event({
      category: AnalyticsCategoryEnum.GIVEAWAY_WINNER,
      action: `Download Full data button clicked`
    });

    let commentedRows = [];
    commentedRows.push(["Username", "Comment Value"]);
    let users = this.props.users;
    for (let i = 0; i < users.length; i++) {
      let username = users[i].username;
      let commentedPosts = users[i].commentedPosts;
      for (let j = 0; j < commentedPosts.length; j++) {
        let row = [];
        row.push(
          username,
          ReplaceSubstring(
            ReplaceSubstring(
              ReplaceSubstring(users[i].commentedValues[j], ",", "-"),
              '"',
              "<quote>"
            ),
            "\n",
            " | "
          )
        );
        commentedRows.push(row);
      }
    }
    return commentedRows;
  };

  sendEvent = action => {
    ReactGA.event({
      category: AnalyticsCategoryEnum.GIVEAWAY_WINNER,
      action: action
    });
  };

  downloadOnlyCommenters = () => {
    let commentedRows = [];
    commentedRows.push(["Username", "Comment Count"]);
    let users = [...this.props.users];
    users = users.sort((a, b) => {
      if (a.commentedPosts.length > b.commentedPosts.length) {
        return -1;
      }
      return 1;
    });
    for (let i = 0; i < users.length; i++) {
      let username = users[i].username;
      let count = users[i].commentedPosts.length;
      let row = [];
      row.push(username, count);
      commentedRows.push(row);
    }
    return commentedRows;
  };

  render() {
    if (this.props.users.length < 1) {
      return <React.Fragment />
    }

    return (
      <React.Fragment>
        <Card
          title={
            <div style={{ fontSize: 20 }}>
              {Icons.DOWNLOAD}&nbsp;&nbsp;Download Data
            </div>
          }
          bordered={false}
          style={{ backgroundColor: "#FFF" }}
        >
          <Row>
            <Col span={12}>
              <CSVLink
                data={this.downloadFullData()}
                filename={"Full_Post_Data.csv"}
              >
                <Button onClick={this.sendEvent("Download Full data button clicked")}>
                  Download Commenters & Comment Values
                </Button>
              </CSVLink>
            </Col>
            <Col span={12}>
              <CSVLink
                data={this.downloadOnlyCommenters()}
                filename={"Commenter_Data.csv"}
              >
                <Button onClick={this.sendEvent("Download only usernames button clicked")}>
                  Download Commenters & Counts
                </Button>
              </CSVLink>
            </Col>
          </Row>
        </Card>
      </React.Fragment>
    );
  }
}

export default GiveawayDownload;
