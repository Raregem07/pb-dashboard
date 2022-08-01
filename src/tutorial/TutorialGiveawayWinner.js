import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialGiveawayWinner(props) {
  return <React.Fragment>
    <TutorialHeading heading="Download Data & Choose Giveaway Winner"/>
    <TutorialDescription text="Choose Giveaway winner randomly for your post, Get Commenters and Comments data and use this for analysis" />
    <TutorialStep
      step={1}
      name={"Click on *Analyse Report* and then click on *Choose Giveaway Post’s Winner*"}
      image="GAW_1"
    />
    <TutorialStep
      step={2}
      name={"Copy and paste the link of your giveaway post in the enter post link box and press submit"}
      image="GAW_2"
    />
    <TutorialStep
      step={3}
      name={"Click on Pick a lucky winner from comments, you will get the winner"}
      image={"GAW_3"}
    />
    <TutorialStep
      step={4}
      name={"Click on *Download Commenters and Comment values* to Download all the commenters & Comments they added. Click on *Download Commenters & Counts* button to see which commenter did how many comments"}
      image={null}
    />
    <br />
    <TutorialVideo helpType={NeedHelpEnum.GIVEAWAY_WINNER}/>

  </React.Fragment>;
}

export default TutorialGiveawayWinner;
