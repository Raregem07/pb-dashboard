/* eslint-disable array-callback-return */
/* eslint-disable default-case */
import DetailedUser from "../../models/DetailedUser";
import sleep from "../../Sleep";
import axios from "axios";
import SendEvent from "../../Helpers/SendEvent";
import ApplicationConstants from "../../constants/ApplicationConstants";
import AnalyticsCategoryEnum from "../../constants/AnalyticsCategoryEnum";

async function GetDetailsFromSadam(usernames, igID, fieldsRequired, failedCount = 0) {
  console.log("@GetDetailsFromSadam function (GetDetailsFromSadam.js): usernames =", usernames, ", igID =", igID, " and fieldsRequired =", fieldsRequired)
  let fieldRequiredReq = {
    bio: true,
    is_business_account: true,
    follower_count: true,
    following_count: true,
    website: true,
    business_category: true,
    is_private: true,
    post_count: true,
    engagement_rate: true,
    posts_in_last_7_days: false,
    locations_from_posts: false,
    is_verified: false,
    is_joined_recently: false
  };

  fieldsRequired.map(f => {
    switch (f) {
      case "biography":
        fieldRequiredReq.bio = true;
        break;
      case "businessCategoryName":
        fieldRequiredReq.business_category = true;
        break;
    }
  });

  let body = {
    ig_id: igID,
    usernames: usernames,
    fields_required: fieldRequiredReq,
    identifier: "profilemate"
  };
  
  let url = "https://data.profilebud.com/v1/user_details";
  let res;
  if (process.env.NODE_ENV === "development") {
    res = await getDummyResponse(usernames);
  } else {
    try {
      console.log("About to make a POST axios call: url =", url, ", body =", body);
      res = await axios.post(url, body, {timeout: 300000})
      console.log("Response to POST axios call is: ", res);
    } catch (e) {
      throw new Error("Failed");
    }
  }
  let correctUsersDetailed = res.data.data;
  let users = correctUsersDetailed;
  let badUsersCount = getBadUsersCount(users);
  let badDetailedUsers = []
  if ((badUsersCount/users.length) * 100 > ApplicationConstants.MAX_BAD_USERS_PERCENTAGE_ALLOWED_IN_A_GO_SADAM && failedCount < 3 && usernames.length > 10) {
    SendEvent(AnalyticsCategoryEnum.CALL_TO_SADAM, "Failed | Retrying", failedCount.toString())
    console.log("Sadam Proxy server Retrying", failedCount, 'Line 58 | Class: GetDetailsFromSadam | Function: GetDetailsFromSadam: ')
    let badUsernames = users.filter(u => u.biography === "COULD_NOT_ACCESS_THIS_USER").map(u => u.username);
    correctUsersDetailed =  users.filter(u => u.biography !== "COULD_NOT_ACCESS_THIS_USER");
    await sleep(ApplicationConstants.SLEEP_IN_MS_BETWEEN_SADAM_CALLS);
    badDetailedUsers  = await GetDetailsFromSadam(badUsernames, igID, fieldsRequired, failedCount+1);
  }
  SendEvent(AnalyticsCategoryEnum.CALL_TO_SADAM, "Success", failedCount.toString())
  let finalCorrectUsers = correctUsersDetailed.map(u => {
    let nu = new DetailedUser(
      u.biography,
      u.follower_count,
      u.following_count,
      false, false,
      u.is_business_account,
      u.is_private,
      u.profile_pic_url,
      "",
      u.username,
      u.full_name,
      u.external_url,
      0, { edges: [] },
      "",
      u.id,
      false,
      u.business_category_name
    );
    if(u.should_show_category) {
      nu.isBusinessAccount = true;
      nu.setCategory(u.category_name);
    }
    if (u.business_email) {
      nu.businessEmail = u.business_email;
    }
    if (u.business_phone_number) {
      nu.publicPhoneNumber = u.business_phone_number;
    }
    nu.setPostCount(u.post_count);
    nu.setEngagementRate(u.engagement_rate);
    return nu;
  });

  return finalCorrectUsers.concat(badDetailedUsers)
}

function getBadUsersCount(detailedUsers) {
  let count = 0;
  detailedUsers.map(du => {
    if (du.biography === "COULD_NOT_ACCESS_THIS_USER") {
      count++;
    }
  });
  return count;
}


async function getDetailsForSpecificUser(username) {
  await sleep(100);
  return {
    "biography": "23, Bangalore\nMultipotentialite | Entrepreneur \nI bring smiles with music, party sometimes, travel mostly and build cool things!",
    "external_url": "https://abhinavrai.com/",
    "follower_count": 681,
    "following_count": 558,
    "full_name": `${username}_Full_Name`,
    "post_count": 68,
    "id": "2095657187",
    "is_business_account": true,
    "business_category_name": "Creators & Celebrities",
    "is_private": false,
    "username": username,
    "engagement_rate": 212,
    "posts_in_last_7_days": 0,
    "locations_from_posts": [
      "Bangalore, India",
      "Odayam Beach",
      "Cunca Rami Waterfall",
      "Labuan, Jawa Barat, Indonesia",
      "Padar Island",
      "Pari Island"
    ]
  };
}

async function getDummyResponse(usernames) {
  // console.log("getting dummy response of", usernames, "Class: getDummyResponse, Function: , Line 104 \"getting dummy response of\", usernames(): ");
  let data = [];
  for (let i = 0; i < usernames.length; i++) {
    let u = usernames[i];
    let du = await getDetailsForSpecificUser(u);
    data.push(du);
  }
  return {
    data: {
      data: data,
      success: true,
      errors: []
    }
  };
}



export default GetDetailsFromSadam;