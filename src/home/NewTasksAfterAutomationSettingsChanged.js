import LikePostTask from "../common/models/task/LikePostTask";
import FollowUserTask from "../common/models/task/FollowUserTask";
import CommentPostTask from "../common/models/task/CommentPostTask";
import UserPostOriginEnum from "../common/models/UserPostOriginEnum";
import NewLikePostTask from "../common/models/new_tasks/NewLikePostTask";
import NewFollowUserTask from "../common/models/new_tasks/NewFollowUserTask";

// This just removes the earlier tasks. Doesn't add new. If count goes below the threshold,
// then automatically new tasks are added
const newTasksAfterAutomationSettingsChanged = (oldSettings, newSettings, tasks) => {
  checkForChangeInTodo(oldSettings, newSettings, tasks);
  checkForChangeInHashtags(oldSettings, newSettings, tasks);
  // checkForChangeInLocation(oldSettings, newSettings, tasks);
  // checkForChangeInSimilarAccounts(oldSettings, newSettings, tasks);
  // console.log(tasks, 'Class: , Function: , Line 13 tasks(): ');
  return tasks;
};

function checkForChangeInTodo(oldSettings, newSettings, tasks) {
  let oldTodo = oldSettings.todo;
  let newTodo = newSettings.todo;
  if (oldTodo.like !== newTodo.like && newTodo.like === false) {
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];

      if (task instanceof NewLikePostTask) {
        tasks.splice(i, 1);
        i--;
      }
    }
  }

  if (oldTodo.follow !== newTodo.follow && newTodo.follow === false) {
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      if (task instanceof NewFollowUserTask) {
        tasks.splice(i, 1);
        i--;
      }
    }
  }

  if (oldTodo.likeAndFollow !== newTodo.likeAndFollow && newTodo.likeAndFollow === false) {
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      if (task instanceof NewFollowUserTask) {
        let isLikedAlso = false;
        for (let j = 0; j < tasks.length; j++) {
          if (tasks[j] instanceof NewLikePostTask && tasks[j].userID === task.userID) {
            isLikedAlso = true;
          }
        }
        if (isLikedAlso) {
          tasks.splice(i, 1);
          i--;
        }
      } else if (task instanceof NewLikePostTask) {
        let isFollowedAlso = false;
        for (let j = 0; j < tasks.length; j++) {
          if (tasks[j] instanceof NewFollowUserTask && tasks[j].userID === task.userID) {
            isFollowedAlso = true;
          }
        }
        if (isFollowedAlso) {
          tasks.splice(i, 1);
          i--;
        }
      }
    }
  }
  return tasks;
}


function checkForChangeInHashtags(oldSettings, newSettings, tasks) {
  let oldHashtags = oldSettings.hashtags;
  let newHashtags = newSettings.hashtags;
  for (let i = 0; i < oldHashtags.length; i++) {
    let hashtag = oldHashtags[i];
    let hashtagExists = false;
    for (let j = 0; j < newHashtags.length; j++) {
      let newHashtag = newHashtags[j];
      if (newHashtag.id === hashtag.id) {
        hashtagExists = true;
      }
    }
    if (!hashtagExists) {
      for (let j = 0; j < tasks.length; j++) {
        if (tasks[j].userOrigin.type === UserPostOriginEnum.HASHTAG_POST && tasks[j].userOrigin.value === hashtag.name) {
          tasks.splice(j, 1);
          j--;
        }
      }
    }
  }
  return tasks;
}

// TODO Check this while making location
function checkForChangeInLocation(oldSettings, newSettings, tasks) {
  let oldLocations = oldSettings.places;
  let newLocations = newSettings.places;
  for (let i = 0; i < oldLocations.length; i++) {
    let location = oldLocations[i];
    let locationExists = false;
    for (let j = 0; j < newLocations.length; j++) {
      let newLocation = newLocations[j];
      if (newLocation.pk === location.pk) {
        locationExists = true;
      }
    }
    if (!locationExists) {
      for (let j = 0; j < tasks.length; j++) {
        if (tasks[j].userOrigin.type === UserPostOriginEnum.LOCATION_POST && tasks[j].userOrigin.value === location.pk) {
          tasks.splice(j, 1);
          j--;
        }
      }
    }
  }
  return tasks;
}

// TODO Check this while making Similar Account
function checkForChangeInSimilarAccounts(oldSettings, newSettings, tasks) {
  let oldSimilarAccounts = oldSettings.similarUsers;
  let newSimilarAccounts = newSettings.similarUsers;
  for (let i = 0; i < oldSimilarAccounts.length; i++) {
    let oldAccount = oldSimilarAccounts[i];
    let accountExists = false;
    for (let j = 0; j < newSimilarAccounts.length; j++) {
      let newAccount = newSimilarAccounts[j];
      if (newAccount.pk === oldAccount.pk) {
        accountExists = true;
      }
    }
    if (!accountExists) {
      for (let j = 0; j < tasks.length; j++) {
        if (tasks[j].origin.similarAccount && tasks[j].origin.similarAccount.pk === oldAccount.pk) {
          tasks.splice(j, 1);
          j--;
        }
      }
    }
  }
  return tasks;
}


export default newTasksAfterAutomationSettingsChanged;
