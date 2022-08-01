import React from 'react';
import Icons from "../common/components/Icons";
import { Button, Card, Col, Row } from "antd";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { CSVLink } from "react-csv";
import ReactGA from "react-ga";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";

function downloadButtonPressed(type) {
  ReactGA.event({
    category: type,
    action: `Download get posts by days Button Clicked`
  });
}

function getPostsBydays(posts) {
  let postDays = {
    "Sunday": 0,
    "Monday": 0,
    "Tuesday": 0,
    "Wednesday": 0,
    "Thursday": 0,
    "Friday": 0,
    "Saturday": 0,
  };
  posts.map(p => {
    postDays[p.day]++;
    return p;
  });
  let data = [];
  for (let day in postDays) {
    data.push({name: day, count: postDays[day]});
  }
  return data;
}

function PostsByDays(props) {
  let posts = props.posts;
  let postsBydays=getPostsBydays(posts);

  let columns = [
    {label: "Day", value: "name"},
    {label: "Count", value: "count"},
  ];


  return <Card
    title={
      <div>
        <Row>
          <Col span={12}>{Icons.POST} &nbsp;&nbsp;&nbsp;Post By Days</Col>
          <Col span={12}>
            <DownloadFileInExcel
              filename="posts_by_days"
              columns={columns}
              data={postsBydays}
              blueButton={false}
              buttonName="Download Data in XLS (Excel)"
            />
          </Col>
        </Row>
      </div>}
    style={{ margin: 12, backgroundColor: "#fbfbfb"}}
  >
    <BarChart
      width={700}
      height={400}
      data={postsBydays}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis dataKey="count" type="number" domain={[0, 'dataMax + 1']}/>
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#BA093B" />

    </BarChart>
  </Card>
}

export default PostsByDays;
