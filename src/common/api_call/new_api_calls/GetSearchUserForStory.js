import React from "react";
import GetRequest from "../GetRequest";
import sleep from "../../Sleep";
import User from "../../models/User";

let INSTAGRAM_APP_ID = 936619743392459;


async function GetSearchUserForStory(username) {

  let url = "https://www.instagram.com/web/search/topsearch/";
  let params = {
    context: "blended",
    query: `@${username}`,
    rank_token: 0.0805877783595057,
    include_reel: true
  };

  let headers = {
    "x-ig-app-id": INSTAGRAM_APP_ID,
    "path": `/web/search/topsearch/?context=blended&query=%23${username}&rank_token=0.2661365729452527&include_reel=true`,
    "scheme": "https"
  };

  let response;
  if (process.env.NODE_ENV !== "development") {
    response = await GetRequest(url, params, headers);
  } else {
    response = await getResponse(username);
  }

  let users = response.data.users;
  if (users.length < 1) {
    throw new Error("No User found");
  }
  let mainUser = users[0].user;
  return new User(mainUser.profile_pic_url, mainUser.username, mainUser.full_name, mainUser.pk, false, false, mainUser.friendship_status.friendship_status, false, mainUser.friendship_status.is_private, {
    expiringAt: mainUser.latest_reel_media,
    latestReelMedia: mainUser.latest_reel_media
  });
}

async function getResponse(username) {
  await sleep(200);
  return {
    data: {
      "users": [
        {
          "position": 0,
          "user": {
            "pk": "2095657187",
            "username": "abhnv_rai",
            "full_name": "Abhinav Rai",
            "is_private": false,
            "profile_pic_url": "https://scontent-del1-1.cdninstagram.com/v/t51.2885-19/s150x150/61546858_465671664182189_1676786851907633152_n.jpg?_nc_ht=scontent-del1-1.cdninstagram.com&_nc_ohc=64blqmxgZ7sAX9mCHui&oh=b9e19d7d482335ae34d9cb2587a8ee53&oe=5EFB8757",
            "profile_pic_id": "2062076044085912176_2095657187",
            "is_verified": false,
            "has_anonymous_profile_picture": false,
            "mutual_followers_count": 36,
            "social_context": "Following",
            "search_social_context": "Following",
            "friendship_status": {
              "following": true,
              "is_private": false,
              "incoming_request": false,
              "outgoing_request": false,
              "is_bestie": false,
              "is_restricted": false
            },
            "latest_reel_media": 1590812504,
            "seen": 0
          }
        },
        {
          "position": 1,
          "user": {
            "pk": "2894844147",
            "username": "abhnv.raj",
            "full_name": "Abhinav Raj Srivastava",
            "is_private": true,
            "profile_pic_url": "https://scontent-del1-1.cdninstagram.com/v/t51.2885-19/s150x150/19761814_686086018258567_8490823668979466240_a.jpg?_nc_ht=scontent-del1-1.cdninstagram.com&_nc_ohc=WzcK8PHMcQkAX-8iHp_&oh=8bb8829249405714b25855d0f7116a66&oe=5EFA964D",
            "profile_pic_id": "1553937771234860603_2894844147",
            "is_verified": false,
            "has_anonymous_profile_picture": false,
            "mutual_followers_count": 0,
            "friendship_status": {
              "following": false,
              "is_private": true,
              "incoming_request": false,
              "outgoing_request": false,
              "is_bestie": false,
              "is_restricted": false
            },
            "latest_reel_media": 0,
            "seen": 0
          }
        },
        {
          "position": 2,
          "user": {
            "pk": "12756787162",
            "username": "abhinavraj803",
            "full_name": "ABH!n@v* RaJ✌️",
            "is_private": false,
            "profile_pic_url": "https://scontent-del1-1.cdninstagram.com/v/t51.2885-19/s150x150/57083810_574208166391697_1285747250886082560_n.jpg?_nc_ht=scontent-del1-1.cdninstagram.com&_nc_ohc=Gft1aChld20AX-KPoy1&oh=2303851c7cc20b41c278586c01b12c92&oe=5EFAE704",
            "profile_pic_id": "2022705548667298369_12756787162",
            "is_verified": false,
            "has_anonymous_profile_picture": false,
            "mutual_followers_count": 0,
            "friendship_status": {
              "following": false,
              "is_private": false,
              "incoming_request": false,
              "outgoing_request": false,
              "is_bestie": false,
              "is_restricted": false
            },
            "latest_reel_media": 0,
            "seen": 0
          }
        }
      ],
      "places": [],
      "hashtags": [],
      "has_more": true,
      "rank_token": "0.7182474768145475",
      "clear_client_cache": false,
      "status": "ok"
    }
  };
}


export default GetSearchUserForStory;
