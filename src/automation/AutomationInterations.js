import React from 'react';
import {Col, Icon, InputNumber, Row} from "antd";
import AutomationMaxConstraints from "../common/constants/AutomationMaxConstraints";

function automationInteractions(props) {
  return (
    <div style={{textAlign: 'center'}}>
      <Row>
        <Col style={{textAlign: 'right'}} span={10}>
          <Icon type="like"/>
        </Col>
        <Col span={14} style={{textAlign: 'left'}}>
          &nbsp;&nbsp;&nbsp;&nbsp; Max Likes: <InputNumber value={props.maxLikesAutomation}
                                               onChange={props.onMaxLikesAutomationChange}
                                               max={AutomationMaxConstraints.MAX_LIKES}/>
        </Col>
      </Row><br/>
      <Row>
        <Col style={{textAlign: 'right'}} span={10}>
          <Icon type="message"/>
        </Col>
        <Col span={14} style={{textAlign: 'left'}}>
          &nbsp;&nbsp;&nbsp;&nbsp; Max Comments: <InputNumber value={props.maxCommentsAutomation}
                                                  onChange={props.onMaxCommentsAutomationChange}
                                                  max={AutomationMaxConstraints.MAX_COMMENTS}
        />
        </Col>

      </Row><br/>
      <Row>
        <Col style={{textAlign: 'right'}} span={10}>
          <Icon type="contacts"/>
        </Col>
        <Col span={14} style={{textAlign: 'left'}}>&nbsp;&nbsp;&nbsp;&nbsp; Max Follow: <InputNumber
          value={props.maxFollowAutomation}
          onChange={props.onMaxFollowAutomationChange}
          max={AutomationMaxConstraints.MAX_FOLLOWS}
        />
        </Col>
      </Row><br/>
    </div>
  );
}

export default automationInteractions;