import React from 'react';
import {Col, InputNumber, Row, Select} from "antd";
import MediaAgeEnum from "../common/models/MediaAgeEnum";

const {Option} = Select;

class AutomationFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={14}>
            Min <strong>Likes</strong>: <InputNumber value={this.props.minLikes}
                                                     onChange={this.props.onMinLikesChange}
                                                     max={20}
          />
          </Col>
          <Col span={10}>
            Max <strong>Likes</strong>: <InputNumber value={this.props.maxLikes}
                                                     onChange={this.props.onMaxLikesChange}
          />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col span={14}>
            Min <strong>Comments</strong>: <InputNumber value={this.props.minComments}
                                                        onChange={this.props.onMinCommentsChange}
                                                        max={2}
          />
          </Col>
          <Col span={10}>
            Max <strong>Comments</strong>: <InputNumber value={this.props.maxComments}
                                                        onChange={this.props.onMaxCommentsChange}/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col span={14}>
            Min <strong>Followers</strong>: <InputNumber value={this.props.minFollowers}
                                                         onChange={this.props.onMinFollowersChange}/>
          </Col>
          <Col span={10}>
            Max <strong>Followers</strong>: <InputNumber value={this.props.maxFollowers}
                                                         onChange={this.props.onMaxFollowersChange}/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col span={14}>
            Min <strong>Following</strong>: <InputNumber value={this.props.minFollowing}
                                                         onChange={this.props.onMinFollowingChange}/>
          </Col>
          <Col span={10}>
            Max <strong>Following</strong>: <InputNumber value={this.props.maxFollowing}
                                                         onChange={this.props.onMaxFollowingChange}/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col span={20}>
            <strong>Media Age</strong>:
            <Select value={this.props.mediaAge} style={{width: 120}} onChange={this.props.onMediaAgeChange}>
              <Option value={MediaAgeEnum.UPTO_1_HOUR}>Upto 1 Hour</Option>
              <Option value={MediaAgeEnum.ONE_DAY}>1 Day</Option>
              <Option value={MediaAgeEnum.THREE_DAYS}>3 Days</Option>
              <Option value={MediaAgeEnum.ONE_WEEK}>1 Week</Option>
              <Option value={MediaAgeEnum.ONE_MONTH}>1 Month</Option>
              <Option value={MediaAgeEnum.ANY}>Any</Option>
            </Select>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default AutomationFilter;
