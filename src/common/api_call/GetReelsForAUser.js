import axios from "axios";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import sleep from "../Sleep";
import getMainUser from "../chrome/GetMainUser";
import User from "../models/User";

let INSTAGRAM_APP_ID = 936619743392459;

async function GetReelsForAUser(userId, isAnonymous = false) {
  let baseURL = "https://www.instagram.com/graphql/query";
  let params = {
    "query_hash": "c9100bf9110dd6361671f113dd02e7d6",
    "variables": {
      "user_id": userId,
      "include_chaining": true,
      "include_reel": true,
      "include_suggested_users": false,
      "include_logged_out_extras": false,
      "include_highlight_reels": true,
      "include_related_profiles": false
    }
  };
  let mainUser = await getMainUser();
  let csrfToken = mainUser.csrfToken;
  let headers = {
    "x-ig-app-id": INSTAGRAM_APP_ID,
    "x-csrftoken": csrfToken
  };
  let response, r;
  try {
    if (process.env.NODE_ENV !== "development") {
      if (isAnonymous) {
        let urlA = `https://www.instagram.com/graphql/query/?query_hash=c9100bf9110dd6361671f113dd02e7d6&variables={%22user_id%22:%22${userId}%22,%22include_reel%22:true}`;
        r = await fetch(urlA, {
          credentials: "omit"
        });
        response = { data: await r.json() };
      } else {
        response = await axios.get(baseURL, {
          params: params,
          headers: headers
        });
      }

    } else {
      response = await dummyReelIdsResponse(userId);
    }
  } catch (error) {
    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "Get Reel Ids for Instagram"
    });
    throw (error);
  }
  if (!response.data.data) {
    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "Get Reel Ids for Instagram"
    });
    throw (new Error("Something went wrong with anonymous call"));
  }
  if (!response.data.data.user) {
    throw (new Error("Could not find user"));
  }
  let reelUser = response.data.data.user.reel.user;
  return new User(reelUser.profile_pic_url, reelUser.username, "", reelUser.id);
}

async function dummyReelIdsResponse(userID) {
  await sleep(800);
  return {
    data: {
      "data": {
        "user": {
          "reel": {
            "user": {
              "profile_pic_url": "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png",
              "username": `abhnv_rai_${userID}`,
              "id": userID
            }
          }
        },
        "viewer": {}
      },
      "status": "ok"
    }
  };
}

export default GetReelsForAUser;