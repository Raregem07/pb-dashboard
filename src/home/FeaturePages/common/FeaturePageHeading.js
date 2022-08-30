import React from "react";

function FeaturePageHeading(props) {
  return <React.Fragment>
    <div style={{
      fontSize: "31px",
      color: "#FFFFFF",
      fontWeight: "bold",
      width: "100%",
      height: "121px",
      backgroundImage: "linear-gradient(to right, rgb(13, 152, 186), rgb(214, 232, 101))",
      paddingLeft: 64,
      paddingBottom: "7%",
      marginTop: 70
    }}>
      {props.text}
      <div
              style={{
                width: "93%",
                padding: "1px 13px",
                backgroundColor: "white",
                fontSize: "18px",
                boxShadow: "0px 3px 6px #00000029",
                color: "black",
                marginTop: "15px",
              }}
            >
              <div>{props.desc}</div>
        </div>
    </div>

  </React.Fragment>;
}

export default FeaturePageHeading;
