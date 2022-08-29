/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React from "react";
import MainContentHeader from "./MainContentHeader";
import WelcomeContent from "./WelcomeContent";
import DashboardCards from "./DashboardCards";
import FeaturePageHeading from "../home/FeaturePages/common/FeaturePageHeading";
import FeatureDetails from "../home/FeatureDetails";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const improveContentDetails = FeatureDetails.IMPROVE_CONTENT;
    const improveContentDetailsTwo = FeatureDetails.DASHBOARD;
    
    return (
      <React.Fragment>
        {/* <MainContentHeader />
        <FeaturePageHeading
          backgroundImage={`linear-gradient(to right,  #0d98ba, #D6E865)`}
          text={improveContentDetailsTwo.TITLE}
          height={`168`}
        /> */}
        <div style={{
          fontSize: 25,
          font: "Black 64px/77px Roboto",
          fontWeight: "bold",
          width: "100%",
          height: 121,
          backgroundImage: "linear-gradient(to right,  #0d98ba, #D6E865)",
          paddingLeft: 64,
          marginTop: 70
        }}>
          <h1 style={{color: "#FFFFFF"}}>Dashboard</h1>
          <WelcomeContent />
        </div>
        
        <DashboardCards />
      </React.Fragment>
    );
  }
}

export default Dashboard;
