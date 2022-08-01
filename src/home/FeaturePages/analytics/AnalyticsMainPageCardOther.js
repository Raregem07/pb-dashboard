import React from "react";
import AnalyseOtherIcon from "../../../common/icons/AnalyseOtherIcon";

function AnalyticsMainPageCardOther(props) {
  let icon = <AnalyseOtherIcon/>;

  return (
    <React.Fragment>
      <div
        style={{
          width: "90%",

          backgroundColor: props.backgroundColor,
          borderRadius: 11

        }}
      >
        <div
          style={{
            textAlign: "center",
            paddingTop: "2%"
          }}
        >
          {icon}
        </div>
        <div
          style={{
            font: "Black 45px/54px Roboto",
            color: "#FFF",
            fontSize: "270%",
            textAlign: "center",
            fontWeight: "bold",
            paddingBottom: "8%",
            paddingLeft: "2%",
            paddingRight: "2%"
          }}
        >
          {props.name}
        </div>
      </div>
    </React.Fragment>
  );
}

export default AnalyticsMainPageCardOther;
