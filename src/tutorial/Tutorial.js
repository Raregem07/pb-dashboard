import React from "react";
import ApplicationConstants from "../common/constants/ApplicationConstants";

function Tutorial(props) {
  return <React.Fragment>
    <div style={{
      fontSize: "300%",
      marginLeft: "6%",
      marginTop: "1%",
      font: "Black 64px/77px Roboto",
      color: "#001529",
      fontWeight: "bold"
    }}>
      Tutorial
    </div>
    <div style={{
      fontSize: "130%",
      marginLeft: "4%",
      marginRight: "4%",
      marginTop: "5%",
      font: "Black 64px/77px Roboto",
      color: "#707070",
      fontWeight: "bold"
    }}>
      We have all our Tutorial blogs with a step by step Explanation <a
      href={ApplicationConstants.MEDIUM_BLOG} target="_blank"> here </a>. <br />
      <br />
      Or Visit Member's area of Profilemate <a
      href={ApplicationConstants.MEMBERS_AREA} target="_blank">here</a> to see "How to Use" and "Premium Training"
    </div>
    {/*<div style={{*/}
    {/*  fontSize: "150%",*/}
    {/*  marginLeft: "3%",*/}
    {/*  marginTop: "1%",*/}
    {/*  font: "Black 64px/77px Roboto",*/}
    {/*  color: "#001529",*/}
    {/*  fontWeight: "bold"*/}
    {/*}}>*/}
    {/*  Analyse Reports*/}
    {/*</div>*/}
    {/*<ul>*/}


    {/*  <li>*/}
    {/*    <TutorialOption*/}
    {/*      subURL="analyse_user"*/}
    {/*      name="User Profile Report"*/}
    {/*    />*/}
    {/*  </li>*/}

    {/*  <li>*/}
    {/*    <TutorialOption*/}
    {/*      subURL="analyse_user_posts"*/}
    {/*      name="User's Posts' Statistics"*/}
    {/*    />*/}
    {/*  </li>*/}

    {/*  <li>*/}
    {/*    <TutorialOption*/}
    {/*      subURL="giveaway_winner"*/}
    {/*      name="Select Giveaway winner"*/}
    {/*    />*/}
    {/*  </li>*/}

    {/*</ul>*/}

    {/*<br />*/}
    {/*<div style={{*/}
    {/*  fontSize: "150%",*/}
    {/*  marginLeft: "3%",*/}
    {/*  marginTop: "1%",*/}
    {/*  font: "Black 64px/77px Roboto",*/}
    {/*  color: "#001529",*/}
    {/*  fontWeight: "bold"*/}
    {/*}}>*/}
    {/*  Target Users*/}
    {/*</div>*/}
    {/*<ul>*/}

    {/*  <li>*/}
    {/*    <TutorialOption*/}
    {/*      subURL="rate_limit"*/}
    {/*      name="What is Rate limit? How to get data and make things work?"*/}
    {/*    />*/}
    {/*  </li>*/}

    {/*  <li>*/}
    {/*    <TutorialOption*/}
    {/*      subURL="analyse_follower_following"*/}
    {/*      name="How to get the Follower following of any account?"*/}
    {/*    />*/}
    {/*  </li>*/}

    {/*  <li>*/}
    {/*    <TutorialOption*/}
    {/*      subURL="analyse_user_liker_commenter"*/}
    {/*      name="Get Top Likers Commenters of any user?"*/}
    {/*    />*/}
    {/*  </li>*/}


    {/*  <li>*/}
    {/*    <TutorialOption*/}
    {/*      subURL="analyse_post_liker_commenter"*/}
    {/*      name="Analyse Liker Commenter of a Post"*/}
    {/*    />*/}
    {/*  </li>*/}


    {/*  /!*<li>*!/*/}
    {/*  /!*  <TutorialOption*!/*/}
    {/*  /!*    subURL="common_users"*!/*/}
    {/*  /!*    name="Get Common Users between 4 accounts (Most Targeted result)"*!/*/}
    {/*  /!*  />*!/*/}
    {/*  /!*</li>*!/*/}


    {/*  <li>*/}
    {/*    <TutorialOption*/}
    {/*      subURL="analyse_dead_followers"*/}
    {/*      name="Get Inactive/Ghost Followers for my account"*/}
    {/*    />*/}
    {/*  </li>*/}

    {/*</ul>*/}

    {/*<br />*/}
    {/*<div style={{*/}
    {/*  fontSize: "150%",*/}
    {/*  marginLeft: "3%",*/}
    {/*  marginTop: "1%",*/}
    {/*  font: "Black 64px/77px Roboto",*/}
    {/*  color: "#001529",*/}
    {/*  fontWeight: "bold"*/}
    {/*}}>*/}
    {/*  Email Extractor*/}
    {/*</div>*/}
    {/*<ul>*/}
    {/*  <li>*/}
    {/*    <TutorialOption*/}
    {/*      subURL="analyse_detailed_user"*/}
    {/*      name="Get Email, Engagement rate, Follower Following count, post count for list of users"*/}
    {/*    />*/}
    {/*  </li>*/}
    {/*</ul>*/}

  </React.Fragment>;
}

export default Tutorial;
