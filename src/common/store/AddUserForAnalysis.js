import GetOrSetValue from "./GetOrSetValue";
import DatabaseKeys from "../models/DatabaseKeys";
import SaveObject from "../chrome/SaveObject";

async function AddUserForAnalysis(username) {
  let names = await GetOrSetValue(DatabaseKeys.USERS_FOR_ANALYSIS, []);
  let nameExists = false;
  for (let i=0;i<names.length;i++) {
    if (username === names[i]) {
      nameExists = true;
      break;
    }
  }

  if (!nameExists && names.length < 1000) {
    names.push(username);
    // console.log(names, DatabaseKeys.USERS_FOR_ANALYSIS, 'Class: AddUserForAnalysis, Function: , Line 17 names, DatabaseKeys.USERS_FOR_ANALYSIS(): ');
    await SaveObject(DatabaseKeys.USERS_FOR_ANALYSIS, names);
  }

}

export default AddUserForAnalysis;
