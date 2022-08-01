import React from 'react';
import {Col, Row, Switch} from "antd";


const toggleWithName = (props) => {

  let onChange = (checked) => {
    props.onToggle(props.key1, checked);
  };

  return (
    <div style={{margin: 8}}>
      <Row>
        <Col span={12}>
          <strong>{props.name}</strong>
        </Col>
        <Col span={12}>
          <Switch onChange={onChange} checked={props.defaultValue}/>
        </Col>
      </Row>
    </div>
  )
};


export default toggleWithName;