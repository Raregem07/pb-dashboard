import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialAnalyseDetailedUser(props) {
  return <React.Fragment>
    <TutorialHeading heading="User Data from Usernames / Detailed User Analysis"/>
    <TutorialDescription
      text="This tool gets you the detailed user analysis for the list of users. You get follower count, following count, engagement rate (~last 12 posts), Bio, website, email, contact, city and much more.
      Download username from follower following or dead following or likers or anything and then use this tool to get detailed analysis for these usernames
      "
    />
    <TutorialStep
      step={1}
      name={"Click on *Detailed Analysis* and then select the data fields which you need for the list of usernames (Bio, follower count, email etc.) "}
      image="DA_1"
    />
    <TutorialStep
      step={2}
      name={"Paste the list of usernames whose data you want to download in the space provided (you get the list of users from Target Users) and press submit"}
      image="DA_2"
    />
    <TutorialStep
      step={3}
      name={"Please use a VPN. See the tutorial on how to use free VPN (Rate limit tutorial)"}
      pngImage="use_vpn"
    />
    <TutorialStep
      step={4}
      name={"Apply filters on the detailed data of the list to get filtered data (e.g followers more than 300 and less than 1500). To download the filtered data, click on Download conditional data in CSV"}
      image="DA_3"
    />
    <TutorialStep
      step={5}
      name={"To download the full unfiltered data, click on *Download full data in CSV*"}
      image={"DA_4"}
    />
    <br />
    <TutorialVideo helpType={NeedHelpEnum.DETAILED_USER_ANALYSIS}/>

  </React.Fragment>;
}

export default TutorialAnalyseDetailedUser;
