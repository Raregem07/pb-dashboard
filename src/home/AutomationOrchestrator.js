import React from "react";
import UserPostOriginEnum from "../common/models/UserPostOriginEnum";
import GetObject from "../common/chrome/GetObject";
import DatabaseKeys from "../common/models/DatabaseKeys";
import UnfollowUserTask from "../common/models/task/UnfollowUserTask";
import TaskEnum from "../analytics/TaskEnum";
import MakeTasksObject from "../action_queue/MakeTasksObject";
import SaveObject from "../common/chrome/SaveObject";
import GetOrSetValue from "../common/store/GetOrSetValue";
import GetStoriesFromUserID from "../common/api_call/GetStoriesFromUserID";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import getHashtagPosts from "../common/api_call/new_api_calls/GetHashtagPosts";
import getDetailedUserObjectFromUsername from "../common/api_call/GetDetailedUserObjectFromUsername";
import getLocationPosts from "../common/api_call/new_api_calls/GetLocationPosts";
import getLikersOfAPost from "../common/api_call/new_api_calls/GetLikersOfAPost";
import getLimitedPostsOfAUser from "../common/api_call/new_api_calls/GetPostsOfAUser";
import NewAutomationUser from "../common/models/NewAutomationUser";
import getFollowers from "../common/api_call/new_api_calls/GetFollowers";
import getCommentersOfAPost from "../common/api_call/new_api_calls/GetCommentersOfAPost";
import GetReelsForAUser from "../common/api_call/GetReelsForAUser";
import FollowUserTask from "../common/models/task/FollowUserTask";

// callbackFetchingPost is used for showing the process and saving the posts
class AutomationOrchestrator {
  constructor(automationSettings) {
    this.todo = automationSettings.todo;
    this.filters = automationSettings.filter;
    this.automationsInADay = automationSettings.automationsInADay;
    this.strategyBrain = automationSettings.strategyBrain;
    this.hashtags = automationSettings.hashtags;
    this.places = automationSettings.places;
    this.similarUsers = automationSettings.similarUsers;
    this.smartSettings = automationSettings.smartSettings;
    // this.checkEnoughPostsAndUsers();
  }

  static getPostsWhichSatisfyLikeCommentFilters(posts, filters) {
    let postsNotSatisyingFilters = [];
    let postsSatisyingFilters = posts.filter((post, index, arr) => {
      if (
        post.likesConditionMet(filters.minLikes, filters.maxLikes) &&
        post.commentsConditionMet(filters.minComments, filters.maxComments)
      ) {
        return true;
      }
      postsNotSatisyingFilters.push(arr[index]);
      return false;
    });
    return [postsSatisyingFilters, postsNotSatisyingFilters];
  }

  static async getUnfollowTasks(daysOld) {
    let followedTasksData = await GetOrSetValue(DatabaseKeys.TASKS_TO_UNFOLLOW, []);
    let followedTasks = MakeTasksObject(followedTasksData);
    let followedTasksSatisfyingDateConditions = followedTasks.filter(task =>
      task.moreThanNDaysOld(daysOld)
    );

    let remainingTasks = followedTasks.filter(task => !task.moreThanNDaysOld(daysOld));
    await SaveObject(DatabaseKeys.TASKS_TO_UNFOLLOW, remainingTasks);
    return followedTasksSatisfyingDateConditions.map(
      task =>
        new UnfollowUserTask(
          TaskEnum.UNFOLLOW,
          task.userID,
          task.username,
          task.profileURL,
          task.origin,
          task.userOrigin
        )
    );
  }

  async getHashtagUserPosts(count) {
    if (count <= 0) {
      return [];
    }

    let totalHashtags = this.hashtags.length;
    let userPosts = [];
    let userCountForEachHashtag = Math.ceil(count / totalHashtags);
    for (let i = 0; i < totalHashtags; i++) {
      let specificHashtagUsers = await this.getUsersForAHashtag(this.hashtags[i].name, userCountForEachHashtag);
      userPosts = userPosts.concat(specificHashtagUsers);
    }
    return userPosts;
  }

  async getLocationUserPosts(count) {
    if (count <= 0) {
      return [];
    }
    let totalLocations = this.places.length;
    let users = [];
    let userCountForEachLocation = Math.ceil(count / totalLocations);
    for (let i = 0; i < totalLocations; i++) {
      let specificLocationUsers = await this.getUsersForALocation(this.places[i].pk, userCountForEachLocation, this.places[i].title);
      users = users.concat(specificLocationUsers);
    }
    return users;
  }

  async getFollowerUserPosts(count) {
    if (count <= 0) {
      return [];
    }
    let similarUsersLength = this.similarUsers.length;
    let users = [];
    let userCountForEachSimilarUser = Math.ceil(count / similarUsersLength);
    for (let i = 0; i < similarUsersLength; i++) {
      let specificCompetitorFollowers = await this.getFollowersForACompetitor(this.similarUsers[i].pk, userCountForEachSimilarUser, this.similarUsers[i].username);
      users = users.concat(specificCompetitorFollowers);
    }
    return users;
  }

  async getLikerUserPosts(count) {
    if (count <= 0) {
      return [];
    }
    let similarUsersLength = this.similarUsers.length;
    let users = [];
    let userCountForEachSimilarUser = Math.ceil(count / similarUsersLength);

    for (let i = 0; i < similarUsersLength; i++) {
      let specificCompetitorLikers = await this.getLikersForCompetitor(this.similarUsers[i].pk, userCountForEachSimilarUser, this.similarUsers[i].username);
      users = users.concat(specificCompetitorLikers);
    }
    return users;
  }

  async getCommenterUserPosts(count) {
    if (count <= 0) {
      return [];
    }
    let similarUsersLength = this.similarUsers.length;
    let users = [];
    let userCountForEachSimilarUser = Math.ceil(count / similarUsersLength);

    for (let i = 0; i < similarUsersLength; i++) {
      let specificCompetitorCommenters = await this.getCommentersForCompetitor(this.similarUsers[i].pk, userCountForEachSimilarUser, this.similarUsers[i].username);
      users = users.concat(specificCompetitorCommenters);
    }
    return users;
  }

  shouldSkipUser(detailedUser) {
    if (!this.smartSettings) {
      return false;
    }
    let followers = detailedUser.followerCount;
    let following = detailedUser.followingCount;
    let expectedRatio = 2.5;
    if (followers < 100) {
      expectedRatio = 5;
    }
    if (followers / following < expectedRatio) {
      let response = FollowUserTask.notMajorDeviationFromValues(detailedUser, this.filters);
      return response.isSatisfied
    } else {
      return false;
    }
  }

  static getUserDetailsFromReels(reelsResponse) {
    let automationUser = new NewAutomationUser(null);
    automationUser.setUser(false, reelsResponse.username, reelsResponse.profileURL, reelsResponse.id, false);
    return automationUser;
  }

  // dbValue is {posts: [], nextPageToken: "", postSetDate: 12123123123 (epoch in ms) }
  // This gets the hashtag users who have a live story running
  async getUsersForAHashtag(hashtagName, count) {
    if (count <= 0) {
      return [];
    }
    let hashtagKey = "PostsForHashtagSimple_" + hashtagName;
    let dbValue = await GetObject(hashtagKey);
    let hashtagPosts = [], nextPageToken = null, createdAt = new Date().getTime();
    let users = [];
    if (dbValue !== undefined && dbValue !== null) {
      hashtagPosts = dbValue.posts;
      nextPageToken = dbValue.nextPageToken;
      createdAt = dbValue.createdAt;
    }
    if (new Date().getTime() - createdAt > 86400 * 1000 * ApplicationConstants.automation.HASHTAG_POSTS_EXPIRY_DAYS) {
      hashtagPosts = [];
      nextPageToken = null;
      createdAt = new Date().getTime();
    }
    while (users.length <= count) {
      for (let i = 0; i < hashtagPosts.length; i++) {
        let reelsResponse;
        try {
          reelsResponse = await GetReelsForAUser(hashtagPosts[i].owner_id);
        } catch(e) {
          continue;
        }
        let userDetails = AutomationOrchestrator.getUserDetailsFromReels(reelsResponse);
        userDetails.setOrigin(`Hashtag #${hashtagName}`);
        userDetails.setPost(hashtagPosts[i]);
        userDetails.setUserOrigin({ type: UserPostOriginEnum.HASHTAG_POST, value: hashtagName });
        let detailedUser;
        try {
          detailedUser = await getDetailedUserObjectFromUsername(userDetails.username);
          if (this.shouldSkipUser(detailedUser)) {
            continue;
          }
          userDetails.setDetailedUser(detailedUser);
        } catch (e) {
          sendNotification(NotificationTypeEnum.Failure, `Please remove Hashtags from configurations for some time. Instagram rate limit has happened. Try after 1 hour. Pause please or change account!`);
          continue;
        }
        users.push(userDetails);
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
          sendNotification(NotificationTypeEnum.Failure, `Hashtag ${hashtagName} is exhausted or instagram doesn't show such hashtags. Please use a different hashtag`);
          return [];
        }
      }
    }
  }

  async getUsersForALocation(locationPK, count, locationName) {
    if (count <= 0) {
      return [];
    }
    let locationKey = "PostsForLocationSimple_" + locationPK;
    let dbValue = await GetObject(locationKey);
    let locationPosts = [], nextPageToken = null, createdAt = new Date().getTime();
    let users = [];
    if (dbValue !== undefined && dbValue !== null) {
      locationPosts = dbValue.posts;
      nextPageToken = dbValue.nextPageToken;
      createdAt = dbValue.createdAt;
    }
    if (new Date().getTime() - createdAt > 86400 * 1000 * ApplicationConstants.automation.LOCATION_POSTS_EXPIRY_DAYS) {
      locationPosts = [];
      nextPageToken = null;
      createdAt = new Date().getTime();
    }
    while (users.length <= count) {
      for (let i = 0; i < locationPosts.length; i++) {
        let userDetails;
        try {
          let reelsResponse = await GetReelsForAUser(locationPosts[i].owner_id);
          userDetails = AutomationOrchestrator.getUserDetailsFromReels(reelsResponse);
        } catch (e) {
          sendNotification(NotificationTypeEnum.Failure, `Please remove location from configurations for some time. Instagram rate limit has happened. Try after 1 hour. Pause please or change account!`);
          continue;
        }
        userDetails.setOrigin(`Location 📍${locationName}`);
        userDetails.setPost(locationPosts[i]);
        userDetails.setUserOrigin({
          type: UserPostOriginEnum.LOCATION_POST,
          value: locationPK,
          additionalValue: locationName
        });
        let detailedUser;
        try {
          detailedUser = await getDetailedUserObjectFromUsername(userDetails.username);
          if (this.shouldSkipUser(detailedUser)) {
            continue;
          }
          userDetails.setDetailedUser(detailedUser);
        } catch (e) {
        }
        users.push(userDetails);
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
  async getFollowersForACompetitor(userID, count, username) {
    if (count <= 0) {
      return [];
    }
    let specificFollowersKey = "FollowersForUsernameSimple_" + username;
    let dbValue = await GetObject(specificFollowersKey);
    let followersOfCompetitor = [], nextPageToken = null, createdAt = new Date().getTime();
    let users = [];
    if (dbValue !== undefined && dbValue !== null) {
      followersOfCompetitor = dbValue.followers;
      nextPageToken = dbValue.nextPageToken;
      createdAt = dbValue.createdAt;
    }
    if (new Date().getTime() - createdAt > 86400 * 1000 * ApplicationConstants.automation.FOLLOWERS_EXPIRY_DATE) {
      followersOfCompetitor = [];
      nextPageToken = null;
      createdAt = new Date().getTime();
    }
    while (users.length <= count) {
      for (let i = 0; i < followersOfCompetitor.length; i++) {
        let followerUser = followersOfCompetitor[i];
        let userDetails = new NewAutomationUser(null);
        userDetails.setOrigin(`Followers of ${username}`);
        userDetails.setUserOrigin({
          type: UserPostOriginEnum.SIMILAR_ACCOUNT_FOLLOWER_POST,
          value: userID,
          additionalValue: username
        });
        userDetails.setUser(false, followerUser.username, followerUser.profilePic, followerUser.id, followerUser.followedByViewer);
        let detailedUser;
        try {
          detailedUser = await getDetailedUserObjectFromUsername(userDetails.username);
          if (this.shouldSkipUser(detailedUser)) {
            continue;
          }
          userDetails.setDetailedUser(detailedUser);
          let randomPost = detailedUser.getRandomPost();
          if (randomPost) {
            userDetails.setPost(randomPost);
          } else {
            continue;
          }
        } catch (e) {
        }
        users.push(userDetails);
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

  // PostsForCompetitorSimple_: {"posts": [], "nextPageToken": "", "createdAt": ""}
  // likerForPost_: {"likers": [], "nextPageToken": ""}
  async getLikersForCompetitor(userID, count, username) {
    if (count <= 0) {
      return [];
    }
    let postsKey = "PostsForCompetitorLikersSimple_" + username;
    let dbValue = await GetObject(postsKey);
    let competitorPosts = [], nextPagePostsToken = null, createdAt = new Date().getTime();
    let users = [];
    if (dbValue !== undefined && dbValue !== null) {
      competitorPosts = dbValue.posts;
      nextPagePostsToken = dbValue.nextPageToken;
      createdAt = dbValue.createdAt;
    }
    if (new Date().getTime() - createdAt > 86400 * 1000 * ApplicationConstants.automation.LIKERS_POSTS_EXPIRY_DAYS) {
      competitorPosts = [];
      nextPagePostsToken = null;
      createdAt = new Date().getTime();
    }

    let areLikersSet = false;
    let likers, nextPageLikerToken, getLikersKey;

    while (users.length <= count) {
      for (let i = 0; i < competitorPosts.length; i++) {
        let post = competitorPosts[i];
        if (!areLikersSet) {
          getLikersKey = "likerForPost_"+post.id;
          let likerDBValue = await GetObject(getLikersKey);
          likers=[];
          nextPageLikerToken=null;
          if (likerDBValue !== undefined && likerDBValue !== null) {
            likers = likerDBValue.likers;
            nextPageLikerToken = likerDBValue.nextPageToken;
          }
          areLikersSet = true;
        }

        for (let j=0;j<likers.length;j++) {
          let likerUser = likers[j];
          // this likerUser is FollowerUser
          let user = new NewAutomationUser(null);
          user.setUser(false, likerUser.username, likerUser.profilePic, likerUser.id, likerUser.followedByViewer);
          user.setOrigin(`Liker of ${username}`);
          user.setUserOrigin({type: UserPostOriginEnum.SIMILAR_ACCOUNT_POSTS_LIKER_POST, value: userID, additionalValue: username});
          let detailedUser;
          try {
            detailedUser = await getDetailedUserObjectFromUsername(user.username);
            if (this.shouldSkipUser(detailedUser)) {
              continue;
            }
            user.setDetailedUser(detailedUser);
            let randomPost = detailedUser.getRandomPost();
            if (randomPost) {
              user.setPost(randomPost);
            } else {
              continue;
            }
          } catch (e) {
          }
          users.push(user);
          if (users.length === count) {
            await SaveObject(postsKey, {
              posts: competitorPosts.slice(i),
              nextPageToken: nextPagePostsToken,
              createdAt: createdAt
            });
            await SaveObject(getLikersKey, {
              likers: likers.slice(j + 1),
              nextPageToken: nextPageLikerToken,
            });
            return users;
          }
        }
        if (users.length < count) {
          let likersOfCompetitorObj = await getLikersOfAPost(post.shortcode, nextPageLikerToken);
          likers = likersOfCompetitorObj.users;
          nextPageLikerToken = likersOfCompetitorObj.nextPageToken;
        }
      }
      if (users.length < count) {
        let postsForACompetitorObj = await getLimitedPostsOfAUser(userID, nextPagePostsToken);
        competitorPosts = postsForACompetitorObj.posts;
        nextPagePostsToken = postsForACompetitorObj.nextPageToken;
      }
    }
  }

  async getCommentersForCompetitor(userID, count, username) {
    if (count <= 0) {
      return [];
    }
    let postsKey = "PostsForCompetitorCommentersSimple_" + username;
    let dbValue = await GetObject(postsKey);
    let competitorPosts = [], nextPagePostsToken = null, createdAt = new Date().getTime();
    let users = [];
    if (dbValue !== undefined && dbValue !== null) {
      competitorPosts = dbValue.posts;
      nextPagePostsToken = dbValue.nextPageToken;
      createdAt = dbValue.createdAt;
    }
    if (new Date().getTime() - createdAt > 86400 * 1000 * ApplicationConstants.automation.COMMENTERS_POSTS_EXPIRY_DAYS) {
      competitorPosts = [];
      nextPagePostsToken = null;
      createdAt = new Date().getTime();
    }

    let areCommentersSet = false;
    let commenters, nextPageCommenterToken, getCommentersKey;

    while (users.length <= count) {
      for (let i = 0; i < competitorPosts.length; i++) {
        let post = competitorPosts[i];
        if (!areCommentersSet) {
          getCommentersKey = "CommentersForPost_"+post.id;
          let commenterDBValue = await GetObject(getCommentersKey);
          commenters=[];
          nextPageCommenterToken=null;
          if (commenterDBValue !== undefined && commenterDBValue !== null) {
            commenters = commenterDBValue.commenters;
            nextPageCommenterToken = commenterDBValue.nextPageToken;
          }
          areCommentersSet = true;
        }

        for (let j=0;j<commenters.length;j++) {
          let commenterUser = commenters[j];
          // this commenterUser is CommenterUser
          let user = new NewAutomationUser(null);
          user.setUser(false, commenterUser.username, commenterUser.profilePic, commenterUser.id, commenterUser.followedByViewer);
          user.setOrigin(`Commenter of ${username}`);
          user.setUserOrigin({type: UserPostOriginEnum.SIMILAR_ACCOUNT_POSTS_COMMENTER_POST, value: userID, additionalValue: username});
          let detailedUser;
          try {
            detailedUser = await getDetailedUserObjectFromUsername(user.username);
            if (this.shouldSkipUser(detailedUser)) {
              continue;
            }
            user.setDetailedUser(detailedUser);
            let randomPost = detailedUser.getRandomPost();
            if (randomPost) {
              user.setPost(randomPost);
            } else {
              continue;
            }
          } catch (e) {
          }
          users.push(user);
          if (users.length === count) {
            await SaveObject(postsKey, {
              posts: competitorPosts.slice(i),
              nextPageToken: nextPagePostsToken,
              createdAt: createdAt
            });
            await SaveObject(getCommentersKey, {
              commenters: commenters.slice(j + 1),
              nextPageToken: nextPageCommenterToken,
            });
            return users;
          }
        }
        if (users.length < count) {
          let commenterOfCompetitorObj = await getCommentersOfAPost(post.shortcode, nextPageCommenterToken);
          commenters = commenterOfCompetitorObj.users;
          // Removing the main user comments
          commenters = commenters.filter(c => {
            return c.id !== userID;
          });
          nextPageCommenterToken = commenterOfCompetitorObj.nextPageToken;
        }
      }
      if (users.length < count) {
        let postsForACompetitorObj = await getLimitedPostsOfAUser(userID, nextPagePostsToken);
        competitorPosts = postsForACompetitorObj.posts;
        nextPagePostsToken = postsForACompetitorObj.nextPageToken;
      }
    }
  }


}

export default AutomationOrchestrator;
