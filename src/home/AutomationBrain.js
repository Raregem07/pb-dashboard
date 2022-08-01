/*global chrome*/

import AutomationOrchestrator from "./AutomationOrchestrator";
import DatabaseKeys from "../common/models/DatabaseKeys";
import convertFetchedPostToTask from "./ConvertFetchedPostToTask";
import TaskEnum from "../analytics/TaskEnum";
import SaveObject from "../common/chrome/SaveObject";
import FollowUserTask from "../common/models/task/FollowUserTask";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import ConcatToArray from "../common/store/ConcatToArray";
import Shuffle from "../common/Helpers/ShuffleArray";
import AlreadyPerformedTasks from "../common/store/AlreadyPerformedTasks";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import tasksAfterAutomationSettingsChanged from "./TasksAfterAutomationSettingsChanged";
import MakeTasksObject from "../action_queue/MakeTasksObject";
import getLastNPostsForAUser from "../common/api_call/GetLastNPostsForUser";
import GetRandomNumberFrom1ToN from "../common/Helpers/GetRandomNumber";
import UserPostOriginEnum from "../common/models/UserPostOriginEnum";
import GetOrSetValue from "../common/store/GetOrSetValue";
import GetObject from "../common/chrome/GetObject";


class AutomationBrain {
  constructor(homeCallbacks) {
    this.tasks = [];
    this.automationSettings = null;
    this.automationOrchestrator = null;
    this.homeCallbacks = homeCallbacks;

    this.options = null;
    this.timer = null;

    this.followPostsMadeIntoLike = 0;
    this.followPostsMadeIntoComment = 0;

    this.timeRemainingForTaskToComplete = 0;
    this.initialisedBefore = false;
  }

  // this checks if the given task is a follower task and if it is and the todo is to unfollow

  static async getTasksFromUserPosts(userPosts, type) {
    let tasks = [];
    for (let i = 0; i < userPosts.length; i++) {
      let post;
      let userPost = userPosts[i];
      if (userPost.post) {
        post = userPost.post;
      } else {
        let posts = await getLastNPostsForAUser(userPost.id, 3);
        if (posts.length < 1) {
          continue;
        }
        let postIndex = GetRandomNumberFrom1ToN(3);
        post = posts[postIndex - 1];
      }
      tasks.push(convertFetchedPostToTask(userPost, type, post));
    }
    return tasks;
  }

  static isCompetitorRemoved(userOrigin, similarUsers) {
    let shouldRemoveCompetitor = true;
    for (let i = 0; i < similarUsers.length; i++) {
      if (similarUsers[i].pk === userOrigin.value) {
        shouldRemoveCompetitor = false;
        break;
      }
    }
    return shouldRemoveCompetitor;
  }

  // then it adds the task in TASKS_TO_UNFOLLOW array
  async checkForUnfollowTaskAddition(task) {
    if (task instanceof FollowUserTask && (this.automationSettings.todo.unfollowAll || this.automationSettings.todo.unfollowNonFollowers)) {
      await ConcatToArray(DatabaseKeys.TASKS_TO_UNFOLLOW, [task]);
    }
  }

  async removeTaskFromTaskToOpenDB(task) {
    let openTasks =  await GetObject(DatabaseKeys.TASKS_TO_OPEN);
    let newTasks = openTasks.filter(t => (t.fullTask.type !== task.type && t.fullTask.userID !== task.userID));
    await SaveObject(DatabaseKeys.TASKS_TO_OPEN, newTasks);
  }

  initialiseChromeMessages() {
    if (process.env.NODE_ENV !== "development") {
      if (this.initialisedBefore === true) {
        return;
      }
      this.initialisedBefore = true;
      chrome.runtime.onMessage.addListener((msg, sender, response) => {
        if (msg.type === "TASK_COMPLETED_MANUALLY") {
          let task = MakeTasksObject([msg.task])[0];
          this.removeTaskFromTaskToOpenDB(task);
          this.manualCompleteTask(task);
          this.addMoreTaskOfSpecificUserType(task);
        }
      });
    }
  }

  updateTasksFully(tasks) {
    this.tasks = tasks;
    this.homeCallbacks.updateTasks(this.tasks);
    this.saveTasks();
    this.initialiseChromeMessages();
  }

  updateAutomationSettingsFully(automationSettings) {
    this.automationSettings = automationSettings;
    this.automationOrchestrator = new AutomationOrchestrator(automationSettings);
  }

  updateOptionsFully(options) {
    this.options = options;
  }

  addTasks(tasks) {
    this.tasks = this.tasks.concat(tasks);
    this.saveTasks();
    this.homeCallbacks.updateTasks(this.tasks);
  }

  convertUserPostsToTasks = async (userPosts) => {
    if (userPosts.length < 1) {
      return;
    }
    let tasks = await this.convertFetchedUserPostsToTasksOfSpecificTypes(userPosts);
    let filteredTasks = await AlreadyPerformedTasks.removeSingleUserMultipleTargetTask(tasks, ApplicationConstants.automation.MAX_TARGET_PER_USER_COUNT_IN_AUTOMATION);
    this.tasks = this.tasks.concat(filteredTasks);
    let tasksCopy = [...this.tasks];
    this.homeCallbacks.updateTasks(tasksCopy);
    this.saveTasks();
  };

  clearTasks = () => {
    this.tasks = [];
    this.homeCallbacks.updateTasks([]);
    this.saveTasks();
  };

  async addMoreTaskOfSpecificUserType(taskPerformed) {
    if (taskPerformed.type === TaskEnum.UNFOLLOW) {
      return;
    }

    let hashtags = this.automationSettings.hashtags;
    let places = this.automationSettings.places;
    let similarUsers = this.automationSettings.similarUsers;

    let userOrigin = taskPerformed.userOrigin;
    if (!userOrigin) {
      return;
    }
    if (userOrigin.type === UserPostOriginEnum.HASHTAG_POST) {
      let hashtagFound = false;
      for (let i = 0; i < hashtags.length; i++) {
        if (hashtags[i].name === userOrigin.value) {
          hashtagFound = true;
          break;
        }
      }
      if (!hashtagFound) {
        return;
      }
      let hashtagUsersPosts = await this.automationOrchestrator.getUsersForAHashtag(userOrigin.value, 1);
      await this.convertUserPostsToTasks(hashtagUsersPosts);
    }

    if (userOrigin.type === UserPostOriginEnum.LOCATION_POST) {
      let locationFound = false;
      for (let i = 0; i < places.length; i++) {
        if (places[i].pk === userOrigin.value) {
          locationFound = true;
          break;
        }
      }
      if (!locationFound) {
        return;
      }
      let locationUserPosts = await this.automationOrchestrator.getUsersForALocation(userOrigin.value, 1, userOrigin.additionalValue);
      await this.convertUserPostsToTasks(locationUserPosts);
    }

    if (userOrigin.type === UserPostOriginEnum.SIMILAR_ACCOUNT_FOLLOWER_POST) {
      if (AutomationBrain.isCompetitorRemoved(userOrigin, similarUsers)) {
        return;
      }
      let followerUserPosts = await this.automationOrchestrator.getFollowersForACompetitor(userOrigin.value, 1, userOrigin.additionalValue);
      await this.convertUserPostsToTasks(followerUserPosts);
    }

    if (userOrigin.type === UserPostOriginEnum.SIMILAR_ACCOUNT_POSTS_LIKER_POST) {
      if (AutomationBrain.isCompetitorRemoved(userOrigin, similarUsers)) {
        return;
      }
      let likerUserPosts = await this.automationOrchestrator.getLikersForCompetitor(userOrigin.value, 1, userOrigin.additionalValue);
      await this.convertUserPostsToTasks(likerUserPosts);
    }

    if (userOrigin.type === UserPostOriginEnum.SIMILAR_ACCOUNT_POSTS_COMMENTER_POST) {
      if (AutomationBrain.isCompetitorRemoved(userOrigin, similarUsers)) {
        return;
      }
      let commenterUserPosts = await this.automationOrchestrator.getCommentersForCompetitor(userOrigin.value, 1, userOrigin.additionalValue);
      await this.convertUserPostsToTasks(commenterUserPosts);
    }
  }

  async checkForEnoughTasks() {
    this.homeCallbacks.isFetchingPosts(true);

    let usersToGetInOneTime = ApplicationConstants.automation.USERS_TO_GET_IN_ONE_TIME;
    let postUserCountObj = this.getStrategicCounts(usersToGetInOneTime);


    let hashtagUsersNeeded = postUserCountObj.hashtags;
    let locationUsersNeeded = postUserCountObj.location;
    let followerUsersNeeded = postUserCountObj.followersOfSimilarAccounts;
    let likerUsersNeeded = postUserCountObj.likersOfSimilarAccounts;
    let commenterUsersNeeded = postUserCountObj.commentersOfSimilarAccounts;

    let hashtagUserPosts = await this.automationOrchestrator.getHashtagUserPosts(hashtagUsersNeeded);
    await this.convertUserPostsToTasks(hashtagUserPosts);
    // console.log(hashtagUserPosts, "Class: AutomationBrain, Function: , Line 132 hashtagUserPosts(): ");

    let locationUserPosts = await this.automationOrchestrator.getLocationUserPosts(locationUsersNeeded);
    await this.convertUserPostsToTasks(locationUserPosts);
    // console.log(locationUserPosts, "Class: AutomationBrain, Function: , Line 137 locationUserPosts(): ");

    let followerUserPosts = await this.automationOrchestrator.getFollowerUserPosts(followerUsersNeeded);
    await this.convertUserPostsToTasks(followerUserPosts);
    // console.log(followerUserPosts, "Class: AutomationBrain, Function: , Line 139 followerUserPosts(): ");

    let likersOfCompetitors = await this.automationOrchestrator.getLikerUserPosts(likerUsersNeeded);
    await this.convertUserPostsToTasks(likersOfCompetitors);
    // console.log(likersOfCompetitors, "Class: AutomationBrain, Function: , Line 143 likersOfCompetitors(): ");

    let commentersOfSAPosts = await this.automationOrchestrator.getCommenterUserPosts(commenterUsersNeeded);
    await this.convertUserPostsToTasks(commentersOfSAPosts);
    // console.log(commentersOfSAPosts, "Class: AutomationBrain, Function: , Line 147 commentersOfSAPosts(): ");

    let unfollowTasksForTheDay = await AutomationOrchestrator.getUnfollowTasks(ApplicationConstants.automation.UNFOLLOW_AFTER_DAYS);

    this.tasks = Shuffle(this.tasks.concat(unfollowTasksForTheDay));
    this.saveTasks();
    this.homeCallbacks.isFetchingPosts(false);
    this.homeCallbacks.updateTasks(this.tasks);
  }

  areTodosSet() {
    if (!this.automationSettings) {
      return false;
    }
    let todo = this.automationSettings.todo;
    return (todo.like || todo.comment || todo.follow || todo.likeAndFollow);
  }

  async start() {
    if (!this.areAutomationsSet() && this.tasks.length < 1) {
      sendNotification(NotificationTypeEnum.Success, "Please set some Hashtags/Locations/Competitor account names in Set Configuration", true);
      return;
    }
    // TODO: Check if max tasks are already completed, then stop!

    if (!this.areTodosSet() && this.tasks.length < 1) {
      sendNotification(NotificationTypeEnum.Success, "Please set some actions like Like / Comment / Follow in Set Configuration", true);
      return;
    }

    await this.checkForEnoughTasks();
  }

  onSuccessfulTaskCompletion = async (task) => {
    await this.checkForUnfollowTaskAddition(task);
    this.homeCallbacks.taskCompleted(task);
    await ConcatToArray(DatabaseKeys.COMPLETED_TASKS, [task]);
  };


  onTaskOnOffChange = (taskEnabled) => {
    if (taskEnabled) {
      this.start();
    }
  };

  saveTasks() {
    SaveObject(DatabaseKeys.TASKS, this.tasks);
  }

  areAutomationsSet() {
    if (!this.automationSettings) {
      return false;
    }
    return this.automationSettings.hashtags.length > 0
      || this.automationSettings.places.length > 0
      || this.automationSettings.similarUsers.length > 0;
  }

  deleteTask = (task) => {
    this.tasks = this.tasks.filter((t) => t !== task);
    this.homeCallbacks.updateTasks(this.tasks);
    this.saveTasks();
  };

  manualCompleteTask = async (task) => {
    task.completedDateTime = new Date().getTime();
    await this.onSuccessfulTaskCompletion(task);
    this.tasks = this.tasks.filter((t) => {
      return (t.userID !== task.userID || t.type !== task.type || t.origin.type !== task.origin.type);
    });
    this.homeCallbacks.updateTasks(this.tasks);
    this.saveTasks();
  };

  convertFetchedUserPostsToTasksOfSpecificTypes = async (users) => {
    let likeWeightage = 0;
    let commentWeightage = 0;
    let followWeightage = 0;
    // console.log(this.automationSettings.todo, 'Class: AutomationBrain, Function: , Line 335 this.automationSettings.todo(): ');
    if (this.automationSettings.todo.like) {
      likeWeightage = 1;
    }
    if (this.automationSettings.todo.follow) {
      followWeightage = 1;
    }
    if (this.automationSettings.todo.comment) {
      commentWeightage = 1;
    }
    let automationCounts = this.automationOrchestrator.automationsInADay;
    let sumOfallAutomationCounts = automationCounts.maxCommentsAutomation * commentWeightage +
      automationCounts.maxFollowAutomation * followWeightage +
      automationCounts.maxLikesAutomation * likeWeightage;

    let commentCount = Math.floor(users.length * (automationCounts.maxCommentsAutomation * commentWeightage / sumOfallAutomationCounts));
    let followCount = Math.floor(users.length * (automationCounts.maxFollowAutomation * followWeightage / sumOfallAutomationCounts));

    let userPostsToComment = users.slice(0, commentCount);
    let userPostsToFollow = users.slice(commentCount, commentCount + followCount);
    let userPostsToLike = users.slice(commentCount + followCount, users.length);


    let commentTasks = await AutomationBrain.getTasksFromUserPosts(userPostsToComment, TaskEnum.COMMENT_ON_POST);
    let followTasks = userPostsToFollow.map(userPost => convertFetchedPostToTask(userPost, TaskEnum.FOLLOW));
    let likeTasks = await AutomationBrain.getTasksFromUserPosts(userPostsToLike, TaskEnum.LIKE_POST);


    return Shuffle(commentTasks.concat(followTasks.concat(likeTasks)));
  };

  settingsChanged = (newAutomationSettings) => {
    let tasks = tasksAfterAutomationSettingsChanged(this.automationSettings, newAutomationSettings, this.tasks);
    this.updateTasksFully(tasks);
    this.automationSettings = newAutomationSettings;
    this.automationOrchestrator = new AutomationOrchestrator(newAutomationSettings);
  };

  getStrategicCounts(count) {
    if (count < 0) {
      count = 0;
    }
    let sb = this.automationSettings.strategyBrain;
    let hashtagFactor = this.automationSettings.hashtags.length > 0 ? 1 : 0;
    let locationFactor = this.automationSettings.places.length > 0 ? 1 : 0;
    let similarAccountFactor = this.automationSettings.similarUsers.length > 0 ? 1 : 0;
    let likerSimilarAccountFactor = this.automationSettings.similarUsers.length > 0 ? 1 : 0;
    let commenterSimilarAccountFactor = this.automationSettings.similarUsers.length > 0 ? 1 : 0;

    let sum =
      sb.hashtags * hashtagFactor +
      sb.location * locationFactor +
      sb.followersOfSimilarAccounts * similarAccountFactor +
      sb.likersOfSimilarAccounts * likerSimilarAccountFactor +
      sb.commentersOfSimilarAccounts * commenterSimilarAccountFactor;
    if (sum === 0) {
      return {
        hashtags: 0,
        location: 0,
        followersOfSimilarAccounts: 0,
        likersOfSimilarAccounts: 0,
        commentersOfSimilarAccounts: 0
      };
    }
    return {
      hashtags: Math.ceil((count * sb.hashtags * hashtagFactor) / sum),
      location: Math.ceil((count * sb.location * locationFactor) / sum),
      followersOfSimilarAccounts: Math.ceil(
        (count * sb.followersOfSimilarAccounts * similarAccountFactor) / sum
      ),
      likersOfSimilarAccounts: Math.ceil(
        (count * sb.likersOfSimilarAccounts * likerSimilarAccountFactor) / sum
      ),
      commentersOfSimilarAccounts: Math.ceil(
        (count * sb.commentersOfSimilarAccounts * commenterSimilarAccountFactor) / sum
      )
    };
  }
}

export default AutomationBrain;
