import React from "react";
import { Avatar, Card, Col, Collapse, Row } from "antd";

const { Panel } = Collapse;

function ShowPost(props) {
  if (!props.post) {
    return <React.Fragment />;
  }

  let post = props.post;

  return (
    <React.Fragment>
      <Collapse>
        <Panel header="Post Details" key="post details">
          <Card
            title={<div>Post Details</div>}
            style={{ margin: 4, backgroundColor: "#fbfbfb" }}
          >
            <Row>
              <Col span={8}>
                <Avatar
                  style={{ marginLeft: 16 }}
                  src={post.display_url}
                  size={250}
                  shape="square"
                />
              </Col>
              <Col span={16}>
                <Card title="Details">
                  <div
                    style={{
                      backgroundColor: "#FFF",
                      fontSize: 18
                    }}
                  >
                    {post.like_count === -1 ? (
                      <React.Fragment />
                    ) : (
                      <div>
                        {" "}
                        Likes: <strong>{post.like_count}</strong>
                        <br /> Comments: <strong>{post.comment_count}</strong>
                        <br />
                      </div>
                    )}
                    Time: <strong>{post.postDateInReadableFormat()}</strong>
                    <br />
                    <br />
                    Caption: {post.text}
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Panel>
      </Collapse>
    </React.Fragment>
  );
}

export default ShowPost;
