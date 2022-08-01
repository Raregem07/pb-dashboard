import React from "react";
import InstagramAnalyser from "../analytics/InstagramAnalyser";
import GetFollowerFollowing from "../analytics/GetFollowerFollowing";

class MultiUserInstagramAnalyser extends React.Component {

  static getUsernameFromUserObj(userObj) {
    if (userObj) {
      return userObj["username"];
    }
    return "";
  }


  render() {
    if (!this.props.isUserSet) {
      return <div />;
    }

    return (
      <div>
        <InstagramAnalyser
          isUserSet={true}
          username={MultiUserInstagramAnalyser.getUsernameFromUserObj(this.props.userObj1)}
          followersProgressTracker={this.props.followersProgressTracker1}
          followingProgressTracker={this.props.followingProgressTracker1}
        />
        <InstagramAnalyser
          isUserSet={true}
          username={MultiUserInstagramAnalyser.getUsernameFromUserObj(this.props.userObj2)}
          followersProgressTracker={this.props.followersProgressTracker2}
          followingProgressTracker={this.props.followingProgressTracker2}
        />
        {this.props.userObj3 !== null ? (
          <InstagramAnalyser
            isUserSet={true}
            username={MultiUserInstagramAnalyser.getUsernameFromUserObj(
              this.props.userObj3
            )}
            followersProgressTracker={this.props.followersProgressTracker3}
            followingProgressTracker={this.props.followingProgressTracker3}
          />
        ) : (
          <React.Fragment />
        )}
        {this.props.userObj3 !== null ? (
          <InstagramAnalyser
            isUserSet={true}
            username={MultiUserInstagramAnalyser.getUsernameFromUserObj(
              this.props.userObj3
            )}
            followersProgressTracker={this.props.followersProgressTracker4}
            followingProgressTracker={this.props.followingProgressTracker4}
          />
        ) : (
          <React.Fragment />
        )}
      </div>
    );
  }

}

export default MultiUserInstagramAnalyser;
