import React from "react";
import {Avatar, Button, Card, Table} from "antd";

const { Column } = Table;


class DisplaySimilarUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.similarAccounts.length < 1) {
      return <React.Fragment />
    }
    return <React.Fragment>
      <div className="center">
        <br />
        <h3>Similar Users with @{this.props.similarAccountName} Discovered: {this.props.similarAccounts.length} </h3>
        <br />
        <Table dataSource={this.props.similarAccounts} pagination={true}>
          <Column
            title="Image"
            key="profile_pic"
            render={(cell, row, index) => {
              return <Avatar size={64} src={cell.profile_pic_url} />;
            }}
          />
          <Column title="Username" dataIndex="username" key="username" />
          <Column title="Full Name" dataIndex="full_name" key="full_name" />
          <Column
            title="Open Profile"
            key="profile"
            render={(cell, row, index) => {
              return <a href={"https://www.instagram.com/"+cell.username} target={"_blank"}><Button>Open Profile</Button></a>;
            }}
          />
        </Table>

      </div>
    </React.Fragment>
  }
}

export default DisplaySimilarUsers