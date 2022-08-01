import EmailUser from "../models/EmailUser";
import sleep from "../Sleep";
import AddRateLimit from "../../email_extractor/AddRateLimit";


async function GetEmail(userID) {
  let url = `https://i.instagram.com/api/v1/users/${userID}/info/`;

  const userAgent = "Mozilla/5.0 (Linux; Android 8.1.0; motorola one Build/OPKS28.63-18-3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.80 Mobile Safari/537.36 Instagram 72.0.0.21.98 Android (27/8.1.0; 320dpi; 720x1362; motorola; motorola one; deen_sprout; qcom; pt_BR; 132081645)";
  try {
    let r;
    if (process.env.NODE_ENV === "development") {
      await sleep(1000);
      r = {
        "user": {
          "pk": 2056165277,
          "username": "thehungrygames__",
          "full_name": "Melissa",
          "is_private": false,
          "profile_pic_url": "https://scontent-del1-1.cdninstagram.com/v/t51.2885-19/s150x150/35616963_841621799366142_646420117378301952_n.jpg?_nc_ht=scontent-del1-1.cdninstagram.com\u0026_nc_ohc=FbVckJhaH14AX-RyWA3\u0026oh=0ad257e6fd31b5eb68c90d53939cde3d\u0026oe=5ED32A9F",
          "profile_pic_id": "1817652118947812064_2056165277",
          "is_verified": false,
          "has_anonymous_profile_picture": false,
          "media_count": 1330,
          "geo_media_count": 0,
          "follower_count": 57671,
          "following_count": 347,
          "following_tag_count": 0,
          "biography": "Bad puns, good food \ud83d\udc4d\ud83c\udffd\nEnjoys a nice plate of pasta \ud83c\udf5d\n\ud83d\udccdLong Island \ud83d\udccdNYC \n\ud83d\udcec thehungrygames516@gmail.com\n#hungrygames \nAll original photos \ud83d\udcf8",
          "biography_with_entities": {
            "raw_text": "Bad puns, good food \ud83d\udc4d\ud83c\udffd\nEnjoys a nice plate of pasta \ud83c\udf5d\n\ud83d\udccdLong Island \ud83d\udccdNYC \n\ud83d\udcec thehungrygames516@gmail.com\n#hungrygames \nAll original photos \ud83d\udcf8",
            "entities": [{ "hashtag": { "id": 17843799715043042, "name": "hungrygames" } }]
          },
          "external_url": "",
          "total_igtv_videos": 0,
          "total_clips_count": 0,
          "total_ar_effects": 0,
          "usertags_count": 7809,
          "is_favorite": false,
          "is_favorite_for_stories": false,
          "is_favorite_for_highlights": false,
          "live_subscription_status": "default",
          "is_interest_account": true,
          "has_chaining": true,
          "hd_profile_pic_versions": [{
            "width": 320,
            "height": 320,
            "url": "https://scontent-del1-1.cdninstagram.com/v/t51.2885-19/s320x320/35616963_841621799366142_646420117378301952_n.jpg?_nc_ht=scontent-del1-1.cdninstagram.com\u0026_nc_ohc=FbVckJhaH14AX-RyWA3\u0026oh=819ab9c6a5b820d57df489cad3e0e424\u0026oe=5ED1CA94"
          }, {
            "width": 640,
            "height": 640,
            "url": "https://scontent-del1-1.cdninstagram.com/v/t51.2885-19/s640x640/35616963_841621799366142_646420117378301952_n.jpg?_nc_ht=scontent-del1-1.cdninstagram.com\u0026_nc_ohc=FbVckJhaH14AX-RyWA3\u0026oh=d7aa1fac030588b37f7c6a38883632ab\u0026oe=5ED33C7F"
          }],
          "hd_profile_pic_url_info": {
            "url": "https://scontent-del1-1.cdninstagram.com/v/t51.2885-19/35616963_841621799366142_646420117378301952_n.jpg?_nc_ht=scontent-del1-1.cdninstagram.com\u0026_nc_ohc=FbVckJhaH14AX-RyWA3\u0026oh=102b1698c4ef6c896e43ab09c8b455f8\u0026oe=5ED5262B",
            "width": 1006,
            "height": 1006
          },
          "mutual_followers_count": 1,
          "profile_context": "Followed by thehungry.foodie",
          "profile_context_links_with_user_ids": [{ "start": 12, "end": 28, "username": "thehungry.foodie" }],
          "profile_context_mutual_follow_ids": [31075772478],
          "has_highlight_reels": true,
          "can_be_reported_as_fraud": false,
          "is_eligible_for_smb_support_flow": true,
          "smb_delivery_partner": null,
          "smb_donation_partner": null,
          "smb_support_partner": null,
          "smb_support_delivery_partner": null,
          "displayed_action_button_type": "",
          "direct_messaging": "UNKNOWN",
          "fb_page_call_to_action_id": "",
          "address_street": "",
          "business_contact_method": "",
          "category": "Media",
          "city_id": 0,
          "city_name": "",
          "contact_phone_number": "",
          "is_call_to_action_enabled": false,
          "latitude": 0.0,
          "longitude": 0.0,
          "public_email": "thehungrygames516@gmail.com",
          "public_phone_country_code": "",
          "public_phone_number": "",
          "zip": "",
          "instagram_location_id": "",
          "is_business": true,
          "account_type": 2,
          "professional_conversion_suggested_account_type": 3,
          "can_hide_category": true,
          "can_hide_public_contacts": true,
          "should_show_category": true,
          "should_show_public_contacts": true,
          "personal_account_ads_page_name": "The Hungry Games",
          "personal_account_ads_page_id": 162023501197319,
          "include_direct_blacklist_status": true,
          "is_potential_business": true,
          "show_post_insights_entry_point": false,
          "is_bestie": false,
          "has_unseen_besties_media": false,
          "show_account_transparency_details": true,
          "show_leave_feedback": false,
          "robi_feedback_source": null,
          "auto_expand_chaining": false,
          "highlight_reshare_disabled": false,
          "is_memorialized": false,
          "open_external_url_with_in_app_browser": true
        }, "status": "ok"
      };
    } else {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "user-agent": userAgent
        }
      });
      r = await response.json();
    }
    return new EmailUser(r);
  } catch (e) {
    console.log(e, 'Class: GetEmail, Function: , Line 124 e(): ');
    let status = 429;
    if (e.response && e.response.status) {
      status = e.response.status;
    }
    if (status === 404) {
      return new EmailUser({
        user: {
          pk: 0,
          username: "user_not_found",
          full_name: "user_not_found",
          is_private: false,
          profile_pic_url: "user_not_found",
          is_verified: false,
          media_count: 0,
          follower_count: 0,
          following_count: 0,
          biography: "user_not_found",
          external_url: "",
          total_igtv_videos: 0,
          usertags_count: 0,
          category: "",
          city_name: "",
          public_email: "",
          is_business: false
        }
      });
    }
    if (status === 429) {
      let errorCount = await AddRateLimit();
      throw new Error(`Rate limited by IG | total so far 429: ${errorCount}`);
    }
    throw new Error("Something else happened");
  }

}

export default GetEmail;
