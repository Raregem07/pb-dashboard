import ApplicationConstants from "../common/constants/ApplicationConstants";
import GetObject from "../common/chrome/GetObject";
import UserPostOriginEnum from "../common/models/UserPostOriginEnum";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import SaveObject from "../common/chrome/SaveObject";
import GetOrSetValue from "../common/store/GetOrSetValue";
import Post from "../common/models/Post";
import GetHashtagPostsBestWay from "../common/api_call/new_api_calls/GetHashtagPostsBestWay";
import GetLocationPostsBestway from "../common/api_call/new_api_calls/GetLocationPostsBestWay";
import GetLimitedPostsOfAUserBestWay from "../common/api_call/new_api_calls/GetLimitedPostsOfAUserBestWay";

class PostsOrchestrator {
  constructor(state, populatePosts) {
    this.updateState(state);
    this.populatePosts = populatePosts;
    this.completeCallback = null;
    this.completeCount = 1;
  }

  updateState(state) {
    this.hashtags = state.hashtags;
    this.locations = state.locations;
    this.competitorAccounts = state.competitorAccounts;
  }

  getPosts = (completeCallback) => {
    this.completeCallback = completeCallback;
    let typeWisePostsCount = this.postsToGetForEachType();
    this.getHashtagsPosts(typeWisePostsCount.hashtagPosts);
    this.getLocationPosts(typeWisePostsCount.locationPosts);
    this.getCompetitorPosts(typeWisePostsCount.competitorPosts);
  };

  complete = () => {
    this.completeCount += 1;
    if (this.completeCount >= 3) {
      this.completeCallback();
    }
  };

  getHashtagsPosts = async (count) => {
    if (count <= 0) {
      this.complete();
      return;
    }
    let hashtags = this.hashtags;
    let countForEach = Math.ceil(count / this.hashtags.length);
    for (let i = 0; i < hashtags.length; i++) {
      let hashtag = hashtags[i];
      let posts = await this.getHashtagPostsForSpecificHashtag(hashtag, countForEach);
      this.populatePosts(posts.filter(p => p !== undefined));
    }
    this.complete();
  };

  getLocationPosts = async (count) => {
    if (count <= 0) {
      this.complete();
      return;
    }
    let countForEachPosts = Math.ceil(count / this.locations.length);
    for (let i = 0; i < this.locations.length; i++) {
      let location = this.locations[i];
      let posts = await this.getLocationPostsForSpecificLocation(location, countForEachPosts);
      this.populatePosts(posts.filter(p => p !== undefined));
    }
    this.complete();
  };

  getCompetitorPosts = async (count) => {
    if (count <= 0) {
      this.complete();
      return;
    }
    let countForEachPosts = Math.ceil(count / this.competitorAccounts.length);
    for (let i = 0; i < this.competitorAccounts.length; i++) {
      let userObj = this.competitorAccounts[i];
      let posts = await this.getCompetitorAccountPostsForSpecificCompetitor(userObj, countForEachPosts);
      this.populatePosts(posts.filter(p => p !== undefined));
    }
    this.complete();
  };

  shouldSkipPost = (post) => {
    if (post.userOrigin.type === UserPostOriginEnum.LOCATION_POST || post.userOrigin.type === UserPostOriginEnum.HASHTAG_POST) {
      if (new Date().getTime() - post.taken_at_timestamp * 1000 < 1000 * 60 * 10) {
        return false;
      }
    }
    if (post.userOrigin.type === UserPostOriginEnum.POST_OF_COMPETITOR) {
      return false;
    }
  };

  shouldAllowTopPosts = (value) => {
    if (value.firstTime) {
      return true;
    }
    return new Date().getTime() - value.epochMS >= 86400 * 500;
  };

  getHashtagPostsForSpecificHashtag = async (hashtagObj, count) => {
    if (count <= 0) {
      return [];
    }
    let hashtagName = hashtagObj.name;
    let hashtagKey = "PostsForHashtagGenerateContent_" + hashtagName;
    let topHashtagsKey = "topHashtags_" + hashtagName;
    let dbValue = await GetObject(hashtagKey);
    let useCasePosts = [], nextPageToken = null, createdAt = new Date().getTime();
    let topPosts = [];
    let posts = [];
    if (dbValue !== undefined && dbValue !== null) {
      useCasePosts = dbValue.posts;
      nextPageToken = dbValue.nextPageToken;
      createdAt = dbValue.createdAt;
    }
    useCasePosts = useCasePosts.map(dbPost => {
      let p = new Post();
      p.fillDataInPost(dbPost);
      return p;
    });
    if (new Date().getTime() - createdAt > 86400 * 1000 * ApplicationConstants.generateContent.HASHTAG_POSTS_EXPIRY_DAYS) {
      useCasePosts = [];
      nextPageToken = null;
      createdAt = new Date().getTime();
    }
    while (true) {
      for (let i = 0; i < useCasePosts.length; i++) {
        useCasePosts[i].setOrigin(`#${hashtagName}`);
        useCasePosts[i].setUserOrigin({ type: UserPostOriginEnum.HASHTAG_POST, value: hashtagObj });
        if (this.shouldSkipPost(useCasePosts[i])) {
          continue;
        }
        posts.push(useCasePosts[i]);
        if (posts.length >= count) {
          await SaveObject(hashtagKey, {
            posts: useCasePosts.slice(i + 1),
            nextPageToken: nextPageToken,
            createdAt: createdAt
          });
          return posts;
        }
      }
      if (posts.length < count) {
        let userCaseObject = await GetHashtagPostsBestWay(hashtagName, nextPageToken);
        useCasePosts = userCaseObject.posts;
        nextPageToken = userCaseObject.nextPageToken;
        topPosts = userCaseObject.topPosts;
        let topHashtagsExpireDBValue = await GetOrSetValue(topHashtagsKey, {
          epochMS: new Date().getTime(),
          firstTime: true
        });
        if (this.shouldAllowTopPosts(topHashtagsExpireDBValue)) {
          posts = posts.concat(topPosts);
          await SaveObject(topHashtagsExpireDBValue, { epochMS: new Date().getTime(), firstTime: false });
        }
        if (!nextPageToken) {
          sendNotification(NotificationTypeEnum.Failure, `Hashtag ${hashtagName} is exhausted or instagram doesn't show much posts with this hashtag. Please use a different hashtag`);
          posts = posts.concat(useCasePosts).slice(0, count);
          return posts.map(p => {
            p.setOrigin(`#${hashtagName}`);
            return p;
          });
        }
      }
    }
  };


  getLocationPostsForSpecificLocation = async (locationObj, count) => {
    if (count <= 0) {
      return [];
    }
    let locationPK = locationObj.pk;
    let locationName = locationObj.title;
    let locationKey = "PostsForLocationGenerateContent_" + locationPK;
    let topLocationKey = "topLocations_" + locationPK;
    let dbValue = await GetObject(locationKey);
    let useCasePosts = [], nextPageToken = null, createdAt = new Date().getTime();
    let topPosts = [];
    let posts = [];
    if (dbValue !== undefined && dbValue !== null) {
      useCasePosts = dbValue.posts;
      nextPageToken = dbValue.nextPageToken;
      createdAt = dbValue.createdAt;
    }
    useCasePosts = useCasePosts.map(dbPost => {
      let p = new Post();
      p.fillDataInPost(dbPost);
      return p;
    });

    if (new Date().getTime() - createdAt > 86400 * 1000 * ApplicationConstants.generateContent.LOCATION_POSTS_EXPIRY_DAYS) {
      useCasePosts = [];
      nextPageToken = null;
      createdAt = new Date().getTime();
    }
    while (true) {
      for (let i = 0; i < useCasePosts.length; i++) {
        useCasePosts[i].setOrigin(`📍${locationName}`);
        useCasePosts[i].setUserOrigin({ type: UserPostOriginEnum.LOCATION_POST, value: locationObj });
        if (this.shouldSkipPost(useCasePosts[i])) {
          continue;
        }
        posts.push(useCasePosts[i]);
        if (posts.length >= count) {
          await SaveObject(locationKey, {
            posts: useCasePosts.slice(i + 1),
            nextPageToken: nextPageToken,
            createdAt: createdAt
          });
          return posts;
        }
      }
      if (posts.length < count) {
        let userCaseObject = await GetLocationPostsBestway(locationPK, nextPageToken);
        useCasePosts = userCaseObject.posts;
        nextPageToken = userCaseObject.nextPageToken;
        topPosts = userCaseObject.topPosts;

        let topLocationsExpireDBValue = await GetOrSetValue(topLocationKey, {
          epochMS: new Date().getTime(),
          firstTime: true
        });
        if (this.shouldAllowTopPosts(topLocationsExpireDBValue)) {
          posts = posts.concat(topPosts);
          await SaveObject(topLocationsExpireDBValue, { epochMS: new Date().getTime(), firstTime: false });
        }
        if (!nextPageToken) {
          sendNotification(NotificationTypeEnum.Failure, `Location ${locationName} is exhausted or instagram doesn't show much posts with this location. Please use a different location`);
          posts = posts.concat(useCasePosts).slice(0, count);
          return posts.map(p => {
            p.setOrigin("📍" + locationName);
            p.setUserOrigin({ type: UserPostOriginEnum.LOCATION_POST, value: locationObj });
            return p;
          });
        }
      }
    }
  };

  getCompetitorAccountPostsForSpecificCompetitor = async (userObj, count) => {
    if (count <= 0) {
      return [];
    }
    let userID = userObj.pk;
    let username = userObj.username;
    let competitorPostsKey = "PostsForCompetitorGenerateContent_" + userID;
    let dbValue = await GetObject(competitorPostsKey);
    let useCasePosts = [], nextPageToken = null, createdAt = new Date().getTime();
    let posts = [];
    if (dbValue !== undefined && dbValue !== null) {
      useCasePosts = dbValue.posts;
      nextPageToken = dbValue.nextPageToken;
      createdAt = dbValue.createdAt;
    }
    useCasePosts = useCasePosts.map(dbPost => {
      let p = new Post();
      p.fillDataInPost(dbPost);
      return p;
    });
    if (new Date().getTime() - createdAt > 86400 * 1000 * ApplicationConstants.generateContent.USER_POSTS_EXPIRY_DAYS) {
      useCasePosts = [];
      nextPageToken = null;
      createdAt = new Date().getTime();
    }
    while (true) {
      for (let i = 0; i < useCasePosts.length; i++) {
        useCasePosts[i].setOrigin(`🙎 ${username} `);
        useCasePosts[i].setUserOrigin({ type: UserPostOriginEnum.POST_OF_COMPETITOR, value: userObj });

        if (this.shouldSkipPost(useCasePosts[i])) {
          continue;
        }
        posts.push(useCasePosts[i]);
        if (posts.length >= count) {
          await SaveObject(competitorPostsKey, {
            posts: useCasePosts.slice(i + 1),
            nextPageToken: nextPageToken,
            createdAt: createdAt
          });
          return posts;
        }
      }
      if (posts.length < count) {
        let userCaseObject = await GetLimitedPostsOfAUserBestWay(userID, nextPageToken);
        useCasePosts = userCaseObject.posts;
        nextPageToken = userCaseObject.nextPageToken;
        if (!nextPageToken) {
          sendNotification(NotificationTypeEnum.Failure, `Username ${username} is exhausted. All posts shown. Please use a different competitor Account. We will restart again with same posts for this username from next time.`, false);
          posts = posts.concat(useCasePosts).slice(0, count);
          return posts.map(p => {
            p.setOrigin(`🙎 ${username}'s post`);
            return p;
          });
        }
      }
    }
  };


  postsToGetForEachType() {
    let totalPostsToGet = ApplicationConstants.generateContent.POSTS_TO_GET_IN_ONE_TIME;
    let hashtagWeightage = 0;
    let locationWeightage = 0;
    let competitorWeightage = 0;
    if (this.hashtags.length > 0) {
      hashtagWeightage = 1;
    }
    if (this.locations.length > 0) {
      locationWeightage = 1;
    }
    if (this.competitorAccounts.length > 0) {
      competitorWeightage = 1;
    }

    let totalSumOfWeightage = hashtagWeightage + locationWeightage + competitorWeightage;

    return {
      hashtagPosts: Math.ceil(hashtagWeightage * totalPostsToGet / totalSumOfWeightage),
      locationPosts: Math.ceil(locationWeightage * totalPostsToGet / totalSumOfWeightage),
      competitorPosts: Math.ceil(competitorWeightage * totalPostsToGet / totalSumOfWeightage)
    };
  }


}

export default PostsOrchestrator;
