import getLocationPostsAnonymously from "./GetLocationPostsAnonymously";
import getLocationPosts from "./GetLocationPosts";

async function GetLocationPostsBestway(locationPK, nextPage = null) {
  let result;
  try {
    result = await getLocationPostsAnonymously(locationPK, nextPage);
  } catch (e) {
    result = await getLocationPosts(locationPK, nextPage);
  }
  return result;
}

export default GetLocationPostsBestway;
