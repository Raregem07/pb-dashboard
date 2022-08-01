import TaskEnum from "../analytics/TaskEnum";
import LikePostTask from "../common/models/task/LikePostTask";
import FollowUserTask from "../common/models/task/FollowUserTask";
import CommentPostTask from "../common/models/task/CommentPostTask";
import UnfollowUserTask from "../common/models/task/UnfollowUserTask";
import NewLikePostTask from "../common/models/new_tasks/NewLikePostTask";
import NewFollowUserTask from "../common/models/new_tasks/NewFollowUserTask";
import NewUnfollowUserTask from "../common/models/new_tasks/NewUnfollowUserTask";
import NewStoryTask from "../common/models/new_tasks/NewStoryTask";


const MakeNewTasksObject = (tasks) => {
  return tasks.map(t => {
    let task;
    if (t.type === TaskEnum.LIKE_POST) {
      task = new NewLikePostTask(t.type, t.userID, t.username, t.profileURL, t.origin, t.expiryTime, t.userOrigin, t.postPic);
    } else if (t.type === TaskEnum.FOLLOW) {
      task = new NewFollowUserTask(t.type, t.userID, t.username, t.profileURL, t.origin, t.expiryTime, t.userOrigin, t.postPic);
    } else if (t.type === TaskEnum.UNFOLLOW) {
      task = new NewUnfollowUserTask(t.type, t.userID, t.username, t.profileURL, t.origin, t.userOrigin, t.postPic);
    } else if (t.type === TaskEnum.STORY) {
      task = new NewStoryTask(t.type, t.userID, t.username, t.profileURL, t.origin, t.expiryTime, t.userOrigin, t.postPic);
    }
    task.setCompletedDateTime(t.completedDateTime);
    return task;
  });
};

export default MakeNewTasksObject;
