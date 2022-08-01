import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import TutorialVideo from "./TutorialVideo";

function TutorialTargetedEngagement(props) {
  return <React.Fragment>
    <TutorialHeading heading="Get Best people to engage with & Perform task"/>
    <TutorialDescription text="
    This tool creates tasks for you. Tasks include 'Like/Comment/Follow' to the people who are your target audience. i.e the likers, commenters & followers of your competitor accounts,
    people who posted with specific hashtag or at specific location in your genre. Like/Comment their post and they would definately check out your profile. Out of 1 billion people out there, we get you the best people who are most likely to follow you back.
    Religiously do these tasks (~400 in 60 min per day) and gain 1-5k followers in a month with this approach. Profilebud also remembers to unfollow the followed users after 5 days if you want.
    "
    />
    <TutorialStep
      step={1}
      name={"Click on *Engage with your Targeted Audience* , and then click on *Get best people and perform task*"}
      image="PT1"
    />

    <TutorialStep
      step={2}
      name={"Click on *Set Configurations*, in configurations you need to define competitor account, hashtags your target audience might be using and location. This step is really important so take some time to think about your competition who are big players"}
      image="PT2"
    />

    <TutorialStep
      step={3}
      name={"Click on the actions you want to perform on the targeted users, liking their post, commenting on their post or following them"}
      image="PT3"
    />

    <TutorialStep
      step={4}
      name={"To get the tasks to be performed, click on Tasks in the left side bar, and then click on generate tasks. Based on your set configurations, your task will be generated"}
      image={"PT4"}
    />

    <TutorialStep
      step={5}
      name={"From the list of tasks generated to engage with the target audience, click on complete task, your task will open in a new tab. Perform the task to engage with your target audience"}
      image={"PT5"}
    />

    <TutorialStep
      step={6}
      name={"View your completed tasks by clicking on *Done tasks* in the left side bar"}
      image={"PT6"}
    />
    <br />

    <TutorialVideo helpType={NeedHelpEnum.AUTOMATION_CONFIGURATIONS}/>

  </React.Fragment>;
}

export default TutorialTargetedEngagement;
