/*global chrome*/

async function SendMessage(name, params = null, headers = null) {
  if (process.env.NODE_ENV === "production") {
    return new Promise((res, rej) => {
      chrome.runtime.sendMessage(
        { name: name }, function() {
          res("done");
        }
      );
    });
  }
}

export default SendMessage;
