import React from "react";
import AnalysePostsDisplayEnum from "./AnalysePostsDisplayEnum";
import { Avatar, Table } from "antd";
import ExpandedRowShowUsers from "./expandedRowShowUsers";

const { Column } = Table;

class PostsDisplayer extends React.Component {
  constructor(props) {
    super(props);
  }

  makeData() {
    let posts = this.props.posts;
    let tableData = [];
    for (let i = 0; i < posts.length; i++) {
      posts[i]["key"] = i;
      posts[i]["likeCount"] = posts[i].likedUsers.length;
      posts[i]["commentCount"] = posts[i].comment_count;
      posts[i]["postURL"] = posts[i].display_url;
      tableData.push(posts[i]);
    }
    return tableData;
  }

  render() {
    if (this.props.whatToShow !== AnalysePostsDisplayEnum.POSTS) {
      return <div />;
    }
    return (
      <div style={{ margin: 4, padding: 4, textAlign: "center" }}>
        <h2>Posts</h2>
        <strong>Total Posts: {this.props.posts.length}</strong>
        <Table
          expandedRowRender={record => (
            <ExpandedRowShowUsers
              likedUsers={record.likedUsers}
              commentedUsers={record.commentedUsers}
            />
          )}
          pagination={{
            pageSize: 50,
            pageSizeOptions: ["50", "100", "500", "1000", "10000"],
            showSizeChanger: true
          }}
          dataSource={this.makeData()}
        >
          <Column
            title="Image of post"
            dataIndex="postURL"
            key="postURL"
            render={(cell, row, index) => {
              return <Avatar shape="square" size={128} src={cell} />;
            }}
          />
          <Column title="Post Bio" dataIndex="text" key="text" />
          <Column
            title="Like Count"
            dataIndex="likeCount"
            key="likeCount"
            sorter={(a, b) => a.likeCount - b.likeCount}
            defaultSortOrder="descend"
          />
          <Column
            title="Comment Count"
            dataIndex="commentCount"
            key="commentCount"
            sorter={(a, b) => a.commentCount - b.commentCount}
            defaultSortOrder="descend"
          />
        </Table>
      </div>
    );
  }
}

export default PostsDisplayer;
