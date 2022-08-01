import React from 'react';
import {Col, Row, Select} from "antd";

const {Option} = Select;

class FollowerFollowingSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.userObj) {
      return <div/>
    }
    let username = this.props.userObj.username;
    return (
      <Row style={{marginTop: 8}}>
        <Col span={12}>
          <strong>Follows {username}</strong>:&nbsp;&nbsp;&nbsp;
          <Select defaultValue={this.props.defaultValueSubjectFollowsUser}
                  style={{width: 120}}
                  onChange={this.props.onSubjectFollowsUserChange}>
            <Option value="any">Any</Option>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Col>
        <Col span={12}>
          <strong>Followed by {username}</strong>:&nbsp;&nbsp;&nbsp;
          <Select defaultValue={this.props.defaultValueUserFollowsSubject}
                  style={{width: 120}}
                  onChange={this.props.onUserFollowsSubjectChange}>
            <Option value="any">Any</Option>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Col>
      </Row>
    )
  }
}

export default FollowerFollowingSelect;
