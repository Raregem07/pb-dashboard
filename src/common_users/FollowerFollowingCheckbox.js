import React from "react";
import { Checkbox } from "antd";

function FollowerFollowingCheckbox(props) {
  return <React.Fragment>
    Followers: <Checkbox checked={props.followersFollowingChecked.follower} onChange={(e) => {props.onFollowerChanged(e.target.checked, props.name)}}/> &nbsp;&nbsp;&nbsp;
    Following: <Checkbox checked={props.followersFollowingChecked.following} onChange={(e) => {props.onFollowingChanged(e.target.checked, props.name)}}/>
  </React.Fragment>;
}

export default FollowerFollowingCheckbox;
