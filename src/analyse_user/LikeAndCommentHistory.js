import React from "react";
import { Button, Card, Col, Row } from "antd";
import Icons from "../common/components/Icons";
import ReactGA from "react-ga";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { CSVLink } from "react-csv";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";


function downloadButtonPressed(type) {
  ReactGA.event({
    category: type,
    action: `Download Button Clicked`
  });
}

function getChartData(posts) {
  let i = 0;
  let sortedPosts = posts.slice().sort((a, b) => {
    return a.taken_at_timestamp < b.taken_at_timestamp ? -1 : 1;
  });
  return sortedPosts.map(p => {
    p["key"] = i++;
    p["name"] = p.postDateInReadableFormat();
    return p;
  });
}

function getDownloadableData(sortedPosts) {
  return sortedPosts.map(p => {
    p["post_url"] = "https://www.instagram.com/p/"+p.shortcode+"/";
    return p;
  });
}

function LikeAndCommentHistory(props) {
  let data = getChartData(props.posts);
  let xlsData = getDownloadableData(data);

  let columns=[
    {label: "Date", value: "name"},
    {label: "Like Count", value: "like_count"},
    {label: "Comment Count", value: "comment_count"},
    {label: "Post URL", value: "post_url"},
    {label: "Post Caption", value: "text"},
  ];
  return <React.Fragment>
    <Card
      title={
        <div>
          <Row>
            <Col span={12}>{Icons.POST} &nbsp;&nbsp;&nbsp;Likes and Comment <strong>History</strong></Col>
            <Col span={12}>
              <DownloadFileInExcel
                filename="like_comment_history"
                columns={columns}
                data={xlsData}
                blueButton={false}
                buttonName="Download Data in XLS (Excel)"
              />
            </Col>
          </Row>
        </div>}
      style={{ margin: 12, backgroundColor: "#fbfbfb" }}
    >
      <LineChart
        width={700}
        height={500}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        {props.likeCountDisabled ? <React.Fragment /> : <Line type="monotone" dataKey="like_count" stroke="#8884d8" activeDot={{ r: 8 }}/>}
        <Line type="monotone" dataKey="comment_count" stroke="#82ca9d"/>
      </LineChart>
    </Card>
  </React.Fragment>;
}

export default LikeAndCommentHistory;
