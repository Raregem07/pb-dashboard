import React from 'react';
import Typewriter from "typewriter-effect";

function TutorialDescription(props) {
  return <React.Fragment>
    <div
      style={{
        marginLeft: "3%",
        marginRight: "3%",
        padding: "1%",
        marginTop: "1%",
        marginBottom: "1%",
        fontSize: "150%",
        font: "Black 64px/77px Roboto",
        color: "#707070",
        backgroundColor: "#FFF",
        boxShadow: "0px 3px 6px #00000029",
        borderRadius: 11,
      }}
    >
      <Typewriter
        options={{
          delay: 35,
          loop: true
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(`${props.text}`)
            .pauseFor(35000)
            .deleteAll(0.9)
            .start();
        }}
      />

    </div>
  </React.Fragment>
}

export default TutorialDescription;
