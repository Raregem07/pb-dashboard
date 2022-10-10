import GetObject from "../chrome/GetObject";
import DatabaseKeys from "../models/DatabaseKeys";
import SaveObject from "../chrome/SaveObject";
import getMainUser from "../chrome/GetMainUser";
import UpdateUninstallURL from "./UpdateUninstallURL";
import GetOrSetValue from "../store/GetOrSetValue";
import ApplicationConstants from "../constants/ApplicationConstants";

async function AddSadamCalls(userCount) {
  console.log("@AddSadamCalls function: userCount =", userCount);
  let sadamCallsLeft = await GetObject(DatabaseKeys.SADAM_CALLS_LEFT);
  if (sadamCallsLeft <= 0) {
    return;
  }
  await SaveObject(DatabaseKeys.SADAM_CALLS_LEFT, sadamCallsLeft - userCount);
}



export default AddSadamCalls;
