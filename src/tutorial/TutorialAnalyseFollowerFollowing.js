import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialAnalyseFollowerFollowing(props) {
  return <React.Fragment>
    <TutorialHeading heading="User Follower Following"/>
    <TutorialDescription
      text="Follower Following gets you the followers-followings for any user. This is very important metric to know for your own self and well as for other.
      Get the follower following list from this tool and then use this list in 'User Data from username' to get metrics like engagement rate, follower count, following count, user bio, etc for all these people.
      On Average, you can download 50k users in 50 minutes
      "
    />
    <TutorialStep
      step={1}
      name={"Click on *Target Users* and then click on *Follower/Following*"}
      image="FFA_1"
    />
    <TutorialStep
      step={2}
      name={"Click on *View another account’s analytics*, enter the username of the account whose follower-following you want to analyse and click on *Analyse Follower-Following*"}
      image="FFA_2"
    />
    <TutorialStep
      step={3}
      name={"If you are doing this for accounts with more than 9k, you might see the rate limit error. Don't worry just ignore. Process resumes after 5-10 min."}
      pngImage="rate_limit_detailed"
    />
    <TutorialStep
      step={4}
      name={"Scroll down to view the follower following data, brats, fans, mutual. To download the follower following data in CSV, Click on *Download data in CSV*"}
      image="AFF3"
    />
    <TutorialStep
      step={5}
      name={"To download list of brats in CSV, click on Brats, and then click on *Download data in CSV*, similarly you can choose fans and mutual and do the same for them"}
      image={"AFF4"}
    />

    <TutorialStep
      step={6}
      name={" To view details of a particular type of user, for e.g. Fans, click on fans, scroll down to the list of fans and click on + to see the details of that user"}
      image={"AFF5"}
    />

    <TutorialStep
      step={7}
      name={"To perform a *detailed analysis* (E-mail, website, follower-following count etc.) on this list of users, click on Go to *detailed analysis* and paste the list of users "}
      image={"FFA_5"}
    />

    <br />
    <TutorialVideo helpType={NeedHelpEnum.ANALYSE_FOLLOWER_FOLLOWING}/>

  </React.Fragment>;
}

export default TutorialAnalyseFollowerFollowing;
