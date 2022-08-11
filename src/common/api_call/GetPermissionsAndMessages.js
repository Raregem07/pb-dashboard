import sleep from "../Sleep";
//import Permissions from "../models/Permissions";
import PagesMessages from "../models/PagesMessages";
//import PermissionDefaultValues from "../constants/PermissionsDefaultValues";
import MessagesDefaultValues from "../constants/MessagesDefaultValues";
import axios from "axios";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import sendNotification from "../SendNotification";
import NotificationTypeEnum from "../models/NotificationTypeEnum";
import SaveError from "../store/SaveError";
import ApiError from "../models/ApiError";
import GetRequest from "./GetRequest";
//import TimeRemainingForExpiry from "../models/TimeRemainingForExpiry";
//import TimeRemainingForExpiryDefaultValues from "../constants/TimeRemainingForExpiryDefaultValues";
import PostRequest from "./PostRequest";
import ApplicationConstants from "../constants/ApplicationConstants";
//import VideoDefaultValues from "../constants/VideoDefaultValues";
import SendEvent from "../Helpers/SendEvent";
import { sha256 } from "js-sha256";

function getCount(st) {
  return st.length;
}

async function GetPermissionsAndMessages(userID, appVersion) {
  console.log(userID);
  if (process.env.NODE_ENV === "development") {
    await sleep(100);
    return {
      isSuccess: true,
      value: {
        permission: "PREMIUM", // NORMAL or PREMIUM,
        detailedCallsRemaining: 200,
        messages: new PagesMessages(MessagesDefaultValues),
        mainMessages: {
          email_extractor: "",
          follower_following: "",
          hashtag: "",
          location: "",
          main_page: "",
          post_liker_commenter: "",
          user_liker_commenter: ""
        },
        maxFreeUsers: 500,
        maxDailyEmailLimits: 10000,
        faq: "## [What are Limits per day with Profilebuddy](https://www.profilebuddy.io/2020/10/02/limits-per-day-for-profilebuddy/) \n \n ## [How to Reset Per day limits and get more Users in a day]( https://www.profilebuddy.io/2020/10/02/how-to-rotate-instagram-accounts-to-reset-limits-in-profilebuddy/) \n \n  ## [Extract List of Followers and handling cooldown](https://www.profilebuddy.io/2020/10/01/extract-list-of-followers-of-any-instagram-account/) \n \n  ## [Analyse More than 2k users with FE Profilebuddy](https://www.profilebuddy.io/2020/10/01/extract-3x-more-emails-using-profilebuddy/) \n \n ## [How to use Whitelabel]( https://www.profilebuddy.io/2020/10/02/how-to-use-whitelabel-for-profilebuddy/)"      }
    };
  }

  // non existing api
  let url = "https://api.profilemate.com/api/v1/extension/permission";
  let response;

  let secret = "Ahur6HjiPmnRKDid923kdU";
  secret += String.fromCharCode(getCount("2llllll1lllllllllllllllasdkllllllahgsgdjahgfyefydghjfgsdjhgfjhsgfjhsgdjfshjdgfjshgfjfdjfgyrtrfteuyfb37846r37gfshjdgfgg"));
  secret += String.fromCharCode(getCount("lllllllllllllllllllllllasdkllllllahgsgdjahgfyefydghjfgsdjhgfjhsgfjhsgdjfshjdgfjshgfjfdjfgyrtrfteuyfb37846r37gfshjdgfgg"));
  secret += String.fromCharCode(getCount("lllllll1llllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"));
  try {
    response = await GetRequest(url, {
      id: userID,
      version: appVersion
    });
  } catch (e) {
    if (e.message === "Request failed with status code 404") {
      return {
        isSuccess: false,
        error: "NO_PERMISSION",
        retry: false
      }
    }
    let detailedError = "Error in getting Permissions from profilebuddy server";
    let error = new ApiError(e, detailedError, "Check if your internet is working else please send a mail to support@grambuddy.com for the support. We will get back to you super soon");
    // sendNotification(NotificationTypeEnum.Failure, `Check if your internet is working else please send a mail to support@grambuddy.com for the support. We will get back to you super soon`, true);
    SendEvent("PERMISSIONS_API_FAILED", "Profilebuddy permission & messages", `Status_Code: ${error.status}`);

    return {
      isSuccess: false,
      error: "API Call failed",
      retry: true
    };
  }

  let keyToHash = userID+secret;
  let expectedSecretToken = sha256(keyToHash);

  if (expectedSecretToken !== response.data.data.secret) {
    return {
      isSuccess: false,
      error: "WRONG_HASH",
      retry: false
    }
  }

  let pm = response.data.data.subscription;
  if (pm === "BASIC") {
    pm = "NORMAL";
  }

  let maxDailyEmailLimits = ApplicationConstants.MAX_EMAIL_CALL_LIMITS.BASIC;
  if (pm !== "NORMAL") {
    maxDailyEmailLimits = ApplicationConstants.MAX_EMAIL_CALL_LIMITS.PREMIUM
  }

  if (response.data.data.max_daily_email_limits) {
    maxDailyEmailLimits = response.data.data.max_daily_email_limits
  }

  let faq = "# Coming Soon ...";
  if (response.data.data.faq) {
    faq = response.data.data.faq
  }

  return {
    isSuccess: true,
    value: {
      permission: pm,
      detailedCallsRemaining: response.data.data.detailed_calls_remaining,
      messages: new PagesMessages(MessagesDefaultValues),
      mainMessages: response.data.data.messages,
      maxFreeUsers: response.data.data.free_calls_limit,
      maxDailyEmailLimits: maxDailyEmailLimits,
      faq: faq
    }
  };

}

export default GetPermissionsAndMessages;
