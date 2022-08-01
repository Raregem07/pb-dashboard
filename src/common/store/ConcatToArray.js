import GetOrSetValue from "./GetOrSetValue";
import SaveObject from "../chrome/SaveObject";

async function ConcatToArray(key, arrayValue) {
  let value = await GetOrSetValue(key, []);
  value = value.concat(arrayValue);
  await SaveObject(key, value);
}

export default ConcatToArray;
