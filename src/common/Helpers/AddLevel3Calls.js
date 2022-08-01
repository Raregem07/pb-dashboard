import GetObject from "../chrome/GetObject";
import DatabaseKeys from "../models/DatabaseKeys";
import SaveObject from "../chrome/SaveObject";
import getMainUser from "../chrome/GetMainUser";
import UpdateUninstallURL from "./UpdateUninstallURL";

async function AddLevel3Calls(userCount) {
  let callData = await GetObject(DatabaseKeys.CALLS_DATA);
  callData.level3Calls += userCount;
  let mainUser = await getMainUser();
  UpdateUninstallURL(mainUser.viewer.username, mainUser.viewer.id, callData.level2Calls, callData.level3Calls);
  await SaveObject(DatabaseKeys.CALLS_DATA, callData);
}

export default AddLevel3Calls;
