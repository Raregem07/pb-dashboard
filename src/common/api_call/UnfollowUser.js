import getMainUser from "../chrome/GetMainUser";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import sendNotification from "../SendNotification";
import NotificationTypeEnum from "../models/NotificationTypeEnum";
import SaveError from "../store/SaveError";
import ApiError from "../models/ApiError";
import PostRequest from "./PostRequest";

let INSTAGRAM_APP_ID = 936619743392459;


async function unfollowUser(id) {
  // console.log(`unfollowed id - ${id}`);
  if (process.env.NODE_ENV === "development") {
    return new Promise(r => {
      setTimeout(() => {
        r("ok");
      }, 1000);
    });
  }

  let mainUser = await getMainUser();
  let csrfToken = mainUser.csrfToken;
  let url = `https://www.instagram.com/web/friendships/${id}/unfollow/`;

  let headers = {
    "authority": "www.instagram.com",
    "method": "POST",
    "path": `/web/friendships/${id}/unfollow/`,
    "scheme": "https",
    "x-csrftoken": csrfToken,
    "x-ig-app-id": INSTAGRAM_APP_ID
  };

  let response;
  try {
    response = await PostRequest(url, null, headers);
    return response;
  } catch (e) {
    let detailedError = "Could not Unfollow the user";
    let error = new ApiError(e, detailedError, "Stop Automations for some time and reduce the speed before continuing again.");
    sendNotification(NotificationTypeEnum.Failure, `${detailedError}`, true);
    await SaveError(error);

    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "unfollow user",
      label: `Status_Code: ${error.status}`
    });
    throw e;
  }
}

export default unfollowUser;
