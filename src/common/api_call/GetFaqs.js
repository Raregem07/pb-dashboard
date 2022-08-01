import GetRequest from "./GetRequest";
import sleep from "../Sleep";

async function GetFAQs() {
  let url = "https://api.profilebuddy.io/api/v1/faq";
  let r;
  if (process.env.NODE_ENV === "development") {
    await sleep(2000);
    return getDummyFAQs();
  }
  try {
    r = await GetRequest(url);
    return r.data.data;
  } catch (e) {
    return {faq_items: []};
  }
}

function getDummyFAQs() {
  return [
    {
      "q": "What is Profilebuddy",
      "a": "It's a chrome extension"
    }
  ];
}


export default GetFAQs;
