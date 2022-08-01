/*global chrome*/

import OptionsModel from "../models/OptionsModel";
import TaskEnum from "../../analytics/TaskEnum";
import Hashtag from "../models/Hashtag";
import SearchUser from "../models/SearchUser";
import Place from "../models/Place";
import MediaAgeEnum from "../models/MediaAgeEnum";
import DatabaseKeys from "../models/DatabaseKeys";
import defaultComments from "../constants/DefaultComments";
import SpeedOptionsEnum from "../models/SpeedOptionsEnum";
import OptionsDefaultValue from "../constants/OptionsDefaultValue";
import MainUserSharedData from "../models/MainUserSharedData";

function GetObject(key) {
  if (process.env.NODE_ENV === "development") {
    let valueToReturn;
    if (key.startsWith("PostsForHashtag_")) {
      valueToReturn = null;
    }

    if (key === DatabaseKeys.TASKS) {
      valueToReturn = [];
    }

    if (key === DatabaseKeys.FOLLOWER_SAVE_POINTS) {
      valueToReturn = {};
      // {"someidhere":
      // { "doneTill": 20000, "pageToken": "something" }
      // }
    }

    if (key === DatabaseKeys.OPTIONS) {
      valueToReturn = OptionsDefaultValue;
    }
    if (key === DatabaseKeys.COMPLETED_TASKS) {
      valueToReturn = [];
    }
    if (key === DatabaseKeys.CALLS_DATA) {
      valueToReturn = {
        level2Calls: 2000,
        level3Calls: 2000,
        level2AllowedCalls: 2500,
        level3AllowedCalls: 2100
      }
    }
    if (key === DatabaseKeys.LOGGED_IN_USER_DETAILS) {
      valueToReturn = {
        config: {
          viewer: {
            "biography": "23, Bangalore↵Cat Lover | IITian",
            "external_url": null,
            "full_name": "Shweta Oberoi",
            has_phone_number: false,
            has_profile_pic: true,
            id: "15918157809",
            is_joined_recently: false,
            is_private: false,
            profile_pic_url: "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/87215197_2528393040821733_6574589345188020224_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_ohc=TlVFAiEDpvsAX-_U7_3&oh=e389987ecc4c3a86ecf4032e8336ae6f&oe=5EA43A40",
            profile_pic_url_hd: "https://instagram.fblr2-1.fna.fbcdn.net/vp/4df079dc1f80cbe8892a848c05f42b26/5DDE72F9/t51.2885-19/s150x150/62175231_2263442173969638_8664891928912855040_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net",
            username: "aditya_kumar_chopra__"
          },
          csrf_token: "2374298374hjdgfsd",
        },
        rollout_hash: "123123jkbsfd",
        country_code: "IN"
      }
    }

    if (key === DatabaseKeys.TASKS_TO_UNFOLLOW) {
      valueToReturn = [];
    }

    if (key === DatabaseKeys.COMMENTS) {
      valueToReturn = defaultComments
    }

    if (key === DatabaseKeys.AUTOMATION_MEMORY) {
      valueToReturn = null;
    }

    if (key === DatabaseKeys.RUN_AUTOMATION) {
      valueToReturn = false;
    }

    if (key === DatabaseKeys.API_ERROR) {
      valueToReturn = [];
      for (let i=0;i<10;i++) {
        valueToReturn.push({
          status: 400,
          time: Date.now(),
          detailedError: `Detailed Error - ${i}`,
          displayLine: `Display Line - ${i}`
        });
      }
    }

    if (key === DatabaseKeys.AUTOMATION) {
      valueToReturn = {
        'todo': {
          like: true,
          comment: true,
          follow: true,
          likeAndFollow: false,
          unfollowAll: false,
          unfollowNonFollowers: false
        },
        'smartSuggestions': true,
        'filter': {
          minLikes: 0,
          maxLikes: 10000,
          minComments: 0,
          maxComments: 10000,
          minFollowers: 0,
          maxFollowers: 700,
          minFollowing: 0,
          maxFollowing: 700,
          mediaAge: MediaAgeEnum.ANY
        },
        'automationsInADay': {
          maxLikesAutomation: 500,
          maxCommentsAutomation: 100,
          maxFollowAutomation: 100
        },
        'strategyBrain': {
          hashtags: 8,
          location: 4,
          commentersOfSimilarAccounts: 9,
          likersOfSimilarAccounts: 6,
          followersOfSimilarAccounts: 7
        },
        'hashtags': [new Hashtag({
          "position": 0,
          "hashtag": {
            "name": "bali",
            "id": 17841563530116038,
            "media_count": 54986201,
            "search_result_subtitle": "54.9m posts"
          }
        }), new Hashtag({
          "position": 1,
          "hashtag": {
            "name": "food",
            "id": 17841563530116039,
            "media_count": 54986201,
            "search_result_subtitle": "54.9m posts"
          }
        })],
        'places': [
        //   new Place({
        //   "place": {
        //     "location": {
        //       "pk": "169269817014453",
        //       "name": "Indira Gandhi International Airport Terminal 3 Departure",
        //       "address": "D33, Terminal 3, Dial, Indira Gandhi International Airport",
        //       "city": "New Delhi",
        //       "short_name": "Indira Gandhi International Airport Terminal 3 Departure",
        //       "lng": 77.084780474484,
        //       "lat": 28.55509243407,
        //       "external_source": "facebook_places",
        //       "facebook_places_id": 169269817014453
        //     },
        //     "title": "Indira Gandhi International Airport Terminal 3 Departure",
        //     "subtitle": "D33, Terminal 3, Dial, Indira Gandhi International Airport, New Delhi",
        //     "media_bundles": [],
        //     "header_media": {},
        //     "slug": "indira-gandhi-international-airport-terminal-3-departure"
        //   },
        //   "position": 87
        // })
        ],
        'similarUsers': [
        //   new SearchUser({
        //     "position": 0,
        //     "user": {
        //       "pk": "5025556581",
        //       "username": "_mansi_mittal_",
        //       "full_name": "Mansi Mittal",
        //       "is_private": false,
        //       "profile_pic_url": "https://instagram.fbom19-1.fna.fbcdn.net/v/t51.2885-19/s150x150/17663096_381586892234499_1483080738776547328_a.jpg?_nc_ht=instagram.fbom19-1.fna.fbcdn.net&oh=6d73b4706ac1c647a8105bf909987542&oe=5E8F1223",
        //       "profile_pic_id": "1487008747667022428_5025556581",
        //       "is_verified": false,
        //       "has_anonymous_profile_picture": false,
        //       "mutual_followers_count": 100,
        //       "can_see_primary_country_in_settings": false,
        //       "friendship_status": {
        //         "following": true,
        //         "is_private": false,
        //         "incoming_request": false,
        //         "outgoing_request": false,
        //         "is_bestie": false,
        //         "is_restricted": false
        //       }
        //     }
        //   }
        // )
        ]
      }
    }

    if (key === DatabaseKeys.USERS_DATA) {
      valueToReturn = {
        "aditya_kumar_chopra__": [
          {followerCount: 139, followingCount: 120, timeCaptured: 1586293578 },
          {followerCount: 140, followingCount: 121, timeCaptured: 1586293780 },
          {followerCount: 140, followingCount: 112, timeCaptured: 1586393978 },
          {followerCount: 141, followingCount: 60, timeCaptured: 1586493978 },
        ],
        "chugh_aditya": [
          {followerCount: 100, followingCount: 120, timeCaptured: 1586293578 },
          {followerCount: 120, followingCount: 121, timeCaptured: 1586293780 },
          {followerCount: 130, followingCount: 112, timeCaptured: 1586393978 },
          {followerCount: 140, followingCount: 60, timeCaptured: 1586493978 },
        ]
      }
    }

    if (key === DatabaseKeys.ANALYTICS_VIDEO) {
      valueToReturn = true;
    }
    if (key === DatabaseKeys.IMPROVE_CONTENT_VIDEO) {
      valueToReturn = true;
    }
    if (key === DatabaseKeys.ENGAGEMENT_VIDEO) {
      valueToReturn = true;
    }
      // console.log('Chrome Get Object called with key', key, 'and returned value', valueToReturn);
    return new Promise(r => {
      setTimeout(() => {
        r(valueToReturn);
      }, 100);
    })
  } else {
    return new Promise((res, rej) => {
      if (key === DatabaseKeys.LOGGED_IN_USER_DETAILS || key === DatabaseKeys.USERS_FOR_ANALYSIS || key === DatabaseKeys.USERS_DATA || key === DatabaseKeys.EMAIL || key === DatabaseKeys.CALLS_DATA || key === DatabaseKeys.FOLLOWER_SAVE_POINTS) {
        chrome.storage.local.get([key], function (result) {
          res(result[key]);
        });
      } else {
        chrome.storage.local.get([DatabaseKeys.LOGGED_IN_USER_DETAILS], (result) => {
          let mainUserData = new MainUserSharedData(result[DatabaseKeys.LOGGED_IN_USER_DETAILS]);
          let loggedInUserID = mainUserData.viewer.id;
          let finalKey = `${key}_${loggedInUserID}`;
          chrome.storage.local.get([finalKey], function (result) {
            res(result[finalKey]);
          });
        });
      }
    });
  }
}

export default GetObject;