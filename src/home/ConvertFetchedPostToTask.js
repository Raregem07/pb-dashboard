import FollowUserTask from "../common/models/task/FollowUserTask";
import UserPostOriginEnum from "../common/models/UserPostOriginEnum";
import LikePostTask from "../common/models/task/LikePostTask";
import TaskEnum from "../analytics/TaskEnum";
import CommentPostTask from "../common/models/task/CommentPostTask";

function convertFetchedPostToTask(userPost, taskType, post = null) {
  
  if (taskType === TaskEnum.LIKE_POST) {
    return new LikePostTask(
      TaskEnum.LIKE_POST,
      post.id,
      post.display_url,
      post.text,
      userPost.username,
      userPost.profileURL,
      userPost.origin,
      userPost.userOrigin,
      post.shortcode,
      userPost.id
    );
  } else if (taskType === TaskEnum.FOLLOW) {
    return new FollowUserTask(
      TaskEnum.FOLLOW,
      userPost.id,
      userPost.username,
      userPost.profileURL,
      userPost.origin,
      userPost.userOrigin,
    );
  } else if (taskType === TaskEnum.COMMENT_ON_POST) {
    return new CommentPostTask(
      TaskEnum.COMMENT_ON_POST,
      post.id,
      post.display_url,
      post.text,
      userPost.username,
      userPost.profileURL,
      userPost.origin,
      userPost.userOrigin,
      post.shortcode,
      userPost.id
    );
  }
}

export default convertFetchedPostToTask;
