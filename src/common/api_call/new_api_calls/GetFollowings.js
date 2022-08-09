import GetRequest from "../GetRequest";
import ApiError from "../../models/ApiError";
import sendNotification from "../../SendNotification";
import NotificationTypeEnum from "../../models/NotificationTypeEnum";
import SaveError from "../../store/SaveError";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../../constants/AnalyticsCategoryEnum";
import sleep from "../../Sleep";
import FollowerUser from "../../models/FollowerUser";

let INSTAGRAM_APP_ID = 936619743392459;

async function getFollowings(userID, nextPage, throwError = false) {
  let baseURL = "https://www.instagram.com/graphql/query";
  let params = {
    "query_hash": "58712303d941c6855d4e888c5f0cd22f",
    "variables": {
      "id": userID,
      "include_reel": true,
      "fetch_mutual": false,
      "first": 50,
      "after": nextPage
    }
  };
  let headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "*/*",
    "X-IG-App-ID": INSTAGRAM_APP_ID
  };
  let response;
  try {
    if (process.env.NODE_ENV !== "development") {
      response = await GetRequest(baseURL, params, headers);
    } else {
      response = await dummyFollowing();
    }
  } catch (e) {
    let detailedError = "Rate Limit on getting followers for a user";
    let error = new ApiError(e, detailedError, "ProfileBuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again");
    // sendNotification(NotificationTypeEnum.Failure, `Rate Limited | Grambuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again`, true);
    await SaveError(error);

    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "get following for a user",
      label: `userID: ${userID} | Status_Code: ${error.status}`
    });

    if (throwError) {
      throw e;
    }
    return { followings: [], nextPageToken: null };
  }
  let user = response.data.data.user;
  let edges = user.edge_follow.edges;
  let followings = [];
  for (let i = 0; i < edges.length; i++) {
    followings.push(new FollowerUser(edges[i]));
  }
  let pageInfo = user.edge_follow.page_info;
  let nextPageToken = null, total = user.edge_follow.count;
  if (pageInfo.has_next_page) {
    nextPageToken = pageInfo.end_cursor;
  }
  return { followings: followings, nextPageToken: nextPageToken, total: total };
}

async function dummyFollowing() {
  await sleep(400);
  return {
    data: {
      "data": {
        "user": {
          "edge_follow": {
            "count": 445,
            "page_info": {
              "has_next_page": false,
              "end_cursor": ""
            },
            "edges": [
              {
                "node": {
                  "id": "1401714969",
                  "username": "therealpeterlindbergh",
                  "full_name": "Peter Lindbergh",
                  "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/10aea80a7d643189a636f14a603c12be/5DF5BBD2/t51.2885-19/s150x150/46085812_2246417508903172_3605453284954865664_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                  "is_verified": true,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "3590469673",
                  "username": "karan.gosain18",
                  "full_name": "Karan Gosain",
                  "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/5aa9847089d6b731320c035e3d352e35/5E118CD4/t51.2885-19/s150x150/16228921_636817709839752_5515655086660911104_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "4908039178",
                  "username": "abby_j31",
                  "full_name": "Abha Jain",
                  "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/167550e1198c3632bee0e00dc2c294b3/5DF64323/t51.2885-19/s150x150/59325971_2275118672726926_5048101631103598592_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1695406777",
                  "username": "ms_petite_narang",
                  "full_name": "Rhythm Narang",
                  "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/7b96184748004b2d5d47115a6c9c4f77/5E14351B/t51.2885-19/s150x150/50692753_652436275175446_2690586604791136256_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1568117660",
                  "username": "madovermarketing_mom",
                  "full_name": "Mad Over Marketing (M.O.M)",
                  "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/9e57bc12c2e2e293c7a88081b6a4ce0a/5DFCF222/t51.2885-19/s150x150/22429563_1731056027198823_6061352710504972288_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1374138163",
                  "username": "grilledcheese_sandwich_",
                  "full_name": "Srishti Agarwal",
                  "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/58d3e5ce6eadb17db8b42143ffb00e11/5E0F5FDC/t51.2885-19/s150x150/59859485_647608465685317_4033286492116746240_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
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

export default getFollowings;
