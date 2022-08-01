/*global chrome*/

import DatabaseKeys from "../common/models/DatabaseKeys";
import TaskEnum from "../analytics/TaskEnum";
import SaveObject from "../common/chrome/SaveObject";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import ConcatToArray from "../common/store/ConcatToArray";
import Shuffle from "../common/Helpers/ShuffleArray";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import sleep from "../common/Sleep";
import NewAutomationOrchestrator from "./NewAutomationOrchestrator";
import NewFollowUserTask from "../common/models/new_tasks/NewFollowUserTask";
import NewLikePostTask from "../common/models/new_tasks/NewLikePostTask";
import UserPostOriginEnum from "../common/models/UserPostOriginEnum";
import GetRandomNumberFrom1ToN from "../common/Helpers/GetRandomNumber";
import newTasksAfterAutomationSettingsChanged from "./NewTasksAfterAutomationSettingsChanged";
import MakeNewTasksObject from "../new_task_queue/MakeNewTasksObject";
import GetObject from "../common/chrome/GetObject";


class NewAutomationBrain {
  constructor(homeCallbacks) {
    this.tasks = [];

    this.automationSettings = null;
    this.automationOrchestrator = null;
    this.homeCallbacks = homeCallbacks;

    this.runAutomations = false;

    this.options = null;
    this.timer = null;

    this.initialisedBefore = false;

    this.timeRemainingForTaskToComplete = 0;
  }

  // TODO
  // this checks if the given task is a follower task and if it is and the todo is to unfollow
  // then it adds the task in TASKS_TO_UNFOLLOW array
  async checkForUnfollowTaskAddition(task) {
    if (task instanceof NewFollowUserTask && (this.automationSettings.todo.unfollowAll || this.automationSettings.todo.unfollowNonFollowers)) {
      await ConcatToArray(DatabaseKeys.NEW_TASKS_TO_UNFOLLOW, [task]);
    }
  }

  initialiseChromeExtension() {
    if (this.initialisedBefore === true) {
      return;
    }
    this.initialisedBefore = true;
    if (process.env.NODE_ENV !== "development") {
      chrome.runtime.onMessage.addListener((msg, sender, response) => {
        if (msg.type === "performAutomation") {
          let task = MakeNewTasksObject([msg.taskObj])[0];
          this.manualCompleteTask(task);
        }
      });
    }
  }

  updateTasksFully(tasks) {
    this.tasks = tasks.filter((t) => {
      return !t.isExpired();
    });
    this.homeCallbacks.updateTasks(this.tasks);
    this.saveTasks();

    this.initialiseChromeExtension();
  }

  updateAutomationSettingsFully(automationSettings, runAutomations) {
    this.automationSettings = automationSettings;
    this.runAutomations = runAutomations;
    this.automationOrchestrator = new NewAutomationOrchestrator(automationSettings);
  }

  updateOptionsFully(options) {
    this.options = options;
  }

  addTasks(tasks) {
    this.tasks = this.tasks.concat(tasks);
    this.saveTasks();
    this.homeCallbacks.updateTasks(this.tasks);
  }

  async checkForEnoughTasksInitially() {
    if (this.tasks.length > 4) {
      return;
    }

    this.homeCallbacks.isFetchingPosts(true);

    let usersToGetInOneTime = ApplicationConstants.newAutomation.USERS_TO_GET_IN_ONE_TIME;
    let postUserCountObj = this.getStrategicCounts(usersToGetInOneTime);
    

    let hashtagUsersNeeded = postUserCountObj.hashtags;
    let locationUsersNeeded = postUserCountObj.location;
    let followerUsersNeeded = postUserCountObj.followersOfSimilarAccounts;
    // let likerUsersNeeded = postUserCountObj.likersOfSimilarAccounts;
    // let commenterUsersNeeded = postUserCountObj.commentersOfSimilarAccounts;

    let usersForTasks = [];

    if (hashtagUsersNeeded > 0) {
      let hashtagUsers = await this.automationOrchestrator.getHashtagUsers(hashtagUsersNeeded);
      usersForTasks = usersForTasks.concat(hashtagUsers);
    }
    

    if (locationUsersNeeded > 0) {
      let locationUsers = await this.automationOrchestrator.getLocationUsers(locationUsersNeeded);
      usersForTasks = usersForTasks.concat(locationUsers);
    }
    

    if (followerUsersNeeded > 0) {
      let followerUsers = await this.automationOrchestrator.getCompetitorFollowerUsers(followerUsersNeeded);
      usersForTasks = usersForTasks.concat(followerUsers);
    }

    // if (likerUsersNeeded > 0) {
    //   usersForTasks = usersForTasks.concat(await this.automationOrchestrator.getCompetitorLikerUsers(likerUsersNeeded));
    // }
    //
    // if (commenterUsersNeeded > 0) {
    //   usersForTasks = usersForTasks.concat(await this.automationOrchestrator.getCompetitorCommenterUsers(commenterUsersNeeded));
    // }

    this.tasks = this.convertFetchedUsersToTasksOfSpecificTypes(usersForTasks);


    this.saveTasks();
    this.homeCallbacks.isFetchingPosts(false);
    this.homeCallbacks.updateTasks(this.tasks);
  }

  areTodosSet() {
    if (!this.automationSettings) {
      return false;
    }
    let todo = this.automationSettings.todo;
    return (todo.like || todo.follow || todo.likeAndFollow);
  }

  async addMoreTaskOfSpecificUserType(taskPerformed) {
    if (taskPerformed.type === TaskEnum.UNFOLLOW) {
      return;
    }
    let userOrigin = taskPerformed.userOrigin;
    if (userOrigin.type === UserPostOriginEnum.HASHTAG_POST) {
      let users = await NewAutomationOrchestrator.getUsersForAHashtag(userOrigin.value, 1);
      let tasks = this.convertFetchedUsersToTasksOfSpecificTypes(users);
      this.addTasks(tasks);
    }

    if (userOrigin.type === UserPostOriginEnum.LOCATION_POST) {
      let users = await NewAutomationOrchestrator.getUsersForALocation(userOrigin.value, 1, userOrigin.additionalValue);
      let tasks = this.convertFetchedUsersToTasksOfSpecificTypes(users);
      this.addTasks(tasks);
    }

    if (userOrigin.type === UserPostOriginEnum.SIMILAR_ACCOUNT_FOLLOWER_POST) {
      let users = await NewAutomationOrchestrator.getFollowersForACompetitor(userOrigin.value, 1, userOrigin.additionalValue);
      let tasks = this.convertFetchedUsersToTasksOfSpecificTypes(users);
      this.addTasks(tasks);
    }
  }

  someRandomSleepTimeInSeconds() {
    // TODO: Have speed here
    let randomNumber = 30 + GetRandomNumberFrom1ToN(20);
    return randomNumber;
  }

  checkIfConfigurationIsSetCorrectly() {
    if (!this.areAutomationsSet() && this.tasks.length < 1) {
      sendNotification(NotificationTypeEnum.Success, "Please set some Hashtags/Locations/Competitor account names in Automation Configuration", true);
      this.makeTasksOff();
      return false;
    }


    if (!this.runAutomations) {
      return false;
    }

    if (!this.areTodosSet() && this.tasks.length < 1) {
      sendNotification(NotificationTypeEnum.Success, "Please set some actions like Like / Comment / Follow in Automation Configuration", true);
      this.makeTasksOff();
      return false;
    }

    return true;
  }

  async start() {
    let tasksPerformed = 0;

    if (!this.checkIfConfigurationIsSetCorrectly()) {
      return;
    }

    await this.checkForEnoughTasksInitially();

    if (this.tasks.length < 1) {
      sendNotification(NotificationTypeEnum.Failure, "Something went wrong. 0 tasks Error. Please report this to support", true);
      return;
    }

    while (this.tasks.length > 0) {
      if (!this.runAutomations) {
        return;
      }
      let taskToPerform = this.tasks.shift();

      let badOwnerObj = await taskToPerform.hasBadOwner(this.automationSettings.filter);

      if (badOwnerObj.isBad) {
        await this.saveTasks();
        sendNotification(NotificationTypeEnum.Success, badOwnerObj.message, true);
        this.homeCallbacks.updateTasks(this.tasks);
        this.addMoreTaskOfSpecificUserType(taskToPerform);
        continue;
      }

      if (Math.random() < 0.9) {
        taskToPerform.performTask();
      } else {
        sendNotification(NotificationTypeEnum.Success, `Randomly Skipped ${taskToPerform.username} story`);
      }


      this.addMoreTaskOfSpecificUserType(taskToPerform);

      let sleepTimeInSeconds = this.someRandomSleepTimeInSeconds();
      this.homeCallbacks.changeNextTaskTime(sleepTimeInSeconds);
      // TODO: home timer callback here
      await sleep(sleepTimeInSeconds * 1000);
      await this.checkForEnoughTasksInitially();

      if (this.tasks.length < 1) {
        if (!this.checkIfConfigurationIsSetCorrectly()) {
          return;
        }
      }
    }
  }

  onSuccessfulTaskCompletion = async (task) => {
    await this.checkForUnfollowTaskAddition(task);
    // TODO: Make a different thing in home
    this.homeCallbacks.taskCompleted(task);
    await ConcatToArray(DatabaseKeys.NEW_COMPLETED_TASKS, [task]);
  };

  performTask = async () => {
    // console.log("PERFORM TASK", 'Class: AutomationBrain, Function: , Line 183 "PERFORM TASK"(): ');
    if (!this.runAutomations) {
      return;
    }
    await this.start();
  };

  makeTasksOff() {
    clearTimeout(this.timer);
    this.homeCallbacks.onIsAutomationRunningChange(false);
    SaveObject(DatabaseKeys.RUN_NEW_AUTOMATION, false);
    this.runAutomations = false;
  }

  onTaskOnOffChange = (taskEnabled) => {
    this.runAutomations = taskEnabled;
    if (!taskEnabled) {
      this.makeTasksOff();
    }
    if (this.runAutomations) {
      this.homeCallbacks.onIsAutomationRunningChange(true);
      this.start();
    }
  };

  saveTasks() {
    SaveObject(DatabaseKeys.NEW_TASKS, this.tasks);
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
    // TODO: Make delete task
    if (task === this.tasks[0]) {
      clearTimeout(this.timer);
      this.performTask();
    }
    this.tasks = this.tasks.filter((t) => t !== task);
    this.homeCallbacks.updateTasks(this.tasks);
    this.saveTasks();
  };

  manualCompleteTask = async (task) => {
    task.setCompletedDateTime(new Date().getTime());
    await this.onSuccessfulTaskCompletion(task);
    this.tasks = this.tasks.filter((t) => {
      return (t.userID !== task.userID || t.type !== task.type || t.origin !== task.origin);
    });
    this.homeCallbacks.updateTasks(this.tasks);
    this.saveTasks();
  };

  convertUserToTasks = (user, taskType) => {
    if (taskType === TaskEnum.FOLLOW) {
      return new NewFollowUserTask(taskType, user.id, user.username, user.profileURL, user.origin, user.storyExpiryTime, user.userOrigin, user.postPic);
    } else if (taskType === TaskEnum.LIKE_POST) {
      return new NewLikePostTask(taskType, user.id, user.username, user.profileURL, user.origin, user.storyExpiryTime, user.userOrigin, user.postPic);
    }
  };

  clearTasks = () => {
    this.tasks = [];
    this.saveTasks();
    this.homeCallbacks.updateTasks(this.tasks);
  };

  convertFetchedUsersToTasksOfSpecificTypes = (users) => {
    let likeWeightage = 1;
    let followWeightage = 1;
    if (this.automationSettings.todo.like || this.automationSettings.todo.likeAndFollow) {
      likeWeightage = 1;
    }
    if (this.automationSettings.todo.follow || this.automationSettings.todo.likeAndFollow) {
      followWeightage = 1;
    }

    // Here Follow is Just watch story. //
    if (users.length === 1 && likeWeightage === 1 && followWeightage === 1) {
      if (Math.random() > 0.5) {
        return [this.convertUserToTasks(users[0], TaskEnum.LIKE_POST)];
      } else {
        return [this.convertUserToTasks(users[0], TaskEnum.FOLLOW)];
      }
    }

    let automationCounts = this.automationSettings.automationsInADay;
    let sumOfallAutomationCounts = automationCounts.maxFollowAutomation * followWeightage +
      automationCounts.maxLikesAutomation * likeWeightage;

    let followCount = Math.floor(users.length * (automationCounts.maxFollowAutomation * followWeightage / sumOfallAutomationCounts));

    let usersToFollow = users.slice(0, followCount);
    let usersToLikePost = users.slice(followCount, users.length);

    let likeTasks = usersToLikePost.map(user => this.convertUserToTasks(user, TaskEnum.LIKE_POST));
    let followTasks = usersToFollow.map(user => this.convertUserToTasks(user, TaskEnum.FOLLOW));

    return Shuffle(followTasks.concat(likeTasks));
  };

  settingsChanged = (newAutomationSettings) => {
    let tasks = newTasksAfterAutomationSettingsChanged(this.automationSettings, newAutomationSettings, this.tasks);
    this.updateTasksFully(tasks);
    this.automationSettings = newAutomationSettings;
    this.automationOrchestrator = new NewAutomationOrchestrator(newAutomationSettings);
  };

  getStrategicCounts(count) {
    if (count < 0) {
      count = 0;
    }
    let sb = this.automationSettings.strategyBrain;
    let hashtagFactor = this.automationSettings.hashtags.length > 0 ? 1 : 0;
    let locationFactor = this.automationSettings.places.length > 0 ? 1 : 0;
    let similarAccountFactor = this.automationSettings.similarUsers.length > 0 ? 1 : 0;
    let sum =
      sb.hashtags * hashtagFactor +
      sb.location * locationFactor +
      sb.followersOfSimilarAccounts * similarAccountFactor;
    if (sum === 0) {
      return {
        hashtags: 0,
        location: 0,
        followersOfSimilarAccounts: 0
      };
    }
    return {
      hashtags: Math.ceil((count * sb.hashtags * hashtagFactor) / sum),
      location: Math.ceil((count * sb.location * locationFactor) / sum),
      followersOfSimilarAccounts: Math.ceil(
        (count * sb.followersOfSimilarAccounts * similarAccountFactor) / sum
      )
    };
  }
}

export default NewAutomationBrain;
