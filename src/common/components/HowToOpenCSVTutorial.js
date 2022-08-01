import React from "react";
import ApplicationConstants from "../constants/ApplicationConstants";


class HowToOpenCSVTutorial extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <React.Fragment>
      <div style={{
        width: "90%",

        paddingTop: "1%",
        paddingBottom: "1%",
        paddingLeft: "2%",
        paddingRight: "1%",
        marginLeft: "6%",

        backgroundColor: "#56C2FF",
        color: "#FFF",

        boxShadow: "0px 3px 6px #00000029",
        borderRadius: 6,
        font: "Black 29px/35px Roboto",

        fontSize: "130%",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "2%",
      }}>
        Read <a style={{color: "#021529", textDecoration: "underline"}} href={ApplicationConstants.TUTORIAL_LINK_OPEN_CSV_IN_GOOGLE_SHEETS} target="_blank">here</a> on "How to View the downloaded CSV file"
      </div>
    </React.Fragment>
  }
}

export default HowToOpenCSVTutorial