import React from "react";
import AnalyseYourSelfIcon from "../../../common/icons/AnalyseYourSelfIcon";
import AnalyseOtherIcon from "../../../common/icons/AnalyseOtherIcon";

function AnalyticsMainPageCardSelf(props) {
  let icon = <AnalyseYourSelfIcon/>;



  return (
    <React.Fragment>
      <div
        className="analyticsMainCard"
        style={{
          width: "90%",
          backgroundColor: "#D6E865",
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
      <style jsx>{`
        .analyticsMainCard:hover {
          box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
        }
        
      `}</style>
    </React.Fragment>
  );
}

export default AnalyticsMainPageCardSelf;
