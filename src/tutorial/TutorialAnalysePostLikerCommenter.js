import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialAnalyseDeadFollowers(props) {
  return <React.Fragment>
    <TutorialHeading heading="Analyse Liker Commenter of a Post"/>
    <TutorialDescription
      text="Use this tool to get the Likers, Commenters of post by entering the post link. Download this data and use this for analysis or get detailed analysis on this data"
    />
    <TutorialStep
      step={1}
      name={"Click on *Target Users* and then click on *Specific post’s likers and commenters*"}
      image="SPLC_1"
    />
    <TutorialStep
      step={2}
      name={"Paste the url of the post for which you want to analyse likers/commenters and press *Submit*"}
      image="SPLC_2"
    />
    <TutorialStep
      step={3}
      name={"If you are analysing post with more than 10k likes/comments you would get Rate limit and you would need a VPN to continue (Browsec). See the Rate limit Tutorial on how to remove the rate limit error and do it for more than 10k"}
      pngImage={"use_vpn_detailed"}
    />
    <TutorialStep
      step={4}
      name={"Scroll down to view the details of likers/commenters, click on + to view the detail of comment/like of a particular user"}
      image="SPLC3"
    />
    <TutorialStep
      step={5}
      name={"To download the details of likers/ commenters, click on *Download Likers* or *Download Commenters*"}
      image={"SPLC4"}
    />

    <br />
    <TutorialVideo helpType={NeedHelpEnum.ANALYSE_POST_LIKER_COMMENTER}/>

  </React.Fragment>;
}

export default TutorialAnalyseDeadFollowers;
