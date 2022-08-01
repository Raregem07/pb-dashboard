import React from 'react';
import { Avatar, Col, Row } from "antd";

class ExpandedRowShowPosts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let likedPosts = this.props.likedPosts.map((i, k) => {
      return (
        <Row key={k} style={{margin: 8}}>
          <Col span={8}><Avatar shape="square" size={128} src={i.display_url}/></Col>
          <Col span={12} style={{paddingTop: 28}}>{i.text.slice(0, 40)+'...'}</Col>
          <Col span={4} style={{paddingTop: 28}}>{i.postDateInReadableFormat()}</Col>
        </Row>
      );
    } );
    let commentedPosts = this.props.commentedPosts.map((i, k) => {
      return (
        <Row key={k} style={{margin: 8}}>
          <Col span={6}><Avatar shape="square" size={128} src={i.display_url}/></Col>
          <Col span={8} style={{paddingTop: 28}}>{i.text.slice(0, 40)+'...'}</Col>
          <Col span={8} style={{paddingTop: 28}}><strong>{this.props.commentedValues[k]}</strong></Col>
          <Col span={2} style={{paddingTop: 28}}>{i.postDateInReadableFormat()}</Col>
        </Row>
      );
    } );

    return(<div>
      <Row>
        <h2>Commented</h2> <br />
        {commentedPosts}
      </Row>
      <Row>
        <h2>Liked Posts</h2> <br />
        {likedPosts}
      </Row>
    </div>)
  }
}

export default ExpandedRowShowPosts;