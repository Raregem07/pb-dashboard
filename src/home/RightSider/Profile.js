import React from "react";
import getMainUser from "../../common/chrome/GetMainUser";
import { Avatar } from "antd";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewer: null
    };
  }

  async componentDidMount() {
    let user = await getMainUser();
    console.log("profile_pic =", user.viewer.profile_pic_url);
    this.setState({ viewer: user.viewer });
  }

  render() {
    if (!this.state.viewer) {
      return <div />;
    }
    return (
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#002A00",
          paddingBottom: "1%",
          paddingTop: "8%"
        }}
      >
        <Avatar size={64} crossOrigin='use-credentials' src={this.state.viewer.profile_pic_url} />
        <h1 style={{ color: "white", fontSize: "120%", paddingTop: "7%" }}>
          {" "}
          {this.state.viewer.username}
        </h1>
      </div>
    );
  }
}

export default Profile;
