import React from 'react';
import { Col, Icon, Row } from "antd";
import DashboardIcon from "../../common/icons/DashboardIcon";
import TutorialIcon from "../../common/icons/TutorialIcon";
import Tutorial from "../../tutorial/Tutorial";
import SuggestedIcon from "../../common/icons/SuggestedIcon";
import ToolsIcon from "../../common/icons/ToolsIcon";
import faq from "../../common/images/faq.png";

import EmailExtractorIcon from "../../common/icons/EmailExtractorIcon";

function MainLeftSiderButton(props) {
  let classNameSelected = "not-selected-left-menu";
  let icon;
  if (props.selectedKeys[0] === "dashboard" && props.icon === "dashboard") {
    classNameSelected="select-no-change";
  }
  if (props.selectedKeys[0] === "tutorial" && props.icon === "tutorial") {
    classNameSelected="select-no-change";
  }
  if (props.selectedKeys[0] === "tools" && props.icon === "tools") {
    classNameSelected="select-no-change";
  }
  if (props.selectedKeys[0] === "faq" && props.icon === "faq") {
    classNameSelected="select-no-change";
  }

  switch (props.icon) {
    case "dashboard":
      icon = <DashboardIcon />;
      break;
    case "tutorial":
      icon = <TutorialIcon/>;
      break;
    case "tools":
      icon = <ToolsIcon />;
      break;
    case "email":
      icon = <EmailExtractorIcon />;
      break;
    case "suggested":
      icon = <SuggestedIcon />;
      break;
    case "faq":
      icon = <img height={28} width={28} src={faq} alt="faq_icon" />;
      break;

  }


  return <React.Fragment>
    <Row gutter={4}>
      <Col span={1} />
      <Col span={5} style={{paddingTop: "2%"}} >{icon}</Col>
      <Col span={16} style={{fontSize: "150%"}} className={classNameSelected}>{props.name}</Col>
    </Row>
  </React.Fragment>
}

export default MainLeftSiderButton;

