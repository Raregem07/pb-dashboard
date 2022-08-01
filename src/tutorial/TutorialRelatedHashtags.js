import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialRelatedHashtags(props) {
  return <React.Fragment>
    <TutorialHeading heading="Related Trending Hashtags"/>
    <TutorialDescription text="Hashtags play the most important part in discoverability of your post. The more tranding and related hashtags you have, more the chance of your post becoming big.
    ProfileBud gets you related trending hashtag based on a given hashtag. This gives you so many hashtags which got ranked in Top 9 Posts for the specific hashtag. So if you use these hashtags, chances of your post landing in top 9 posts increases.
    Also thinking hashtags is hard. Get best 30 Hashtags by using this tool. Using your same hashtags without changing can also result in shadow ban. So use targeted hashtag for your posts.
    " />
    <TutorialStep
      step={1}
      name={"Click on *Make your posts better*, and then click on *Trending related hashtags*"}
      image="RH1"
    />
    <TutorialStep
      step={2}
      name={"Enter the hashtag for which you want top performing related hashtags and and press *Submit*"}
      image="RH2"
    />
    <TutorialStep
      step={3}
      name={"Scroll down to view top related hashtags. Select the hashtags from the list that you want to use for your post"}
      image="RH3"
    />
    <TutorialStep
      step={4}
      name={"To copy the hashtags click on copy hashtags, paste these hashtags in a word document for future use. You can use max 30 hashtags in a post. Use this way to discover new hashtags"}
      image={"RH4"}
    />
    <br />
    <TutorialVideo helpType={NeedHelpEnum.RELATED_HASHTAGS}/>

  </React.Fragment>;
}

export default TutorialRelatedHashtags;
