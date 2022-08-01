import GetOrSetValue from "../store/GetOrSetValue";
import DatabaseKeys from "../models/DatabaseKeys";
import ApplicationConstants from "../constants/ApplicationConstants";
import SaveObject from "../chrome/SaveObject";

async function AddFollowingCallForMaxLimit(value) {
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
  let val = await GetOrSetValue(DatabaseKeys.FOLLOWING_MAX_LIMIT_MAINTAINER, defValue);
  if (val.set1.dateTime - new Date().getTime() > 80000000) {
    val = defValue;
  }
  if (val.set1.value < ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.VALUE) {
    val.set1.value += value;
    val.set1.dateTime = new Date().getTime();
    await SaveObject(DatabaseKeys.FOLLOWING_MAX_LIMIT_MAINTAINER, val);
    return {
      success: true,
      errorMessage: ""
    }
  }

  if (new Date().getTime() - val.set1.dateTime < ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.GAP_TIME_IN_HOURS * 60 * 60 * 1000) {
    return {
      success: false,
      errorMessage: `As a safe limit: Please continue from here after ${Math.floor((new Date().getTime() - val.set1.dateTime)/60000)} minutes`
    }
  }

  if (val.set2.value < ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.VALUE) {
    val.set2.value += value;
    val.set2.dateTime = new Date().getTime();
    await SaveObject(DatabaseKeys.FOLLOWING_MAX_LIMIT_MAINTAINER, val);
    return {
      success: true,
      errorMessage: ""
    }
  }

  if (new Date().getTime() - val.set2.dateTime < ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.GAP_TIME_IN_HOURS * 60 * 60 * 1000) {
    return {
      success: false,
      errorMessage: `As a safe limit: You can do another 8,000 users after ${Math.floor((new Date().getTime() - val.set2.dateTime)/60000)} minutes`
    }
  }

  if (val.set3.value < ApplicationConstants.MAX_FOLLOWER_FOLLOWING_IN_A_GO.VALUE) {
    val.set3.value += value;
    val.set3.dateTime = new Date().getTime();
    await SaveObject(DatabaseKeys.FOLLOWING_MAX_LIMIT_MAINTAINER, val);
    return {
      success: true,
      errorMessage: ""
    }
  }

  return {
    success: false,
    errorMessage: `As a safe limit: You can do another 8,000 users after ${Math.floor((val.set1.dateTime + 86400000 - new Date().getTime())/60000)} minutes`
  }
}


export default AddFollowingCallForMaxLimit;
