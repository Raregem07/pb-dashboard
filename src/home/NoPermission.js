import React from 'react';
import { Divider } from "antd";

function NoPermission(props) {
  return <React.Fragment>
    <div className="center" style={{margin: "8%"}}>
      <br />
      <h1>No Permission for user @{props.username}</h1>
      <br />
      <h3>
        The instagram user @{props.username} does not have permission to use ProfileBuddy. If you have purchased
        ProfileBuddy, Please go to members area <a href="https://app.profilemate.com" target="_blank">here</a> and
        Set this instagram account for access to be used with ProfileBuddy.
      </h3>
      <Divider />
      <br />
      <br />
      <h3>1. <a href="https://app.profilemate.com/sign-up" target="_blank">Sign up</a> at Members here with the delivery email you set at JVZoo & profilebuddy token you got on the mail</h3>
      <br />
      <h3>2. After sign up, <a href="https://app.profilemate.com" target="_blank">Sign in</a> to your account and set the Instagram username "{props.username}" in the "Instagram Account for Access" section on main page </h3>
    </div>
  </React.Fragment>
}

export default NoPermission;
