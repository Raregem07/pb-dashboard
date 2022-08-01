import getHashtagPostsAnonymously from "./GetHashtagsPostsAnonymously";
import getHashtagPosts from "./GetHashtagPosts";

async function GetHashtagPostsBestWay(hashtagName, nextPage = null) {
  let result;
  try {
    result = await getHashtagPostsAnonymously(hashtagName, nextPage);
  } catch(e) {
    result = await getHashtagPosts(hashtagName, nextPage);
  }
  return result;
}

export default GetHashtagPostsBestWay;
