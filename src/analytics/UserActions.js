import React from "react";
import { Button, Card, Col, Icon, Row } from "antd";
import TaskEnum from "./TaskEnum";
import { InputNumber } from "antd/es";
import ReactGA from "react-ga";

class UserActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      like: 1,
      comment: 1,
      followWithLike: 1
    };
  }

  changeValue = (v, name) => {
    this.setState({ [name]: v });
  };

  followWithLike = () => {
    ReactGA.event({
      category: `User_actions`,
      action: `Follow With Like in ${this.props.location.pathname}`
    });

    this.props.onActionChosen(
      TaskEnum.FOLLOW_WITH_LIKE,
      this.state.followWithLike
    );
  };

  onlyLike = () => {
    ReactGA.event({
      category: `User_actions`,
      action: `Only Like in ${this.props.location.pathname}`
    });

    this.props.onActionChosen(
      TaskEnum.LIKE_POST,
      this.state.like
    );
  };

  follow = () => {
    ReactGA.event({
      category: `User_actions`,
      action: `Follow in ${this.props.location.pathname}`
    });

    this.props.onActionChosen(TaskEnum.FOLLOW);
  };

  unfollow = () => {
    ReactGA.event({
      category: `User_actions`,
      action: `Follow With Like in ${this.props.location.pathname}`
    });

    this.props.onActionChosen(TaskEnum.UNFOLLOW);
  };

  unfollowThenFollow = () => {
    ReactGA.event({
      category: `User_actions`,
      action: `Unfollow Then Follow in ${this.props.location.pathname}`
    });

    this.props.onActionChosen(TaskEnum.UNFOLLOW_THEN_FOLLOW);
  };

  comment = () => {
    ReactGA.event({
      category: `User_actions`,
      action: `Comment in ${this.props.location.pathname}`
    });

    this.props.onActionChosen(
      TaskEnum.COMMENT_ON_POST,
      this.state.comment
    );
  };

  render() {
    return (
      <Card
        title={
          <div>
            <Icon type="double-right"/> &nbsp;&nbsp;&nbsp;Actions
          </div>
        }
        style={{ margin: 12, backgroundColor: "#fbfbfb" }}
      >
        <div style={{ textAlign: "center" }}>
          <Row gutter={8}>
            <Col span={12}>
              <Card
                title={
                  <div>
                    Like (<Icon type="like"/>)
                  </div>
                }
              >
                Last{" "}
                <InputNumber
                  placeholder="2"
                  value={this.state.like}
                  max={5}
                  min={1}
                  onChange={v => this.changeValue(v, "like")}
                />
                &nbsp;Posts<br/><br/>
                <Button
                  disabled={!this.props.hasSelected}
                  onClick={this.onlyLike}
                >
                  Like
                </Button>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={
                  <div>
                    Comment (<Icon type="message"/>)
                  </div>
                }
              >
                Last{" "}
                <InputNumber
                  placeholder="2"
                  value={this.state.comment}
                  max={5}
                  min={1}
                  onChange={v => this.changeValue(v, "comment")}
                />
                &nbsp;Posts<br/><br/>
                <Button
                  disabled={!this.props.hasSelected}
                  onClick={this.comment}
                >
                  Comment
                </Button>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: 6, marginBottom: 6 }} gutter={8}>
            <Col span={12}>
              <Card
                title={
                  <div>
                    Follow(
                    <Icon type="user-add"/>)
                  </div>
                }
              >
                <Button
                  disabled={!this.props.hasSelected}
                  onClick={this.follow}
                >
                  Follow
                </Button>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={
                  <div>
                    UnFollow(
                    <Icon type="user-delete"/>)
                  </div>
                }
              >
                <Button
                  disabled={!this.props.hasSelected}
                  onClick={this.unfollow}
                >
                  Unfollow
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}

export default UserActions;
