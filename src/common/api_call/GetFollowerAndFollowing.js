import getOptions from "../GetOptions";
import sleep from "../Sleep";
import makeUserObjects from "../MakeUserObjectForFollowerFollowing";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import sendNotification from "../SendNotification";
import NotificationTypeEnum from "../models/NotificationTypeEnum";
import SaveError from "../store/SaveError";
import ApiError from "../models/ApiError";
import GetRequest from "./GetRequest";
import FollowerUser from "../models/FollowerUser";
import AddLevel2Calls from "../Helpers/AddLevel2Calls";

let INSTAGRAM_APP_ID = 936619743392459;
let DELAY_IN_MS_BETWEEN_EVERY_GRAPH_REQUEST_CALL_TO_GET_FOLLOWER = 100;


// This is deprecated. User get followers refactored
export async function getFollowers(userID, callback, isSleeping, stopAPICallsCheck, count = 10000000, returnOnFirstRateLimit) {
  let options = await getOptions();
  let followers = await scrapeFollowers(userID, null, [], options.pageSizeForFetchingUsers, callback, isSleeping, stopAPICallsCheck, count, returnOnFirstRateLimit);
  return followers;
}

// This returns the user object unlike the deprecated ones and then we have to use makeUserObjects in the other one.
export async function getFollowersV2(userID, progressStatusForPosts, isSleeping, stopAPICallsCheck) {
  let options = await getOptions();
  let followers = await scrapeFollowers(userID, null, [], options.pageSizeForFetchingUsers, progressStatusForPosts, isSleeping, stopAPICallsCheck, 10000000, false);
  let followersUsers = followers.map(f => {
    return new FollowerUser(f);
  });
  return makeUserObjects(followersUsers, null);
}

export async function getFollowing(userID, callback, isSleeping, stopAPICallsCheck) {
  let options = await getOptions();
  let followers = await scrapeFollowing(userID, null, [], options.pageSizeForFetchingUsers, callback, isSleeping, stopAPICallsCheck);
  return followers;

}

async function scrapeFollowing(id, nextPageToken = null, previousFollowers = [], querySize, callback, isSleeping, stopAPICallsCheck) {
  if (stopAPICallsCheck()) {
    // console.log("returned", previousFollowers);
    return previousFollowers;
  }
  isSleeping(false);
  let baseURL = "https://www.instagram.com/graphql/query";
  let params = {
    "query_hash": "58712303d941c6855d4e888c5f0cd22f",
    "variables": {
      "id": id,
      "include_reel": true,
      "fetch_mutual": false,
      "first": querySize,
      "after": nextPageToken
    }
  };
  let headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "*/*",
    "X-IG-App-ID": INSTAGRAM_APP_ID
  };
  await sleep(DELAY_IN_MS_BETWEEN_EVERY_GRAPH_REQUEST_CALL_TO_GET_FOLLOWER);
  let response;
  try {
    if (process.env.NODE_ENV !== "development") {
      response = await GetRequest(baseURL, params, headers);
    } else {
      response = await dummyFollowing(callback);
    }
  } catch (e) {
    let detailedError = "Rate Limit on getting following for the post";
    let error = new ApiError(e, detailedError, "Grambuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again");
    sendNotification(NotificationTypeEnum.Failure, `Rate Limited | Grambuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again`, true);
    await SaveError(error);

    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "get following for a username",
      label: `Status_Code: ${error.status} | ${previousFollowers.length} scraped before error`
    });
    let options = await getOptions();
    isSleeping(true);
    await sleep(options.sleepTimeFor429InSeconds * 1000);
    return await scrapeFollowing(id, nextPageToken, previousFollowers, querySize, callback, isSleeping, stopAPICallsCheck);
  }
  let dateTime = `${new Date().getMinutes()} - ${new Date().getSeconds()}`;
  let followersObj = response.data.data.user.edge_follow;
  let pageInfo = followersObj.page_info;
  let followers = followersObj.edges;
  followers = previousFollowers.concat(followers);
  let totalFollowers = response.data.data.user.edge_follow.count;
  showPercentage(totalFollowers, followers.length, callback);
  if (pageInfo.has_next_page) {
    return scrapeFollowing(id, pageInfo.end_cursor, followers, querySize, callback, isSleeping, stopAPICallsCheck);
  } else {
    return followers;
  }
}

async function scrapeFollowers(id, nextPageToken = null, previousFollowers = [], querySize, callback, isSleeping, stopAPICallsCheck, count, returnOnFirstRateLimit) {
  if (stopAPICallsCheck()) {
    return previousFollowers;
  }
  isSleeping(false);
  let baseURL = "https://www.instagram.com/graphql/query";
  let params = {
    "query_hash": "c76146de99bb02f6415203be841dd25a",
    "variables": {
      "id": id,
      "include_reel": true,
      "fetch_mutual": false,
      "first": querySize,
      "after": nextPageToken
    }
  };
  let headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "*/*",
    "X-IG-App-ID": INSTAGRAM_APP_ID
  };
  await sleep(DELAY_IN_MS_BETWEEN_EVERY_GRAPH_REQUEST_CALL_TO_GET_FOLLOWER);
  let response;
  try {
    if (process.env.NODE_ENV !== "development") {
      response = await GetRequest(baseURL, params, headers);
    } else {
      response = await dummyFollowers(callback);
    }
  } catch (e) {
    let detailedError = "Rate Limit on getting Followers of the user";
    let error = new ApiError(e, detailedError, "Grambuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again");
    sendNotification(NotificationTypeEnum.Failure, `Rate Limited | Grambuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again`, true);
    await SaveError(error);

    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "get followers for a username",
      label: `Status_Code: ${error.status} | ${previousFollowers.length} scraped before error`
    });
    if (returnOnFirstRateLimit) {
      return previousFollowers;
    }
    let options = await getOptions();
    isSleeping(true);
    await sleep(options.sleepTimeFor429InSeconds * 1000);
    return await scrapeFollowers(id, nextPageToken, previousFollowers, querySize, callback, isSleeping, stopAPICallsCheck, count, returnOnFirstRateLimit);
  }
  let dateTime = `${new Date().getMinutes()} - ${new Date().getSeconds()}`;
  let followersObj = response.data.data.user.edge_followed_by;
  let pageInfo = followersObj.page_info;
  let followers = followersObj.edges;
  await AddLevel2Calls(followers.length);

  followers = previousFollowers.concat(followers);
  let totalFollowers = response.data.data.user.edge_followed_by.count;


  if (nonPrivateAccountsCount(followers) > count) {
    return nonPrivateAccounts(followers).slice(0, count);
  }
  showPercentage(totalFollowers, followers.length, callback);
  if (pageInfo.has_next_page) {
    return await scrapeFollowers(id, pageInfo.end_cursor, followers, querySize, callback, isSleeping, stopAPICallsCheck, count, returnOnFirstRateLimit);
  } else {
    return followers;
  }
}

function nonPrivateAccounts(followers) {
  let nonPrivateFollowers = [];
  for (let i = 0; i < followers.length; i++) {
    if (!followers[i].isPrivate || (followers[i].isPrivate && followers[i].followedByViewer)) {
      nonPrivateFollowers.push(followers[i]);
    }
  }
  return nonPrivateFollowers;
}

function nonPrivateAccountsCount(followers) {
  let count = 0;
  for (let i = 0; i < followers.length; i++) {
    if (!followers[i].isPrivate || (followers[i].isPrivate && followers[i].followedByViewer)) {
      count++;
    }
  }
  return count;
}

async function dummyFollowers(callback) {
  callback(10, 10, 100);
  await sleep(200);
  callback(70, 70, 100);
  await sleep(200);
  callback(90, 90, 100);
  await sleep(200);
  callback(100, 100, 100);
  return {
    data: {
      "data": {
        "user": {
          "edge_followed_by": {
            "count": 625,
            "page_info": {
              "has_next_page": false,
              "end_cursor": ""
            },
            "edges": [
              {
                "node": {
                  "id": "3590469673",
                  "username": "karan.gosain18",
                  "full_name": "Karan Gosain",
                  "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/5aa9847089d6b731320c035e3d352e35/5E118CD4/t51.2885-19/s150x150/16228921_636817709839752_5515655086660911104_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                  "is_private": true,
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false,
                  "reel": {
                    "id": "3590469673",
                    "expiring_at": 1567803115,
                    "has_pride_media": false,
                    "latest_reel_media": null,
                    "seen": null,
                    "owner": {
                      "__typename": "GraphUser",
                      "id": "3590469673",
                      "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/5aa9847089d6b731320c035e3d352e35/5E118CD4/t51.2885-19/s150x150/16228921_636817709839752_5515655086660911104_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                      "username": "karan.gosain18"
                    }
                  }
                }
              },
              {
                "node": {
                  "id": "926811877",
                  "username": "chinu7879",
                  "full_name": "ManiktahlaChin️may™️",
                  "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/7041c51b3d5a4b184aee7e7b5f3c98c8/5E15977C/t51.2885-19/s150x150/65396766_1242813785911831_1027742410727227392_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                  "is_private": true,
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false,
                  "reel": {
                    "id": "926811877",
                    "expiring_at": 1567803115,
                    "has_pride_media": false,
                    "latest_reel_media": null,
                    "seen": null,
                    "owner": {
                      "__typename": "GraphUser",
                      "id": "926811877",
                      "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/7041c51b3d5a4b184aee7e7b5f3c98c8/5E15977C/t51.2885-19/s150x150/65396766_1242813785911831_1027742410727227392_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                      "username": "chinu7879"
                    }
                  }
                }
              },
              {
                "node": {
                  "id": "18988103076",
                  "username": "ayushman1087",
                  "full_name": "ayushman",
                  "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/9bd5f60607a7373dbc70f2b5cf729104/5DF4F45D/t51.2885-19/s150x150/69510614_412964009346224_5506459132183445504_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                  "is_private": false,
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false,
                  "reel": {
                    "id": "18988103076",
                    "expiring_at": 1567803115,
                    "has_pride_media": false,
                    "latest_reel_media": 0,
                    "seen": null,
                    "owner": {
                      "__typename": "GraphUser",
                      "id": "18988103076",
                      "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/9bd5f60607a7373dbc70f2b5cf729104/5DF4F45D/t51.2885-19/s150x150/69510614_412964009346224_5506459132183445504_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                      "username": "ayushman1087"
                    }
                  }
                }
              },
              {
                "node": {
                  "id": "1374138163",
                  "username": "grilledcheese_sandwich_",
                  "full_name": "Srishti Agarwal",
                  "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/58d3e5ce6eadb17db8b42143ffb00e11/5E0F5FDC/t51.2885-19/s150x150/59859485_647608465685317_4033286492116746240_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                  "is_private": true,
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false,
                  "reel": {
                    "id": "1374138163",
                    "expiring_at": 1567803115,
                    "has_pride_media": false,
                    "latest_reel_media": null,
                    "seen": null,
                    "owner": {
                      "__typename": "GraphUser",
                      "id": "1374138163",
                      "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/58d3e5ce6eadb17db8b42143ffb00e11/5E0F5FDC/t51.2885-19/s150x150/59859485_647608465685317_4033286492116746240_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                      "username": "grilledcheese_sandwich_"
                    }
                  }
                }
              },
              {
                "node": {
                  "id": "18720671859",
                  "username": "manish.vija",
                  "full_name": "Manish vijan",
                  "profile_pic_url": "https://instagram.fdmm2-3.fna.fbcdn.net/vp/e0c26cc927fc2595b752f14c7ee4e260/5DF2B4F1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fdmm2-3.fna.fbcdn.net",
                  "is_private": false,
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false,
                  "reel": {
                    "id": "18720671859",
                    "expiring_at": 1567803115,
                    "has_pride_media": false,
                    "latest_reel_media": 0,
                    "seen": null,
                    "owner": {
                      "__typename": "GraphUser",
                      "id": "18720671859",
                      "profile_pic_url": "https://instagram.fdmm2-3.fna.fbcdn.net/vp/e0c26cc927fc2595b752f14c7ee4e260/5DF2B4F1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fdmm2-3.fna.fbcdn.net",
                      "username": "manish.vija"
                    }
                  }
                }
              },
              {
                "node": {
                  "id": "11871127214",
                  "username": "abhnv_rai",
                  "full_name": "Achintya🍷 | Food Blogger",
                  "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/8ae54a82e9d791a9f58fc4caa183faf5/5E142774/t51.2885-19/s150x150/53171511_316082305719135_6888935570630770688_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                  "is_private": false,
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false,
                  "reel": {
                    "id": "11871127214",
                    "expiring_at": 1567803115,
                    "has_pride_media": false,
                    "latest_reel_media": 0,
                    "seen": null,
                    "owner": {
                      "__typename": "GraphUser",
                      "id": "11871127214",
                      "profile_pic_url": "https://instagram.fbom19-2.fna.fbcdn.net/vp/8ae54a82e9d791a9f58fc4caa183faf5/5E142774/t51.2885-19/s150x150/53171511_316082305719135_6888935570630770688_n.jpg?_nc_ht=instagram.fbom19-2.fna.fbcdn.net",
                      "username": "abhnv_rai"
                    }
                  }
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

async function dummyFollowing(callback) {
  callback(20, 40, 200);
  await sleep(400);
  callback(70, 140, 200);
  await sleep(400);
  callback(90, 180, 200);
  await sleep(400);
  callback(100, 200, 200);
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


function showPercentage(total, queriedCount, callback) {
  callback(Math.ceil((queriedCount / total) * 100), queriedCount, total);
}
