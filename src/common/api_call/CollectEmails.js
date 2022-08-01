import PostRequest from "./PostRequest";
import ApplicationConstants from "../constants/ApplicationConstants";
import ReplaceSubstring from "../Helpers/ReplaceSubstring";

async function CollectEmails(users) {
  if (process.env.NODE_ENV === "development") {
    return new Promise(r => {
      setTimeout(() => {
        r("ok");
      }, 1000);
    });
  }


  let finalUsers = users.map(user => {return {
    id: user.id,
    email: user.email,
    username: user.username,
    full_name: user.fullName,
    is_verified: user.isVerified,
    post_count: user.postCount,
    biography:  ReplaceSubstring(ReplaceSubstring(user.biography, ",", " - "), "\n", " | "),
    follower_count: user.followerCount,
    following_count: user.followingCount,
    external_url: user.externalURL,
    business_category_name: user.businessCategoryName,
    igtv_videos: user.igtvVideos,
    public_phone_number: user.publicPhoneNumber,
    public_phone_country_code: user.publicPhoneCountryCode,
    city: user.cityName,
    engagement_rate: parseFloat(user.engagementRate),
    campaign_name: user.campaignName
  }});

  // TODO: Remove this console
  // console.log(finalUsers, 'Class: CollectEmails, Function: , Line 32 body(): ');

  try {
    await PostRequest(ApplicationConstants.URL_COLLECT_MAIL, {users: finalUsers}, null);
  } catch(e) {
    console.log("Error: ", e, 'Class: CollectEmails, Function: , Line 38 "Error: ", e(): ');
  }
}

export default CollectEmails;
