import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";
import GetDate from "../common/Helpers/GetDate";
import SendEvent from "../common/Helpers/SendEvent";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";

async function GetDailyBasicUserSadamCalls(totalAllowed) {
  let dailySadamValue = await GetOrSetValue(DatabaseKeys.DAILY_SADAM_VALUES, {});
  let date = GetDate();
  if (!dailySadamValue[date]) {
    return totalAllowed;
  }
  if (totalAllowed - dailySadamValue[date] > 0) {
    return totalAllowed - dailySadamValue[date]
  }
  return 0;
}

export default GetDailyBasicUserSadamCalls;
