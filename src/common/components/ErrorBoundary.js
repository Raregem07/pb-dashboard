import ReactGA from "react-ga";
import React from "react";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import { Button } from "antd";
import ApplicationConstants from "../constants/ApplicationConstants";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    ReactGA.event({
      category: AnalyticsCategoryEnum.PAGE_ERROR,
      action: `Page: ${this.props.page} | Error: ${error}`,
      label: `${errorInfo}`
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return<h1 className="vertically-center">
        Well, This is bad. Something went wrong from instagram data or google chrome. Please read <a href={ApplicationConstants.BLOG_WHEN_ERROR_HAPPENS} target="_blank">here</a> on what to do.
        <br />
        This generally happens when the language of the browser is not english. For other languages it might break. If your language is not set to english please set it to english <a href="https://www.ionos.com/digitalguide/websites/web-development/change-chrome-language/" target="_blank">(Click here on how to do it)</a> and then try the process again.
        <br />
        In the worst case, please uninstall and reinstall the extension but this will make you lose the followers' progress.
      </h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
