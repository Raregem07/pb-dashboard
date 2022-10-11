/*global chrome*/
import axios from "axios";

async function GetRequest(url, params = null, headers = null) {
  
  console.log("@GetRequest function (GetRequest.js): url =", url, ", params =", params, ", headers =", headers);

  // console.log("yow");
  // return axios.get(url, {
  //   params: params,
  //   headers: headers
  let axiosResp = await axios.get(url, {
    params: params,
    headers: headers
  });

  console.log("Response to GET axios call: ", axiosResp);
  return axiosResp;

  // return new Promise((res, rej) => {
  //   chrome.runtime.sendMessage(
  //     { name: "getRequest", url: url, params: params, headers: headers },
  //     function(response) {
  //       console.log(response);
  //       if (response.success) {
  //         res(response.axiosResponse);
  //       } else {
  //         rej(response.error);
  //       }
  //     }
  //   );
  // });
}

export default GetRequest;
