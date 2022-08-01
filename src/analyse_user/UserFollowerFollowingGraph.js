import React from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import DatabaseKeys from "../common/models/DatabaseKeys";
import GetOrSetValue from "../common/store/GetOrSetValue";
import { Button, Card, Col, Row } from "antd";
import Icons from "../common/components/Icons";
import { CSVLink } from "react-csv";
import ReactGA from "react-ga";
import DateInReadableFormat from "../common/Helpers/DateInReadableFormat";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";


class UserFollowerFollowingGraph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
  }


  async componentDidMount() {
    let usersDataObj = await GetOrSetValue(DatabaseKeys.USERS_DATA, {});
    if (usersDataObj === {}) {
      return;
    }
    let selectedUserData = usersDataObj[this.props.username];
    this.setState({ userData: selectedUserData });
  }

  getData() {
    let i = 0;
    return this.state.userData.map(u => {
      u["dateTime"] = DateInReadableFormat(u.timeCaptured);
      u["key"] = i++;
      return u;
    });
  }

  getCSVData() {
    return this.state.userData.map(u => {
      u["dateTime"] = DateInReadableFormat(u.timeCaptured);
      return u;
    });
  }

  render() {
    let data = this.getData();
    let downloadData = this.getCSVData();
    let columns = [
      {label: "Date Time", value: "dateTime"},
      {label: "Followers Count", value: "followerCount"},
      {label: "Following Count", value: "followingCount"},
    ];
    return <React.Fragment>
      <Card
        title={
          <div>
            <Row>
              <Col span={12}>{Icons.FOLLOW} &nbsp;&nbsp;&nbsp;Followers/Following Trends</Col>
              <Col span={12}>
                <DownloadFileInExcel
                  filename={this.props.username+"_follower_following_trends"}
                  columns={columns}
                  data={downloadData}
                  blueButton={false}
                  buttonName="Download Data in XLS (Excel)"
                />
              </Col>
            </Row>
          </div>}
        style={{ margin: 12, backgroundColor: "#fbfbfb" }}
      >
        {this.state.userData.length < 5 ?
          <h1>Started collecting Follower-Following data for <strong>{this.props.username}</strong>. Everyday
            Followers-Followings will be scraped</h1> : <React.Fragment/>}

        <br/>

        <LineChart
          width={700}
          height={500}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="dateTime"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Line type="monotone" dataKey="followerCount" stroke="#82ca9d"/>
          <Line type="monotone" dataKey="followingCount" stroke="#8884d8"/>
        </LineChart>
      </Card>
    </React.Fragment>;
  }
}

export default UserFollowerFollowingGraph;
