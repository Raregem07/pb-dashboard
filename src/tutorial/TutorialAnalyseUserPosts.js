import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialAnalyseUserPosts(props) {
  return <React.Fragment>
    <TutorialHeading heading="User's Posts' Statistics"/>
    <TutorialDescription
      text="Instagram removed the like count feature? But, ProfileMate can still show you the like count, engagement rate, comment count and an option to download the posts for any user"
    />
    <TutorialStep
      step={1}
      name={"Click on *Analyse Reports* and then click on *Post’s Statistics of any account*"}
      image="PS_1"
    />
    <TutorialStep
      step={2}
      name={"Click on *Post statistics for any user*, enter the username whose post you want to analyse"}
      image="PS_2"
    />
    <TutorialStep
      step={3}
      name={"Scroll down to view the post, it’s likes , comments and engagement rate. Download this data by clicking on *Download post’s data in XLS* or Download all Images & Videos by Clicking on *Download all Images/Videos button*"}
      image="PS_3"
    />
    <TutorialStep
      step={4}
      name={"To view any post, click on the image. To download a particular post, click on download button of the post"}
      image={"PS_4"}
    />
    <br />
    <TutorialVideo helpType={NeedHelpEnum.ANALYSE_POSTS}/>

  </React.Fragment>;
}

export default TutorialAnalyseUserPosts;
