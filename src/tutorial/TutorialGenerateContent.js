import React from "react";
import TutorialHeading from "./TutorialHeading";
import TutorialStep from "./TutorialStep";
import TutorialDescription from "./TutorialDescription";
import TutorialVideo from "./TutorialVideo";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

function TutorialGenerateContent(props) {
  return <React.Fragment>
    <TutorialHeading heading="Best and Trending posts of Your genre"/>
    <TutorialDescription text="Use this tool to see, download & repost the posts based on hashtag,
    location or your competitor account. You can see only posts of your genre.
    Also this tells you what are the major hashtags used in your niche. This combined with related hashtag will never let you out of options for hashtags.
    " />
    <TutorialStep
      step={1}
      name={"Click on *Make your posts better*, and then click on *Best and trending posts of your genre*"}
      image="GBC1"
    />
    <TutorialStep
      step={2}
      name={"Enter your niche hashtag, Competitor account’s username or location (If you want posts at specific location) and click on *Get best posts*. Say if I am Food Blogger, I would enter hastags in my niche as #Food, #Foodgasm, #Foodie and competitor account as @love_food, @food_best_images"}
      image="GBC2"
    />
    <TutorialStep
      step={3}
      name={"Scroll down to view the top trending posts and top 10 hashtags used on these posts. To download a post for reposting, click on *Download button* on the post"}
      image="GBC3"
    />
    <TutorialStep
      step={4}
      name={"To download the list of top used hashtags, click on *Download hashtags* in CSV. These are the Common hashtags used at multiple places in your niche. Something you can use for the input to Related Hashtag module"}
      image={"GBC4"}
    />

    <br />
    <TutorialVideo helpType={NeedHelpEnum.TRENDING_CONTENT}/>

  </React.Fragment>;
}

export default TutorialGenerateContent;
