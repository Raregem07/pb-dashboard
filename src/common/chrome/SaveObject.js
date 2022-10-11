/*global chrome*/

import DatabaseKeys from "../models/DatabaseKeys";
import MainUserSharedData from "../models/MainUserSharedData";

function SaveObject(key, object) {
  console.log("@SaveObject function (SaveObject.js):");
  if (process.env.NODE_ENV === "development") {
    console.log('save object called with key - ', key, 'value', object);
    return new Promise(r => {
      setTimeout(() => {
        r('ok')
      }, 200);
    })
  } else {
    if (key === DatabaseKeys.USERS_FOR_ANALYSIS || key === DatabaseKeys.USERS_DATA || key === DatabaseKeys.CALLS_DATA || key === DatabaseKeys.FOLLOWER_SAVE_POINTS) {
      return new Promise((res, rej) => {
        chrome.storage.local.set({[key]: object}, () => {
          res('saved');
        });
      });
    } else {
      return new Promise((res, rej) => {
        chrome.storage.local.get([DatabaseKeys.LOGGED_IN_USER_DETAILS], (result) => {
          let mainUserData = new MainUserSharedData(result[DatabaseKeys.LOGGED_IN_USER_DETAILS]);
          let loggedInUserID = mainUserData.viewer.id;
          let finalKey = `${key}_${loggedInUserID}`;
          chrome.storage.local.set({[`${finalKey}`]: object}, () => {
            res('saved');
          });
        });
      });
    }

  }
}

export default SaveObject;
