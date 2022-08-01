import GetOrSetValue from "../store/GetOrSetValue";
import DatabaseKeys from "../models/DatabaseKeys";
import ApplicationConstants from "../constants/ApplicationConstants";
import SaveObject from "../chrome/SaveObject";

async function AddFollowerCallForMaxLimit(value, justCheck = false) {
  let defValue = {
    set1: {
      value: 0,
      dateTime: new Date().getTime()
    },
    set2: {
      value: 0,
      dateTime: new Date().getTime()
    },
    set3: {
      value: 0,
      dateTime: new Date().getTime()
    }
  };
  let val = await GetOrSetValue(DatabaseKeys.FOLLOWER_MAX_LIMIT_MAINTAINER, defValue);
  if (new Date().getTime() - val.set1.dateTime  > 80000000) {
    val = defValue;
  }
  if (val.set1.value < ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.VALUE) {
    val.set1.value += value;
    val.set1.dateTime = new Date().getTime();
    if (!justCheck) {
      await SaveObject(DatabaseKeys.FOLLOWER_MAX_LIMIT_MAINTAINER, val);
    }
    return {
      success: true,
      errorMessage: "",
    }
  }

  if (new Date().getTime() - val.set1.dateTime < ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.GAP_TIME_IN_HOURS * 60 * 60 * 1000) {
    // console.log(new Date().getTime(),val.set1.dateTime, 'Class: AddFollowerCallForMaxLimit, Function: , Line 36 new Date().getTime()(): ');
    return {
      success: false,
      errorMessage: `Follower Following process cooling for another ${ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.GAP_TIME_IN_HOURS*60 - Math.floor((new Date().getTime() - val.set1.dateTime)/60000)} minutes. You can get another 8000 users after that.`,
      timeInSec: (ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.GAP_TIME_IN_HOURS*60 - Math.floor((new Date().getTime() - val.set1.dateTime)/60000)) * 60
    }
  }

  if (val.set2.value < ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.VALUE) {
    val.set2.value += value;
    val.set2.dateTime = new Date().getTime();
    if (!justCheck) {
      await SaveObject(DatabaseKeys.FOLLOWER_MAX_LIMIT_MAINTAINER, val);
    }
    return {
      success: true,
      errorMessage: ""
    }
  }

  if (new Date().getTime() - val.set2.dateTime < ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.GAP_TIME_IN_HOURS * 60 * 60 * 1000) {
    return {
      success: false,
      errorMessage: `Do the email/detailed analysis for already done users. As a safe limit for your account we are pausing this action for ${ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.GAP_TIME_IN_HOURS*60 - Math.floor((new Date().getTime() - val.set2.dateTime)/60000)} minutes. You can get another 8000 users after that.`,
      timeInSec: (ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.GAP_TIME_IN_HOURS*60 - Math.floor((new Date().getTime() - val.set2.dateTime)/60000)) * 60
    }
  }

  if (val.set3.value < ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.VALUE) {
    val.set3.value += value;
    val.set3.dateTime = new Date().getTime();
    if (!justCheck) {
      await SaveObject(DatabaseKeys.FOLLOWER_MAX_LIMIT_MAINTAINER, val);
    }
    return {
      success: true,
      errorMessage: ""
    }
  }

  return {
    success: false,
    errorMessage: `As a safe limit for your account we are pausing following following for ${Math.floor((val.set1.dateTime + 86400000 - new Date().getTime())/60000)} minutes. You can get another 8000 users after that.`,
    timeInSec: Math.floor((val.set1.dateTime + 86400000 - new Date().getTime())/ 1000)
  }
}


export default AddFollowerCallForMaxLimit;
