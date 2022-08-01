import React from "react";
import Timer from "react-compound-timer";
import { Card, Typography } from "antd";

const { Text, Title } = Typography;

function TimeForPause(props) {
  if (
    !props.showFollowerTimeMessage ||
    props.timeInSecondsBeforeFollowerScrape === 0
  ) {
    return <React.Fragment />;
  }
  return (
    <React.Fragment>
      <Timer
        initialTime={props.timeInSecondsBeforeFollowerScrape * 1000}
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
                  fontSize: "180%",
                  paddingBottom: "1%"
                }}
              >
                <strong>
                  Cooling down. Get the next 8,000 followers in
                  <Text code>
                    <Timer.Hours />
                    h:
                    <Timer.Minutes />
                    m:
                    <Timer.Seconds />s
                  </Text>
                </strong>
              </div>

              <div
                style={{
                  paddingLeft: "5%",
                  fontSize: "140%",
                  paddingBottom: "1%"
                }}
              >
                You can download Already discovered followers and get their
                Detailed Analysis till this cooldown period is going on. <br />
                <strong>Continue from the last done point by entering the same username again and selecting the continue checkbox or wait on this page to autocontinue till cooldown is over</strong>.
              </div>
            </Card>
          </React.Fragment>
        )}
      </Timer>
    </React.Fragment>
  );
}

export default TimeForPause;
