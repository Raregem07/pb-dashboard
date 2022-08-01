import React from 'react';
import {Button} from 'antd';
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import sleep from "../Sleep";



// Props: action, processName, processState

class StartStopButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  onClick = async (e) => {
    this.props.action(e);
    this.setState({disabled: true})
    await sleep(2000);
    this.setState({disabled: false})
  };

  render() {
    let props = this.props;
    let btnClass = props.processState ? "danger" : "primary";
    let buttonName = `Continue ${props.processName}`;
    if (props.processState) {
      buttonName = `Stop ${props.processName}`
    }
    return (
      <Button disabled={this.state.disabled} type={btnClass} onClick={props.action}>
        {buttonName}
      </Button>
    )
  }
}


export default StartStopButton;