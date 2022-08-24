/* eslint-disable no-useless-constructor */
import React from "react";
import MainContentHeader from "./MainContentHeader";
import WelcomeContent from "./WelcomeContent";
import DashboardCards from "./DashboardCards";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <MainContentHeader />
        <WelcomeContent />
        <DashboardCards />
      </React.Fragment>
    );
  }
}

export default Dashboard;
