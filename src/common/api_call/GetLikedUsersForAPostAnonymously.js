import getMainUser from "../chrome/GetMainUser";
import getOptions from "../GetOptions";
import sleep from "../Sleep";
import User from "../models/User";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import sendNotification from "../SendNotification";
import NotificationTypeEnum from "../models/NotificationTypeEnum";
import SaveError from "../store/SaveError";
import ApiError from "../models/ApiError";
import GetRequest from "./GetRequest";
import SleepArgs from "../models/SleepArgs";
import AddLevel2Calls from "../Helpers/AddLevel2Calls";

async function getLikedUsersForAPostAnonymously(postShortCode, isSleeping, stopAPICallCheck, nextPageToken = null, previousUsers = []) {
  if (stopAPICallCheck()) {
    return previousUsers;
  }
  isSleeping(false);
  let baseURL = "https://www.instagram.com/graphql/query";
  let params = {
    "query_hash": "1cb6ec562846122743b61e492c85999f",
    "variables": {
      "shortcode": postShortCode,
      "first": 50,
      "after": nextPageToken
    }
  };
  let mainUser = await getMainUser();
  let csrfToken = mainUser.csrfToken;
  let headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "*/*",
    "X-CSRFToken": csrfToken
  };
  let response;
  try {
    if (process.env.NODE_ENV !== "development") {
      let url;
      if (nextPageToken) {
        url = baseURL + `?query_hash=${params.query_hash}&variables=%7B%22shortcode%22:%22${params.variables.shortcode}%22,%22first%22:${params.variables.first},%22after%22:%22${params.variables.after}%22%7D`;
      } else {
        url = baseURL + `?query_hash=${params.query_hash}&variables=%7B%22shortcode%22:%22${params.variables.shortcode}%22,%22first%22:${params.variables.first},%22after%22:${params.variables.after}%7D`;
      }
      let fetchResponse = await fetch(url, {
        method: "GET",
        headers: headers,
        credentials: "omit"
      });
      response = { data: await fetchResponse.json() };
    } else {
      await sleep(100);
      response = getResponse();
    }
  } catch (e) {
    let detailedError = "Rate Limit on getting Likers for the post";
    let error = new ApiError(e, detailedError, "Grambuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again");
    sendNotification(NotificationTypeEnum.Failure, `Pausing for 5 min. Don't `, true);
    await SaveError(error);

    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "get liked users for a post",
      label: `Status_Code: ${error.status} | ${previousUsers.length} scraped before error`
    });
    let options = await getOptions();
    isSleeping(true, new SleepArgs(true, "LIKERS_OF_POST_ANONYMOUSLY"));
    await sleep(options.sleepTimeFor429InSeconds * 1000);
    return await getLikedUsersForAPostAnonymously(postShortCode, isSleeping, stopAPICallCheck, nextPageToken, previousUsers);
  }
  if (response.data.data === undefined) {
    sendNotification(NotificationTypeEnum.Failure, `Rate Limited | Grambuddy automatically handles rate limiting. Please use some VPN (Try Free VPN - Browsec Chrome extension or if using, change the region)`, true);
    let mainUser = await getMainUser();
    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "get liked users for a post",
      label: `Status_Code: ${429} | ${previousUsers.length} scraped before error | username: ${mainUser.viewer.username}`
    });
    let options = await getOptions();
    isSleeping(true, new SleepArgs(true, "LIKERS_OF_POST_ANONYMOUSLY"));
    await sleep(options.sleepTimeFor429InSeconds * 1000);
    return await getLikedUsersForAPostAnonymously(postShortCode, isSleeping, stopAPICallCheck, nextPageToken, previousUsers);
  }
  let likedObject = response.data.data.shortcode_media.edge_liked_by;
  let users = [];
  let edges = likedObject.edges;

  await AddLevel2Calls(edges.length);

  for (let i = 0; i < edges.length; i++) {
    let userObj = edges[i].node;
    users.push(new User(userObj.profile_pic_url, userObj.username, userObj.full_name, userObj.id,
      userObj.followed_by_viewer, null, null, null));
  }
  previousUsers = previousUsers.concat(users);
  let pageInfo = likedObject.page_info;
  if (pageInfo.has_next_page) {
    return await getLikedUsersForAPostAnonymously(postShortCode, isSleeping, stopAPICallCheck, pageInfo.end_cursor, previousUsers);
  } else {
    return previousUsers;
  }
}

function getResponse() {
  return {
    "data": {
      "data": {
        "shortcode_media": {
          "id": "2082174118389055607",
          "shortcode": "BzlXlQvF4B3",
          "edge_liked_by": {
            "count": 8,
            "page_info": {
              "has_next_page": false,
              "end_cursor": null
            },
            "edges": [
              {
                "node": {
                  "id": "13571762233",
                  "username": "dream_about_aqua",
                  "full_name": "Dream Aqua Design",
                  "profile_pic_url": "https://abhinavrai.com/assets/images/abhinav.png",
                  "is_verified": false,
                  "followed_by_viewer": true,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "146175402",
                  "username": "mandyonearth",
                  "full_name": "𝐌𝐚𝐧𝐝𝐲",
                  "profile_pic_url": "https://instagram.fblr1-3.fna.fbcdn.net/vp/b4632b70540901f2145283eb1f404af5/5DE5EB9F/t51.2885-19/s150x150/38431274_1413593405451145_8573419399069827072_n.jpg?_nc_ht=instagram.fblr1-3.fna.fbcdn.net",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "6864490109",
                  "username": "profit_world_com",
                  "full_name": "profit-world.com",
                  "profile_pic_url": "https://instagram.fblr1-3.fna.fbcdn.net/vp/1926fafb4c634631c031e7fa57a8bdf3/5DE8FDC0/t51.2885-19/s150x150/47582095_572055003258504_476417469192339456_n.jpg?_nc_ht=instagram.fblr1-3.fna.fbcdn.net",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "221668172",
                  "username": "austulyys",
                  "full_name": "A U S T Ė J A ✨",
                  "profile_pic_url": "https://instagram.fblr1-3.fna.fbcdn.net/vp/f81e44cbb73ed1151529057bf2245dbc/5DC9BD9A/t51.2885-19/s150x150/65161755_2754967594520560_5679723777965948928_n.jpg?_nc_ht=instagram.fblr1-3.fna.fbcdn.net",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "4703856249",
                  "username": "_____sanal__mc",
                  "full_name": "SaNaL Mc",
                  "profile_pic_url": "https://instagram.fblr1-3.fna.fbcdn.net/vp/26e5d1728a342ceadc7b0def762ab922/5DD54EE6/t51.2885-19/s150x150/62618166_202918377268039_6361856685849444352_n.jpg?_nc_ht=instagram.fblr1-3.fna.fbcdn.net",
                  "is_verified": false,
                  "followed_by_viewer": true,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1121216802",
                  "username": "pratap_kamal",
                  "full_name": "Kamal Pratap",
                  "profile_pic_url": "https://instagram.fblr1-3.fna.fbcdn.net/vp/5960047072dd67bc387b7d5f35946f51/5DD1407C/t51.2885-19/s150x150/21436127_1986257221663352_3841049902045986816_a.jpg?_nc_ht=instagram.fblr1-3.fna.fbcdn.net",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "3264692362",
                  "username": "raman007singh",
                  "full_name": "Raman Singh",
                  "profile_pic_url": "https://instagram.fblr1-3.fna.fbcdn.net/vp/f9cc5e2da313d9569da9ca5683d0ad40/5DC7D8D5/t51.2885-19/s150x150/21041414_2341710969386512_2578225664712769536_a.jpg?_nc_ht=instagram.fblr1-3.fna.fbcdn.net",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "15918157809",
                  "username": "aditya_kumar_chopra__",
                  "full_name": "Aditya Chopra",
                  "profile_pic_url": "https://instagram.fblr1-3.fna.fbcdn.net/vp/48016df0b9ebefe5d4c3f5e710d5bc4d/5DDE72F9/t51.2885-19/s150x150/62175231_2263442173969638_8664891928912855040_n.jpg?_nc_ht=instagram.fblr1-3.fna.fbcdn.net",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              }
            ]
          }
        }
      },
      "status": "ok"
    }
  };
}

export default getLikedUsersForAPostAnonymously;
