/*global chrome*/

import ChangeCase from "../ChangeCase";
import { Tooltip } from "antd";
import React from "react";
import LanguageCaseEnum from "../models/LanguageCaseEnum";

function getFromChrome(key) {
  if (process.env.NODE_ENV !== "development") {
    return chrome.i18n.getMessage(key);
  } else {
    return localTranslations[key]["message"];
  }
}

function I18(key, languageCase = LanguageCaseEnum.CAMEL_CASE, tooltip = false, tooltipPlacement="right") {
  let keyInSmall = key
    .split(" ")
    .join("_")
    .toLowerCase();
  let text = getFromChrome(keyInSmall);
  let valueToReturn = ChangeCase(text , languageCase);

  if (tooltip) {
    let text = getFromChrome(keyInSmall+"_tooltip");
    let tooltipValue = ChangeCase(text , languageCase);
    return (
      <Tooltip title={tooltipValue} placement={tooltipPlacement}>
        <span>{valueToReturn}</span>
      </Tooltip>
    );
  }
  return <span>{valueToReturn}</span>;
}

const localTranslations = {
  "automation": {
    "message": "Automation"
  },
  "automation_tooltip": {
    "message": "You let buddygram perform actions such as like/comment/follow/unfollow on users of your genre."
  },
  "automation_configuration": {
    "message": "Automation Configuration"
  },
  "automation_configuration_tooltip": {
    "message": "Configure Actions (Like / Comment / Follow / Unfollow) and your genre (Hashtags / Locations / Competitor Accounts) along with oher settings for best automation."
  },
  "task_queue": {
    "message": "Task Queue"
  },
  "progress_lost": {
    "message": "Progress will be lost. You can open another tab also. Press Profile bud extension again"
  },
  "task_queue_tooltip": {
    "message": "Start Automation from here and see the tasks which will be performed. You can also manually perform the tasks."
  },
  "completed_tasks": {
    "message": "Completed Tasks"
  },
  "completed_tasks_tooltip": {
    "message": "Tasks which have been completed along with their details"
  },
  "comment_store": {
    "message": "Comment Store"
  },
  "comment_store_tooltip": {
    "message": "Your Comment store. A random comment will be picked."
  },
  "actions_by_username": {
    "message": "Actions By Username"
  },
  "actions_by_username_tooltip": {
    "message": "Perform specific actions by instagram username list"
  },
  "your_instagram_feed": {
    "message": "Like / Comment on your Feed"
  },
  "your_instagram_feed_tooltip": {
    "message": "Perform Like / Comment on posts of people who you are following in your IG feed. This makes hem happy. Use this if you have a lot of people and you want to keep them happy."
  },
  "activity_statistics": {
    "message": "IG Activity & Statistics"
  },
  "activity_statistics_tooltip": {
    "message": "Shows your automation statistics (Which Hashtags / Locations / Competitor Accounts got you most activity) and all your account activity (Like who liked/commented on your which post or who followed you when)"
  },
  "analytics": {
    "message": "Analytics"
  },
  "analytics_tooltip": {
    "message": "Analyses & downloads the data of various users on Instagram and perform actions like follow/unfollow/like/comment. Analyses anyone's followers ??? following, posts, likers, commenters, posts' statistics and much more"
  },
  "follower_following": {
    "message": "Analyse Follower/Following"
  },
  "follower_following_tooltip": {
    "message": "Analyse, Download & Perform Automation on Followers and Followings for any user. See interesting things like finding whom the person follows but they don't follow back and vice versa. Also perform Unfollow / Follow / Like / Comment tasks"
  },
  "analyse_posts": {
    "message": "Analyse Posts"
  },
  "analyse_posts_tooltip": {
    "message": "Analyse Posts of any user. Find out likers and commenters for their posts and download this data in csv / xls. To be used to find any user's most consistent people, secret-stalkers and for checking comments statistics on any posts in giveaway on any post."
  },
  "options": {
    "message": "Options"
  },
  "options_tooltip": {
    "message": "Settings, Help and Errors happened so far"
  },
  "related_hashtags": {
    "message": "Related Hashtags"
  },
  "related_hashtags_tooltip": {
    "message": "Explore related hashtags (Which people are using) to a given hashtag. Copy them and use them to increase your Instagram engagement"
  },
  "heart_your_image": {
    "message": "??? Heart your Image"
  },
  "heart_your_image_tooltip": {
    "message": "Puts this ??? watermark on any image you upload. It's of the same size as he double tap heart like which comes. So as a bait for the user to like your post so as to fill this heart.  "
  },
  "common_users": {
    "message": "Common Users"
  },
  "common_users_tooltip": {
    "message": "Find & perform automation on common followers/followings between max 4 people. This lets you find more people of your genre."
  },
  "tools": {
    "message": "Tools"
  },
  "tools_tooltip": {
    "message": "Bunch of tools such as Related Hashtags, Common Users, Split image, Repost and Heart your image"
  },
  "location": {
    "message": "Location"
  },
  "location_tooltip": {
    "message": "Download Location posts data or perform like and comment on posts by location via automation"
  },
  "hashtags": {
    "message": "Hashtags"
  },
  "hashtags_tooltip": {
    "message": "Download hashtag posts data or perform like and comment on posts by hashtags via automation"
  },
  "explore_instagram": {
    "message": "Explore Instagram"
  },
  "explore_instagram_tooltip": {
    "message": "Download data, Perform automation (Like/Comment) on posts searched by Hashtag or Location"
  },
  "analyse_user": {
    "message": "Analyse User"
  },
  "analyse_user_tooltip": {
    "message": "Analyses user's engagement rate, hashtags, location and user mention trend along with day wise post & engagement analysis"
  },
  "post_fetching_status": {
    "message": "Posts/Users Fetching Status"
  },
  "post_fetching_status_tooltip": {
    "message": "Used in automation. If circle is rotating, then ProfileBuddy is fetching posts and users for automation based on the criteria you set"
  },
  "dead_followers": {
    "message": "Dead Followers"
  },
  "dead_followers_tooltip": {
    "message": "Show the list of all your followers who have never liked/commented any of your post so far. You can mass Unfollow them also to increase engagement"
  },
  "trial_over_message":  {
    "message": "ProfileBuddy Subscription Expired. Buy ProfileBuddy to keep sky rocketing your growth"
  },
  "analytics_trial_over_message": {
    "message": "ProfileBuddy \"Analytics\" Subscription Expired. Buy ProfileBuddy to keep using analytics and sky rocket your growth"
  },
  "engage_trial_over_message": {
    "message": "ProfileBuddy \"Targeted Engagemenet\" Subscription Expired. Buy ProfileBuddy to keep using targeted engagement and sky rocket your growth"
  },
  "split_image": {
    "message": "Split Image"
  },
  "split_image_tooltip": {
    "message": "Divides your image into X Cross Y blocks"
  },
  "settings": {
    "message": "Settings"
  },
  "settings_tooltip": {
    "message": "Set the basic settings like automation sleed here"
  },
  "errors": {
    "message": "Errors"
  },
  "errors_tooltip": {
    "message": "See the errors which occured. All errors are logged here"
  },
  "help": {
    "message": "Help"
  },
  "help_tooltip": {
    "message": "Stuck somewhere? or just drop us a hello. We will reply you back as soon as we see the message."
  },
  "repost": {
    "message": "Repost"
  },
  "repost_tooltip": {
    "message": "Get any post from its url and download the post with caption and hashtag"
  },
  "subscription": {
    "message": "Subscription"
  },
  "subscription_tooltip":  {
    "message": "Check your Use case wise subscription here"
  },
  "new_task_queue": {
    "message": "New Task Queue"
  },
  "new_task_queue_tooltip": {
    "message": "New Task Queue - Has stories support. Can use this for automation"
  },
  "generate_content_tooltip": {
    "message": "Helps you generate targeted content"
  },
  "generate_content": {
    "message": "Generate Content"
  },
};

export default I18;
