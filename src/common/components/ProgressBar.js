import React from 'react';
import {Progress} from "antd";

const ProgressBar = (props) => {
  if ((props.percentage === 0 && props.notShowOnZero) || props.percentage >= 100) {
    return <div />
  } else {
    return <div>{props.title}: <Progress percent={props.percentage}/></div>
  }
};

export default ProgressBar;