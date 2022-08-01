import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Button, Card, Col, Row } from "antd";
import Icons from "../common/components/Icons";
import { CSVLink } from "react-csv";
import ReactGA from "react-ga";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";



function getMonthFromIndex(index) {
  switch (index) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
}

function downloadButtonPressed(type) {
  ReactGA.event({
    category: type,
    action: `Download get posts by Months Button Clicked`
  });
}


function MonthlyTrends(props) {
  let posts = props.posts;
  if (posts.length < 1) {
    return <React.Fragment />;
  }

  let sortedPosts = props.posts.sort((a, b) => {
    return a.taken_at_timestamp < b.taken_at_timestamp ? -1 : 1;
  });

  let firstPostYear = new Date(
    sortedPosts[0].taken_at_timestamp * 1000
  ).getFullYear();
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let firstPostMonth = new Date(
    sortedPosts[0].taken_at_timestamp * 1000
  ).getMonth();
  /*
  {
    "2019": {
      "January": [],
      "February": [],
      "March": [],
      ...
      ...
    },
    "2020": {
      ...
    }
  }
   */
  let monthWisePosts = {};

  for (let i = firstPostYear; i <= currentYear; i++) {
    for (let j = 0; j < 12; j++) {
      if (!monthWisePosts[i.toString()]) {
        monthWisePosts[i.toString()] = {};
      }
      monthWisePosts[i.toString()][j.toString()] = [];
    }
  }

  for (let i = 0; i < sortedPosts.length; i++) {
    let p = sortedPosts[i];
    let date = new Date(p.taken_at_timestamp * 1000);
    let year = date.getFullYear();
    let month = date.getMonth().toString();
    monthWisePosts[year.toString()][month].push(p);
  }

  let monthWisePostsArray = [];


  for (let year in monthWisePosts) {
    for (let month in monthWisePosts[year]) {
      let monthInt = parseInt(month);
      let yearInt = parseInt(year);
      if (
        (yearInt === firstPostYear && monthInt >= firstPostMonth) ||
        yearInt > firstPostYear && yearInt < currentYear ||
        (yearInt === currentYear && monthInt <= currentMonth)
      ) {
        monthWisePostsArray.push({
          postsCount: monthWisePosts[year][month].length,
          month: parseInt(month),
          year: parseInt(year),
          readableValue: `${getMonthFromIndex(parseInt(month))}, ${year}`
        });
      }
    }
  }

  let columns = [
    {label: "Month-Year", value: "readableValue"},
    {label: "count", value: "postsCount"},
  ];


  return (
    <React.Fragment>
      <Card
        title={
          <div>
            <Row>
              <Col span={16}>
                {Icons.POST} &nbsp;&nbsp;&nbsp;Month Wise post analysis
              </Col>
              <Col span={8}>
                <DownloadFileInExcel
                  filename="posts_count_by_month"
                  columns={columns}
                  data={monthWisePostsArray}
                  blueButton={false}
                  buttonName="Download Data in XLS (Excel)"
                />
              </Col>
            </Row>
          </div>
        }
        style={{ margin: 12, backgroundColor: "#fbfbfb" }}
      >
        <BarChart
          width={700}
          height={400}
          data={monthWisePostsArray}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="readableValue" />
          <YAxis dataKey="postsCount" type="number" domain={[0, 'dataMax + 1']}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="postsCount" fill="#BA093B" />

        </BarChart>
      </Card>
    </React.Fragment>
  );
}

export default MonthlyTrends;
