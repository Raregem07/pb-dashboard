import axios from 'axios';
import getMainUser from '../chrome/GetMainUser';
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import sendNotification from "../SendNotification";
import NotificationTypeEnum from "../models/NotificationTypeEnum";
import SaveError from "../store/SaveError";
import ApiError from "../models/ApiError";
import PostRequest from "./PostRequest";

async function likePost(id) {
  // console.log(`like post id - ${id}`);
  if (process.env.NODE_ENV === 'development')  {
    return new Promise(r => {
      setTimeout(()=>{r('ok')},1000)
    });
  }

  let mainUser = await getMainUser();
  let csrfToken = mainUser.csrfToken;
  let instagramAjax = mainUser.rolloutHash;
  let url = `https://www.instagram.com/web/likes/${id}/like/`;

  let headers = {
    'method': 'POST',
    'X-CSRFToken': csrfToken,
    'x-instagram-ajax': instagramAjax,
  };

  let response;
  try {
    response = await PostRequest(url, null, headers);
    return response;
  } catch(e) {
    let detailedError = "Could not Like post of the user";
    let error = new ApiError(e, detailedError, "Stop Automations for some time and reduce the speed before continuing again.");
    sendNotification(NotificationTypeEnum.Failure, `${detailedError}`, true);
    await SaveError(error);

    ReactGA.event({
      category: AnalyticsCategoryEnum.API_ERROR,
      action: "like post",
      label: `Status_Code: ${error.status}`
    });
    throw e;
  }
}

export default likePost;
