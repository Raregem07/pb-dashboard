import React from "react";
import { Spin } from "antd";

function DisplayHashtagStats(props) {
  if (props.htValues.length <= 0) {
    return <React.Fragment/>;
  }
  return <React.Fragment>
    <div className="center">
      <h2>Users/Posts with <React.Fragment style={{size: 24}}>{props.htName}</React.Fragment> Discovered: </h2><h1>{props.htValues.length} </h1>
      <br/>
      Unique Users: {getUniqueUsersCount(props.htValues)}
    </div>
  </React.Fragment>;
}

function getUniqueUsersCount(users) {
  let mp = {}
  users.map(u => {
    mp[u.ig_id] = true
  })
  return Object.keys(mp).length
}


export default DisplayHashtagStats;
