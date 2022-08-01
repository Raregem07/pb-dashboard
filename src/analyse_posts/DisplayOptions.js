import React from "react";
import { Card, Col, Input, InputNumber, Radio, Row } from "antd";
import AnalysePostsDisplayEnum from "./AnalysePostsDisplayEnum";

const DisplayOptions = props => {
  return (
    <Card
      style={{
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        margin: 4,
        padding: 4
      }}
    >
      {props.onlyPosts ? (
        <div/>
      ) : (
        <Radio.Group
          value={props.whatToShowValue}
          onChange={props.onWhatToShowChange}
          style={{ marginBottom: 4 }}
        >
          <Radio.Button
            style={{ margin: 20 }}
            value={AnalysePostsDisplayEnum.USERS}>
            Show User wise statistics
          </Radio.Button>

          {" or "}
          <Radio.Button
            style={{ margin: 20 }}
            value={AnalysePostsDisplayEnum.POSTS}>
            Show Post wise statistics
          </Radio.Button>
        </Radio.Group>
      )}
      {props.whatToShowValue === AnalysePostsDisplayEnum.POSTS ? <div>
        <Row>
          <Col span={12}>
            Only those posts which have <strong>likes</strong> Greater than:{" "}
            <InputNumber
              defaultValue={props.likesGreaterThanEqualToValue}
              onChange={props.onLikesGreaterThanChange}
            />
          </Col>
          <Col span={12}>
            Only those posts which have <strong>likes</strong> less than than:
            <InputNumber
              defaultValue={props.likesLessThanValue}
              onChange={props.onLikesLessThanChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            Only those posts which have <strong>Comments</strong> greater than
            than:
            <InputNumber
              defaultValue={props.commentsGreaterThanEqualToValue}
              onChange={props.onCommentsGreaterThanChange}
            />
          </Col>
          <Col span={12}>
            Only those posts which have <strong>Comments</strong> less than than:
            <InputNumber
              defaultValue={props.commentsLessThanValue}
              onChange={props.onCommentsLessThanChange}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 4 }}>
          <Col>
            Should have{" "}
            <Input
              value={props.bioSubstring}
              placeholder="Enter word in post text"
              onChange={props.onBioSubstringChange}
              style={{ width: 400 }}
            />{" "}
            in bio
          </Col>
        </Row>
      </div> : <div/>}
    </Card>
  );
};

export default DisplayOptions;
