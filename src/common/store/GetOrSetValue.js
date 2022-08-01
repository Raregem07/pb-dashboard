import GetObject from "../chrome/GetObject";
import SaveObject from "../chrome/SaveObject";

async function GetOrSetValue(key, v = null) {
  let dbValue = await GetObject(key);
  if (dbValue === undefined || dbValue === null) {
    await SaveObject(key, v);
    return v;
  }
  return dbValue;
}


export default GetOrSetValue;
