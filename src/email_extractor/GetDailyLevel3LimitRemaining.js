import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";
import GetDate from "../common/Helpers/GetDate";

async function GetDailyLevel3LimitRemaining(totalDailyLimits) {
  let dailyLevel3Users = await GetOrSetValue(DatabaseKeys.DAILY_USER_LIMITS, {});
  let date = GetDate();
  if (!dailyLevel3Users[date]) {
    return totalDailyLimits;
  }
  if (totalDailyLimits - dailyLevel3Users[date] > 0) {
    return totalDailyLimits - dailyLevel3Users[date]
  }
  return 0;
}

export default GetDailyLevel3LimitRemaining;
