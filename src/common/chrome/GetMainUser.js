/*global chrome*/
import GetObject from "./GetObject";
import MainUserSharedData from "../models/MainUserSharedData";
import DatabaseKeys from "../models/DatabaseKeys";

async function getMainUser() {
  console.log("@getMainUser function (GetMainUser.js):");
  let data = await GetObject(DatabaseKeys.LOGGED_IN_USER_DETAILS);
  let email = await GetObject(DatabaseKeys.EMAIL);

  console.log("data and email monitoring: data =", data, ", email =", email);

  return new MainUserSharedData(data, email);
}

export default getMainUser;
