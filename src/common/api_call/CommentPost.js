import getMainUser from "../chrome/GetMainUser";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import sendNotification from "../SendNotification";
import NotificationTypeEnum from "../models/NotificationTypeEnum";
import SaveError from "../store/SaveError";
import ApiError from "../models/ApiError";
import axios from "axios";

let INSTAGRAM_APP_ID = 936619743392459;


async function commentPost(id, commentValue) {
  // console.log(`Comment post id - ${id}`);
  if (process.env.NODE_ENV === "development") {
    return new Promise(r => {
      setTimeout(() => {
        r("ok");
      }, 1000);
    });
  }

  let mainUser = await getMainUser();
  let csrfToken = mainUser.csrfToken;
  let instagramAjax = mainUser.rolloutHash;
  let url = `https://www.instagram.com/web/comments/${id}/add/`;

  let headers = {
    "method": "POST",
    "x-csrftoken": csrfToken,
    "x-instagram-ajax": instagramAjax,
    "x-ig-app-id": INSTAGRAM_APP_ID,
    "path": `/web/comments/${id}/add/`,
    "content-type": "application/x-www-form-urlencoded"
  };
  var bodyFormData = new FormData();
  bodyFormData.set("comment_text", commentValue);
  try {
    return await axios.post(url, bodyFormData, {
      headers: headers
    })
  } catch (e) {
    let error = new ApiError(e, `Could not comment on post`, "Stop Automations for some time and reduce the speed before continuing again.");
    sendNotification(NotificationTypeEnum.Failure, `Could not comment on the post. Slow down and wait for some time. Error Code: ${error.status}`, true);
    await SaveError(error);
    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "Comment on a post",
      label: `Status_Code: ${error.status}`
    });
    throw e;
  }
}

export default commentPost;
