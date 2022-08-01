import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialAnalyseUserLikerCommenter(props) {
  return <React.Fragment>
    <TutorialHeading heading="Analyse Liker Commenter of User"/>
    <TutorialDescription
      text="Use this tool to get the Likers, Commenters of posts of a people. See who is your biggest liker / Commenter.You would be surprised to see the result."
    />
    <TutorialStep
      step={1}
      name={" Click on *Targeted User* and then click on *User's top Likers and commenters*"}
      image="ATLC_1"
    />
    <TutorialStep
      step={2}
      name={"Click on *View another account’s analytics*, enter the username of the account whose post’s likers and commenters you want to view and download"}
      image="ATLC_2"
    />
    <TutorialStep
      step={3}
      name={"If you have a lot of likers/commenters, you might be *rate limited* by instagram. See the *Rate limit tutorial* on *how to use VPN to fix this*. Don't worry this is solvable for public accounts. For private accounts, just let the process pause for some time till it is resumed again."}
      pngImage="use_vpn"
    />
    <TutorialStep
      step={4}
      name={"To download the data (post engagement, like count, comment count etc.) of all the posts, click on *Download post data in CSV*"}
      image="TLC3"
    />
    <TutorialStep
      step={5}
      name={"To view and download the likers and commenters of posts of the user, click on the checkbox of the post for which you want the data, and press submit"}
      image={"TLC4"}
    />
    <TutorialStep
      step={6}
      name={"Scroll down to view the likers and commenters of the selected post, click on *Download Likers* or *Download Commenters* to download the list of likers and commenters"}
      image={"TLC5"}
    />
    <TutorialStep
      step={7}
      name={"To perform a *detailed analysis* (E-mail, website, follower-following count etc.) on this list of users, click on Go to *detailed analysis* and paste the list of users "}
      image={"FFA_5"}
    />
    <br />
    <TutorialVideo helpType={NeedHelpEnum.ANALYSE_USER_LIKER_COMMENTER}/>

  </React.Fragment>;
}

export default TutorialAnalyseUserLikerCommenter;
