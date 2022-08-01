import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialHeartImage(props) {
  return <React.Fragment>
    <TutorialHeading heading="Add heart to your image"/>
    <TutorialDescription text="
     Adds a heart water mark equivalent to the size of link on your image. So when someone likes your images, it fills the heart. Bait to get more likes on your images
    "
    />

    <TutorialStep
      step={1}
      name={"Click on Make your posts better, and then click on Heart your image tool"}
      image={null}
    />
    <TutorialStep
      step={2}
      name={"Upload your image and this will add a heart to the image the same size as you the heart will fill whenever anyone will press like"}
      image={null}
    />
    <br />
    <TutorialVideo helpType={NeedHelpEnum.HEART_YOUR_IMAGE}/>

  </React.Fragment>;
}

export default TutorialHeartImage;
