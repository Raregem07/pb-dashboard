import React from 'react';
import { Button } from "antd";
import DownloadAPI from "../common/DownloadAPI";
import moment from "moment";



function downloadData(htValues, hashtagName) {

  htValues.map(ht => {
    ht["username"] = ht.username;
    ht["postURL"] = "https://www.instagram.com/p/"+ht.shortcode+"/";
    ht["userID"] = ht.ig_id;
    // ht["comment_count"] = ht["comment_count"].toString();
    // ht["like_count"] = ht["like_count"].toString();
    ht["date_time"] = moment(new Date(ht["taken_at"]*1000)).format("DD/MM/YYYY")
  });
  let columns = [
    { label: "Username", value: "username" },
    { label: "Post Link", value: "postURL" },
    { label: "Instagram id of User", value: "userID" },
    // { label: "Like Count", value: "like_count" },
    // { label: "Comment Count", value: "comment_count" },
    { label: "Date (DD/MM/YYYY)", value: "date_time" },
  ];
  DownloadAPI(htValues, columns, hashtagName)
}



function DownloadHashtags(props) {
  if (props.htValues.length <= 0) {
    return <React.Fragment/>
  }
  return <div className="center">
    <Button onClick={() => {
      downloadData(props.htValues, props.htName, props.isLocation);
    }}>Download All Posts / Users</Button>
    {!props.isLocation ?
      <React.Fragment>
        &nbsp;&nbsp;&nbsp;
        <Button onClick={() => {
          downloadData(getUniqueUsers(props.htValues), props.htName, props.isLocation);
        }}>Download Unique Users</Button>
      </React.Fragment>
      : <React.Fragment/>}
  </div>
}

function getUniqueUsers(dUsers) {
  let uniqueUsers = [];
  let mp = {};
  dUsers.map(u => {
    mp[u.ig_id] = u;
  })

  for (var key in mp) {
    uniqueUsers.push(mp[key]);
  }
  return uniqueUsers;
}

export default DownloadHashtags;
