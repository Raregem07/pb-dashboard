import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { Button, Card, Col, Row, Select } from "antd";
import Icons from "../common/components/Icons";
import { CSVLink } from "react-csv";
import ReactGA from "react-ga";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";

const { Option } = Select;

function convertTimeToReadableValue(time) {
  switch (time) {
    case "0":
      return "00:00 - 03:00";
    case "1":
      return "00:00 - 03:00";
    case "2":
      return "00:00 - 03:00";
    case "3":
      return "03:00 - 06:00";
    case "4":
      return "03:00 - 06:00";
    case "5":
      return "03:00 - 06:00";
    case "6":
      return "06:00 - 09:00";
    case "7":
      return "06:00 - 09:00";
    case "8":
      return "06:00 - 09:00";
    case "9":
      return "09:00 - 12:00";
    case "10":
      return "09:00 - 12:00";
    case "11":
      return "09:00 - 12:00";
    case "12":
      return "12:00 - 15:00";
    case "13":
      return "12:00 - 15:00";
    case "14":
      return "12:00 - 15:00";
    case "15":
      return "15:00 - 18:00";
    case "16":
      return "15:00 - 18:00";
    case "17":
      return "15:00 - 18:00";
    case "18":
      return "18:00 - 21:00";
    case "19":
      return "18:00 - 21:00";
    case "20":
      return "18:00 - 21:00";
    case "21":
      return "21:00 - 00:00";
    case "22":
      return "21:00 - 00:00";
    case "23":
      return "21:00 - 00:00";
  }
}

function downloadButtonPressed(type) {
  ReactGA.event({
    category: type,
    action: `Download get posts by Months Button Clicked`
  });
}

function DayWiseTimeTrends(props) {
  let [daySelected, setdaySelected] = useState("Sunday");


  let posts = props.posts;
  let data = [];
  let tempData = {};
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  for (let i = 0; i < days.length; i++) {
    tempData[days[i]] = {};
    for (let j = 0; j < 24; j++) {
      tempData[days[i]][convertTimeToReadableValue(j.toString())] = [];
    }
  }

  for (let i = 0; i < posts.length; i++) {
    let day = posts[i].day;
    let hour = new Date(posts[i].taken_at_timestamp * 1000).getHours();
    tempData[day][convertTimeToReadableValue(hour.toString())].push(posts[i]);
  }

  for (let day in tempData) {
    for (let time in tempData[day]) {
      data.push({ time: time, day: day, value: tempData[day][time].length });
    }
  }


  let dayWiseData = data.filter(obj => obj.day === daySelected);

  let columns = [
    {label: "Day", value: "day"},
    {label: "Time", value: "time"},
    {label: "Posts Count", value: "value"}
  ];


  return <React.Fragment>
    <Card
      title={
        <div>
          <Row>
            <Col span={12}>
              {Icons.POST} &nbsp;&nbsp;&nbsp;Time wise post trends
            </Col>
            <Col span={12}>
              <DownloadFileInExcel
                filename="day_wise_time_trends"
                columns={columns}
                data={data}
                blueButton={false}
                buttonName="Download Data in XLS (Excel)"
              />
            </Col>
          </Row>
        </div>
      }
      style={{ margin: 12, backgroundColor: "#fbfbfb" }}
    >
      <div
        className="center"
        style={{
          fontSize: 20
        }}
      >
        Select Day to see Posting Time analysis: <Select defaultValue={daySelected} style={{ width: 120 }} onChange={(value) => setdaySelected(value)}>
          <Option value="Sunday">Sunday</Option>
          <Option value="Monday">Monday</Option>
          <Option value="Tuesday">Tuesday</Option>
          <Option value="Wednesday">Wednesday</Option>
          <Option value="Thursday">Thursday</Option>
          <Option value="Friday">Friday</Option>
          <Option value="Saturday">Saturday</Option>
        </Select>
      </div>
      <br />
      <BarChart
        width={700}
        height={400}
        data={dayWiseData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="time"/>
        <YAxis dataKey="value" type="number" domain={[0, "dataMax + 1"]}/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey="value" fill="#BA093B"/>

      </BarChart>
    </Card>
  </React.Fragment>;
}

export default DayWiseTimeTrends;
