/*global chrome*/
import GetObject from "./GetObject";
import MainUserSharedData from "../models/MainUserSharedData";
import DatabaseKeys from "../models/DatabaseKeys";

async function getMainUser() {
  let data = await GetObject(DatabaseKeys.LOGGED_IN_USER_DETAILS);
  let email = await GetObject(DatabaseKeys.EMAIL);
  return new MainUserSharedData(data, email);
}

export default getMainUser;
