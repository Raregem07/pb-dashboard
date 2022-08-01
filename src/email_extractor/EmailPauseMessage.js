import React from "react";
import Timer from "react-compound-timer";
import { Card, Typography } from "antd";
import NewNotification from "../common/components/NewNotification";

const { Text, Title } = Typography;

class EmailPauseMessage extends React.Component {
  constructor(props) {
    super(props);
    let notificationLine;
    if (props.isPremium) {
      notificationLine = `@${props.username} Accounts Daily Limit Over`;
    }

    if (!props.isPremium) {
      notificationLine = `@${props.username} Accounts Daily Limit Over`;
    }

    NewNotification(notificationLine, "", true);
  }

  render() {

    if (this.props.rateLimitTimeRemainingInMS === 0) {
      return <React.Fragment />;
    }

    return (
      <React.Fragment>
        <Timer
          initialTime={this.props.rateLimitTimeRemainingInMS}
          direction="backward"
        >
          {() => (
            <React.Fragment>
              <Card
                bordered={true}
                style={{
                  margin: "2%",
                  backgroundColor: "#fbfbfb",
                  marginTop: "0%"
                }}
              >
                {this.props.isPremium ? (
                  <div
                    style={{
                      paddingLeft: "5%",
                      fontSize: "150%",
                      paddingBottom: "1%"
                    }}
                  >
                    <strong>@{this.props.username} Account's Daily  Limit Over</strong> <br /><br />
                    Try again after{" "}
                    <Text code>
                      <Timer.Hours />
                      h:
                      <Timer.Minutes />
                      m:
                      <Timer.Seconds />s
                    </Text> <strong>&nbsp;&nbsp;&nbsp;&nbsp;Or</strong>
                    <br />
                    Change to different Instagram Account from Members Area. Step by Step <a href="https://profilemate.wordpress.com/2020/10/02/how-to-rotate-instagram-accounts-to-reset-limits-in-profilemate/" target="_blank">here</a>. What to do now <a href="https://profilemate.wordpress.com/2020/10/09/what-do-do-when-max-users-done-for-the-day-comes/" target="_blank">here</a>
                  </div>
                ) : (
                  <div
                    style={{
                      paddingLeft: "5%",
                      fontSize: "150%",
                      paddingBottom: "1%"
                    }}
                  >
                    <strong>@{this.props.username} Account's Daily Limit Over</strong> <br /><br />

                    Try again after{" "}
                    <Text code>
                      <Timer.Hours />
                      h:
                      <Timer.Minutes />
                      m:
                      <Timer.Seconds />s
                    </Text> &nbsp;&nbsp;&nbsp;<strong>OR</strong><br />
                    Change to different Instagram Account from Members Area. Step by Step <a href="https://profilemate.wordpress.com/2020/10/02/how-to-rotate-instagram-accounts-to-reset-limits-in-profilemate/" target="_blank">here</a> <strong>&nbsp;&nbsp;OR</strong>. What to do now <a href="https://profilemate.wordpress.com/2020/10/09/what-do-do-when-max-users-done-for-the-day-comes/" target="_blank">here</a><br />
                    Upgrade to Pro Membership from JVZoo for thousands of VIP Searches
                  </div>
                )}
              </Card>
            </React.Fragment>
          )}
        </Timer>
      </React.Fragment>
    );
  }
}

export default EmailPauseMessage;
