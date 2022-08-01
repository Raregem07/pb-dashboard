import React from "react";
import AnalysePostsDisplayEnum from "./AnalysePostsDisplayEnum";
import { Avatar, Table } from "antd";
import ExpandedRowShowPosts from "./ExpandedRowShowPosts";
import { Link } from "react-router-dom";
import FeatureDetails from "../home/FeatureDetails";

const { Column } = Table;

class UsersDisplayer extends React.Component {
  constructor(props) {
    super(props);
  }

  makeData() {
    let users = this.props.users;
    let tableData = [];
    for (let i = 0; i < users.length; i++) {
      users[i]["key"] = i;
      users[i]["likeCount"] = users[i].likedPosts.length;
      users[i]["commentCount"] = users[i].commentedPosts.length;
      users[i]["percentPostsLiked"]=Math.ceil((users[i].likedPosts.length * 100) / this.props.posts.length );
      users[i]["percentPostsCommented"]=Math.ceil((users[i].commentedPosts.length * 100) / this.props.posts.length );
      tableData.push(users[i]);
    }
    return tableData;
  }

  render() {
    if (this.props.whatToShow !== AnalysePostsDisplayEnum.USERS || this.props.users.length === 0) {
      return <div />;
    }
    return (
      <div style={{ margin: 4, padding: 4, textAlign: "center" }}>
        <div
          style={{
            width: "90%",

            paddingTop: "1%",
            paddingBottom: "1%",
            paddingLeft: "2%",
            paddingRight: "1%",
            marginLeft: "6%",



            backgroundColor: "#F0C156",
            color: "#FFF",

            boxShadow: "0px 3px 6px #00000029",
            borderRadius: 6,
            font: "Black 29px/35px Roboto",

            fontSize: "120%",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "2%",
            marginBottom: "2%"
          }}
        >
          Download likers/commenters & Go to &nbsp; <Link to={FeatureDetails.TIER_3.ACTION} className="attractive-box-text">Email Extractor</Link> &nbsp; to get emails & other details of these users.
        </div>
        <h2>Users</h2>
        <br />
        <h3>Only 2000 users are shown here. Download to get all </h3>
        <strong>Total Users: {this.props.users.length}</strong> &nbsp;&nbsp;
        <strong>Total Posts for analysis: {this.props.posts.length}</strong>
        <Table
          expandedRowRender={record => (
            <ExpandedRowShowPosts
              likedPosts={record.likedPosts}
              commentedPosts={record.commentedPosts}
              commentedValues={record.commentedValues}
            />
          )}
          pagination={{
            pageSize: 100,
            pageSizeOptions: ["50", "100", "500", "1000", "10000"],
            showSizeChanger: true
          }}
          dataSource={this.makeData().slice(0,2000)}
        >
          <Column
            title="Profile Image"
            dataIndex="profileURL"
            key="profileURL"
            render={(cell, row, index) => {
              return <Avatar shape="square" size={128} src={cell} />;
            }}
          />
          <Column title="Username" dataIndex="username" key="username" />
          {this.props.singlePost ? <React.Fragment /> : <Column
            title="Like Count"
            dataIndex="likeCount"
            key="likeCount"
            sorter={(a, b) => a.likedPosts.length - b.likedPosts.length}
          /> }
          {this.props.singlePost ? <React.Fragment /> : <Column
            title="Liked Percentage %"
            dataIndex="percentPostsLiked"
            key="percentPostsLiked"
            sorter={(a, b) => a.percentPostsLiked.length - b.percentPostsLiked.length}
          />}
          <Column
            title="Comment Count"
            dataIndex="commentCount"
            key="commentCount"
            sorter={(a, b) => a.commentedPosts.length - b.commentedPosts.length}
            defaultSortOrder="descend"
          />
          <Column
            title="Comment Percentage %"
            dataIndex="percentPostsCommented"
            key="percentPostsCommented"
            sorter={(a, b) => a.percentPostsCommented.length - b.percentPostsCommented.length}
            defaultSortOrder="descend"
          />
        </Table>
      </div>
    );
  }
}

export default UsersDisplayer;
