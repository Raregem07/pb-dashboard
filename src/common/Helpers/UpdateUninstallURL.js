/*global chrome*/

function UpdateUninstallURL(username, userID, level2Calls, level3Calls) {
  if (process.env.NODE_ENV === "development") {
    return
  }
  chrome.runtime.sendMessage(
    { name: "updateUninstallURL", username: username, userID: userID, level2Calls: level2Calls, level3Calls: level3Calls }, () => {
    }
  );
}

export default UpdateUninstallURL
