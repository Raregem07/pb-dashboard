import React from "react";
import ShowDataAndCountAsPoster from "./ShowDataAndCountAsPoster";

function getLocationOfPosts(posts) {
  let postsMap = {};
  for (let i = 0; i < posts.length; i++) {
    let locationName = posts[i].locationName;
    if (locationName.length > 1) {
      if (!postsMap[locationName]) {
        postsMap[locationName] = 1;
      } else {
        postsMap[locationName] += 1;
      }
    }
  }
  let data = [];
  for (var locationName in postsMap) {
    data.push({ value: locationName, count: postsMap[locationName] });
  }
  return data;
}

function LocationStats(props) {
  let data = getLocationOfPosts(props.posts);

  return (
    <ShowDataAndCountAsPoster title="Location Trends" data={data} icon="LOCATION" context="location"/>
  );
}

export default LocationStats;
