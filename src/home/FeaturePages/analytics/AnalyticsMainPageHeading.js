import React from "react";
import FeatureDetails from "../../FeatureDetails";

function AnalyticsMainPageHeading(props) {
  return (
    <React.Fragment>
      <div
        style={{
          fontSize: "33px",
          font: "Black 64px/77px Roboto",
          color: "#FFFFFF",
          fontWeight: "bold",

          width: "100%",
          paddingBottom: "2%",
          backgroundImage: "linear-gradient(to right,  #0d98ba, #D6E865)",

          paddingLeft: 64,
          paddingTop: "7%"
        }}
      >
        {props.heading}
        <div
          style={{
            width: "93%",
            height: "30%",

            marginTop: "1%",
            // paddingLeft: "2%",
            // paddingTop: "0.5%",
            padding: "1px 13px",

            backgroundColor: "white",

            fontSize: "18px",
            boxShadow: "0px 3px 6px #00000029",
            // borderRadius: 11,
            color: "black"
          }}
        >
          <div>{`${props.headingText}`}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AnalyticsMainPageHeading;
