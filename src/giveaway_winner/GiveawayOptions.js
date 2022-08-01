import React from 'react';
import Icons from "../common/components/Icons";
import { Avatar, Button, Card, Col, Row } from "antd";
import GetRandomNumberFrom1ToN from "../common/Helpers/GetRandomNumber";
import SendEvent from "../common/Helpers/SendEvent";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";

class GiveawayOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      luckyWinner: {
        username: "",
        value: "",
        profileURL: ""
      }
    }
  }


  pickLuckyWinner = () => {
    SendEvent(AnalyticsCategoryEnum.GIVEAWAY_WINNER, `Pick Lucky Winner Button Clicked`, "");
    let users = this.props.users;
    let allUsers = [];
    for (let i=0;i<users.length;i++) {
      for (let j=0;j<users[i].commentedPosts.length;j++) {
        allUsers.push({username: users[i].username, profileURL:users[i].profileURL , value: users[i].commentedValues[j]})
      }
    }
    let random = GetRandomNumberFrom1ToN(this.props.users.length)-1;
    this.setState({luckyWinner: allUsers[random]})
  };

  render() {
    let post = this.props.post;
    if (this.props.users.length === 0) {
      return <React.Fragment />
    }

    return (
      <Card
        title={
          <div style={{ fontSize: 20 }}>
            {Icons.POST}&nbsp;&nbsp;Choose Giveaway Winners
          </div>
        }
        bordered={false}
        style={{ backgroundColor: "#FFF" }}
      >
        <Row>
          <Col span={12}>
            <Avatar shape="square" src={post.display_url} size={300} alt="post image"/>
          </Col>
          <Col span={12}>
            <Row>

              <Button onClick={this.pickLuckyWinner}>Pick a Lucky winner from any one of the comments</Button>
              <br />
              {this.state.luckyWinner.username !== "" ? <Card
                title={
                  <div style={{ fontSize: 20 }}>
                    {Icons.STAR}&nbsp;&nbsp; Winners
                  </div>
                }
                bordered={false}
                style={{ backgroundColor: "#FFF" }}
              >
                <div style={{
                  fontSize: 16,
                  fontWeight: "bold"
                }}>
                  <Avatar size={64} src={this.state.luckyWinner.profileURL} /><br />
                  Username: {this.state.luckyWinner.username}<br />
                  Comment Value: {this.state.luckyWinner.value}
                </div>
              </Card> : <React.Fragment />}
            </Row>
          </Col>
        </Row>



      </Card>
    );
  }
}

export default GiveawayOptions;
