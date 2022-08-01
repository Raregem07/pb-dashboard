import React from 'react';
import {Col, Row} from "antd";
import CompletedTaskCountCard from "./CompletedTaskCountCard";
import Icons from "../common/components/Icons";
import LikePostTask from "../common/models/task/LikePostTask";
import CommentPostTask from "../common/models/task/CommentPostTask";
import FollowUserTask from "../common/models/task/FollowUserTask";
import UnfollowUserTask from "../common/models/task/UnfollowUserTask";
import NewLikePostTask from "../common/models/new_tasks/NewLikePostTask";
import NewFollowUserTask from "../common/models/new_tasks/NewFollowUserTask";
import NewUnfollowUserTask from "../common/models/new_tasks/NewUnfollowUserTask";
import NewStoryTask from "../common/models/new_tasks/NewStoryTask";

class CompletedTasksStatistics extends React.Component {
  constructor(props) {
    super(props);
  }

  getTasksWiseStatistics() {
    let likeCount = 0;
    let commentCount = 0;
    let followCount = 0;
    let unfollowCount = 0;
    let completedTasks = this.props.completedTasks;
    completedTasks.map(t => {
      if (t instanceof LikePostTask) {
        likeCount++;
      }
      if (t instanceof CommentPostTask) {
        commentCount++;
      }
      if (t instanceof FollowUserTask) {
        followCount++;
      }
      if (t instanceof UnfollowUserTask || t instanceof NewUnfollowUserTask) {
        unfollowCount++;
      }

    });
    return {
      likeCount,
      commentCount,
      followCount,
      unfollowCount,
    }
  }

  render() {
    let counts = this.getTasksWiseStatistics();
    return (
      <React.Fragment>
        <Row gutter={24}>
          <Col span={2} />
          <Col span={5}>
            <CompletedTaskCountCard
              title="Likes"
              icon={Icons.LIKE}
              count={counts.likeCount} />
          </Col>
          <Col span={5}>
            <CompletedTaskCountCard
              title="Comments"
              icon={Icons.COMMENT}
              count={counts.commentCount} />
          </Col>
          <Col span={5}>
            <CompletedTaskCountCard
              title="Follows"
              icon={Icons.FOLLOW}
              count={counts.followCount} />
          </Col>
          <Col span={5}>
            <CompletedTaskCountCard
              title="Unfollows"
              icon={Icons.UNFOLLOW}
              count={counts.unfollowCount} />
          </Col>
          <Col span={2} />

        </Row>
      </React.Fragment>
    );
  }

}

export default CompletedTasksStatistics;
