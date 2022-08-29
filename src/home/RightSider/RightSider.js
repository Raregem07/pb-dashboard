/* eslint-disable no-unused-vars */
import React from "react";
import Profile from "./Profile";
import ShortAnalytics from "./ShortAnalytics";
import MostUsedFeatures from "./MostUsedFeatures";
import getMainUser from "../../common/chrome/GetMainUser";
import Drift from "react-driftjs";


class RightSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      userID: ""
    }
  }

  async componentDidMount() {
    let user = await getMainUser();

    this.setState({
      username: user.viewer.username,
      email: user.email,
      userID: user.viewer.id
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="right-sider-profile">
          
          <Profile />
          

          <ShortAnalytics />
          <div
            style={{
              textAlign: "left",
              color: "white",
              paddingLeft: 8,
              backgroundColor: "#002A00"
            }}
          >
            v1.0.0
          </div>
        </div>
        <div>
          <MostUsedFeatures location={this.props.location} />
        </div>
      </React.Fragment>
    );
  }
}

export default RightSider;
