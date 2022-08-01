import React from "react";
import { Button, Card, Col, Row } from "antd";
import Icons from "../common/components/Icons";
import { Bar, BarChart, CartesianGrid, Legend, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { CSVLink } from "react-csv";
import ReactGA from "react-ga";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";

function downloadButtonPressed(type) {
  ReactGA.event({
    category: type,
    action: `Download Button Clicked`
  });
}

function getLikeCommentsBydays(posts) {
  let postDays = {
    "Sunday": { likeCount: 0, commentCount: 0, count: 0 },
    "Monday": { likeCount: 0, commentCount: 0, count: 0 },
    "Tuesday": { likeCount: 0, commentCount: 0, count: 0 },
    "Wednesday": { likeCount: 0, commentCount: 0, count: 0 },
    "Thursday": { likeCount: 0, commentCount: 0, count: 0 },
    "Friday": { likeCount: 0, commentCount: 0, count: 0 },
    "Saturday": { likeCount: 0, commentCount: 0, count: 0 }
  };
  let totalLikes = 0;
  let totalComments = 0;
  posts.map(p => {
    postDays[p.day].likeCount += p.like_count;
    totalLikes += p.like_count;
    postDays[p.day].commentCount += p.comment_count;
    totalComments += p.comment_count;
    postDays[p.day].count += 1;
    return p;
  });
  let averageLikes = Math.floor(totalLikes / posts.length);
  let averageComments = Math.floor(totalComments / posts.length);
  let data = [];
  for (let day in postDays) {
    data.push({
      name: day,
      likes: Math.floor(postDays[day].likeCount / postDays[day].count),
      comments: Math.floor(postDays[day].commentCount / postDays[day].count)
    });
  }
  return { dayWiseData: data, averageLikes: averageLikes, averageComments: averageComments };
}


function AverageLikeAndCommentOnPostDayWise(props) {
  let likeCommentByDays = getLikeCommentsBydays(props.posts);
  // console.log(likeCommentByDays, 'Class: AverageLikeAndCommentOnPostDayWise, Function: , Line 51 likeCommentByDays(): ');
  let columns = [
    {label: "Day", value: "name"},
    {label: "Average Like per Post", value: "likes"},
    {label: "Average Comments per Post", value: "comments"}
  ];


  return <Card
    title={
      <div>
        <Row>
          <Col span={12}>{Icons.POST} &nbsp;&nbsp;&nbsp;Average Engagement <strong>per Post</strong> per week</Col>
          <Col span={12}>
            <DownloadFileInExcel
              filename="average_like_comment_day_wise"
              columns={columns}
              data={likeCommentByDays.dayWiseData}
              blueButton={false}
              buttonName="Download Data in XLS (Excel)"            />
          </Col>
        </Row>
      </div>}
    style={{ margin: 12, backgroundColor: "#fbfbfb" }}
  >
    <BarChart
      width={700}
      height={400}
      data={likeCommentByDays.dayWiseData}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="name"/>
      <YAxis type="number" domain={[0, "dataMax + 1"]}/>
      <Tooltip/>
      <Legend/>
      {props.likeCountDisabled ? <React.Fragment /> : <Bar dataKey="likes" fill="#BA093B"/>}
      {props.likeCountDisabled ? <React.Fragment /> : <ReferenceLine y={likeCommentByDays.averageLikes} label="Average Likes" stroke="black" strokeDasharray="3 3"/>}
      <Bar dataKey="comments" fill="#82ca9d"/>
    </BarChart>
  </Card>;
}

export default AverageLikeAndCommentOnPostDayWise;
