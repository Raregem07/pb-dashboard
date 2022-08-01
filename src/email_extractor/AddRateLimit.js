import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";
import SaveObject from "../common/chrome/SaveObject";

async function AddRateLimit() {
  let oldValue = await GetOrSetValue(DatabaseKeys.EMAIL_429_DATA, []);
  let epochTimeMSNow = new Date().getTime();
  let nValue = oldValue.concat([epochTimeMSNow]);
  await SaveObject(DatabaseKeys.EMAIL_429_DATA, nValue);
  return nValue.length;
}

export default AddRateLimit;
