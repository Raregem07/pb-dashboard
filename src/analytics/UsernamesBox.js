import React from "react";
import { Button, Card, Col, Input } from "antd";
import Icons from "../common/components/Icons";
import { Row } from "antd/es";
import { AppContext } from "../home/Home";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import I18 from "../common/chrome/I18";
import NewNotification from "../common/components/NewNotification";

const { TextArea } = Input;

class UsernamesBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textAreaText: "",
      loading: false
    };
  }


  onTextAreaChange = e => {
    this.setState({ textAreaText: e.target.value });
  };

  getUsers = () => {
    let text = this.state.textAreaText;
    let usernames = text.split("\n");
    for (let i = 0; i < usernames.length; i++) {
      if (usernames[i] === "") {
        usernames.splice(i, 1);
        i--;
      } else {
        usernames[i] = usernames[i].trim();
      }
    }
    return usernames;
  };

  getTextAreaText = () => {
    let completedUsers = this.props.completedUsers;
    if (completedUsers === null || completedUsers === []) {
      return this.state.textAreaText;
    }
    let users = this.state.textAreaText.split("\n");
    let newUsers = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i] in completedUsers) {
      } else {
        newUsers.push(users[i]);
      }
    }
    return newUsers.reduce((accumulator, user) => {
      return accumulator + user + "\n";
    }, "");
  };

  noPermissions = () => {
    sendNotification(
      NotificationTypeEnum.Failure,
      I18("analytics_trial_over_message"),
      true
    );
  };

  setUsers = () => {
    let repeatedUsers = this.getUsers();
    let users = Array.from(new Set(repeatedUsers));
    let totalRepeatedUsers = repeatedUsers.length - users.length;
    if (totalRepeatedUsers > 0) {
      NewNotification(`${totalRepeatedUsers} repeatitive usernames removed from the list`, "");
    }
    this.props.setUsernames(users);
  };

  render() {
    return (
      <React.Fragment>
        <Card
          title={
            <Row>
              <Col span={16}>
                {Icons.USER} &nbsp;&nbsp;&nbsp;Enter different
                usernames in next line
              </Col>
              <Col span={8}>Usernames entered: {this.getUsers().length}</Col>
            </Row>
          }
          style={{ margin: 4, backgroundColor: "#fbfbfb" }}
        >
          <TextArea
            onChange={this.onTextAreaChange}
            placeholder="ronaldo&#10;emmawatson&#10;zteveen90&#10;...&#10;...&#10;..."
            autosize={{ minRows: 8, maxRows: 12 }}
            value={this.getTextAreaText()}
          />
          <br/>
          <br/>
          <div style={{ textAlign: "center" }}>
            <AppContext.Consumer>
              {value => {
                let buttonOnClickCallback = this.setUsers;
                return <Button
                  disabled={this.getUsers().length === 0 || !this.props.isAllowed}
                  type="primary"
                  onClick={buttonOnClickCallback}>Submit</Button>;
              }}
            </AppContext.Consumer>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default UsernamesBox;
