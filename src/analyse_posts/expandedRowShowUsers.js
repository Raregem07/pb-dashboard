import { Avatar, Col, Row } from "antd";
import React from "react";



const ExpandedRowShowUsers = (props) => {
  let likedUsers = props.likedUsers.map((i, k) => {
    return (<Row key={k} style={{margin: 8}}>
      <Col span={8}><Avatar shape="square" size={128} src={i.profileURL}/></Col>
      <Col span={16}>{i.username}</Col>
    </Row>);
  } );

  let commentedUsers = props.commentedUsers.map((i, k) => {
    return (
      <Row key={k} style={{margin: 8}}>
        <Col span={8}><Avatar shape="square" size={128} src={i.profileURL}/></Col>
        <Col span={8}>{i.username}</Col>
        <Col span={8}><strong>Comment Value:</strong> {i.commentValue}</Col>
      </Row>);
  } );

  return(<div>
    <Row>
      <h2>Commented Users</h2> <br />
      {commentedUsers}
    </Row>
    <Row>
      <h2>Liked Users</h2> <br />
      {likedUsers}
    </Row>
  </div>)
};

export default ExpandedRowShowUsers;