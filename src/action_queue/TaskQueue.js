import React from "react";
import { Button, Card, Col, Divider, Pagination, Row, Spin } from "antd";
import TaskCard from "./TaskCard";
import Icons from "../common/components/Icons";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import I18 from "../common/chrome/I18";
import { AppContext } from "../home/Home";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import FeatureDetails from "../home/FeatureDetails";
import SendEvent from "../common/Helpers/SendEvent";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";


class TaskQueue extends React.Component {
  constructor(props) {
    super(props);
    this.postsInARow = ApplicationConstants.taskQueue.POSTS_IN_ONE_ROW;
    this.postsInOnePage = ApplicationConstants.taskQueue.POSTS_IN_ONE_PAGE;
    this.state = {
      pageNumber: 1
    };
  }

  getRowsColumns() {
    let rowCount = Math.ceil(this.props.tasks.length / this.postsInARow);
    let final = [];
    let tasks = this.props.tasks.slice(
      (this.state.pageNumber - 1) * this.postsInOnePage,
      this.state.pageNumber * this.postsInOnePage
    );
    for (let i = 0; i < rowCount; i++) {
      let row = [];
      for (let j = 0; j < this.postsInARow; j++) {
        let key = i * this.postsInARow + j;
        if (key >= tasks.length) {
          final.push(
            <div key={key.toString() + "div"}>
              <Row gutter={8}>{row}</Row>
            </div>
          );
          return final;
        }
        row.push(
          <Col span={8} key={key.toString() + "col"}>
            <TaskCard
              task={tasks[key]}
              deleteTask={this.props.deleteTask}
              key={key}
              displayOptions={true}
              manualCompleteTask={this.props.manualCompleteTask}
            />
          </Col>
        );
      }
      final.push(
        <div key={i.toString() + "div"}>
          <Row gutter={8}>{row}</Row>
          <Divider dashed={true}/>
        </div>
      );
    }
    return final;
  }

  changePageNumber = pgNumber => {
    this.setState({ pageNumber: pgNumber });
  };

  noPermissions = () => {
    sendNotification(NotificationTypeEnum.Failure, I18("engage_trial_over_message"), true);
  };

  getDownloadTasksData = () => {
    return this.props.tasks.map(t => {
      t['task_url'] = t.getURL();
      return t;
    });
  };

  render() {
    let toggleProps = {};
    let setConfigurationLink = FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS.TARGETED_LEADS.FEATURES.SET_CONFIGURATIONS.ACTION;

    if (this.props.isFetchingPosts) {
      toggleProps["disabled"] = true;
    }

    let automationOnOffToggleSwitch = <div style={{ textAlign: "center" }}>
      <AppContext.Consumer>
        {value => {
          let permissions = value.permissions;
          let onButtonPressedCallback = () => {
            if (this.props.tasks.length > ApplicationConstants.automation.MAX_TASKS_IN_QUEUE) {
              sendNotification(NotificationTypeEnum.Success, "You already have about 50+ tasks. Complete them first 😃");
              return;
            }
            SendEvent(AnalyticsCategoryEnum.AUTOMATION, "Get tasks button clicked", "")
            this.props.onTaskOnOffChange(true);
          };
          if (!permissions.engage) {
            onButtonPressedCallback = this.noPermissions;
          }
          return <Card title={<div>Set configurations | Get targeted tasks | Complete them</div>}
                       style={{ backgroundColor: "#fbfbfb" }}>

            <Row>

              <Col span={10}>
                <Link to={setConfigurationLink}><Button type="primary" icon="setting" style={{fontSize: 18}}>Set Configuration</Button></Link>
              </Col>
              <Col span={14}><Button type="primary" icon="interaction" style={{fontSize: 18}}
                                     onClick={onButtonPressedCallback} {...toggleProps}>
                Get Tasks
              </Button></Col>
            </Row>
          </Card>
            ;

        }}
      </AppContext.Consumer>

    </div>;


    if (this.props.tasks.length < 1 && this.props.areAutomationsSet && this.props.areActionsSet && this.props.isFetchingPosts) {
      return (
        <div style={{ textAlign: "center" }}>
          <div style={{ textAlign: "right" }}><NeedHelp type={NeedHelpEnum.AUTOMATION_CONFIGURATIONS}/>
          </div>
          <br/>
          <div className="center"><Spin size="large"/></div>
        </div>
      );
    } else if (this.props.tasks.length < 1) {
      return (
        <div>
          <div style={{ textAlign: "right" }}><NeedHelp type={NeedHelpEnum.AUTOMATION_CONFIGURATIONS}/>
          </div>
          <br/>
          <h1 style={{
            width: "98%",
            height: "2%",
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: 11,
            backgroundColor: "#FFF",
            textAlign: "center"
          }}>
            No Tasks yet. Set configurations first and press Get Task button.
          </h1>
          <br/>
          {automationOnOffToggleSwitch}
        </div>

      );
    }

    let downloadData = this.getDownloadTasksData();
    let filename = "best_tasks_to_perform_by_profilebuddy";
    let columns = [
      {label: "Task Type", value: "type"},
      {label: "Username", value: "username"},
      {label: "User ID", value: "userID"},
      {label: "Reason Why to perform this task", value: "origin"},
      {label: "Task URL", value: "task_url"},
    ];

    return (
      <React.Fragment>
        <div style={{ textAlign: "right" }}><NeedHelp type={NeedHelpEnum.AUTOMATION_CONFIGURATIONS}/>
        </div>
        <br/>
        {this.props.isFetchingPosts ? <div className="center"><Spin size="large"/></div> : <React.Fragment/>}
        <Card
          style={{
            backgroundColor: "#FFF",
            margin: 4,
            padding: 4
          }}
          title={<div>{Icons.OPTIONS}&nbsp;&nbsp;Actions</div>}
        >
          <Row gutter={16}>
            <Col span={10}>
              <DownloadFileInExcel
                filename={filename}
                columns={columns}
                data={downloadData}
                blueButton={false}
                buttonName="Download Tasks in XLS (Excel)"
              />
            </Col>
            <Col span={7}>
              <Link to={setConfigurationLink}><Button icon="setting">Set Configuration</Button></Link>
            </Col>
            <Col span={7}>
              <Button icon="delete" onClick={this.props.clearTasks} {...toggleProps}>Clear Tasks</Button>
            </Col>
          </Row>
        </Card>

        <br/>
        {this.props.tasks.length !== 0 ? <div className="center">
          Tasks: {this.props.tasks.length}
        </div> : <React.Fragment/>}
        <Card
          style={{
            backgroundColor: "#FFF",
            margin: 4,
            padding: 4
          }}
          title={<div>{Icons.TASKS}&nbsp;&nbsp;Tasks to be performed</div>}
        >
          {this.getRowsColumns()}
        </Card>
        <br/>
        <Pagination
          style={{ textAlign: "center" }}
          current={this.state.pageNumber}
          total={this.props.tasks.length}
          onChange={this.changePageNumber}
          pageSize={this.postsInOnePage}
        />
      </React.Fragment>
    );
  }
}

export default TaskQueue;
