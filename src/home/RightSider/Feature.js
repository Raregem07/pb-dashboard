import React from "react";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../../common/constants/AnalyticsCategoryEnum";
import { animateScroll as scroll } from "react-scroll/modules";
import SendEvent from "../../common/Helpers/SendEvent";

function Feature(props) {
  let text = props.text;
  let colorCode = props.colorCode;
  let marginTop = 0;
  if (text.length > 26) {
    marginTop = "0.7vw";
  }
  let action = props.action;
  let selectedKeys = props.selectedKeys;

  let className="link right-sider-favourites-";
  if (action === selectedKeys[0]) {
    className += "selected";
  } else {
    className += "unselected";
  }

  return (
    <React.Fragment>
      <Link
        className={className}
        to={`${action}`}
        onClick={() => {
          scroll.scrollTo(0);
          SendEvent(AnalyticsCategoryEnum.RIGHT_SIDER_FEATURED_TASK_CLICKED, action, "");
        }}
      >
        <Row>
          <Col span={4} style={{ textAlign: "center", paddingLeft: "0.7vw" }}>
            <div
              style={{
                height: 24,
                width: 24,
                backgroundColor: colorCode,
                borderRadius: 6,
                marginTop: marginTop
              }}
            />
          </Col>
          <Col span={20}>
            <div
              style={{
                fontSize: "110%",
                fontWeight: "bold",
                textAlign: "left",
                marginLeft: 4
              }}
            >
              {text}
            </div>
          </Col>
        </Row>
      </Link>
    </React.Fragment>
  );
}

export default Feature;
