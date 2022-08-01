import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialRateLimit(props) {
  return <React.Fragment>
    <TutorialHeading heading="What is Rate Limit? How to get Data?"/>
    <TutorialDescription text="When too many requests happen, Instagram blocks our IP for some time.
    There are times when this problem can be gone when you use a VPN.
    In this tutorial, we will use a free VPN and make rate limit go away." />
    <TutorialStep
      step={1}
      name={"If you are getting error like the below mentioned image, then all you can do is wait. Even VPN won't help. So let the process run and it will automatically continue. This pause happens for *5-10 min and the data resume continues*. Generally happens with *getting follower following data*."}
      pngImage={"rate_limit"}
    />
    <TutorialStep
      step={2}
      name={"If you are seeing the error which tells you to *install VPN*, *use a VPN to remove these errors*. This happens generally with getting *likers* & *commenters* from the Instagram"}
      pngImage="use_vpn"
    />
    <TutorialStep
      step={3}
      name={"Install Browsec Chrome extension from the Download Icon link in the error. This is a free VPN and another chrome extension. Install it from chrome store. You can also use NordVPN or any other VPN of your choice"}
    />
    <TutorialStep
      step={4}
      name={"When the Browsec Extension is Installed. Click on the Browsec Icon. Now click on Protect Me button and choose a location"}
      pngImage={"browsec_protect_me"}
    />
    <TutorialStep
      step={5}
      name={"Switch between countries when rate limit happens again. 4 countries are free and are enough for the use cases of ProfileMate"}
      pngImage={"browsec_location"}
    />
    <br />
  </React.Fragment>;
}

export default TutorialRateLimit;
