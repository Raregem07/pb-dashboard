import React from "react";
import AnalyseYourSelfIcon from "../../../common/icons/AnalyseYourSelfIcon";
import AnalyseOtherIcon from "../../../common/icons/AnalyseOtherIcon";

function AnalyticsMainPageCardSelf(props) {
  let icon = <AnalyseYourSelfIcon/>;



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
            paddingTop: "10%"
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
            paddingTop: 24,
            paddingBottom: "10%",
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

export default AnalyticsMainPageCardSelf;
