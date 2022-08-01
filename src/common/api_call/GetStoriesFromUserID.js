import axios from "axios";
import ReactGA from "react-ga";
import sleep from "../Sleep";
import getMainUser from "../chrome/GetMainUser";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import NewAutomationUser from "../models/NewAutomationUser";

let INSTAGRAM_APP_ID = 936619743392459;

async function GetStoriesFromUserID(userID) {
  let baseURL = "https://www.instagram.com/graphql/query";
  let params = {
    "query_hash": "ba71ba2fcb5655e7e2f37b05aec0ff98",
    variables: {
      "reel_ids": [userID],
      "tag_names": [],
      "location_ids": [],
      "highlight_reel_ids": [],
      "precomposed_overlay": false,
      "show_story_viewer_list": true,
      "story_viewer_fetch_count": 50,
      "story_viewer_cursor": "",
      "stories_video_dash_manifest": false
    }
  };
  let mainUser = await getMainUser();
  let csrfToken = mainUser.csrfToken;
  let headers = {
    "x-ig-app-id": INSTAGRAM_APP_ID,
    "x-csrftoken": csrfToken
  };
  let response;

  try {
    if (process.env.NODE_ENV !== "development") {
      response = await axios.get(baseURL, {
        params: params,
        headers: headers
      });
    } else {
      response = await dummyReels();
    }
  } catch (error) {
    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "Get Reels for an User",
    });
    throw error;
  }
  return new NewAutomationUser(response.data.data.reels_media);
}


async function dummyReels() {
  await sleep(200);
  return {
    data: {
      "data": {
        "reels_media": [
          {
            "__typename": "GraphReel",
            "id": "15380683785",
            "latest_reel_media": 1582738636,
            "can_reply": true,
            "owner": {
              "__typename": "GraphUser",
              "id": "15380683785",
              "profile_pic_url": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82833570_1754405291368511_3970640455619575808_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_ohc=cup5A5TnfKEAX-jENBK&oh=30115c551c5e0339912f470cc0177df0&oe=5E86EFED",
              "username": "moneyguideline",
              "followed_by_viewer": false,
              "requested_by_viewer": false
            },
            "can_reshare": true,
            "expiring_at": 1582825036,
            "has_besties_media": null,
            "has_pride_media": null,
            "seen": null,
            "user": {
              "id": "15380683785",
              "profile_pic_url": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82833570_1754405291368511_3970640455619575808_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_ohc=cup5A5TnfKEAX-jENBK&oh=30115c551c5e0339912f470cc0177df0&oe=5E86EFED",
              "username": "moneyguideline",
              "followed_by_viewer": false,
              "requested_by_viewer": false
            },
            "items": [
              {
                "audience": "MediaAudience.DEFAULT",
                "edge_story_media_viewers": {
                  "count": 0,
                  "page_info": {
                    "has_next_page": false,
                    "end_cursor": null
                  },
                  "edges": []
                },
                "__typename": "GraphStoryVideo",
                "id": "2252497313498671180",
                "dimensions": {
                  "height": 1568,
                  "width": 750
                },
                "display_resources": [
                  {
                    "src": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.12442-15/e15/p640x640/88202223_2308954655873226_7397545456858260547_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=hBE7fijRWS0AX9yYKXR&oh=d22c5faa317b5dbac558fc6610e04521&oe=5E590355",
                    "config_width": 640,
                    "config_height": 1338
                  },
                  {
                    "src": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.12442-15/e15/88202223_2308954655873226_7397545456858260547_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=hBE7fijRWS0AX9yYKXR&oh=2717a02dc27f73518529a48429e9d647&oe=5E590BCD",
                    "config_width": 750,
                    "config_height": 1568
                  },
                  {
                    "src": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.12442-15/e15/88202223_2308954655873226_7397545456858260547_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=hBE7fijRWS0AX9yYKXR&oh=2717a02dc27f73518529a48429e9d647&oe=5E590BCD",
                    "config_width": 1080,
                    "config_height": 2259
                  }
                ],
                "display_url": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.12442-15/e15/88202223_2308954655873226_7397545456858260547_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=hBE7fijRWS0AX9yYKXR&oh=2717a02dc27f73518529a48429e9d647&oe=5E590BCD",
                "media_preview": "ABQq5mirCwbgDuAz9aPI9+vTg80gK9FPdNhx1opgWFl2BdvXHpnuccd6mKsmBMpTOcEgjnGe/Y9wOnb0plrOIXSTP3CCVPfBq7famlwgSPcMHJLAZ6YwMH86QGTMct+A/lRTXbceOeB1opgMooooAKKKKAP/2Q==",
                "gating_info": null,
                "fact_check_overall_rating": null,
                "fact_check_information": null,
                "taken_at_timestamp": 1582738618,
                "expiring_at_timestamp": 1582825018,
                "story_cta_url": null,
                "story_view_count": null,
                "is_video": true,
                "owner": {
                  "id": "15380683785",
                  "profile_pic_url": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82833570_1754405291368511_3970640455619575808_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_ohc=cup5A5TnfKEAX-jENBK&oh=30115c551c5e0339912f470cc0177df0&oe=5E86EFED",
                  "username": "moneyguideline",
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                },
                "tracking_token": "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiNzcwYjI1NzJjMjUyNDNjZGIwNmY3NzgwYjgyODBhMDkyMjUyNDk3MzEzNDk4NjcxMTgwIiwic2VydmVyX3Rva2VuIjoiMTU4MjczOTk1MzE3NXwyMjUyNDk3MzEzNDk4NjcxMTgwfDIyMTQwNDYyMjE5fDJlNzU1MmZiMTMzNTM2NDZkYjc4ZGMyMjFhNDlmYzgxYTVjNTNjYjA4NGNhZDFiZDBkZWM3Mjg2N2Y0NGJiN2EifSwic2lnbmF0dXJlIjoiIn0=",
                "has_audio": false,
                "overlay_image_resources": null,
                "video_duration": 3,
                "video_resources": [
                  {
                    "src": "https://instagram.fblr2-1.fna.fbcdn.net/v/t50.12441-16/88236973_617021315800754_6307853427043495349_n.mp4?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Sg_8xROLXdcAX_3zEMr&oe=5E598730&oh=8520279aeddca7822a2040487d7e2a73",
                    "config_width": 480,
                    "config_height": 1004,
                    "mime_type": "video/mp4; codecs=\"avc1.42E01E\"",
                    "profile": "BASELINE"
                  },
                  {
                    "src": "https://instagram.fblr2-1.fna.fbcdn.net/v/t50.12441-16/87988591_106738084143214_8173278094514437077_n.mp4?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=n4xFv-sW0M8AX9LzL7J&oe=5E59039E&oh=813710f21b364ef8a656f7719c25eea3",
                    "config_width": 640,
                    "config_height": 1338,
                    "mime_type": "video/mp4; codecs=\"avc1.4D401E\"",
                    "profile": "MAIN"
                  }
                ],
                "tappable_objects": [
                  {
                    "__typename": "GraphTappableFeedMedia",
                    "x": 0.5,
                    "y": 0.5,
                    "width": 0.8,
                    "height": 0.4876106,
                    "rotation": 0,
                    "custom_title": null,
                    "attribution": null,
                    "media": {
                      "id": "2252430847737126630",
                      "shortcode": "B9CPewQgN7m"
                    }
                  }
                ],
                "story_app_attribution": null,
                "edge_media_to_sponsor_user": {
                  "edges": []
                }
              },
              {
                "audience": "MediaAudience.DEFAULT",
                "edge_story_media_viewers": {
                  "count": 0,
                  "page_info": {
                    "has_next_page": false,
                    "end_cursor": null
                  },
                  "edges": []
                },
                "__typename": "GraphStoryImage",
                "id": "2252497443429878595",
                "dimensions": {
                  "height": 2260,
                  "width": 1080
                },
                "display_resources": [
                  {
                    "src": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.12442-15/sh0.08/e35/p640x640/84419619_144326676740503_8230072957254179180_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=ZMVDmvs5eWkAX9tmg-4&oh=005bcdd0b25d2ce7bee5ae3d366a8c9e&oe=5E59016F",
                    "config_width": 640,
                    "config_height": 1339
                  },
                  {
                    "src": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.12442-15/sh0.08/e35/p750x750/84419619_144326676740503_8230072957254179180_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=ZMVDmvs5eWkAX9tmg-4&oh=1b893d26703baf5cdb8c4b25bda77118&oe=5E599E6F",
                    "config_width": 750,
                    "config_height": 1569
                  },
                  {
                    "src": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.12442-15/e35/84419619_144326676740503_8230072957254179180_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=ZMVDmvs5eWkAX9tmg-4&oh=2aa22fd70ea40011f8b5d977259721af&oe=5E598A48",
                    "config_width": 1080,
                    "config_height": 2260
                  }
                ],
                "display_url": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.12442-15/e35/84419619_144326676740503_8230072957254179180_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=ZMVDmvs5eWkAX9tmg-4&oh=2aa22fd70ea40011f8b5d977259721af&oe=5E598A48",
                "media_preview": "ABQqtUVCbhFLBvl2kDJ7kjOBj07k0+KQSpvHA9D9cdqvmJsPopTxRS5gsZVwV8xht5yMnJ+bgdug9OKjEhXOz5QeMDsPz/XrVma1keQurKAccHPoPaojZS9iv6/4Vipqy1RrZl62cyRhm5PP6Eiilt0MSBW5Izkj3OaKyc9WWoktFFFcdzosFFFFFwsf/9k=",
                "gating_info": null,
                "fact_check_overall_rating": null,
                "fact_check_information": null,
                "taken_at_timestamp": 1582738630,
                "expiring_at_timestamp": 1582825030,
                "story_cta_url": null,
                "story_view_count": null,
                "is_video": false,
                "owner": {
                  "id": "15380683785",
                  "profile_pic_url": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82833570_1754405291368511_3970640455619575808_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_ohc=cup5A5TnfKEAX-jENBK&oh=30115c551c5e0339912f470cc0177df0&oe=5E86EFED",
                  "username": "moneyguideline",
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                },
                "tracking_token": "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiNzcwYjI1NzJjMjUyNDNjZGIwNmY3NzgwYjgyODBhMDkyMjUyNDk3NDQzNDI5ODc4NTk1Iiwic2VydmVyX3Rva2VuIjoiMTU4MjczOTk1MzE3NnwyMjUyNDk3NDQzNDI5ODc4NTk1fDIyMTQwNDYyMjE5fDg4YjcxNzRjZGNmZjUwYzQ5NGY0NmNjNGNkOTI2MmZhZjM2YmQyZjU4ZTMyNDU3NDIyYTE0YzhhNGUxZjQzYTYifSwic2lnbmF0dXJlIjoiIn0=",
                "tappable_objects": [
                  {
                    "__typename": "GraphTappableFeedMedia",
                    "x": 0.5,
                    "y": 0.5,
                    "width": 0.8,
                    "height": 0.4876106,
                    "rotation": 0,
                    "custom_title": null,
                    "attribution": null,
                    "media": {
                      "id": "2246090093566109808",
                      "shortcode": "B8rtwowiChw"
                    }
                  }
                ],
                "story_app_attribution": null,
                "edge_media_to_sponsor_user": {
                  "edges": []
                }
              },
              {
                "audience": "MediaAudience.DEFAULT",
                "edge_story_media_viewers": {
                  "count": 0,
                  "page_info": {
                    "has_next_page": false,
                    "end_cursor": null
                  },
                  "edges": []
                },
                "__typename": "GraphStoryImage",
                "id": "2252497519657293393",
                "dimensions": {
                  "height": 2260,
                  "width": 1080
                },
                "display_resources": [
                  {
                    "src": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.12442-15/sh0.08/e35/p640x640/84005436_637566707000247_5593796557696319534_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=Zl9FpmWvsW8AX8Ng0Mj&oh=44cdce4900e4d1e91710bca8d878ff6d&oe=5E5972AB",
                    "config_width": 640,
                    "config_height": 1339
                  },
                  {
                    "src": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.12442-15/sh0.08/e35/p750x750/84005436_637566707000247_5593796557696319534_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=Zl9FpmWvsW8AX8Ng0Mj&oh=b9f49dede0f902451d8352dd408a487e&oe=5E599F6B",
                    "config_width": 750,
                    "config_height": 1569
                  },
                  {
                    "src": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.12442-15/e35/84005436_637566707000247_5593796557696319534_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=Zl9FpmWvsW8AX8Ng0Mj&oh=92b357941488c87f32bc9ed344825e54&oe=5E598E0C",
                    "config_width": 1080,
                    "config_height": 2260
                  }
                ],
                "display_url": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.12442-15/e35/84005436_637566707000247_5593796557696319534_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=Zl9FpmWvsW8AX8Ng0Mj&oh=92b357941488c87f32bc9ed344825e54&oe=5E598E0C",
                "media_preview": "ABQq091G6s2S5KsR6dOB7d8/0pEuSzBQc5IH3RnH5mvPVNvsdfL1NPdRVVSw4fhgSP14/SiocbaE2M6Q5Y/57UzzWiO5eopSCTn1pskZx254rsi7WN3blafYuRylxuPfJ/Wiq0RKqAetFZNav1IS0It1G6oaK1sbWJt1FQ0UWCx//9k=",
                "gating_info": null,
                "fact_check_overall_rating": null,
                "fact_check_information": null,
                "taken_at_timestamp": 1582738636,
                "expiring_at_timestamp": 1582825036,
                "story_cta_url": null,
                "story_view_count": null,
                "is_video": false,
                "owner": {
                  "id": "15380683785",
                  "profile_pic_url": "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82833570_1754405291368511_3970640455619575808_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_ohc=cup5A5TnfKEAX-jENBK&oh=30115c551c5e0339912f470cc0177df0&oe=5E86EFED",
                  "username": "moneyguideline",
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                },
                "tracking_token": "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiNzcwYjI1NzJjMjUyNDNjZGIwNmY3NzgwYjgyODBhMDkyMjUyNDk3NTE5NjU3MjkzMzkzIiwic2VydmVyX3Rva2VuIjoiMTU4MjczOTk1MzE3NnwyMjUyNDk3NTE5NjU3MjkzMzkzfDIyMTQwNDYyMjE5fDNmYzgzNGI4MWJiMzRjNGJiNDM5MDQ3OTQxOTNhNzE0OTYxYTc3ODViMzYwMjAyMWY0OGE2NDI0NDM1OTMyNTgifSwic2lnbmF0dXJlIjoiIn0=",
                "tappable_objects": [
                  {
                    "__typename": "GraphTappableFeedMedia",
                    "x": 0.5,
                    "y": 0.5,
                    "width": 0.8,
                    "height": 0.58318585,
                    "rotation": 0,
                    "custom_title": null,
                    "attribution": null,
                    "media": {
                      "id": "2248319730058150575",
                      "shortcode": "B8zouHjnkKv"
                    }
                  }
                ],
                "story_app_attribution": null,
                "edge_media_to_sponsor_user": {
                  "edges": []
                }
              }
            ]
          }
        ]
      },
      "status": "ok"
    }
  };
}

export default GetStoriesFromUserID;