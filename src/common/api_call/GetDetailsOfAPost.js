import getMainUser from "../chrome/GetMainUser";
import GetRequest from "./GetRequest";
import ApiError from "../models/ApiError";
import sendNotification from "../SendNotification";
import NotificationTypeEnum from "../models/NotificationTypeEnum";
import SaveError from "../store/SaveError";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import Post from "../models/Post";

let INSTAGRAM_APP_ID = 936619743392459;


async function GetDetailsOfAPost(shortcode) {
  let baseURL = "https://www.instagram.com/graphql/query";
  let params = {
    "query_hash": "de0e95df5be2a6d17a21af5e0213dc23",
    "variables": {
      "shortcode": shortcode
    }
  };
  let csrfToken = await getMainUser().csrfToken;
  let headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "*/*",
    "x-csrftoken": csrfToken,
    "x-ig-app-id": INSTAGRAM_APP_ID
  };
  let response;
  try {
    if (process.env.NODE_ENV !== "development") {
      response = await GetRequest(baseURL, params, headers);
    } else {
      response = await getSampleData();
    }
  } catch (e) {
    let detailedError = "Rate Limit on getting Feed posts for the user";
    let error = new ApiError(e, detailedError, "Grambuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again");
    // sendNotification(NotificationTypeEnum.Failure, `Rate Limited | Grambuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again`, true);
    await SaveError(error);

    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "get details of post",
      label: `Status_Code: ${error.status}`
    });
    throw error;
  }
  let media = response.data.data.shortcode_media;
  return new Post({ node: media });

}

function getSampleData() {
  return {
    data: {
      "data": {
        "shortcode_media": {
          "__typename": "GraphImage",
          "id": "2262673110406848171",
          "shortcode": "B9moTSsoN6r",
          "dimensions": {
            "height": 1350,
            "width": 1080
          },
          "gating_info": null,
          "fact_check_overall_rating": null,
          "fact_check_information": null,
          "media_preview": "ACEqrx24FWVhFZiXjj1/SrS3pPY/kKT5jpi6fRl0RClMQqsLz2P5UpvR6GotI0vHuibyRRUH21fQ0Ue8P3e6+9GRFIoABrYt1Rx61zwrUt7tkwoAq5baHNDc1JIlX06Z/wA+9UZHGMYx+HNMkvizYGcH1/z+maqSXIbsR9P/AK9KKfUuUl0J9y0VU84f5FFaGfN/X9MrD1qZJtoIx171BS0jPYkLUzH69KSlXqPrQMTBorQ2L6D8qKm47H//2Q==",
          "display_url": "https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/89392974_865720947186328_7934067315887494193_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=U9yUJQY7pqIAX-dW4hv&oh=66f00362380cd5c76abdb377d4ec11d5&oe=5EA693FF",
          "display_resources": [
            {
              "src": "https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/89392974_865720947186328_7934067315887494193_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=U9yUJQY7pqIAX-dW4hv&oh=2ebb1a189eef9e81cdde1d997494d6fa&oe=5EA46E09",
              "config_width": 640,
              "config_height": 800
            },
            {
              "src": "https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/89392974_865720947186328_7934067315887494193_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=U9yUJQY7pqIAX-dW4hv&oh=a503ede4098a25af75cc58c86884c953&oe=5E931E09",
              "config_width": 750,
              "config_height": 937
            },
            {
              "src": "https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/89392974_865720947186328_7934067315887494193_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=U9yUJQY7pqIAX-dW4hv&oh=66f00362380cd5c76abdb377d4ec11d5&oe=5EA693FF",
              "config_width": 1080,
              "config_height": 1350
            }
          ],
          "accessibility_caption": "Image may contain: ocean, sky, twilight, outdoor, water and nature",
          "is_video": false,
          "tracking_token": "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiNjE3ZTFmNTJkY2U1NDI4ZTg3NzZmNmU4ZTliMGYwNjIyMjYyNjczMTEwNDA2ODQ4MTcxIiwic2VydmVyX3Rva2VuIjoiMTU4Mzk1NTk4MTUyM3wyMjYyNjczMTEwNDA2ODQ4MTcxfDE4NzMzNjc0OTA4fDNkOWVlYTBlOTI3YTkzZDg0YmE4NWYyZWE4MWYzMTYyZWI2MWE5OTc5Yzk5MTczZGJjMmEzMjk0OTY1NGIxNTMifSwic2lnbmF0dXJlIjoiIn0=",
          "edge_media_to_tagged_user": {
            "edges": [
              {
                "node": {
                  "user": {
                    "full_name": "Arturo Durán",
                    "id": "5692825551",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/69611186_1168504906669965_3114229822247665664_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=CQ4Wi4jLcSYAX_bJHyZ&oh=fb36ce52af2681c753260f727bf1c466&oe=5EA63416",
                    "username": "arturo_d95"
                  },
                  "x": 0.7481189,
                  "y": 0.69191146
                }
              }
            ]
          },
          "edge_media_to_caption": {
            "edges": [
              {
                "node": {
                  "text": "Let the small things suprise you! 🦋❤️ Would you rather relax here right now? 😍👆🏼\n•\n🏆 Spectacular image by: @arturo_d95\n•\n🚶‍♂️ Follow for more! @spectures"
                }
              }
            ]
          },
          "caption_is_edited": false,
          "has_ranked_comments": true,
          "edge_media_to_parent_comment": {
            "count": 21,
            "page_info": {
              "has_next_page": false,
              "end_cursor": null
            },
            "edges": [
              {
                "node": {
                  "id": "17928500965369377",
                  "text": "Meu Deus,  que lindo!!",
                  "created_at": 1583952554,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "26921681039",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/73497425_2673736049315811_5208332777719595008_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=gTWUJYGtI_4AX_PDlPo&oh=5c62ff7cf810c2338d38a860f77e3ce7&oe=5E9A612D",
                    "username": "kikavittorassi"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 1
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 3,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": [
                      {
                        "node": {
                          "id": "17929175971366614",
                          "text": "@kikavittorassi Hola😇",
                          "created_at": 1583952613,
                          "did_report_as_spam": false,
                          "owner": {
                            "id": "6162273047",
                            "is_verified": false,
                            "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/73470563_564441937652998_8182381382891208704_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=vEatpte_3lwAX-aOlKr&oh=5dfd7c7fe6d9656b1722263db4f16b2c&oe=5EA42001",
                            "username": "newtonhedward"
                          },
                          "viewer_has_liked": false,
                          "edge_liked_by": {
                            "count": 0
                          },
                          "is_restricted_pending": false
                        }
                      },
                      {
                        "node": {
                          "id": "17859482743775911",
                          "text": "@kikavittorassi 😀",
                          "created_at": 1583952676,
                          "did_report_as_spam": false,
                          "owner": {
                            "id": "1415507160",
                            "is_verified": false,
                            "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/45451711_314905405816150_6934359806178230272_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=el8E81K7CNYAX_PVG8q&oh=86a3a5e146b9b1ee46c6c74a0330f724&oe=5E9CD73B",
                            "username": "spectures"
                          },
                          "viewer_has_liked": false,
                          "edge_liked_by": {
                            "count": 0
                          },
                          "is_restricted_pending": false
                        }
                      },
                      {
                        "node": {
                          "id": "17894772709463002",
                          "text": "@newtonhedward oi",
                          "created_at": 1583952791,
                          "did_report_as_spam": false,
                          "owner": {
                            "id": "26921681039",
                            "is_verified": false,
                            "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/73497425_2673736049315811_5208332777719595008_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=gTWUJYGtI_4AX_PDlPo&oh=5c62ff7cf810c2338d38a860f77e3ce7&oe=5E9A612D",
                            "username": "kikavittorassi"
                          },
                          "viewer_has_liked": false,
                          "edge_liked_by": {
                            "count": 0
                          },
                          "is_restricted_pending": false
                        }
                      }
                    ]
                  }
                }
              },
              {
                "node": {
                  "id": "17846227036993426",
                  "text": "#travel #sunset #landscape #nature #travelphotography #photography #landscape_lovers #naturephotography #photographysouls #landscapephotography #photographylovers #photographyislife #photographylover #photographyislifee #photographyeveryday #photooftheday",
                  "created_at": 1583951687,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "1415507160",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/45451711_314905405816150_6934359806178230272_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=el8E81K7CNYAX_PVG8q&oh=86a3a5e146b9b1ee46c6c74a0330f724&oe=5E9CD73B",
                    "username": "spectures"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 1
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "17940636193338757",
                  "text": "😊😊😊😍",
                  "created_at": 1583952639,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "6162273047",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/73470563_564441937652998_8182381382891208704_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=vEatpte_3lwAX-aOlKr&oh=5dfd7c7fe6d9656b1722263db4f16b2c&oe=5EA42001",
                    "username": "newtonhedward"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 1
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "17854906387857833",
                  "text": "Amazing😍😍😍",
                  "created_at": 1583952138,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "12806021008",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/83800067_1112690032404563_6764388777541500928_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=nOVjXfO669UAX_HdDwA&oh=c4f45a8fbc99a7318112558a5858b92b&oe=5EA51EB8",
                    "username": "miss_patel_08"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 1
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "18107312554119527",
                  "text": "Un regalo a mis ojos",
                  "created_at": 1583954570,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "2116218345",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/13707082_283041278723919_1602286798_a.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=GOAEJBMIlesAX9sHPO3&oh=78cf41ff9a4cdc08822c8ef351cd72fd&oe=5E920AE6",
                    "username": "joshuali321"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "17846283643992868",
                  "text": "💖👏👌😍🌷",
                  "created_at": 1583955038,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "11427426828",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/88230714_844836169316829_1396665979601158144_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=hF3CjfDRKr0AX_lUMDL&oh=5c0d7bf9ec876231c95be83b2f076e99&oe=5E9486F1",
                    "username": "roman_reigns_empire_2020_"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "18097920715143411",
                  "text": "Beauty🤗📷",
                  "created_at": 1583954316,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "7028983254",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/27580457_878772908960669_5213255029284143104_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=pZXf-97xgQwAX_NCYzh&oh=219dc1a423a11b98dad72114ac554952&oe=5E95AC26",
                    "username": "marcianalacrespa"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "17891208295477696",
                  "text": "Omg what an amazing photograph ✨🤩",
                  "created_at": 1583953959,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "574413934",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/60168847_426536114592559_8684310369411268608_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=AuLpb3YaA5AAX_mAeNc&oh=80fd8fd0a2e1f889a29bfc2d29d4b151&oe=5E9C3929",
                    "username": "katepos_"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "17907458431422774",
                  "text": "Wow!💯",
                  "created_at": 1583953533,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "334551041",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/10903596_1375157826126331_96169245_a.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=3u5SvC_uxzkAX8Ju22L&oh=d893cbb2ba3d02c10a7c476a6d0fbffb&oe=5E9538BC",
                    "username": "mjdegroen"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "17870842624616046",
                  "text": "😍✨✨✨",
                  "created_at": 1583952857,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "5587102732",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/81570413_1240753769446555_772078228960444416_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=Hrw5f0LK81wAX-xCISU&oh=fcf24bfa2cbb6092b585f6c80315bbfb&oe=5E9A49AE",
                    "username": "monicamartinatti"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "17870695216621054",
                  "text": "😍",
                  "created_at": 1583953571,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "7167289675",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/82576369_874393939682307_4174402036378370048_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=1n4RhnnCmvoAX93SXkF&oh=4e26a996d3289a4782086138c3f7b938&oe=5E9C29C0",
                    "username": "fabianabragabarbo"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "18053044987219886",
                  "text": "Amazing 👏",
                  "created_at": 1583952858,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "14536765919",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/82339014_2528135017460038_100470692486578176_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=8iIBZRFZP-wAX83EYk2&oh=8a109c726392a54f2e3c7b20eca05c1b&oe=5EA4A46D",
                    "username": "lipsticksnfashion"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "17919021367385108",
                  "text": "Amazing❤️",
                  "created_at": 1583955652,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "8144639749",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/84083399_193662825362327_3097949997820280832_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=oCPZABCrUVgAX-yfgXE&oh=8b3408b82ab63fb999fe703e082aa41e&oe=5E9DE7C3",
                    "username": "ola_toronto"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "17860310212749188",
                  "text": "Mr Derick @dk_forex doubled my investment of £500 in a week to about £3460, I’ve also made successful withdrawals with no complications or fees attached. I recommend him for those looking forward to gain financial freedom.",
                  "created_at": 1583954754,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "28754876893",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/81622204_553849862009056_907465274691682304_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=jbufv2BY69UAX9eAfEG&oh=d4301ab2072db6ae299f03a4cffba935&oe=5E90D347",
                    "username": "st___marcus"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "17885600992499082",
                  "text": "My successful life today came as a result of a successful investment with @investor_tony.gallippi who has been my financial advisor. We met in a seminar where I started following him on Instagram before I was finally convinced and invested with him. I’m a happy man today and @investor_tony.gallippi made me.. Don’t just read and go away! Try something with him too",
                  "created_at": 1583955638,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "28505032937",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/82517707_2690839314285695_2452942400696352768_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=9OZOi0Xm3DkAX-x8vIL&oh=aa4d982748eaac98bd3a9f4680b38f2c&oe=5E9361BC",
                    "username": "alexanderjackson480"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "18125522086064781",
                  "text": "With the aid of Miss Virginia Howard I can say my dream came through. Sometime ago I was financially down, which forced me to invest in Binary Options Trading, luckily for me I earned $9865. All thanks to @virginia_fx_income and her company for their help 🙏",
                  "created_at": 1583953511,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "29182064496",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/81833747_248446679455389_7666112338088427520_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=J6cclyZQkoQAX-xwYYz&oh=bf6b63172d9763635dca942ebc87f073&oe=5E9AFF21",
                    "username": "vinay.gaddam.5832"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false,
                  "edge_threaded_comments": {
                    "count": 0,
                    "page_info": {
                      "has_next_page": false,
                      "end_cursor": null
                    },
                    "edges": []
                  }
                }
              }
            ]
          },
          "edge_media_to_hoisted_comment": {
            "edges": []
          },
          "edge_media_preview_comment": {
            "count": 21,
            "edges": [
              {
                "node": {
                  "id": "17885600992499082",
                  "text": "My successful life today came as a result of a successful investment with @investor_tony.gallippi who has been my financial advisor. We met in a seminar where I started following him on Instagram before I was finally convinced and invested with him. I’m a happy man today and @investor_tony.gallippi made me.. Don’t just read and go away! Try something with him too",
                  "created_at": 1583955638,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "28505032937",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/82517707_2690839314285695_2452942400696352768_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=9OZOi0Xm3DkAX-x8vIL&oh=aa4d982748eaac98bd3a9f4680b38f2c&oe=5E9361BC",
                    "username": "alexanderjackson480"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false
                }
              },
              {
                "node": {
                  "id": "17919021367385108",
                  "text": "Amazing❤️",
                  "created_at": 1583955652,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "8144639749",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/84083399_193662825362327_3097949997820280832_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=oCPZABCrUVgAX-yfgXE&oh=8b3408b82ab63fb999fe703e082aa41e&oe=5E9DE7C3",
                    "username": "ola_toronto"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 0
                  },
                  "is_restricted_pending": false
                }
              }
            ]
          },
          "comments_disabled": false,
          "commenting_disabled_for_viewer": false,
          "taken_at_timestamp": 1583951675,
          "edge_media_preview_like": {
            "count": -1,
            "edges": [
              {
                "node": {
                  "id": "649634322",
                  "is_verified": false,
                  "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/84490139_186580849225049_859297027488481280_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=Lcgr8zrRE-oAX_YceW8&oh=c6ce08b677424a1c80c57b6d502f6e8a&oe=5E967AAF",
                  "username": "18meileen"
                }
              }
            ]
          },
          "edge_media_to_sponsor_user": {
            "edges": []
          },
          "location": {
            "id": "105991157428243",
            "has_public_page": true,
            "name": "Planet Earth",
            "slug": "planet-earth",
            "address_json": null
          },
          "viewer_has_liked": false,
          "viewer_has_saved": false,
          "viewer_has_saved_to_collection": false,
          "viewer_in_photo_of_you": false,
          "viewer_can_reshare": true,
          "owner": {
            "id": "1415507160",
            "is_verified": false,
            "profile_pic_url": "https://scontent-hkg3-2.cdninstagram.com/v/t51.2885-19/s150x150/45451711_314905405816150_6934359806178230272_n.jpg?_nc_ht=scontent-hkg3-2.cdninstagram.com&_nc_ohc=el8E81K7CNYAX_PVG8q&oh=86a3a5e146b9b1ee46c6c74a0330f724&oe=5E9CD73B",
            "username": "spectures",
            "blocked_by_viewer": false,
            "restricted_by_viewer": false,
            "followed_by_viewer": false,
            "full_name": "Daily spectacular pictures! 🌹",
            "has_blocked_viewer": false,
            "is_private": false,
            "is_unpublished": false,
            "requested_by_viewer": false,
            "edge_owner_to_timeline_media": {
              "count": 2280
            }
          },
          "is_ad": false,
          "edge_web_media_to_related_media": {
            "edges": []
          }
        }
      },
      "status": "ok"
    }
  };
}

export default GetDetailsOfAPost;
