import TaskEnum from "../analytics/TaskEnum";
import LikePostTask from "../common/models/task/LikePostTask";
import FollowUserTask from "../common/models/task/FollowUserTask";
import CommentPostTask from "../common/models/task/CommentPostTask";
import UnfollowUserTask from "../common/models/task/UnfollowUserTask";

const MakeTasksObject = (tasks) => {
  return tasks.map(t => {
    let task;
    if (t.type === TaskEnum.LIKE_POST) {
      task = new LikePostTask(t.type, t.postID, t.postURL, t.postText, t.username, t.profileURL, t.origin, t.userOrigin, t.shortcode, t.userID ,t.isManual);
    } else if (t.type === TaskEnum.FOLLOW) {
      task = new FollowUserTask(t.type, t.userID, t.username, t.profileURL, t.origin, t.userOrigin, t.isManual);
    } else if (t.type === TaskEnum.COMMENT_ON_POST) {
      task = new CommentPostTask(t.type, t.postID, t.postURL, t.postText, t.username, t.profileURL, t.origin, t.userOrigin, t.shortcode, t.userID, t.isManual);
    } else if (t.type === TaskEnum.UNFOLLOW) {
      task = new UnfollowUserTask(t.type, t.userID, t.username, t.profileURL, t.origin, t.userOrigin, t.isManual);
    }
    task.setCompletedDateTime(t.completedDateTime);
    return task;
  });
};

export default MakeTasksObject;
