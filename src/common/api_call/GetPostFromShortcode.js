import axios from "axios";
import ApiError from "../models/ApiError";
import SaveError from "../store/SaveError";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import getMainUser from "../chrome/GetMainUser";
import sleep from "../Sleep";
import Post from "../models/Post";
import GetRequest from "./GetRequest";

let INSTAGRAM_APP_ID = 936619743392459;

async function GetPostFromShortcode(shortcode) {
  let baseURL = "https://www.instagram.com/graphql/query";
  let params = {
    query_hash: "2b0673e0dc4580674a88d426fe00ea90",
    variables: {
      shortcode: shortcode,
      child_comment_count: 3,
      fetch_comment_count: 40,
      parent_comment_count: 24,
      has_threaded_comments: true
    }
  };
  let mainUser = await getMainUser();
  let csrfToken = mainUser.csrfToken;
  let headers = {
    "X-Requested-With": "XMLHttpRequest",
    "x-ig-app-id": INSTAGRAM_APP_ID,
    "x-csrftoken": csrfToken
  };
  let response;
  try {
    if (process.env.NODE_ENV !== "development") {
      response = await GetRequest(baseURL, params, headers);
    } else {
      response = await dummyVideoPost();
    }
  } catch (e) {
    let detailedError = "Could not get post from url";
    let error = new ApiError(
      e,
      detailedError,
      "Try again and check if the url is correct"
    );
    await SaveError(error);
    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "get post from shortcode",
      label: `Status_Code: ${error.status}`
    });
    throw e;
  }
  return new Post({node: response.data.data.shortcode_media});
}

async function dummyVideoPost() {
  sleep(300);
  return {
    data: {
      "data": {
        "shortcode_media": {
          "__typename": "GraphVideo",
          "id": "2221384255850996697",
          "shortcode": "B7T8TYXpOPZ",
          "dimensions": {
            "height": 937,
            "width": 750
          },
          "gating_info": null,
          "fact_check_overall_rating": null,
          "fact_check_information": null,
          "media_preview": "ACEq5qnGnle/SpVUNnAzSAg296aattEycEfQHv6EVAVx1oAjop+0etFMC2IpDIFHzYwc44APcitcpHbqJPvODzjjOevHTHtWVDc/M7YyWxjn06CrDXaAYdSehxx/jQM07xEmT5AN4Ax+XQdMe3brxzWP/Z8mOcc9j6++CalfURj5RznofT2xVKa7kl6nA9BSAl+xT+g/8doqD7TL/eP50UAQ0tJRTELQTikprUAO3UVHRQB//9k=",
          "display_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/81446823_106627307443006_8369829621576865197_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=110&_nc_ohc=EOIvc7FUWhIAX8gocoA&oh=579a0fd6225f085ecb23a705b6ea690a&oe=5E284A3B",
          "display_resources": [
            {
              "src": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/81446823_106627307443006_8369829621576865197_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=110&_nc_ohc=EOIvc7FUWhIAX8gocoA&oh=90789554557664af18b4b14d2a8965aa&oe=5E28C60D",
              "config_width": 640,
              "config_height": 800
            },
            {
              "src": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/81446823_106627307443006_8369829621576865197_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=110&_nc_ohc=EOIvc7FUWhIAX8gocoA&oh=579a0fd6225f085ecb23a705b6ea690a&oe=5E284A3B",
              "config_width": 750,
              "config_height": 937
            },
            {
              "src": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/81446823_106627307443006_8369829621576865197_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=110&_nc_ohc=EOIvc7FUWhIAX8gocoA&oh=579a0fd6225f085ecb23a705b6ea690a&oe=5E284A3B",
              "config_width": 1080,
              "config_height": 1350
            }
          ],
          "dash_info": {
            "is_dash_eligible": true,
            "video_dash_manifest": "<MPD xmlns=\"urn:mpeg:dash:schema:mpd:2011\" minBufferTime=\"PT1.500S\" type=\"static\" mediaPresentationDuration=\"PT0H0M54.102S\" maxSegmentDuration=\"PT0H0M2.100S\" profiles=\"urn:mpeg:dash:profile:isoff-on-demand:2011,http://dashif.org/guidelines/dash264\">\n <Period duration=\"PT0H0M54.102S\">\n  <AdaptationSet segmentAlignment=\"true\" maxWidth=\"720\" maxHeight=\"900\" maxFrameRate=\"30\" par=\"720:900\" lang=\"und\" subsegmentAlignment=\"true\" subsegmentStartsWithSAP=\"1\">\n   <Representation id=\"17993035663286289vd\" mimeType=\"video/mp4\" codecs=\"avc1.4D401F\" width=\"720\" height=\"900\" frameRate=\"30\" sar=\"1:1\" startWithSAP=\"1\" bandwidth=\"650296\" FBQualityClass=\"hd\" FBQualityLabel=\"720w\" FBPlaybackResolutionMos=\"0:100.00,480:99.10,640:98.68,720:97.83\">\n    <BaseURL>https://scontent-frx5-1.cdninstagram.com/v/t50.2886-16/82707773_1711526512323881_697050308235241034_n.mp4?_nc_ht=scontent-frx5-1.cdninstagram.com&amp;_nc_cat=105&amp;_nc_ohc=eTdNuesevyEAX8mgEWW&amp;oh=f7b07259d384a7ba84e71daaa10218dc&amp;oe=5E28DFA0</BaseURL>\n    <SegmentBase indexRangeExact=\"true\" indexRange=\"910-1265\" FBFirstSegmentRange=\"1266-118280\" FBSecondSegmentRange=\"118281-270814\">\n      <Initialization range=\"0-909\"/>\n    </SegmentBase>\n   </Representation>\n  <Representation id=\"17993035780286289v\" mimeType=\"video/mp4\" codecs=\"avc1.4D401F\" width=\"312\" height=\"390\" frameRate=\"30\" sar=\"1:1\" startWithSAP=\"1\" bandwidth=\"161391\" FBQualityClass=\"sd\" FBQualityLabel=\"312w\" FBPlaybackResolutionMos=\"0:100.00,480:94.53,640:91.71,720:86.98\">\n    <BaseURL>https://scontent-frt3-1.cdninstagram.com/v/t50.2886-16/83796372_625564238190326_8561975599750417687_n.mp4?_nc_ht=scontent-frt3-1.cdninstagram.com&amp;_nc_cat=102&amp;_nc_ohc=g7XeloFbBeAAX-xKUvk&amp;oh=8ec4e6810b44c5f08d7debd1c90b51e7&amp;oe=5E27CAA0</BaseURL>\n    <SegmentBase indexRangeExact=\"true\" indexRange=\"910-1265\" FBFirstSegmentRange=\"1266-28151\" FBSecondSegmentRange=\"28152-70130\">\n      <Initialization range=\"0-909\"/>\n    </SegmentBase>\n   </Representation>\n  </AdaptationSet>\n <AdaptationSet segmentAlignment=\"true\" lang=\"und\" subsegmentAlignment=\"true\" subsegmentStartsWithSAP=\"1\">\n   <Representation id=\"17993035606286289ad\" mimeType=\"audio/mp4\" codecs=\"mp4a.40.2\" audioSamplingRate=\"44100\" startWithSAP=\"1\" bandwidth=\"66179\">\n    <AudioChannelConfiguration schemeIdUri=\"urn:mpeg:dash:23003:3:audio_channel_configuration:2011\" value=\"2\"/>\n    <BaseURL>https://scontent-frt3-2.cdninstagram.com/v/t50.2886-16/82948338_181421539770615_9191155880233568547_n.mp4?_nc_ht=scontent-frt3-2.cdninstagram.com&amp;_nc_cat=103&amp;_nc_ohc=BwvLkA9bvN8AX8Zbo9g&amp;oh=e6ad2b9bd210e210b65126c1001ed46a&amp;oe=5E28DEFF</BaseURL>\n    <SegmentBase indexRangeExact=\"true\" indexRange=\"866-1233\" FBFirstSegmentRange=\"1234-18331\" FBSecondSegmentRange=\"18332-34828\">\n      <Initialization range=\"0-865\"/>\n    </SegmentBase>\n   </Representation>\n  </AdaptationSet>\n </Period>\n</MPD>",
            "number_of_qualities": 2
          },
          "video_url": "https://scontent-frx5-1.cdninstagram.com/v/t50.2886-16/83581233_755705248168781_7691243924396593198_n.mp4?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=105&_nc_ohc=cBJBUNtY684AX_TfefI&oe=5E2840E2&oh=ec5a9c64a046ad3845873baac294a234",
          "video_view_count": 316,
          "is_video": true,
          "tracking_token": "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiMWEwN2NhYzA4Y2M2NGQ4YTlhYTgxZjkwYTc0Yzk2NjMyMjIxMzg0MjU1ODUwOTk2Njk3Iiwic2VydmVyX3Rva2VuIjoiMTU3OTUzMzMwNTM5OXwyMjIxMzg0MjU1ODUwOTk2Njk3fDE4NzMzNjc0OTA4fDU3ZmJjMTg2MmRiY2Y0ZWMxY2MxMTY5ZDM3NGZlMDM0NGMxMzBjYzM2ZmUzZjA3MTE5YTJlZWI0ZWY5ZDY5MmMifSwic2lnbmF0dXJlIjoiIn0=",
          "edge_media_to_tagged_user": {
            "edges": []
          },
          "edge_media_to_caption": {
            "edges": [
              {
                "node": {
                  "text": "Had a lovely time in Varkala. Met great people, visited some good places and tried to get my life in order.\n🎵 Tujhko jo paaya\n.\n.\n.\n#varkala #TujhkoJoPaaya #cover #cliff #lovelyTime #Banjaarein"
                }
              }
            ]
          },
          "caption_is_edited": false,
          "has_ranked_comments": false,
          "edge_media_to_parent_comment": {
            "count": 3,
            "page_info": {
              "has_next_page": false,
              "end_cursor": null
            },
            "edges": [
              {
                "node": {
                  "id": "17848033684862331",
                  "text": "Bravo 👏🏼👏🏼🎶",
                  "created_at": 1579029728,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "2153170013",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/30602791_186117098690844_8372653115618361344_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=hYVH2Srx__sAX97Rl7-&oh=4b8423e11fa3ed0fb858c698a03d1ed0&oe=5EB72600",
                    "username": "slymnmusic"
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
                  "id": "17843585143909176",
                  "text": "🔥🔥🔥",
                  "created_at": 1579030651,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "1683307846",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/74659550_538978503619498_27875102255218688_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=FFAfAUldNe4AX9FZPhl&oh=03f731831b751e182df008e7d15a99eb&oe=5EDACB8E",
                    "username": "aniketparate"
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
                  "id": "17859165958688216",
                  "text": "❤️",
                  "created_at": 1579033427,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "632148580",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/83541815_634579833776982_7980970197215346688_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=zKGrpUBRD2kAX-R8ZDV&oh=ffe938c57d69b32fd31b5a1aaec3f5e5&oe=5EA2F497",
                    "username": "manoj_malviya_"
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
              }
            ]
          },
          "edge_media_preview_comment": {
            "count": 3,
            "edges": [
              {
                "node": {
                  "id": "17843585143909176",
                  "text": "🔥🔥🔥",
                  "created_at": 1579030651,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "1683307846",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/74659550_538978503619498_27875102255218688_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=FFAfAUldNe4AX9FZPhl&oh=03f731831b751e182df008e7d15a99eb&oe=5EDACB8E",
                    "username": "aniketparate"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 1
                  },
                  "is_restricted_pending": false
                }
              },
              {
                "node": {
                  "id": "17859165958688216",
                  "text": "❤️",
                  "created_at": 1579033427,
                  "did_report_as_spam": false,
                  "owner": {
                    "id": "632148580",
                    "is_verified": false,
                    "profile_pic_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/83541815_634579833776982_7980970197215346688_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=zKGrpUBRD2kAX-R8ZDV&oh=ffe938c57d69b32fd31b5a1aaec3f5e5&oe=5EA2F497",
                    "username": "manoj_malviya_"
                  },
                  "viewer_has_liked": false,
                  "edge_liked_by": {
                    "count": 1
                  },
                  "is_restricted_pending": false
                }
              }
            ]
          },
          "comments_disabled": false,
          "commenting_disabled_for_viewer": false,
          "taken_at_timestamp": 1579029689,
          "edge_media_preview_like": {
            "count": 80,
            "edges": [
              {
                "node": {
                  "id": "1492308011",
                  "is_verified": false,
                  "profile_pic_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/74967653_708009983057450_9088045764910776320_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=O2CTsvGl9tEAX96uKD4&oh=be175c40583bdaa3c50ef175929d86e0&oe=5EC26AA1",
                  "username": "rohit_paliwal_"
                }
              }
            ]
          },
          "edge_media_to_sponsor_user": {
            "edges": []
          },
          "location": null,
          "viewer_has_liked": true,
          "viewer_has_saved": false,
          "viewer_has_saved_to_collection": false,
          "viewer_in_photo_of_you": false,
          "viewer_can_reshare": true,
          "owner": {
            "id": "2095657187",
            "is_verified": false,
            "profile_pic_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/61546858_465671664182189_1676786851907633152_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=Sewd6kb0A4cAX9DnnAy&oh=3610ea2a191dc9200acb40d7aec3fcf1&oe=5EA519A9",
            "username": "abhnv_rai",
            "blocked_by_viewer": false,
            "followed_by_viewer": true,
            "full_name": "Abhinav Rai",
            "has_blocked_viewer": false,
            "is_private": false,
            "is_unpublished": false,
            "requested_by_viewer": false
          },
          "is_ad": false,
          "edge_web_media_to_related_media": {
            "edges": []
          },
          "encoding_status": null,
          "is_published": true,
          "product_type": "feed",
          "title": "",
          "video_duration": 54.099,
          "thumbnail_src": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.90.720.720a/s640x640/81446823_106627307443006_8369829621576865197_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=110&_nc_ohc=EOIvc7FUWhIAX8gocoA&oh=a1486d585cf6234b426b435fafb37694&oe=5E28B6EF"
        }
      },
      "status": "ok"
    }
  }
}

async function dummyImagePost() {
  sleep(300);
  return {
    data: {
      data: {
        shortcode_media: {
          __typename: "GraphImage",
          id: "2221103792020484090",
          shortcode: "B7S8iGEp2_6",
          dimensions: { height: 1080, width: 1080 },
          gating_info: null,
          fact_check_overall_rating: null,
          fact_check_information: null,
          media_preview:
            "ACoq0N2KlVs1WB9aeMUhlqmlQahBb1zUwagYgQd6Nq+1HFGR6Urjscs2CxBWTHPAbJ4OCfoDU8T2+M7nLDgcnP8AwED8uaYLYleC2foT+Q6/rULBEPORjj7vf8TVEGx9rVVywKezYBP0Gagm1HZgBTk8/Nxx/n8qoh4lw+S7Z6Hr+vTH1pkj+Y24g/Qkf4UDNyO5WUcMM9wD0qTcfWsOCREfOCp6eo/xrQ872c/8B/8Ar0gF8w1FdDcvH8Qx/hTqe33R9RTYkZQtG68HioSWB2kYqxH9+p7gfu89xUJ3LasUd23k9e1XQXAwGX8h/wDFVnQjJ55q9VEn/9k=",
          display_url:
            "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-15/e35/79699196_188527468959914_3356950158766933047_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=AyF6LVpLm28AX8OS7TK&oh=b8688afc88edffb8ca261c8d78fb351f&oe=5EBF4C35",
          display_resources: [
            {
              src:
                "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/79699196_188527468959914_3356950158766933047_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=AyF6LVpLm28AX8OS7TK&oh=bff3ba01ea2d1764398cf72a7fdadc38&oe=5E9BBDD0",
              config_width: 640,
              config_height: 640
            },
            {
              src:
                "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/79699196_188527468959914_3356950158766933047_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=AyF6LVpLm28AX8OS7TK&oh=24301e3a13e28ced42ab08b17d869fa5&oe=5ED95CD0",
              config_width: 750,
              config_height: 750
            },
            {
              src:
                "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-15/e35/79699196_188527468959914_3356950158766933047_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=AyF6LVpLm28AX8OS7TK&oh=b8688afc88edffb8ca261c8d78fb351f&oe=5EBF4C35",
              config_width: 1080,
              config_height: 1080
            }
          ],
          accessibility_caption: "Image may contain: sky, cloud and outdoor",
          is_video: false,
          tracking_token:
            "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjpmYWxzZSwidXVpZCI6ImNjOWRmZTFkOWIwZTQ1MjlhYTBiYmIxMzhlODE2NTUzMjIyMTEwMzc5MjAyMDQ4NDA5MCIsInNlcnZlcl90b2tlbiI6IjE1Nzk0MjY4NDcxNzF8MjIyMTEwMzc5MjAyMDQ4NDA5MHwxODczMzY3NDkwOHw3NGRmYmMxMTAyNDk0NzVjYjFiYWI5N2RhYWFkMjI3Y2Y4ZjhiZTQxYzFlNjI4YTFhMzNkNDdhOGQwNjU3NDNhIn0sInNpZ25hdHVyZSI6IiJ9",
          edge_media_to_tagged_user: { edges: [] },
          edge_media_to_caption: {
            edges: [
              {
                node: {
                  text: "Some beautiful time :)) #sunset #beach #book #beer"
                }
              }
            ]
          },
          caption_is_edited: false,
          has_ranked_comments: false,
          edge_media_to_parent_comment: {
            count: 0,
            page_info: { has_next_page: false, end_cursor: null },
            edges: []
          },
          edge_media_preview_comment: { count: 0, edges: [] },
          comments_disabled: false,
          commenting_disabled_for_viewer: false,
          taken_at_timestamp: 1578996226,
          edge_media_preview_like: {
            count: 9,
            edges: [
              {
                node: {
                  id: "2095657187",
                  is_verified: false,
                  profile_pic_url:
                    "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/61546858_465671664182189_1676786851907633152_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_ohc=qQ_8uUOASEUAX9BwNOG&oh=8d52a94d2cfcafb923daa4ece3b8e06d&oe=5EA519A9",
                  username: "abhnv_rai"
                }
              }
            ]
          },
          edge_media_to_sponsor_user: { edges: [] },
          location: {
            id: "236121673",
            has_public_page: true,
            name: "Varkala cliff",
            slug: "varkala-cliff",
            address_json:
              '{"street_address": "helipad varkala trivandrum", "zip_code": "695141", "city_name": "Varkala", "region_name": "", "country_code": "IN", "exact_city_match": false, "exact_region_match": false, "exact_country_match": false}'
          },
          viewer_has_liked: false,
          viewer_has_saved: false,
          viewer_has_saved_to_collection: false,
          viewer_in_photo_of_you: false,
          viewer_can_reshare: true,
          owner: {
            id: "18733674908",
            is_verified: false,
            profile_pic_url:
              "https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82064475_2119706968132232_5805131316861075456_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_ohc=I4wT4oZ3Vd8AX9LQ_Kn&oh=8154a27acf4cc9a54d1ecb65f98cc6e5&oe=5ED98BFB",
            username: "zerotoone__",
            blocked_by_viewer: false,
            followed_by_viewer: false,
            full_name: "Zero to One",
            has_blocked_viewer: false,
            is_private: false,
            is_unpublished: false,
            requested_by_viewer: false
          },
          is_ad: false,
          edge_web_media_to_related_media: { edges: [] }
        }
      },
      status: "ok"
    }
  };
}

export default GetPostFromShortcode;
