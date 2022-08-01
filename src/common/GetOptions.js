import DatabaseKeys from "./models/DatabaseKeys";
import GetOrSetValue from "./store/GetOrSetValue";
import OptionsDefaultValue from "./constants/OptionsDefaultValue";

async function getOptions() {
  return await GetOrSetValue(DatabaseKeys.OPTIONS, OptionsDefaultValue);
}

export default getOptions;
