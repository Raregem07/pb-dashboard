import React from 'react';
import Typewriter from "typewriter-effect";

function FeaturePageAnalyticsNote(props) {
  return <React.Fragment>
    <div style={{
      width: "95%",

      marginTop: "2%",
      paddingTop: "1%",
      paddingBottom: "1%",
      paddingLeft: "1%",
      marginLeft: "2%",

      backgroundColor: "white",

      fontSize: "164%",
      boxShadow: "0px 3px 6px #00000029",
      borderRadius: 11,
      font: "Medium 32px/38px Roboto",
      color: "#707070",

      fontWeight: "italic",
    }}>
      <div>
        {/*<Typewriter*/}
        {/*  options={{*/}
        {/*    delay: 35,*/}
        {/*    loop: true*/}
        {/*  }}*/}
        {/*  onInit={(typewriter) => {*/}
        {/*    typewriter*/}
        {/*      .typeString(`${props.note}`)*/}
        {/*      .pauseFor(35000)*/}
        {/*      .deleteAll(0.9)*/}
        {/*      .start();*/}
        {/*  }}*/}
        {/*/>*/}
        {props.note}
      </div>
    </div>
  </React.Fragment>
}

export default FeaturePageAnalyticsNote;
