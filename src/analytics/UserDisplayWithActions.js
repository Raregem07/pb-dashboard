import React from "react";
import {Avatar, Table} from "antd";
import Task from "../common/models/Task";
import UserActions from "./UserActions";
import TaskEnum from "./TaskEnum";
import ExpandedRowShowDetailedUser from "./ExpandedRowShowDetailedUser";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import sendNotification from "../common/SendNotification";
import DataDownloader from "./DataDownloader";
import FollowUserTask from "../common/models/task/FollowUserTask";
//import UserPostOrigin from "../common/models/UserPostOrigin";
import UserPostOriginEnum from "../common/models/UserPostOriginEnum";
import UnfollowUserTask from "../common/models/task/UnfollowUserTask";
import CommentPostTask from "../common/models/task/CommentPostTask";
import getLastNPostsForAUser from "../common/api_call/GetLastNPostsForUser";
//import GetRandomComment from "../common/store/GetRandomComment";
import LikePostTask from "../common/models/task/LikePostTask";
import Min from "../common/Helpers/Min";
import SendEvent from "../common/Helpers/SendEvent";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";

const {Column} = Table;

class UserDisplayWithActions extends React.Component {
  constructor(props) {
    super(props);
  }


  getSpecificTasks(taskType, count) {
    let tasks = [];
    for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
      let task = new Task(
        taskType,
        this.props.data[this.state.selectedRowKeys[i]],
        count
      );
      tasks.push(task);
    }
    return tasks;
  }

  render() {

    if (!this.props.isDetailed) {
      return (
        <div>
          <DataDownloader
            isDataReceived={true}
            username={this.props.username}
            data={this.props.data}
            location={this.props.location}
            removeUsers={this.props.removeUsers}
            paginatedDownload={this.props.paginatedDownload}
          />

          <div className="center"><h4>Only top 1000 records are shown here matching the condition else too much data can crash your browser. <strong>Download data to get all records</strong></h4></div>
          <br />
          <div
            style={{
              margin: 4,
              textAlign: "center",
              backgroundColor: "#f5f5f5"
            }}
          >
            Total Count: <strong>{this.props.data.length}</strong>
          </div>

          <Table
            pagination={{
              pageSize: 500,
              pageSizeOptions: ["50", "100", "500", "1000", "10000"],
              showSizeChanger: true
            }}
            dataSource={this.props.data.slice(0,1000)}
          >
            {/*<Column*/}
            {/*  title="Profile Image"*/}
            {/*  dataIndex="profileURL"*/}
            {/*  key="profileURL"*/}
            {/*  render={(cell, row, index) => {*/}
            {/*    return <Avatar size={64} src={cell}/>;*/}
            {/*  }}*/}
            {/*/>*/}
            <Column title="Username" dataIndex="username" key="username"/>
            <Column title="Full Name" dataIndex="fullName" key="fullName"/>
          </Table>
        </div>
      );
    } else {
      return (
        <div>

          <div className="center"><h4>Only top 1000 records are shown here matching the condition else too much data can crash your browser. <strong>Download data to get all records</strong></h4></div>
          <br />
          <div
            style={{
              margin: 4,
              textAlign: "center",
              backgroundColor: "#f5f5f5"
            }}
          >
            Total Count: <strong>{this.props.data.length}</strong>
          </div>
          <Table
            pagination={{
              pageSize: 50,
              pageSizeOptions: ["50", "100", "500", "1000", "10000"],
              showSizeChanger: true
            }}
            dataSource={this.props.data}
          >
            {/*<Column*/}
            {/*  title="Profile Image"*/}
            {/*  dataIndex="profileURL"*/}
            {/*  key="profileURL"*/}
            {/*  render={(cell, row, index) => {*/}
            {/*    return <Avatar size={64} src={cell}/>;*/}
            {/*  }}*/}
            {/*/>*/}
            <Column title="Username" dataIndex="username" key="username"/>
            {/*<Column title="Full Name" dataIndex="fullName" key="fullName"/>*/}
            {/*<Column title="Biography" dataIndex="biography" key="biography"/>*/}
            <Column
              title="Followers"
              dataIndex="followerCount"
              key="followerCount"
              sorter={(a, b) => a.followerCount - b.followerCount}
            />
            <Column
              title="Following"
              dataIndex="followingCount"
              key="followingCount"
              sorter={(a, b) => a.followingCount - b.followingCount}
            />

            {/*<Column*/}
            {/*  title="Engagement Rate (%)"*/}
            {/*  dataIndex="engagementRate"*/}
            {/*  key="engagementRate"*/}
            {/*  sorter={(a, b) => a.engagementRate - b.engagementRate}*/}
            {/*/>*/}
            {/*<Column*/}
            {/*  title="Mutual Connection Count"*/}
            {/*  dataIndex="mutualConnectionCount"*/}
            {/*  key="mutualConnectionCount"*/}
            {/*/>*/}
            {/*<Column*/}
            {/*  title="Business Category Name"*/}
            {/*  dataIndex="businessCategoryName"*/}
            {/*  key="businessCategoryName"*/}
            {/*/>*/}
            {/*<Column*/}
            {/*  title="Website in Profile"*/}
            {/*  dataIndex="externalURL"*/}
            {/*  key="externalURL"*/}
            {/*/>*/}
            <Column
              title="Posts"
              dataIndex="postCount"
              key="postCount"
              sorter={(a, b) => a.postCount - b.postCount}
            />
          </Table>
        </div>
      );
    }
  }
}

export default UserDisplayWithActions;
