/*global chrome*/
import axios from "axios";

async function PostRequest(url, body = null, headers = null) {

  console.log("@PostRequest function (PostRequest.js): url =", url, ", body =", body, " and headers =", headers);
  return axios.post(url, body, {
    headers: headers
  });

  // return new Promise((res, rej) => {
  //   chrome.runtime.sendMessage(
  //     { name: "postRequest", url: url, body: body, headers: headers },
  //     function(response) {
  //       if (response.success) {
  //         res(response.axiosResponse);
  //       } else {
  //         rej(response.error);
  //       }
  //     }
  //   );
  // });
}

export default PostRequest;
