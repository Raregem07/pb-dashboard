import GetDate from "../common/Helpers/GetDate";
import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";
import SaveObject from "../common/chrome/SaveObject";

async function AddDailyLevel3Limit(c) {
  let date = GetDate();
  let dailyLevel3Users = await GetOrSetValue(DatabaseKeys.DAILY_USER_LIMITS, {});
  if (!dailyLevel3Users[date]) {
    dailyLevel3Users[date] = 0;
  }
  dailyLevel3Users[date] += c;
  // console.log(dailyLevel3Users, "Class: AddDailyLevel3Limit, Function: , Line 13 dailyLevel3Users(): ");
  await SaveObject(DatabaseKeys.DAILY_USER_LIMITS, dailyLevel3Users);
}

export default AddDailyLevel3Limit;
