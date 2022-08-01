import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialCommonUsers(props) {
  return <React.Fragment>
    <TutorialHeading heading="Common Users between 4 accounts"/>
    <TutorialDescription text="
     This gets the common users between 4 accounts. Add your 4 competitors here and personss in all 4 are the best persons you should engage with.
    "
    />
    <TutorialStep
      step={1}
      name={"Click on *Target Users* and then click on *Common users between accounts*"}
      image={"CUBA_1"}
    />
    <TutorialStep
      step={2}
      name={"Enter the username of accounts whose common followers or followings you want to view and download. "}
      image="CUBA_1"
    />
    <TutorialStep
      step={3}
      name={"Select follower, and uncheck following if you want to view only the common followers between the selected accounts and press *Submit*"}
      image="CFF3"
    />
    <TutorialStep
      step={4}
      name={"Choose the best Filters where you wanna see users who follow specific user and are followed by other specific users. Scroll down to view the list of common followers/followings, click on download in CSV to download the data."}
      image={"CFF4"}
    />
    <TutorialStep
      step={5}
      name={"From the list of common followers, click on + to view more details about the user"}
      image={"CFF5"}
    />

    <br />
    <TutorialVideo helpType={NeedHelpEnum.COMMON_USERS}/>

  </React.Fragment>;
}

export default TutorialCommonUsers;
