import React from "react";
import CompletedTasksStatistics from "./CompletedTasksStatistics";
import { Button, Card, Col, Divider, Pagination, Row } from "antd";
import TaskCard from "../action_queue/TaskCard";
import Icons from "../common/components/Icons";
import ReverseArray from "../common/Helpers/ReverseArray";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import NewTaskCard from "../new_task_queue/NewTaskCard";
import NewMessageDisplayer from "../home/NewMessageDisplayer";
import CompletedTasksDownloads from "./CompletedTasksDownloads";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import SaveObject from "../common/chrome/SaveObject";
import DatabaseKeys from "../common/models/DatabaseKeys";

class CompletedTasks extends React.Component {
  constructor(props) {
    super(props);
    this.postsInARow = ApplicationConstants.completedTasks.POSTS_IN_ONE_ROW;
    this.postsInOnePage = ApplicationConstants.completedTasks.POSTS_IN_ONE_PAGE;
    this.state = {
      pageNumber: 1
    };
  }

  deleteCompletedTask = (task) => {
    this.props.deleteCompletedTask(task);
  };

  getRowsColumns() {
    let rowCount = Math.ceil(
      this.props.completedTasks.length / this.postsInARow
    );
    let final = [];
    let reversedTasks = ReverseArray(this.props.completedTasks);
    let completedTasks = reversedTasks.slice(
      (this.state.pageNumber - 1) * this.postsInOnePage,
      this.state.pageNumber * this.postsInOnePage
    );
    for (let i = 0; i < rowCount; i++) {
      let row = [];
      for (let j = 0; j < this.postsInARow; j++) {
        let key = i * this.postsInARow + j;
        if (key >= completedTasks.length) {
          final.push(
            <div key={key.toString() + "div"}>
              <Row gutter={16}>{row}</Row>
            </div>
          );
          return final;
        }
        let taskCard = (
          <TaskCard
            task={completedTasks[key]}
            deleteTask={this.deleteCompletedTask}
            key={key}
            displayOptions={false}
          />
        );
        row.push(
          <Col span={8} key={key.toString() + "col"}>
            {taskCard}
          </Col>
        );
      }
      final.push(
        <div key={i.toString() + "div"}>
          <Row gutter={16}>{row}</Row>
          <Divider dashed={true} />
        </div>
      );
    }
    return final;
  }

  changePageNumber = pgNumber => {
    this.setState({ pageNumber: pgNumber });
  };

  clearAllCompletedTasks = async () => {
    await SaveObject(DatabaseKeys.COMPLETED_TASKS, []);
  };

  render() {

    return (
      <React.Fragment>
        <CompletedTasksStatistics completedTasks={this.props.completedTasks} />
        <br />
        {this.props.completedTasks.length === 0 ? (
          <NewMessageDisplayer messageObj={{LEVEL: "info", MESSAGE: "Perform tasks first to get more followers", LINK: "#/engage_with_target_audience/tasks/see_tasks" }} />
        ) : (
          <div>
            {/*<Button onClick={this.clearAllCompletedTasks}>Clear all Completed Task</Button><br />*/}
            <CompletedTasksDownloads completedTasks={this.props.completedTasks}/>
            <Card
              style={{
                backgroundColor: "#FFF",
                margin: 4,
                padding: 4
              }}
              title={<div>{Icons.TASKS}&nbsp;&nbsp;Tasks performed</div>}
            >
              {this.getRowsColumns()}
            </Card>
            <br />
            <Pagination
              style={{ textAlign: "center" }}
              current={this.state.pageNumber}
              total={this.props.completedTasks.length}
              onChange={this.changePageNumber}
              pageSize={this.postsInOnePage}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default CompletedTasks;
