import getDetailedUserObjectFromUsername from "./GetDetailedUserObjectFromUsername";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import SaveError from "../store/SaveError";
import ApiError from "../models/ApiError";
import GetRequest from "./GetRequest";


async function getUserFromID(id) {
  let url = `https://i.instagram.com/api/v1/users/${id}/info/`;
  let response;
  try {
    response = await GetRequest(url, null, null);
  } catch (e) {
    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "get User from ID"
    });
    let fallback_url = "https://api.profilebud.com/insta/api/v1/instagram_name_from_id";
    let params = {id: id};
    try {
      response = await GetRequest(fallback_url, params, null);
      let username = response.data.data.username;
      return await getDetailedUserObjectFromUsername(username);
    } catch(e) {
      let detailedError = "Fallback also failed - Could not get user from userID the user";
      let error = new ApiError(e, detailedError, "Retry after some time again");
      await SaveError(error);
      ReactGA.event({
        category: AnalyticsCategoryEnum.API_ERROR,
        action: "Fallback - get User from ID"
      });
      throw e;
    }
  }
  let username = response.data.user.username;
  return await getDetailedUserObjectFromUsername(username);
}

//
// return new DetailedPostOwner({
//   "status": "ok",
//   "user": {
//     "pk": 17324661002,
//     "username": "imanimdaniel",
//     "full_name": "IMANI",
//     "is_private": false,
//     "profile_pic_url": "https://scontent-maa2-1.cdninstagram.com/vp/6a02278cee91e874ffcc6156ac408c16/5DE35FC1/t51.2885-19/s150x150/69175755_2937430279665484_2220803270933217280_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com",
//     "profile_pic_id": "2113057605352970242_17324661002",
//     "is_verified": false,
//     "has_anonymous_profile_picture": false,
//     "media_count": 165,
//     "follower_count": 112,
//     "following_count": 129,
//     "following_tag_count": 0,
//     "biography": "ᴀᴜᴛʜᴇɴᴛɪᴄ ᴀᴄᴄᴏᴜɴᴛ.\n#imani_picture \n|DANIEL 9.19|",
//     "external_url": "https://www.facebook.com/daniel.nkizinkiko.1",
//     "external_lynx_url": "https://l.instagram.com/?u=https%3A%2F%2Fwww.facebook.com%2Fdaniel.nkizinkiko.1&e=ATOSiT5DU_eeBut6pY1eZW1BZ-DkAUDUNGPFv-E-Bjz5jFb0t7dvBVAZniwntAIociqC7YitObc-jRjLmvxM25SjGz3YIIk6",
//     "total_igtv_videos": 0,
//     "total_ar_effects": 0,
//     "usertags_count": 25,
//     "is_favorite": false,
//     "is_interest_account": false,
//     "hd_profile_pic_versions": [
//       {
//         "width": 320,
//         "height": 320,
//         "url": "https://scontent-maa2-1.cdninstagram.com/vp/a268f023cf46d42f23b0e7e72350bd0e/5DD6D0B9/t51.2885-19/s320x320/69175755_2937430279665484_2220803270933217280_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com"
//       }
//     ],
//     "hd_profile_pic_url_info": {
//       "url": "https://scontent-maa2-1.cdninstagram.com/vp/7500794415e1626fc16f3b45a09c616b/5DD72DB9/t51.2885-19/69175755_2937430279665484_2220803270933217280_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com",
//       "width": 469,
//       "height": 469
//     },
//     "mutual_followers_count": 0,
//     "has_highlight_reels": false,
//     "can_be_reported_as_fraud": false,
//     "direct_messaging": "",
//     "address_street": "",
//     "business_contact_method": "",
//     "category": "Athlete",
//     "city_id": 0,
//     "city_name": "",
//     "contact_phone_number": "",
//     "is_call_to_action_enabled": false,
//     "latitude": 0,
//     "longitude": 0,
//     "public_email": "",
//     "public_phone_country_code": "",
//     "public_phone_number": "",
//     "zip": "",
//     "instagram_location_id": "",
//     "is_business": false,
//     "account_type": 3,
//     "can_hide_category": true,
//     "can_hide_public_contacts": true,
//     "should_show_category": true,
//     "should_show_public_contacts": false,
//     "include_direct_blacklist_status": true,
//     "is_potential_business": false,
//     "is_bestie": false,
//     "has_unseen_besties_media": false,
//     "show_account_transparency_details": false,
//     "auto_expand_chaining": false,
//     "highlight_reshare_disabled": false,
//     "show_post_insights_entry_point": false,
//     "show_post_insights_settings_entry_point": false
//   }
// });

export default getUserFromID;
