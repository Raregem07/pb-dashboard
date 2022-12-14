import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import getDetailedUserObjectFromUsername from "./GetDetailedUserObjectFromUsername";
import PostRequest from "./PostRequest";
import getMainUser from "../chrome/GetMainUser";
import SendEvent from "../Helpers/SendEvent";
import axios from "axios";

async function GetUsersFromIDsByIndra(ids) {
  console.log("@GetUsersFromIDsByIndra function (GetUsersFromIDsByIndra.js): ids =", ids);
  let url = `https://ht.profilebud.com/insta/v1/get_usernames`;
  let response;
  let user = await getMainUser();
  let userID = user.viewer.id;
  try {
    let body = {
      ig_id: userID,
      user_ids: ids
    };
    console.log("About to make POST axios call: url =", url, ", body =", body);
    response = await axios.post(url, body, {timeout: 300000});
    console.log("Response to POST axios call: ", response);
    console.log("About to send a SUCCESS event: ", AnalyticsCategoryEnum.CALL_TO_INDRA);
    SendEvent(AnalyticsCategoryEnum.CALL_TO_INDRA, "SUCCESS", `Username: ${user.viewer.username} | UserID: ${user.viewer.id}`);
  } catch (e) {
    console.log(e, "CALL TO INDRA FAILED");
    SendEvent(AnalyticsCategoryEnum.CALL_TO_INDRA, "FAILED", `Username: ${user.viewer.username} | UserID: ${user.viewer.id}`);
    throw new Error("Call to Indra Failed");
  }
  // console.log(response.data.data, 'Class: GetUsersFromIDsByIndra, Function: , Line 24 response.data.data(): ');
  return response.data.data;
}

export default GetUsersFromIDsByIndra;
