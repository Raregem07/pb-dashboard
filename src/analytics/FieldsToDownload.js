import React from "react";
import { Button, Card, Checkbox, Col, Row } from "antd";
import Icons from "../common/components/Icons";

class FieldsToDownload extends React.Component {


  getCheckedValue = fieldName => {
    let fields = this.props.fieldsToDownload;
    let checkedValue = false;
    fields.map(f => {
      if (f === fieldName) {
        checkedValue = true;
      }
    });
    return checkedValue;
  };

  changeCheckedValue = (fieldName, e) => {
    this.props.changeFieldsToDownload(fieldName, e.target.checked);
  };

  render() {
    return <Card
      title={
        <div>
          <Row>
            <Col span={1}>{Icons.DOWNLOAD}</Col>
            <Col span={5}>Which User Properties you want to Download for the usernames?</Col>
          </Row>
        </div>
      }
      style={{ margin: 4, backgroundColor: "#fbfbfb" }}
    >
      <div style={{ backgroundColor: "f5f5f5", textAlign: "center" }}>
        <Row style={{ textAlign: "left" }}>
          <Col span={6}>
            <Checkbox
              checked={this.getCheckedValue("postCount")}
              onChange={e => this.changeCheckedValue("postCount", e)}
            />{" "}
            Post Count
          </Col>
          <Col span={6}>
            <Checkbox
              checked={this.getCheckedValue("email")}
              onChange={e => this.changeCheckedValue("email", e)}
            />{" "}
            Public Email (If Present)
          </Col>
          <Col span={12}>
            <Checkbox
              checked={this.getCheckedValue("engagementRate")}
              onChange={e => this.changeCheckedValue("engagementRate", e)}
            />{" "}
            Engagement Rate (last 12 posts)
          </Col>
        </Row>
        <br/>
        <Row style={{ textAlign: "left" }}>
          <Col span={6}>
            <Checkbox
              checked={this.getCheckedValue("phoneNumber")}
              onChange={e => this.changeCheckedValue("phoneNumber", e)}
            />{" "}
            Phone Number (If Present)
          </Col>
          <Col span={6}>
            <Checkbox
              checked={this.getCheckedValue("city")}
              onChange={e => this.changeCheckedValue("city", e)}
            />{" "}
            City (If Present)
          </Col>
          <Col span={12}>
            <Checkbox
              checked={this.getCheckedValue("phoneCountryCode")}
              onChange={e => this.changeCheckedValue("phoneCountryCode", e)}
            />{" "}
            Phone Country Code (If Present)
          </Col>

        </Row>
        <br />
        <Row style={{ textAlign: "left" }}>
          <Col span={6}>
            <Checkbox
              checked={this.getCheckedValue("biography")}
              onChange={e => this.changeCheckedValue("biography", e)}
            />{" "}
            Biography
          </Col>
          <Col span={6}>
            <Checkbox
              checked={this.getCheckedValue("followerCount")}
              onChange={e => this.changeCheckedValue("followerCount", e)}
            />{" "}
            Follower Count
          </Col>
          <Col span={6}>
            <Checkbox
              checked={this.getCheckedValue("followingCount")}
              onChange={e => this.changeCheckedValue("followingCount", e)}
            />{" "}
            Following Count
          </Col>
          <Col span={6}>
            <Checkbox
              checked={this.getCheckedValue("externalURL")}
              onChange={e => this.changeCheckedValue("externalURL", e)}
            />{" "}
            Link in account (website)
          </Col>
        </Row>
        <br/>
        <Row style={{ textAlign: "left" }}>
          <Col span={6}>
            <Checkbox
              checked={this.getCheckedValue("businessCategoryName")}
              onChange={e =>
                this.changeCheckedValue("businessCategoryName", e)
              }
            />{" "}
            Business Category Name
          </Col>
          <Col span={6}>
            <Checkbox
              checked={this.getCheckedValue("isBusinessAccount")}
              onChange={e => this.changeCheckedValue("isBusinessAccount", e)}
            />{" "}
            Is Business Account
          </Col>
          <Col span={6}>
            <Checkbox
              checked={this.getCheckedValue("isPrivate")}
              onChange={e => this.changeCheckedValue("isPrivate", e)}
            />{" "}
            Is Private
          </Col>
          {/*<Col span={6}>*/}
          {/*  <Checkbox*/}
          {/*    checked={this.getCheckedValue("postLocations")}*/}
          {/*    onChange={e => this.changeCheckedValue("postLocations", e)}*/}
          {/*  />{" "}*/}
          {/*  Last 12 Post Locations*/}
          {/*</Col>*/}
        </Row>
        <br />
        <Button
          onClick={this.props.next}
          className="ant-btn-primary">
          Next</Button>

      </div>
    </Card>;
  }
}

export default FieldsToDownload;

