import React from "react";
import {
  Avatar,
  Card,
  Checkbox,
  Divider,
  Icon,
  Input,
  Modal,
  Tooltip
} from "antd";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import DatabaseKeys from "../common/models/DatabaseKeys";
import ConcatToArray from "../common/store/ConcatToArray";
import PostOrigin from "../action_queue/PostOrigin";

const { Meta } = Card;

class NewTaskCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let task = this.props.task;

    let mainImage = <img alt="Post Image" height={300} width={300} src={task.postImage()}/>;

    let userProps = {};
    userProps["avatar"] = (
      <Tooltip title="User Profile Image">
        <Avatar src={task.profileURL} />
      </Tooltip>
    );
    userProps["title"] = (
      <Tooltip title="Instagram username">{task.username}</Tooltip>
    );


    let user = <div />;
    if (
      Object.entries(userProps).length !== 0 ||
      userProps.constructor !== Object
    ) {
      user = (
        <div>
          <Meta {...userProps} />
          <Divider dashed={true} />
        </div>
      );
    }

    let actionToPerform = (
      <div>
        <Meta
          style={{ textAlign: "center" }}
          title={task.display()}
          description={task.displayDescription()}
        />
        <Divider dashed={true} />
      </div>
    );

    let taskPerformedDate = <div />;
    if (this.props.displayTaskCompletedDetails) {
      taskPerformedDate = (
        <div>
          <Divider dashed={true} />
          Date/Time : <strong>{task.readableDate()}</strong>
        </div>
      );
    }
    return (
      <React.Fragment>
        <Card
          style={{ width: 350, padding: 16 }}
          cover={mainImage}
        >
          {user}
          <Tooltip title="Task to perform. Like | Follow | Unfollow">
            {actionToPerform}
          </Tooltip>
          <Meta description={task.origin} />
          {taskPerformedDate}
        </Card>
      </React.Fragment>
    );
  }
}

export default NewTaskCard;
