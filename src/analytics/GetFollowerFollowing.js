import getFollowers from "../common/api_call/new_api_calls/GetFollowers";
import getFollowings from "../common/api_call/new_api_calls/GetFollowings";
import getOptions from "../common/GetOptions";
import sleep from "../common/Sleep";
import SleepArgs from "../common/models/SleepArgs";
import SendEvent from "../common/Helpers/SendEvent";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import GetObject from "../common/chrome/GetObject";
import DatabaseKeys from "../common/models/DatabaseKeys";
import SaveObject from "../common/chrome/SaveObject";
import AddLevel2Calls from "../common/Helpers/AddLevel2Calls";
import GetOrSetValue from "../common/store/GetOrSetValue";
import AddFollowerCallForMaxLimit from "../common/Helpers/AddFollowerCallForMaxLimit";
import AddFollowingCallForMaxLimit from "../common/Helpers/AddFollowingCallForMaxLimit";

// updateFollowers(followers);
// followerProgressTracker(scraped, total);

class GetFollowerFollowing {
  constructor(userObj, checkFollowers, checkFollowing, updateFollowers, updateFollowing, sleep, followerProgressTracker, followingProgressTracker, stopApiCallsCheck, messageForMaxScrape, isPayedUser, followerTokenToContinue = null, totalScraped = 0) {
    this.userObj = userObj;
    this.userID = userObj.pk;
    this.checkFollowers = checkFollowers;
    this.checkFollowing = checkFollowing;
    this.updateFollowers = updateFollowers;
    this.updateFollowing = updateFollowing;
    this.sleep = sleep;
    this.followerProgressTracker = followerProgressTracker;
    this.followingProgressTracker = followingProgressTracker;
    this.stopApiCallsCheck = stopApiCallsCheck;
    this.totalScraped = totalScraped;
    this.savePoint = 0;
    this.messageForMaxScrape = messageForMaxScrape;
    this.isPayedUser = isPayedUser;
    this.followerTokenToContinue = followerTokenToContinue;
  }

  start = () => {
    this.getFollowers();
    this.getFollowing();
  };

  saveFollowerPoint = async (doneTill, pageToken) => {
    let followerPoints = await GetOrSetValue(DatabaseKeys.FOLLOWER_SAVE_POINTS, {});
    followerPoints[this.userID.toString()] = { doneTill: doneTill, pageToken: pageToken };
    let deepCopyFollowers = JSON.parse(JSON.stringify(followerPoints));
    await SaveObject(DatabaseKeys.FOLLOWER_SAVE_POINTS, deepCopyFollowers);
  };

  getFollowers = async () => {
    if (!this.checkFollowers) {
      return;
    }

    let nextPageToken = this.followerTokenToContinue;
    let totalFollowers = 100;
    let followers = 0;

    while (followers < totalFollowers) {
      if (this.stopApiCallsCheck()) {
        return;
      }


      let callsData = await GetObject(DatabaseKeys.CALLS_DATA);

      if (Math.floor(this.totalScraped / ApplicationConstants.SAVE_AFTER_EVERY_FOLLOWERS_SAVED) !== this.savePoint) {
        this.savePoint += 1;
        await this.saveFollowerPoint(this.totalScraped, nextPageToken);
      }

      let followersObj;
      try {
        followersObj = await getFollowers(this.userID, nextPageToken, true);
      } catch(e) {
        // TODO: Check status code here & send notification
        let options = await getOptions();
        this.sleep(true, new SleepArgs(false, "FOLLOWER_ANALYTICS"));
        SendEvent(AnalyticsCategoryEnum.FOLLOWERS_RATE_LIMIT, `For Username: ${this.userObj.username}`, "");
        await sleep(options.sleepTimeFor429InSeconds * 1000);
        this.sleep(false);
        continue;
      }
      SendEvent(AnalyticsCategoryEnum.FOLLOWERS_SCRAPED, `For Username: ${this.userObj.username}`, "");
      totalFollowers = followersObj.total;
      nextPageToken = followersObj.nextPageToken;
      let newFollowers = followersObj.followers;

      await AddLevel2Calls(newFollowers.length);

      followers += newFollowers.length;
      this.totalScraped += newFollowers.length;
      this.updateFollowers(newFollowers);
      this.followerProgressTracker(this.totalScraped, totalFollowers);

      let obj = await AddFollowerCallForMaxLimit(newFollowers.length);
      if (!obj.success) {
        this.messageForMaxScrape("max_followers_in_time", "So as to keep your account safe, please wait for some time and then you can perform follower following for more users. Download them and do the email/detailed analysis for these users till you can continue this follower-following process");
        sendNotification(NotificationTypeEnum.Success, obj.errorMessage, true);
        await sleep(obj.timeInSec*1000);
        this.messageForMaxScrape("max_followers_in_time");
      }

      if (nextPageToken === null) {
        return;
      }
    }
  };

  getFollowing = async () => {
    if (!this.checkFollowing) {
      return;
    }
    let nextPageToken = null;
    let totalFollowings = 100;
    let followings = 0;
    let callsData = await GetObject(DatabaseKeys.CALLS_DATA);

    while (followings < totalFollowings) {
      if (this.stopApiCallsCheck()) {
        return;
      }

      let obj = await AddFollowingCallForMaxLimit(50);
      if (!obj.success) {
        this.messageForMaxScrape("max_followings_in_time", "So as to keep your account safe, please wait for some time and then you can perform follower following for more users. Download them and do the email/detailed analysis for these users till you can continue this follower/following process");
        sendNotification(NotificationTypeEnum.Success, obj.errorMessage, true);
        return;
      }


      let followingObj;
      try {
        followingObj = await getFollowings(this.userID, nextPageToken, true);
      } catch(e) {
        // TODO: Check status code here & send notification
        let options = await getOptions();
        this.sleep(true, new SleepArgs(false, "FOLLOWING_ANALYTICS"));
        SendEvent(AnalyticsCategoryEnum.FOLLOWINGS_RATE_LIMIT, `For Username: ${this.userObj.username}`, "");
        await sleep(options.sleepTimeFor429InSeconds * 1000);
        this.sleep(false);
        continue;
      }
      SendEvent(AnalyticsCategoryEnum.FOLLOWINGS_SCRAPED, `For Username: ${this.userObj.username}`, "");
      totalFollowings = followingObj.total;
      nextPageToken = followingObj.nextPageToken;
      let newFollowings = followingObj.followings;

      await AddLevel2Calls(newFollowings.length);

      followings += newFollowings.length;
      this.totalScraped += newFollowings.length;
      this.updateFollowing(newFollowings);
      this.followingProgressTracker(followings, totalFollowings);
      if (nextPageToken === null) {
        return;
      }
    }
  }

}

export default GetFollowerFollowing;
