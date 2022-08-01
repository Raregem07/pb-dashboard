import React from "react";
import { Avatar, Button, Card, Col, Divider, Icon, Row, Tooltip } from "antd";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";
import MakeTasksObject from "./MakeTasksObject";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import SendEvent from "../common/Helpers/SendEvent";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";

const { Meta } = Card;

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteTask(task) {
    sendNotification(NotificationTypeEnum.Success, `${task.type} Task deleted`);
    this.props.deleteTask(task);
  }

  onManualTaskCompletion = task => {
    sendNotification(
      NotificationTypeEnum.Success,
      `${task.type} Task Completed Manually`
    );
    this.props.manualCompleteTask(task);
  };

  checkIfTaskClickShouldBeAllowed = async () => {
    let tasksInObj = await GetOrSetValue(DatabaseKeys.COMPLETED_TASKS, []);
    if (tasksInObj.length < ApplicationConstants.automation.TASKS_ALLOWED_IN_ONE_HOUR + 1) {
      return {isAllowed: true, minutesRemaining: 0};
    }
    let lastNTasks = tasksInObj.slice(-ApplicationConstants.automation.TASKS_ALLOWED_IN_ONE_HOUR);
    let nthTask = lastNTasks[0];

    let completedDateTime = nthTask.completedDateTime;
    let timeDiffInMS = new Date().getTime() - completedDateTime;
    if (timeDiffInMS < 60 * 60 * 1000) {
      return {isAllowed: false, minutesRemaining: Math.ceil((60 * 60 * 1000 - timeDiffInMS)/60000)};
    }
    return {isAllowed: true, minutesRemaining: 0};
  };

  onTaskCardClick = async () => {
    let isTaskAllowedObj = await this.checkIfTaskClickShouldBeAllowed();
    if (isTaskAllowedObj.isAllowed) {
      SendEvent(AnalyticsCategoryEnum.AUTOMATION, "Task Clicked to Complete", "");
      this.props.task.openPostInNewTab()
    } else {
      SendEvent(AnalyticsCategoryEnum.AUTOMATION, "Task Waited for too many tasks", "");
      sendNotification(NotificationTypeEnum.Failure, `Wait for "${isTaskAllowedObj.minutesRemaining} minutes" before next task | Too many tasks at one time may result in action block. ProfileBud will notify you like this when you are going too fast. 😊`, true);
    }
  };

  render() {
    let task = this.props.task;

    let mainImageURL = task.postImage();

    let taskClickOrCompleted;
    if (!this.props.displayOptions) {
      taskClickOrCompleted = (
        <div style={{
          backgroundColor: "#FFF",
          width: "90%",
          textAlign: "center",
          height: 45,
          borderRadius: 11,

          color: "#000",
          font: "Bold 29px/35px Roboto;",
          fontSize: 12,
          marginLeft: 6,
          paddingTop: 4
        }}>
          Completed Date-Time : <strong>{task.readableDate()}</strong>
        </div>
      );
    } else {
      taskClickOrCompleted = (
        <Button
          style={{
            backgroundColor: "#FFF",
            width: "90%",
            textAlign: "center",
            height: 40,
            borderRadius: 11,

            color: "#000",
            font: "Bold 29px/35px Roboto;",
            fontSize: 24
          }}
          onClick={this.onTaskCardClick}
        >
          Complete Task
        </Button>
      );
    }

    return (
      <React.Fragment>
        <div
          style={{
            width: "95%",
            backgroundColor: "#001429",
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: 11
          }}
        >
          <div
            style={{
              height: "10%",
              color: "#FFF",
              paddingTop: 6
            }}
          >
            <Row>
              <Col span={3}>
                <div
                  style={{
                    paddingLeft: 4
                  }}
                >
                  <Avatar src={task.profileURL} size={32} />
                </div>
              </Col>
              <Col span={18}>
                <div
                  style={{
                    fontSize: 16,
                    paddingLeft: 12
                  }}
                >
                  @{task.username.slice(0,20)}{task.username > 20 ? <React.Fragment>...</React.Fragment> :<React.Fragment />}
                </div>
              </Col>
              <Col span={3}>
                <div
                  style={{
                    fontSize: 22
                  }}
                >
                  <Icon
                    type="delete"
                    key="delete"
                    onClick={() => this.deleteTask(task)}
                  />
                </div>
              </Col>
            </Row>
          </div>

          <div
            style={{
              textAlign: "center",
              height: 250
            }}
          >
            <img src={mainImageURL} height={250} width={"100%"} alt="post image" />
          </div>
          <div
            style={{
              height: "10%",
              color: "#FFF",
              paddingLeft: 12,
              paddingTop: 8,
              fontSize: 20,
              paddingBottom: 8
            }}
          >
            {task.displayDescription()}
          </div>

          <div
            style={{
              textAlign: "center",
              height: "12%"
            }}
          >
            {taskClickOrCompleted}
          </div>

          <div
            style={{
              height: "20",
              color: "#FFF"
            }}
          >
            <Row>
              <Col span={24}>
                <div
                  style={{
                    fontSize: 18,
                    paddingLeft: 8,
                    textAlign: "center"
                  }}
                >
                  {task.origin}
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/*<Card*/}
        {/*  style={{ width: 270, padding: 4 }}*/}
        {/*  cover={mainImage}*/}
        {/*  actions={actions}*/}
        {/*>*/}
        {/*  {user}*/}
        {/*  <Tooltip title="Task to perform. Like | Comment | Follow | Unfollow">*/}
        {/*    {actionToPerform}*/}
        {/*  </Tooltip>*/}
        {/*  <Meta description={task.origin} />*/}
        {/*  {taskPerformedDate}*/}
        {/*</Card>*/}
      </React.Fragment>
    );
  }
}

export default TaskCard;
