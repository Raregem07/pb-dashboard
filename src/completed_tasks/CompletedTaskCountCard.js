import React from "react";
import { Card } from "antd";

function CompletedTaskCountCard(props) {
  return (
    <Card
      style={{
        borderRadius: 10,
        boxShadow: "0px 3px 8px #00000029",
        backgroundColor: "#FFF"
      }}
      title={
        <div
          style={{
            textAlign: "center",
            fontSize: 20,
          }}
        >
          {props.icon}&nbsp;&nbsp;{props.title}
        </div>
      }
      bordered={false}
    >
      <div style={{ textAlign: "center",  }}>
        <p style={{ fontSize: 40 }}>{props.count}</p>
      </div>
    </Card>
  );
}

export default CompletedTaskCountCard;
