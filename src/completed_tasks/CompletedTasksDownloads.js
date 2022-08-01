import React from 'react';
import DateInReadableFormat from "../common/Helpers/DateInReadableFormat";
import { Button } from "antd";
import { CSVLink } from "react-csv";

function getTasksDataInCSV(tasks){
  let headerRow = ["Task Type", "Username", "User ID","Reason Why to perform this task", "Task URL", "Task Completed Date Time"];
  const csvData = [
    headerRow
  ];
  for (let i=0;i<tasks.length;i++) {
    let task = tasks[i];
    let row = [];
    let dateTime = DateInReadableFormat(Math.ceil(task.completedDateTime/1000));
    row.push(task.type, task.username, task.userID, task.origin, task.getURL(), dateTime );
    csvData.push(row);
  }
  return csvData;
}

function CompletedTasksDownloads(props) {
  let completedTasks = props.completedTasks;
  if (completedTasks.length < 1) {
    return <React.Fragment />
  }
  let csvData = getTasksDataInCSV(completedTasks);
  return <React.Fragment>
    <div className="center">
      <CSVLink data={csvData} filename={"completed_tasks.csv"}>
        <Button icon="download">Download Completed Tasks</Button>
      </CSVLink>
    </div>
  </React.Fragment>
}

export default CompletedTasksDownloads;
