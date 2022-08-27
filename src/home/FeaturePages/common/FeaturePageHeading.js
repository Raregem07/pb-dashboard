import React from "react";

function FeaturePageHeading(props) {
  return <React.Fragment>
    <div style={{
      fontSize: 44,
      font: "Black 64px/77px Roboto",
      color: "#FFFFFF",
      fontWeight: "bold",
      width: "100%",
      height: 64,
      backgroundImage: props.backgroundImage,
      paddingLeft: 64
    }}>
      {props.text}
    </div>

  </React.Fragment>;
}

export default FeaturePageHeading;
