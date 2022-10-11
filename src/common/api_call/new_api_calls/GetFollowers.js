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

async function getFollowers(userID, nextPage, throwError = false) {
  console.log("@getFollowers function (GetFollowers.js): userID =", userID, ", nextPage =", nextPage);
  let baseURL = "https://www.instagram.com/graphql/query";
  let params = {
    "query_hash": "c76146de99bb02f6415203be841dd25a",
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
      response = await dummyFollowers();
    }
  } catch (e) {
    let detailedError = "Rate Limit on getting followers for a user";
    let error = new ApiError(e, detailedError, "ProfileBuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again");
    // sendNotification(NotificationTypeEnum.Failure, `Rate Limited | Grambuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again`, true);
    await SaveError(error);

    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "get followers for a user",
      label: `userID: ${userID} | Status_Code: ${error.status}`
    });
    if (throwError) {
      throw e;
    }
    return { followers: [], nextPageToken: null };
  }
  let user = response.data.data.user;
  let edges = user.edge_followed_by.edges;
  let followers = [];
  for (let i = 0; i < edges.length; i++) {
    followers.push(new FollowerUser(edges[i]));
  }
  let pageInfo = user.edge_followed_by.page_info;
  let nextPageToken = null, total = user.edge_followed_by.count;
  if (pageInfo.has_next_page) {
    nextPageToken = pageInfo.end_cursor;
  }
  return { followers: followers, nextPageToken: nextPageToken, total: total };
}

async function dummyFollowers() {
  await sleep(400);
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
                  "followed_by_viewer": true,
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

export default getFollowers;
