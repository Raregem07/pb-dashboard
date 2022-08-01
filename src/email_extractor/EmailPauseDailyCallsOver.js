import React from "react";
import Timer from "react-compound-timer";
import { Card, Typography } from "antd";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import sendNotification from "../common/SendNotification";
import GetDate from "../common/Helpers/GetDate";
import NewNotification from "../common/components/NewNotification";

const { Text, Title } = Typography;


class EmailPauseDailsCallsOver extends React.Component {

  constructor(props) {
    super(props);

    let notificationLine;
    if (this.props.isPremium) {
      notificationLine = ``;
    }

    if (!this.props.isPremium) {
      notificationLine = `You can upgrade this limit & speed by 5 times by investing in ProfileMate's VIP Searches`;
    }

    this.notificationLine = notificationLine;

    NewNotification("Daily Limits Over", notificationLine, true);



  }

  render() {

    let openingTime = new Date(GetDate()).getTime() + 86400 * 1000;
    let diffInMS = openingTime - new Date().getTime();


    return (
      <React.Fragment>
        <Timer
          initialTime={diffInMS}
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
                <div
                  style={{
                    paddingLeft: "5%",
                    fontSize: "150%",
                    paddingBottom: "1%"
                  }}
                >
                  <strong>
                    Daily Limits Over | {this.notificationLine }. Continue after
                    <Text code>
                      <Timer.Hours/>
                      h:
                      <Timer.Minutes/>
                      m:
                      <Timer.Seconds/>s
                    </Text>&nbsp;&nbsp;&nbsp;&nbsp; OR
                  </strong>
                  <br />
                  You can change the instagram account in the members area and use that account
                </div>
                {/*<div*/}
                {/*  style={{*/}
                {/*    paddingLeft: "5%",*/}
                {/*    fontSize: "140%",*/}
                {/*    paddingBottom: "1%"*/}
                {/*  }}*/}
                {/*>*/}
                {/*  You can purchase <strong>Profilemate's Supercharged searches</strong> to get much more users. <br />*/}
                {/*  Else, you can change your Connected Instagram Account from Members' area and use any other Instagram account.*/}
                {/*</div>*/}
              </Card>
            </React.Fragment>
          )}
        </Timer>
      </React.Fragment>
    );
  }
}

export default EmailPauseDailsCallsOver;
