import GetObject from "../chrome/GetObject";
import DatabaseKeys from "../models/DatabaseKeys";
import SaveObject from "../chrome/SaveObject";
import GetOrSetValue from "./GetOrSetValue";

async function SaveUserDetails(username, detailedUserObj) {
  console.log("@SaveUserDetails function: username =", username, ", detailedUserObj =", detailedUserObj);
  let usersData = await GetOrSetValue(DatabaseKeys.USERS_DATA, {});
  if (username in usersData) {
    usersData[username].push(detailedUserObj);
  } else {
    usersData[username] = [];
    usersData[username].push(detailedUserObj);
  }
  await SaveObject(DatabaseKeys.USERS_DATA, usersData);
}

export default SaveUserDetails;
