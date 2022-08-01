import getHashtagPosts from "../common/api_call/new_api_calls/GetHashtagPosts";
import GetReelsForAUser from "../common/api_call/GetReelsForAUser";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import GetUsersFromIDsByIndra from "../common/api_call/GetUsersFromIDsByIndra";
import sleep from "../common/Sleep";
import getLocationPosts from "../common/api_call/new_api_calls/GetLocationPosts";
import GetObject from "../common/chrome/GetObject";
import DatabaseKeys from "../common/models/DatabaseKeys";
import AddLevel2Calls from "../common/Helpers/AddLevel2Calls";
import GetLocationPostsSectionFirstCall from "../common/api_call/new_api_calls/GetLocationPostsSectionFirstCall";
import GetLocationPostsSectionOtherCall from "../common/api_call/new_api_calls/GetLocationPostsSectionOtherCall";
import SaveObject from "../common/chrome/SaveObject";
import GetHashtagPostsSectionFirstCall from "../common/api_call/new_api_calls/GetHashtagPostsSectionFirstCall";
import GetHashtagPostsSectionOtherCall from "../common/api_call/new_api_calls/GetHashtagPostsSectionOtherCall";

class ProcessHashtag {
  constructor(name, id, valueCallback, processEndCallback, maxScrapeDoneCallback, isLocation = false) {
    this.name = name;
    this.id = id;
    this.valueCallback = valueCallback;
    this.processEndCallback = processEndCallback;
    this.nextPageToken = null;
    this.state = 0;
    this.count = 0;
    this.processStarted = false;
    this.isLocation = isLocation;
    this.maxScrapeDoneCallback = maxScrapeDoneCallback;
    this.apiCallsStopped = false;
  }

  stopAPICalls = () => {
    this.apiCallsStopped = true;
  };

  setLocationSlug = (locationSlug) => {
    this.locationSlug = locationSlug;
  };


  start = async (nextPageToken, pageNumber) => {

    if (this.apiCallsStopped) {
      return;
    }

    if (!nextPageToken && this.processStarted) {
      this.processEndCallback();
      return;
    }

    // let ob = await this.getLevel2Users();
    // if (ob.level2Calls > ob.maxCallsAllowed) {
    //   this.maxScrapeDoneCallback();
    //   return;
    // }

    this.processStarted = true;
    this.nextPageToken = nextPageToken;
    let hashtagPostsObj;
    if (this.isLocation) {
      if (!this.nextPageToken) {
        hashtagPostsObj = await GetLocationPostsSectionFirstCall(this.id, this.locationSlug)
      } else {
        hashtagPostsObj = await GetLocationPostsSectionOtherCall(this.id, this.nextPageToken, this.pageNumber)
      }
      if (hashtagPostsObj.retry) {
        await sleep(180000);
        return await this.start(this.nextPageToken, this.pageNumber);
      }

    } else {
      if (!this.nextPageToken) {
        hashtagPostsObj = await GetHashtagPostsSectionFirstCall(this.name)
      } else {
        hashtagPostsObj = await GetHashtagPostsSectionOtherCall(this.name, this.nextPageToken, this.pageNumber)
      }
      if (hashtagPostsObj.retry) {
        await sleep(180000);
        return await this.start(this.nextPageToken, this.pageNumber);
      }
    }

    let users = hashtagPostsObj.users
    this.nextPageToken = hashtagPostsObj.nextPageToken;
    this.pageNumber = hashtagPostsObj.pageNumber;

    if (!hashtagPostsObj.moreAvailable) {
      this.processEndCallback();
      return
    }
    this.valueCallback(users);
    await sleep(20000);
    await this.start(this.nextPageToken, this.pageNumber);
  };

  processUsersForHashtags = async (hashtagPosts) => {
    // console.log(hashtagPosts, "Class: ProcessHashtag, Function: , Line 24 hashtagPosts(): ");
    let userIDs = hashtagPosts.map(hl => hl.owner_id);

    let mp = {};

    hashtagPosts.map(hl => {
      mp[hl.owner_id.toString()] = hl;
    });

    await this.getUsersFromIDs(userIDs, mp);

    await this.start(this.nextPageToken);
  };

  getUsersFromIDs = async (userIDs, mp) => {
    let i = 0, max = 1, du;
    while (i < userIDs.length) {
      if (this.apiCallsStopped) {
        return;
      }
      if (this.state === 1) {
        this.count++;
        if (this.count === ApplicationConstants.RETRY_AFTER_N_INDRA_CALLS) {
          this.count = 0;
          this.state = 0;
        }
        if (i + ApplicationConstants.MAX_USERS_IN_INDRA_CALL <= userIDs.length) {
          max = ApplicationConstants.MAX_USERS_IN_INDRA_CALL;
        } else {
          max = userIDs.length;
        }
        try {
          du = await GetUsersFromIDsByIndra(userIDs.slice(i, i + max));
          await sleep(ApplicationConstants.INDRA_WAIT_TIME_AFTER_EVERY_CALL_IN_MS);
        } catch (e) {
          console.log(e, "INDRA CALL FAILED");
          continue;
        }
      } else {
        if (userIDs.length - i >= 8) {
          max = 8;
        } else if (userIDs.length - i >= 4) {
          max = 4;
        }
        try {
          du = await this.getMultipleReelsAtOnce(userIDs.slice(i, i + max));
          await sleep(ApplicationConstants.WAIT_TIME_FOR_ANONYMOUS_USER_CALLS_IN_MS);
        } catch (e) {
          console.log(e, "ANONYMOUS CALL FAILED");
          this.state++;
          continue;
        }
      }

      let finalPosts = [];
      du.map(u => {
        let post = mp[u.id];
        if (post) {
          post.setUser(u);
          finalPosts.push(post);
        }
      });
      this.valueCallback(finalPosts);
      i += max;
    }
  };


  getMultipleReelsAtOnce = async (userIDs) => {
    let values = [];
    for (let i = 0; i < userIDs.length; i++) {
      values.push(GetReelsForAUser(userIDs[i], true));
    }
    return await Promise.all(values);
  };

}


export default ProcessHashtag;