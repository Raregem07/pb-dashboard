import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";
import SaveObject from "../common/chrome/SaveObject";
import TaskEnum from "../analytics/TaskEnum";
import MakeNewTasksObject from "../new_task_queue/MakeNewTasksObject";
import getHashtagPosts from "../common/api_call/new_api_calls/GetHashtagPosts";
import GetObject from "../common/chrome/GetObject";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import NewUnfollowUserTask from "../common/models/new_tasks/NewUnfollowUserTask";
import GetStoriesFromUserID from "../common/api_call/GetStoriesFromUserID";
import UserPostOriginEnum from "../common/models/UserPostOriginEnum";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import getLocationPosts from "../common/api_call/new_api_calls/GetLocationPosts";
import getFollowers from "../common/api_call/new_api_calls/GetFollowers";

class NewAutomationOrchestrator {
  constructor(automationSettings) {
    this.todo = automationSettings.todo;
    this.filters = automationSettings.filter;
    this.automationsInADay = automationSettings.automationsInADay;
    this.strategyBrain = automationSettings.strategyBrain;
    this.hashtags = automationSettings.hashtags;
    this.places = automationSettings.places;
    this.similarUsers = automationSettings.similarUsers;
  }

  static async getUnfollowTasks(daysOld) {
    let followedTasksData = await GetOrSetValue(DatabaseKeys.NEW_TASKS_TO_UNFOLLOW, []);
    let followedTasks = MakeNewTasksObject(followedTasksData);
    let followedTasksSatisfyingDateConditions = followedTasks.filter(task =>
      task.moreThanNDaysOld(daysOld)
    );
    let remainingTasks = followedTasks.filter(task => !task.moreThanNDaysOld(daysOld));
    await SaveObject(DatabaseKeys.NEW_TASKS_TO_UNFOLLOW, remainingTasks);
    return followedTasksSatisfyingDateConditions.map(
      task =>
        new NewUnfollowUserTask(
          TaskEnum.UNFOLLOW,
          task.userID,
          task.username,
          task.profileURL,
          task.origin,
          task.userOrigin,
          task.postPic
        )
    );
  }

  // dbValue is {posts: [], nextPageToken: "", postSetDate: 12123123123 (epoch in ms) }
  // This gets the hashtag users who have a live story running
  static async getUsersForAHashtag(hashtagName, count) {
    if (count <= 0) {
      return [];
    }
    let hashtagKey = "PostsForHashtagWithStories_" + hashtagName;
    let dbValue = await GetObject(hashtagKey);
    let hashtagPosts = [], nextPageToken = null, createdAt = new Date().getTime();
    let users = [];
    if (dbValue !== undefined && dbValue !== null) {
      hashtagPosts = dbValue.posts;
      nextPageToken = dbValue.nextPageToken;
      createdAt = dbValue.createdAt;
    }
    if (new Date().getTime() - createdAt > 86400 * 1000 * ApplicationConstants.newAutomation.HASHTAG_POSTS_EXPIRY_DAYS) {
      hashtagPosts = [];
      nextPageToken = null;
      createdAt = new Date().getTime();
    }
    while (users.length <= count) {
      for (let i = 0; i < hashtagPosts.length; i++) {
        let userDetails;
        try {
          userDetails = await GetStoriesFromUserID(hashtagPosts[i].owner_id);
        } catch (e) {
          sendNotification(NotificationTypeEnum.Failure, `Please remove hashtags from configurations for some time. Instagram rate limit has happened. Try after 1 hour with hashtags adding`);
          continue;
        }
        if (userDetails.hasStory) {
          userDetails.setOrigin(`Used Hashtag #${hashtagName} in their post`);
          userDetails.setPost(hashtagPosts[i]);
          userDetails.setUserOrigin({ type: UserPostOriginEnum.HASHTAG_POST, value: hashtagName });
          users.push(userDetails);
        }
        if (users.length === count) {
          await SaveObject(hashtagKey, {
            posts: hashtagPosts.slice(i + 1),
            nextPageToken: nextPageToken,
            createdAt: createdAt
          });
          return users;
        }
      }
      if (users.length < count) {
        let hashtagPostsObj = await getHashtagPosts(hashtagName, nextPageToken);
        hashtagPosts = hashtagPostsObj.posts;
        nextPageToken = hashtagPostsObj.nextPageToken;
        if (!nextPageToken) {
          sendNotification(NotificationTypeEnum.Failure, `Hashtag ${hashtagName} is exhausted. Please use a different hashtag`);
          return [];
        }
      }
    }
  }

  // dbValue is {posts: [], nextPageToken: "", postSetDate: 12123123123 (epoch in ms) }
  // This gets the location users who have a live story running
  static async getUsersForALocation(locationPK, count, locationName) {
    if (count <= 0) {
      return [];
    }
    let locationKey = "PostsForLocationWithStories_" + locationPK;
    let dbValue = await GetObject(locationKey);
    let locationPosts = [], nextPageToken = null, createdAt = new Date().getTime();
    let users = [];
    if (dbValue !== undefined && dbValue !== null) {
      locationPosts = dbValue.posts;
      nextPageToken = dbValue.nextPageToken;
      createdAt = dbValue.createdAt;
    }
    if (new Date().getTime() - createdAt > 86400 * 1000 * ApplicationConstants.newAutomation.LOCATION_POSTS_EXPIRY_DAYS) {
      locationPosts = [];
      nextPageToken = null;
      createdAt = new Date().getTime();
    }
    while (users.length <= count) {
      for (let i = 0; i < locationPosts.length; i++) {
        let userDetails;
        try {
          userDetails = await GetStoriesFromUserID(locationPosts[i].owner_id);
        } catch (e) {
          sendNotification(NotificationTypeEnum.Failure, `Please remove location from configurations for some time. Instagram rate limit has happened. Try after 1 hour. Pause please or change account!`);
          continue;
        }
        if (userDetails.hasStory) {
          userDetails.setOrigin(`Used Location #${locationName} in their post`);
          userDetails.setPost(locationPosts[i]);
          userDetails.setUserOrigin({
            type: UserPostOriginEnum.LOCATION_POST,
            value: locationPK,
            additionalValue: locationName
          });
          users.push(userDetails);
        }
        if (users.length === count) {
          await SaveObject(locationKey, {
            posts: locationPosts.slice(i + 1),
            nextPageToken: nextPageToken,
            createdAt: createdAt
          });
          return users;
        }
      }
      if (users.length < count) {
        let locationPostsObj = await getLocationPosts(locationPK, nextPageToken);
        locationPosts = locationPostsObj.posts;
        nextPageToken = locationPostsObj.nextPageToken;
        if (!nextPageToken) {
          sendNotification(NotificationTypeEnum.Failure, `Location ${locationName} is exhausted or restricted by Instagram. Please set a different Location`);
          return [];
        }
      }
    }
  }

  // dbValue is {followers: [], nextPageToken: "", createdAt: 1231236767868}
  static async getFollowersForACompetitor(userID, count, username) {
    if (count <= 0) {
      return [];
    }
    let specificFollowersKey = "FollowersForUsernameStories_" + username;
    let dbValue = await GetObject(specificFollowersKey);
    let followersOfCompetitor = [], nextPageToken = null, createdAt = new Date().getTime();
    let users = [];
    if (dbValue !== undefined && dbValue !== null) {
      followersOfCompetitor = dbValue.followers;
      nextPageToken = dbValue.nextPageToken;
      createdAt = dbValue.createdAt;
    }
    if (new Date().getTime() - createdAt > 86400 * 1000 * ApplicationConstants.newAutomation.FOLLOWERS_EXPIRY_DATE) {
      followersOfCompetitor = [];
      nextPageToken = null;
      createdAt = new Date().getTime();
    }
    while (users.length <= count) {
      for (let i = 0; i < followersOfCompetitor.length; i++) {
        let userDetails;
        try {
          userDetails = await GetStoriesFromUserID(followersOfCompetitor[i].id);
        } catch (e) {
          sendNotification(NotificationTypeEnum.Failure, `Please remove Competitors from automation configurations for some time. Instagram rate limit has happened. Try after 1 hour. Pause please or change account!`);
          continue;
        }
        if (userDetails.hasStory) {
          userDetails.setOrigin(`Followers of ${username}`);
          userDetails.setUserOrigin({
            type: UserPostOriginEnum.SIMILAR_ACCOUNT_FOLLOWER_POST,
            value: userID,
            additionalValue: username
          });
          users.push(userDetails);
        }
        if (users.length === count) {
          await SaveObject(specificFollowersKey, {
            followers: followersOfCompetitor.slice(i + 1),
            nextPageToken: nextPageToken,
            createdAt: createdAt
          });
          return users;
        }
      }
      if (users.length < count) {
        let followersObj = await getFollowers(userID, nextPageToken);
        followersOfCompetitor = followersObj.followers;
        nextPageToken = followersObj.nextPageToken;
        if (!nextPageToken) {
          sendNotification(NotificationTypeEnum.Failure, `Competitor ${username} is exhausted. Please set a different Competitor Account`);
          return [];
        }
      }
    }
  }

  async getHashtagUsers(count) {
    if (count <= 0) {
      return [];
    }
    let totalHashtags = this.hashtags.length;
    let users = [];
    let userCountForEachHashtag = Math.ceil(count / totalHashtags);
    for (let i = 0; i < totalHashtags; i++) {
      let specificHashtagUsers = await NewAutomationOrchestrator.getUsersForAHashtag(this.hashtags[i].name, userCountForEachHashtag);
      users = users.concat(specificHashtagUsers);
    }
    return users;
  }

  async getLocationUsers(count) {
    if (count <= 0) {
      return [];
    }
    let totalLocations = this.places.length;
    let users = [];
    let userCountForEachLocation = Math.ceil(count / totalLocations);
    for (let i = 0; i < totalLocations; i++) {
      let specificLocationUsers = await NewAutomationOrchestrator.getUsersForALocation(this.places[i].pk, userCountForEachLocation, this.places[i].title);
      users = users.concat(specificLocationUsers);
    }
    return users;
  }

  async getCompetitorFollowerUsers(count) {
    if (count <= 0) {
      return [];
    }
    let similarUsersLength = this.similarUsers.length;
    let users = [];
    let userCountForEachSimilarUser = Math.ceil(count / similarUsersLength);
    for (let i = 0; i < similarUsersLength; i++) {
      let specificCompetitorFollowers = await NewAutomationOrchestrator.getFollowersForACompetitor(this.similarUsers[i].pk, userCountForEachSimilarUser, this.similarUsers[i].username);
      users = users.concat(specificCompetitorFollowers);
    }
    return users;
  }

  // async getCompetitorLikerUsers(count) {
  //   if (count <= 0) {
  //     return [];
  //   }
  //   return [];
  // }
  //
  // async getCompetitorCommenterUsers(count) {
  //   if (count <= 0) {
  //     return [];
  //   }
  //   return [];
  // }

}

export default NewAutomationOrchestrator;
