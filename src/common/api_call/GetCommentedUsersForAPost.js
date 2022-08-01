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

async function getCommentedUsersForAPost(postShortCode, isSleeping, stopAPICallCheck, nextPageToken = null, previousUsers = []) {
  if (stopAPICallCheck()) {
    return previousUsers;
  }
  isSleeping(false);
  let baseURL = "https://www.instagram.com/graphql/query";
  let params = {
    "query_hash": "33ba35852cb50da46f5b5e889df7d159",
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
      response = await GetRequest(baseURL, params, headers);
    } else {
      await sleep(100);
      response = getDummyResponse();
    }
  } catch (e) {
    let detailedError = "Rate Limit on getting commented users for the post";
    let error = new ApiError(e, detailedError, "Grambuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again");
    // sendNotification(NotificationTypeEnum.Failure, `Rate Limited | Grambuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again`, true);
    await SaveError(error);

    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "Get Commented Users for a Post",
      label: `Status_Code: ${error.status} | scraped before error: ${previousUsers.length}`
    });
    // console.log('waiting for 429', e);
    let options = await getOptions();
    isSleeping(true, new SleepArgs(false, "COMMENTED_USERS_OF_POST_PRIVATE"));
    await sleep(options.sleepTimeFor429InSeconds * 1000);
    return await getCommentedUsersForAPost(postShortCode, isSleeping, stopAPICallCheck, nextPageToken, previousUsers);
  }
  let commentedObject = response.data.data.shortcode_media.edge_media_to_comment;
  let users = [];
  let edges = commentedObject.edges;

  await AddLevel2Calls(edges.length);

  for (let i = 0; i < edges.length; i++) {
    let userObj = edges[i].node;
    let u = new User(userObj.owner.profile_pic_url, userObj.owner.username, null, userObj.owner.id,
      null, null, null, null);
    u.setCommentValue(userObj.text);
    users.push(u);
  }
  previousUsers = previousUsers.concat(users);
  let pageInfo = commentedObject.page_info;
  if (pageInfo.has_next_page) {
    return await getCommentedUsersForAPost(postShortCode, isSleeping, stopAPICallCheck, pageInfo.end_cursor, previousUsers);
  } else {
    return previousUsers;
  }
}

function getDummyResponse() {
  return {
    "data": {
      "data": {
        "shortcode_media": {
          "edge_media_to_comment": {
            "count": 9,
            "page_info": {
              "has_next_page": false,
              "end_cursor": null
            },
            "edges": [
              {
                "node": {
                  "id": "18084833866068799",
                  "text": "Awesome. This guy is giving life goals!!",
                  "created_at": 1565183633,
                  "owner": {
                    "id": "2227230188",
                    "profile_pic_url": "https://instagram.fbom26-1.fna.fbcdn.net/vp/5bcdabca00dafd553bb38176283f5dd3/5E01BB59/t51.2885-19/s150x150/65399221_693353397793481_4618289874242371584_n.jpg?_nc_ht=instagram.fbom26-1.fna.fbcdn.net",
                    "username": "_ashishsahu_"
                  }
                }
              },
              {
                "node": {
                  "id": "17847093265537412",
                  "text": "@_ashishsahu_ lol. Person who invented this is saying this!",
                  "created_at": 1565183842,
                  "owner": {
                    "id": "2095657187",
                    "profile_pic_url": "https://instagram.fbom26-1.fna.fbcdn.net/vp/bc3d310f3455d54149f755e1649fd470/5E06E5A9/t51.2885-19/s150x150/61546858_465671664182189_1676786851907633152_n.jpg?_nc_ht=instagram.fbom26-1.fna.fbcdn.net",
                    "username": "abhnv_rai"
                  }
                }
              },
              {
                "node": {
                  "id": "18021493897213133",
                  "text": "Weekend pe ghar ke bahar nikalne ko Maut aati hai tujhe 😂😂",
                  "created_at": 1565184734,
                  "owner": {
                    "id": "2227245893",
                    "profile_pic_url": "https://instagram.fbom26-1.fna.fbcdn.net/vp/4910c5f64a8ae1ccd0cdc3dbb945a90b/5E01EBED/t51.2885-19/s150x150/31184330_606401029725229_8151530297796591616_n.jpg?_nc_ht=instagram.fbom26-1.fna.fbcdn.net",
                    "username": "davalpargal"
                  }
                }
              },
              {
                "node": {
                  "id": "17866579183444659",
                  "text": "I so wanna live it🔥🔥! Live like you😬 lol",
                  "created_at": 1565185065,
                  "owner": {
                    "id": "12158248216",
                    "profile_pic_url": "https://instagram.fbom26-1.fna.fbcdn.net/vp/fc12cab97057f51630fddffd6226853e/5E020930/t51.2885-19/s150x150/70477113_921848841514767_8805002493776887808_n.jpg?_nc_ht=instagram.fbom26-1.fna.fbcdn.net",
                    "username": "rai._.konika"
                  }
                }
              },
              {
                "node": {
                  "id": "17896627261365831",
                  "text": "@davalpargal Exactly!! 😂",
                  "created_at": 1565187575,
                  "owner": {
                    "id": "3169250094",
                    "profile_pic_url": "https://instagram.fbom26-1.fna.fbcdn.net/vp/6765884cfd90f1ed7d60cbb164868c20/5E0078A5/t51.2885-19/s150x150/53599195_1028046574252184_8736315594367827968_n.jpg?_nc_ht=instagram.fbom26-1.fna.fbcdn.net",
                    "username": "rishabh_rs_shukla"
                  }
                }
              },
              {
                "node": {
                  "id": "17847227854557749",
                  "text": "😍😍😍",
                  "created_at": 1565188292,
                  "owner": {
                    "id": "1831651773",
                    "profile_pic_url": "https://instagram.fbom26-1.fna.fbcdn.net/vp/0a600000c7a8897f02c01ca60937a043/5E166B6D/t51.2885-19/s150x150/65301889_2308506492725864_2995278138889469952_n.jpg?_nc_ht=instagram.fbom26-1.fna.fbcdn.net",
                    "username": "aftab_sharma"
                  }
                }
              },
              {
                "node": {
                  "id": "17899854550360525",
                  "text": "😍😍😍",
                  "created_at": 1565188330,
                  "owner": {
                    "id": "1831651773",
                    "profile_pic_url": "https://instagram.fbom26-1.fna.fbcdn.net/vp/0a600000c7a8897f02c01ca60937a043/5E166B6D/t51.2885-19/s150x150/65301889_2308506492725864_2995278138889469952_n.jpg?_nc_ht=instagram.fbom26-1.fna.fbcdn.net",
                    "username": "aftab_sharma"
                  }
                }
              },
              {
                "node": {
                  "id": "17952994501289137",
                  "text": "Wow, cool photo guys😮😮😮",
                  "created_at": 1565196005,
                  "owner": {
                    "id": "5452267477",
                    "profile_pic_url": "https://instagram.fbom26-1.fna.fbcdn.net/vp/ba317aff73f934e1f0d794794f030c9e/5E109832/t51.2885-19/s150x150/67829801_1231916463646562_2074034982774374400_n.jpg?_nc_ht=instagram.fbom26-1.fna.fbcdn.net",
                    "username": "bromo_and_ijen"
                  }
                }
              },
              {
                "node": {
                  "id": "17852409343505595",
                  "text": "@bromo_and_ijen clicked by such an expert photographer - you ❣️",
                  "created_at": 1565233393,
                  "owner": {
                    "id": "2095657187",
                    "profile_pic_url": "https://instagram.fbom26-1.fna.fbcdn.net/vp/bc3d310f3455d54149f755e1649fd470/5E06E5A9/t51.2885-19/s150x150/61546858_465671664182189_1676786851907633152_n.jpg?_nc_ht=instagram.fbom26-1.fna.fbcdn.net",
                    "username": "abhnv_rai"
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

export default getCommentedUsersForAPost;
