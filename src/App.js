import React from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import { Home } from "./home/Home";
import ApplicationConstants from "./common/constants/ApplicationConstants";
import getMainUser from "./common/chrome/GetMainUser";
import ErrorBoundary from "./common/components/ErrorBoundary";
import ReactGA from "react-ga";


class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   let trackingCode = ApplicationConstants.googleAnalytics.trackingCode;
  //   ReactGA.initialize(trackingCode);
  // }

  async componentDidMount() {
    let user = await getMainUser();
    let trackingCode = ApplicationConstants.googleAnalytics.trackingCode;
    ReactGA.initialize(trackingCode, {
      debug: false,
      titleCase: false,
      gaOptions: {
        clientId: parseInt(user.viewer.id)
      },
      name: user.viewer.username
    });
    ReactGA.ga("set", "checkProtocolTask", () => {});
  }

  render() {
    const WrappedHome = withRouter(props => (
      <ErrorBoundary page="home page">
        <Home
          {...props} />
      </ErrorBoundary>
    ));
    return <WrappedHome/>;
  }
}

export default App;
