import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";
import ApplicationConstants from "../common/constants/ApplicationConstants";

async function CheckRateLimit() {
  let timeValues = await GetOrSetValue(DatabaseKeys.EMAIL_429_DATA, []);
  timeValues.sort(function(a, b){return b-a});

  console.log(timeValues, 'Class: CheckRateLimit, Function: , Line 9 timeValues(): ');

  let callsInTimeToCheck = getCallsInTimeToCheck(timeValues);
  console.log(callsInTimeToCheck, 'Class: CheckRateLimit, Function: , Line 10 callsInTimeToCheck(): ');
  if (callsInTimeToCheck >= ApplicationConstants.RATE_LIMIT_EMAIL_CONFIG.THRESHOLD_CALLS) {
    return true;
  }
  return false;
}

function getCallsInTimeToCheck(decTimeValues) {
  let epochTimeMSNow = new Date().getTime();
  let timeDiffInMS = ApplicationConstants.RATE_LIMIT_EMAIL_CONFIG.TIME_TO_CHECK_IN_SECONDS * 1000;
  let counter = 0;
  for (let i=0;i<decTimeValues.length;i++) {
    if (epochTimeMSNow - decTimeValues[i] < timeDiffInMS) {
      counter++;
    } else {
      return counter;
    }
  }
  return counter
}




export default CheckRateLimit;
