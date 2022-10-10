/*global chrome*/
import GetObject from "./GetObject";
import MainUserSharedData from "../models/MainUserSharedData";
import DatabaseKeys from "../models/DatabaseKeys";

async function getMainUser() {
  console.log("@getMainUser function:");
  let data = await GetObject(DatabaseKeys.LOGGED_IN_USER_DETAILS);
  console.log("Oooooops: GetObject return value -> ");
  let email = await GetObject(DatabaseKeys.EMAIL);

  console.log("data and email monitoring:");

  console.log(data);
  console.log(email);
  return new MainUserSharedData(data, email);
}

export default getMainUser;
