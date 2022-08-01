import getLimitedPostsOfAUserAnonymously from "./GetLimitedPostsOfAUserAnonymously";
import getLimitedPostsOfAUser from "./GetPostsOfAUser";

async function GetLimitedPostsOfAUserBestWay(userID, nextPage = null) {
  let result;
  try {
    result = await getLimitedPostsOfAUserAnonymously(userID, nextPage);
  } catch (e) {
    result = await getLimitedPostsOfAUser(userID, nextPage);
  }
  return result;
}

export default GetLimitedPostsOfAUserBestWay;
