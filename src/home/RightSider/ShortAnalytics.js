import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Col, Row, Spin } from "antd";
import getMainUser from "../../common/chrome/GetMainUser";
//import InterestingFacts from "../InterestingFacts";

// fact: ["Account Engagement: 90%", "Follower/Following Ratio: 2.1"]
// =>
// <div className="right-sider-short-analytics-caraousel">
//  <Row>Account Engagement: 90%</Row>
//  <Row>Follower/Following Ratio: 2.1</Row>
// </div>

class ShortAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      facts: []
    };
  }

  async componentDidMount() {
    // let mainUser = await getMainUser();
    // let username = mainUser.viewer.username;
    // this.setState({ username });
    // this.interestingFacts = new InterestingFacts(username);
    // this.interestingFacts.getFacts(this.putFacts)
  }

  putFacts = (facts) => {
    this.setState({facts})
  };

  getHTMLFactsElements = () => {
    let i=0;
    return this.state.facts.map(fact => {
      return <div className="right-sider-short-analytics-caraousel" key={i++}>
        {fact.map(f => {
          return <Row key={f}>
            {f}
          </Row>
        })}
      </div>
    });
  };

  render() {
    return (
        <div
          style={{
            font: "Black 32px/38px Roboto",
            fontSize: "120%",
            margin: "2%",
            padding: "2%",
            color: "#FFFFFF",
            fontWeight: "bold",
            marginBottom: "1%",
          }}
        >
          Note: Please use a dummy Instagram account and not your main IG Account
        </div>
      // <div style={{ textAlign: "center" }}>
      //   <div
      //     style={{
      //       font: "Black 32px/38px Roboto",
      //       fontSize: "150%",
      //       marginTop: "1%",
      //       color: "#FFFFFF",
      //       fontWeight: "bold",
      //       marginBottom: "1%",
      //     }}
      //   >
      //     Stats
      //   </div>
      //   {this.state.facts.length < 1 ? <React.Fragment /> :
      //     <div style={{
      //       width: "98%"
      //     }} >
      //     <Slider arrows={false} dots={false} autoplay autoplaySpeed={5000}>
      //       {this.getHTMLFactsElements()}
      //     </Slider>
      //   </div>}
      // </div>
    );
  }
}

export default ShortAnalytics;
