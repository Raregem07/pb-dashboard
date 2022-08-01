import GetDate from "../common/Helpers/GetDate";
import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";
import SaveObject from "../common/chrome/SaveObject";
import SendEvent from "../common/Helpers/SendEvent";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";

async function AddDailyBasicUserSadamCalls(c) {
  let date = GetDate();
  let dailySadamValue = await GetOrSetValue(DatabaseKeys.DAILY_SADAM_VALUES, {});
  if (!dailySadamValue[date]) {
    dailySadamValue[date] = 0;
  }
  dailySadamValue[date] += c;
  SendEvent(AnalyticsCategoryEnum.FREE_SADAM_CALLS, `Using free call for day`, `Quantity: ${c}`);
  await SaveObject(DatabaseKeys.DAILY_SADAM_VALUES, dailySadamValue)
}

export default AddDailyBasicUserSadamCalls;
