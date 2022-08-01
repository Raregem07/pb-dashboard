import React from "react";
import { Redirect } from "react-router-dom";


export default class Help extends React.Component {

  render() {
    return <Redirect to="http://socialunderworld.freshdesk.com/support/tickets/new"/>;
  }

}