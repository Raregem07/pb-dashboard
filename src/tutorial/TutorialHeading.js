import React from 'react';

function TutorialHeading(props) {
  return <React.Fragment>
    <div style={{
      fontSize: "260%",
      marginLeft: "6%",
      marginTop: "1%",
      font: "Black 64px/77px Roboto",
      color: "#001529",
      fontWeight: "bold"
    }}>
      {props.heading}
    </div>
  </React.Fragment>
}

export default TutorialHeading;
