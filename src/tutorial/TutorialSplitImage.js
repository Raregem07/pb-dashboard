import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialSplitImage(props) {
  return <React.Fragment>
    <TutorialHeading heading="Split Image into Multiple Images (Image Grid)"/>
    <TutorialDescription text="
     Split your main one image into multiple (1 by 3) or (3 by 3) grid to make your profile stand apart
    "
    />
    <TutorialStep
      step={1}
      name={"Click on *Make your posts better*, and then click on *Split image tool*"}
      image="SIT1"
    />
    <TutorialStep
      step={2}
      name={"Click on the Add File area and choose your file to upload"}
      image="SIT2"
    />
    <TutorialStep
      step={3}
      name={"Select the number of rows and columns you want to create for your Image"}
      image="SIT3"
    />
    <TutorialStep
      step={4}
      name={"*Drag the highlighted square/rectangle* area over the image for which you want to create the grids, scroll down to see the preview and press *Download* to download individual image"}
      image={"SIT4"}
    />
    <br />
    <TutorialVideo helpType={NeedHelpEnum.SPLIT_IMAGE}/>

  </React.Fragment>;
}

export default TutorialSplitImage;
