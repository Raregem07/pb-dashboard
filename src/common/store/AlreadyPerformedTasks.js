import DatabaseKeys from "../models/DatabaseKeys";
import GetOrSetValue from "./GetOrSetValue";
import UnfollowUserTask from "../models/task/UnfollowUserTask";

class AlreadyPerformedTasks {

  static async savedTasksByUserID(userID) {
    let completedTasks = await GetOrSetValue(DatabaseKeys.COMPLETED_TASKS, []);
    return completedTasks.filter(task => task.userID === userID);
  }

  static async removeSingleUserMultipleTargetTask(tasks, maxTargetsAllowed) {
    let tasksAllowed = [];
    for (let i =0;i<tasks.length;i++) {
      let task = tasks[i];
      if (task instanceof UnfollowUserTask) {
        tasksAllowed.push(task);
        continue;
      }
      let userID = task.userID;
      let taskCountWithinGivenTasks = AlreadyPerformedTasks.tasksBelongingToUserID(tasksAllowed, userID).length;
      let taskCountInAlreadyPerformedTasks = await AlreadyPerformedTasks.savedTasksByUserID(userID);
      if (taskCountWithinGivenTasks + taskCountInAlreadyPerformedTasks < maxTargetsAllowed) {
        tasksAllowed.push(task);
      }
    }
    return tasksAllowed;
  }

  static tasksBelongingToUserID(tasks, userID) {
    return tasks.filter(task => task.userID === userID);
  }
}

export default AlreadyPerformedTasks;
