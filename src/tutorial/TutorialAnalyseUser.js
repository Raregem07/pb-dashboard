import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialAnalyseUser(props) {
  return <React.Fragment>
    <TutorialHeading heading="User Profile Report"/>
    <TutorialDescription
      text="Get Profile report for any user who is on Instagram. Use this to get insights about your own account or your competitors.
      Do their competitor analysis from their Engagement rate, Hashtags they've Used, Locations they have mentioned, Users they have mentioned,
      How frequently they post, their engagement trend with time, their best and worst posts and much more. Use this data to skyrocket your account.
      "
    />
    <TutorialStep
      step={1}
      name={"Click on *Analysis Report* and then click on *Any Account’s Report*"}
      image="PR_1"
    />
    <TutorialStep
      step={2}
      name={"Click on *View any other account’s report* and enter the username of the account you want to analyse"}
      image="PR_2"
    />
    <TutorialStep
      step={3}
      name={"Scroll down to see the details like Monthwise post analysis, time-wise post trend, Hashtag trends, location trend, user mentions, best and worst performing posts"}
      image={null}
    />
    <TutorialStep
      step={4}
      name={"To view above mentioned data in spreadsheet, click on *Download data in CSV*"}
      image={"PR_4"}
    />
    <br />
    <TutorialVideo helpType={NeedHelpEnum.ANALYSE_USER}/>

  </React.Fragment>;
}

export default TutorialAnalyseUser;
