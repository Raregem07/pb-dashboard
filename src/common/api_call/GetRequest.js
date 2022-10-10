/*global chrome*/

async function GetRequest(url, params = null, headers = null) {
  console.log("@GetRequest function: url =", url, ", params =", params, ", headers =", headers);
  return new Promise((res, rej) => {
    chrome.runtime.sendMessage(
      { name: "getRequest", url: url, params: params, headers: headers },
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

export default GetRequest;
