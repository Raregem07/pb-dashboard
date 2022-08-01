import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialAnalyseDeadFollowers(props) {
  return <React.Fragment>
    <TutorialHeading heading="Dead/Ghost Followers"/>
    <TutorialDescription
      text="Ghost followers are those people who follow you but have never liked or commented on your posts. Get list Dead followers for your account and engage with them (like/comment their post) to increase your account's engagement"
    />
    <TutorialStep
      step={1}
      name={"Click on *Target Users* and then click on *Inactive/Ghost followers*"}
      image="GF_1"
    />
    <TutorialStep
      step={2}
      name={"Click on view any other account’s analytics, enter the username of the account you want to analyse dead/ghost followers, select the number of  posts for which you want to get the dead/ghost followers, and click on Analyse Dead followers"}
      image="GF_2"
    />
    <TutorialStep
      step={3}
      name={"If you are analysing big profile you might get ratelimited. Don't worry, let this process continue on it's ow. It would pause for 5-10 min and then resume again and in the end you would have your data. Use a VPN for best case & See the Rate limit tutorial for more details"}
      pngImage="rate_limit"
    />
    <TutorialStep
      step={4}
      name={"Scroll down to view all the dead followers, click on + to view account details of the dead follower"}
      image="DF3"
    />
    <TutorialStep
      step={5}
      name={"To perform an action e.g like, comment, follow or unfollow on the dead follower, select the dead user by clicking on the checkbox, and then clicking on the action present above the list of dead followers"}
      image={"DF4"}
    />
    <TutorialStep
      step={6}
      name={"To perform detailed analysis (Get Followers count, Following count, Engagement rate, User Bio, etc) on the list of dead followers, click on detailed analysis, paste the usernames of dead followers from downloaded list"}
      image={"DF5"}
    />
    <br />
    <TutorialVideo helpType={NeedHelpEnum.DEAD_FOLLOWERS}/>

  </React.Fragment>;
}

export default TutorialAnalyseDeadFollowers;
