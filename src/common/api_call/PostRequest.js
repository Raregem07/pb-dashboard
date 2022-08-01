/*global chrome*/

async function PostRequest(url, body = null, headers = null) {
  return new Promise((res, rej) => {
    chrome.runtime.sendMessage(
      { name: "postRequest", url: url, body: body, headers: headers },
      function(response) {
        if (response.success) {
          res(response.axiosResponse);
        } else {
          rej(response.error);
        }
      }
    );
  });
}

export default PostRequest;
