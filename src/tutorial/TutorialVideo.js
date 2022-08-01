import React from 'react';
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialVideo(props) {
  return <React.Fragment>
    <div
      style={{
        width: "80%",
        marginLeft: "5%",
        marginRight: "3%",
      }}
    >
      <h2>Video Tutorial</h2>
      <NeedHelp type={props.helpType} onlyVideo={true}/>
    </div>
    <br />

  </React.Fragment>
}

export default TutorialVideo;
