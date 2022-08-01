import getMainUser from "../chrome/GetMainUser";
import sleep from "../Sleep";
import User from "../models/User";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import SaveError from "../store/SaveError";
import ApiError from "../models/ApiError";
import GetRequest from "./GetRequest";

async function getLikedUsersForAPostWithSaving(postShortCode, count, pageInfo = null, previousUsers = []) {
  let baseURL = "https://www.instagram.com/graphql/query";
  let nextPageToken = null;
  if (pageInfo) {
    nextPageToken = pageInfo.end_cursor;
  }
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
      response = await GetRequest(baseURL, params, headers);
    } else {
      await sleep(100);
      response = getResponse();
    }
  } catch (e) {
    let status;
    let detailedError = "Rate Limit on getting likers for the post";
    let error = new ApiError(e, detailedError, "Grambuddy automatically handles rate limiting by instagram. Wait for some time and the process will start again");
    await SaveError(error);

    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "get liked users for a post with saving",
      label: `Status_Code: ${error.status} | ${previousUsers.length} scraped before error`
    });
    return {
      likers: previousUsers,
      overflowing: [],
      recoveryOptions: pageInfo
    };
  }
  if (!response.data.data.shortcode_media) {
    return {
      likers: previousUsers,
      overflowing: [],
      recoveryOptions: pageInfo
    };
  }
  let likedObject = response.data.data.shortcode_media.edge_liked_by;
  pageInfo = likedObject.page_info;
  let users = [];
  let edges = likedObject.edges;
  for (let i = 0; i < edges.length; i++) {
    let userObj = edges[i].node;
    if (userObj.followed_by_viewer) {
      continue;
    }
    users.push(new User(userObj.profile_pic_url, userObj.username, userObj.full_name, userObj.id,
      userObj.followed_by_viewer, null, null, null));
  }
  previousUsers = previousUsers.concat(users);
  if (previousUsers.length > count) {
    let overflowingLikersCount = previousUsers.length - count;
    let overflowingUsers = users.slice(users.length - overflowingLikersCount, users.length);
    return {
      likers: previousUsers.slice(0, count),
      overflowing: overflowingUsers,
      recoveryOptions: pageInfo
    };
  }
  if (pageInfo.has_next_page) {
    return await getLikedUsersForAPostWithSaving(postShortCode, count, pageInfo, previousUsers);
  } else {
    return {
      likers: previousUsers,
      overflowing: [],
      recoveryOptions: pageInfo
    };
  }
}

function getResponse() {
  return {
    "data": {
      "data": {
        "shortcode_media": {
          "id": "2126000046013210970",
          "shortcode": "B2BEccfFOFa",
          "edge_liked_by": {
            "count": 161,
            "page_info": {
              "has_next_page": true,
              "end_cursor": "QVFCb3JlTDczTW5KQV95U2ZhOUtmMGlRbjJ0ckpaYUpoVXRHUmRTYU5XVGpWQVRKWUdxQy1QV0VOMjFkRGwxT2FfeXZKRVZyaGxxbjVtcEktVFdXZjRNMw=="
            },
            "edges": [
              {
                "node": {
                  "id": "2227230188",
                  "username": "_ashishsahu_",
                  "full_name": "Ashish Sahu",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/33ea8aa7725b0a66e6cf62ba416c73dc/5E01BB59/t51.2885-19/s150x150/65399221_693353397793481_4618289874242371584_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "2223295940",
                  "username": "_abhi_meena_",
                  "full_name": "Abhishek Meena",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/55d7417403dd5375292e9f0186967b61/5DFF0C96/t51.2885-19/s150x150/67397877_432780053998379_71720795587477504_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "3988482493",
                  "username": "tanvee_vaid",
                  "full_name": "Tanvi",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/eaadca54171933fcd86a3b4fea0a45d6/5DF45E89/t51.2885-19/s150x150/67242576_2299930106988193_7183736873083207680_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "7187137604",
                  "username": "ashuvyas_45",
                  "full_name": "Ashutosh Vyas",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/e6deeac5a4f57ec8aba3931f8e356e0e/5E145F96/t51.2885-19/s150x150/66081696_1648391481963395_3889726454333702144_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "3094948253",
                  "username": "i_am_iron._.man",
                  "full_name": "Krunal chirmade (KC)",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/2beb837329020f94db62082dce0739de/5E0D1DBE/t51.2885-19/s150x150/60276863_2029720227139707_4684114637510148096_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "2160865139",
                  "username": "kishan._.sharma",
                  "full_name": "Kishan Sharma",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/ccee5c42d26c2aedb3e1ed41eda88fda/5DFF4B58/t51.2885-19/s150x150/66320707_862167327502918_7772470137952665600_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1291892227",
                  "username": "poorva_gupta14",
                  "full_name": "poorva gupta",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/fe43c2c4345b258063fd3ce6689d5060/5E146D2C/t51.2885-19/s150x150/42100148_537248306697749_3198972503410081792_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "12825940138",
                  "username": "ankush__garg_",
                  "full_name": "Ankush Garg",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/ecc17d015c0150beb56613a7129904c7/5E0B4894/t51.2885-19/s150x150/56391692_643207282759052_5258628519793000448_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "4767096063",
                  "username": "srishyagyarai",
                  "full_name": "Srishti Yagya Rai",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/4fd8032a0e46874f1cb84acd8fa2ff43/5DF79ACA/t51.2885-19/s150x150/47585607_531580400676876_333301320574304256_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1396860846",
                  "username": "rohindhingra",
                  "full_name": "Rohin Dhingra",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/7e8596d43ce1e3ba6beb4781ee35b75d/5E052E53/t51.2885-19/s150x150/66493675_1409734815831939_6796549819071463424_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1547448436",
                  "username": "lakgarg",
                  "full_name": "Lakshya Garg",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/aaa2188733ef760fd2ad5d8b5dd5e0d7/5DF2DBC9/t51.2885-19/s150x150/47116134_2189850937998849_6271598042613284864_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "2021269805",
                  "username": "shubhangijain1997",
                  "full_name": "Shubhangi Jain",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/2fb942da80da2e3523aff72637f3274b/5E0D4169/t51.2885-19/s150x150/66806449_376051866361307_1309794957459980288_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "4475275937",
                  "username": "sura_son_asura",
                  "full_name": "Anandhu Suresh",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/d115c91c071adf8010d228d87f0adbae/5E159B24/t51.2885-19/s150x150/67159048_2054469321323428_8444331360964837376_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1466209560",
                  "username": "shubhamjain112",
                  "full_name": "Shubham Jain",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/b871052ad24d6af59443c7c3b4e0ce6e/5DF6A8F0/t51.2885-19/s150x150/18644781_1404203426305384_3213904369531486208_a.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "2762336604",
                  "username": "sharath_kmr",
                  "full_name": "Sharath",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/433ba0fd59715108f6097e1d42234a15/5DF4026D/t51.2885-19/s150x150/51755146_603748370096242_5465600270777974784_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "5925854381",
                  "username": "rashmi_bhogal1310",
                  "full_name": "Rashmi Bhogal",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/cb86eeeb301f430107d5de0e7b961009/5E053757/t51.2885-19/s150x150/26277448_170163433599271_1758972507110506496_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "5497093017",
                  "username": "anshuman_deka23",
                  "full_name": "Anshuman Deka",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/bb9254781496d75365f4f0e5a7035840/5E15311B/t51.2885-19/s150x150/57487909_284291669127835_9095023901355802624_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "9053207595",
                  "username": "choudhary._.8",
                  "full_name": "Mahendra Singh Choudhary",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/db5413a62ad516d0c64a3e32cb495c1d/5DF2B97D/t51.2885-19/s150x150/52794917_617039498737768_2405306634948575232_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1936493154",
                  "username": "axat_shrivastava",
                  "full_name": "Akshat",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/c62e430c59b4717e77732240c7fc52a8/5E111593/t51.2885-19/s150x150/66675239_331035741183764_8935487671858364416_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1467390657",
                  "username": "shivaniyd",
                  "full_name": "Shivani Yadav",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/a0ae8e2a8a7f1465f60a57e89dd5360c/5E08D59B/t51.2885-19/s150x150/60865173_1091131531093819_407571716122869760_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "3850732263",
                  "username": "meliorate_ss",
                  "full_name": "Shreshth Saini",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/842cefebc4b8d6f6e544ca2d7f1a3527/5DF78D3B/t51.2885-19/s150x150/69484295_2398491460269717_3051375776189382656_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "3563960252",
                  "username": "soh_khn",
                  "full_name": "Sohail Khan",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/4287fc94d89adb138dff966df8b588d1/5E151CAE/t51.2885-19/s150x150/54512233_1520973644706406_8017585497788383232_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "4682592379",
                  "username": "akhil031",
                  "full_name": "Akhil Anand",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/6095470695ae39d4aae5bea4f6d6acc1/5DF2DBBF/t51.2885-19/s150x150/61287946_338956676787272_6964005848003641344_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1421250764",
                  "username": "anmol_bansal_0009",
                  "full_name": "A N M O L     B A N S A L   🇮🇳",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/03d2c2fb7fc02bead501417f5de9eace/5DF77107/t51.2885-19/s150x150/69764475_461662454681368_1986159526696452096_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "2235512591",
                  "username": "dutta_ira",
                  "full_name": "Ira Dutta",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/d6096f8559b7e593b9075dba9b8fc612/5DF2E1B8/t51.2885-19/s150x150/65050844_473705873199522_6014676010954391552_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "12158248216",
                  "username": "rai._.konika",
                  "full_name": "Konika",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/68630be2091ae9c1424bdba7536e3983/5E020930/t51.2885-19/s150x150/70477113_921848841514767_8805002493776887808_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "2345936676",
                  "username": "pranav.arora.95",
                  "full_name": "Pranav Arora",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/95e7885273f99dbfb59684aa78b561b0/5E095A8A/t51.2885-19/s150x150/66823667_490496498428231_1368523949423460352_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "5503836033",
                  "username": "the_drumming_soul",
                  "full_name": "Abhinav kamboj",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/c4f5f83dc168842963f921952d6560a0/5DFD5DB8/t51.2885-19/s150x150/67259433_412397576066548_5030835256983289856_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "4176230859",
                  "username": "anchals104",
                  "full_name": "Anchal Singh",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/1adb577f9369602b0517dd3ed68fa02f/5E05794D/t51.2885-19/s150x150/28766535_1603820529731426_9139062657762983936_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "2208112683",
                  "username": "neel.kay",
                  "full_name": "Neelansh Kamboj",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/77dfa80a6f930cb682907a054cc7c8c9/5E01220A/t51.2885-19/s150x150/28158969_167442303907179_3480875465021849600_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "310108126",
                  "username": "very_anirudh",
                  "full_name": "Anirudh Vyas",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/58e14bc81b3e462ef93baca3fe14bdc4/5DFC0AE3/t51.2885-19/s150x150/13643063_1658522414474000_1210075942_a.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": true,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "2079904120",
                  "username": "_krishnagoyal_",
                  "full_name": "Krishna Goyal",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/9f0ff778943f81977c6cbd89c1154a21/5DEF8154/t51.2885-19/s150x150/46767100_2165398777056356_17222032877944832_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "4020556536",
                  "username": "mr.rush.g",
                  "full_name": "Aarush",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/b166baa0f771e52035d9f997bbc92aa8/5DFA6F66/t51.2885-19/s150x150/57119739_333159674037520_4445251792279699456_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "3949169435",
                  "username": "shashankmohabia",
                  "full_name": "Shashank Mohabia",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/6091af0521e24281d85342a929d2a156/5DFE42BA/t51.2885-19/s150x150/64484628_561761347686074_2386015127913627648_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1718702280",
                  "username": "mayank_maheshwarii",
                  "full_name": "Mayank",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/2cf51ed2c1ed23c56702d1348d7adc01/5DF4287D/t51.2885-19/s150x150/44882404_498168124020780_4806803552301219840_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "3980248022",
                  "username": "kbir_kr",
                  "full_name": "Kabir Rai",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/079eec5792f27901a622dbd95fa7c6c8/5E048C02/t51.2885-19/s150x150/64818933_399812860650410_2562593207821008896_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": true,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1518938530",
                  "username": "dienesh.deen",
                  "full_name": "Dinesh Maurya",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/af5babffb973ab61d9af25571e67da19/5E0504E8/t51.2885-19/s150x150/66828855_486705625459284_2990564871843610624_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "7705405723",
                  "username": "sainiyamini.3",
                  "full_name": "Yamini Saini",
                  "profile_pic_url": "https://scontent-mrs2-2.cdninstagram.com/vp/9801198311ae8c135967b434c6fa0455/5DF2B4F1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-mrs2-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "3051122822",
                  "username": "kush_dang",
                  "full_name": "Kush Dang",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/8adc4ea086bbf4e8a30436dde6786336/5E01E02E/t51.2885-19/s150x150/66639491_411480619480031_1884042646259761152_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "2092176246",
                  "username": "_sachinmandowara_",
                  "full_name": "Sachin Mandowara",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/b63f21338bd74a3ad54a9b0d747d79fb/5E0A4463/t51.2885-19/s150x150/54512134_327542258111814_6739022653446684672_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "1207632055",
                  "username": "prajapatraj",
                  "full_name": "Raj Prajapat",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/90f492e524418484d6de021a70e52f58/5DFE8F81/t51.2885-19/s150x150/67187877_727870091001874_1247760988162228224_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "6986607508",
                  "username": "iiakshayii",
                  "full_name": "Akshay Agrawal | 🇮🇳",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/b1f5830c01d22efa420efb992f14e760/5E02E912/t51.2885-19/s150x150/65314253_386088542329540_6695654281304866816_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "3516784012",
                  "username": "indra_malav",
                  "full_name": "Indra Malav",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/e7b031273b6e31803ac0cec3e64984a3/5DF348DB/t51.2885-19/s150x150/67653845_2490605041004369_3047567621961547776_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "4054714232",
                  "username": "vanditimathur",
                  "full_name": "Vanditi Mathur",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/29f471ae442639e6b1d6ea143feb3878/5E094360/t51.2885-19/s150x150/49858318_1191017011055742_9194145080758239232_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "823749000",
                  "username": "arhamchordia",
                  "full_name": "Arham Chordia",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/6a9b31f4da55354a6db71a495733f703/5E0EFEFF/t51.2885-19/s150x150/67290454_2384049454971864_435243967072698368_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "31856057",
                  "username": "chetan_bhalerao",
                  "full_name": "",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/20cb27c38eb96fe21f0f710c97e52943/5E115E17/t51.2885-19/s150x150/17267506_1904727609741250_2792302330987413504_a.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "2326686023",
                  "username": "rohan_aldo",
                  "full_name": "Rohan Saraf",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/c28b21c96e712b89f1ff501675fb46cf/5DF45490/t51.2885-19/s150x150/67743547_675349642968633_2858220733132177408_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "8342516680",
                  "username": "h_baruos",
                  "full_name": "S O U R A B H",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/0f18b521c81c88d8b2a5e67ab96628bb/5DF53B75/t51.2885-19/s150x150/61622126_309200679799303_3011204740911464448_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "6783788788",
                  "username": "thebapatist",
                  "full_name": "Akshay Bapat",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/726dedfc21daeef0946c0d9bc34c6f0f/5DEFCA8C/t51.2885-19/s150x150/25012536_137867626896399_504202956954927104_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
                  "is_verified": false,
                  "followed_by_viewer": false,
                  "requested_by_viewer": false
                }
              },
              {
                "node": {
                  "id": "367197454",
                  "username": "scheng814",
                  "full_name": "Suzanne' Life",
                  "profile_pic_url": "https://scontent-bom1-2.cdninstagram.com/vp/ba90fec4ce4a72b9e81eaaae57397023/5E142C68/t51.2885-19/s150x150/18444788_1134705886633940_2448096316081831936_a.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com",
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

export default getLikedUsersForAPostWithSaving;
