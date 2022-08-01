import React from "react";
import ProcessHashtag from "./ProcessHashtag";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import DisplayHashtagStats from "./DisplayHashtagStats";
import DownloadHashtags from "./DownloadHashtags";
import { Link } from "react-router-dom";
import FeatureDetails from "../home/FeatureDetails";
import LocationSearch from "./LocationSearch";
import { Spin } from "antd";
import Messages from "../common/Messages";
import { AppContext } from "../home/Home";
import NoPermission from "../common/components/NoPermission";
import ReactMarkdown from "react-markdown";


class NewLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenLocation: null,
      locValues: [],
      loading: false
    };
    this.process = null;
  }

  onLocationChosen = chosenLoc => {
    let locationSlug = chosenLoc.slug;
    // if (this.props.context.permission === "NORMAL") {
    //   sendNotification(NotificationTypeEnum.Failure, "Please Upgrade. You don't have permission");
    //   return;
    // }
    if (this.state.loading || this.state.locValues.length > 0 || this.state.chosenLocation !== null) {
      return;
    }
    this.setState({ chosenLocation: chosenLoc });
    let name = chosenLoc.title;
    let locID = chosenLoc.pk;
    this.process = new ProcessHashtag(
      name,
      locID,
      this.locValuesCallback,
      this.processEndCallback,
      this.maxScrapeDoneCallback,
      true
    );
    this.process.setLocationSlug(locationSlug);
    this.process.start(null);
    this.setState({ loading: true });
  };

  maxScrapeDoneCallback = () => {
    this.setState({ loading: false });
    // this.props.passMessage(...Messages.MAX_LOCATIONS_SCRAPED);
    sendNotification(NotificationTypeEnum.Success, "Max users scraped. Change location", true);
  };

  processEndCallback = () => {
    this.setState({ loading: false });
    sendNotification(NotificationTypeEnum.Success, `Posts & Users over for ${this.state.chosenLocation.title} | Enter new locations`, true);
  };

  locValuesCallback = newLocs => {
    let newLocValues = this.state.locValues.concat(newLocs);
    this.setState({ locValues: newLocValues });
  };

  componentWillUnmount() {
    if (this.process) {
      this.process.stopAPICalls();
    }
  }

  render() {
    let locName = "";
    if (this.state.chosenLocation) {
      locName = "📍"+ this.state.chosenLocation.title;
    }
    return (
      <React.Fragment>
        {this.props.context.mainMessages.location === "" ? <React.Fragment /> :
          <div className="main-message">
            <ReactMarkdown source={this.props.context.mainMessages.location} />
          </div>
        }
        <LocationSearch onLocationChosen={this.onLocationChosen}/>
        {this.state.loading ? <div className="center"><br /><Spin/></div> : <React.Fragment/>}
        <br/>
        <DisplayHashtagStats
          htValues={this.state.locValues}
          htName={locName}
        />
        <br/>
        <DownloadHashtags htValues={this.state.locValues} htName={locName}/>

        {this.state.locValues.length > 0 ? (
          <React.Fragment>
            <br/>

            <div
              style={{
                width: "90%",

                paddingTop: "1%",
                paddingBottom: "1%",
                paddingLeft: "2%",
                paddingRight: "1%",
                marginLeft: "6%",

                backgroundColor: "#F0C156",
                color: "#FFF",

                boxShadow: "0px 3px 6px #00000029",
                borderRadius: 6,
                font: "Black 29px/35px Roboto",

                fontSize: "120%",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "2%",
                marginBottom: "2%"
              }}
            >
              Download data & Go to{" "}
              <Link
                to={FeatureDetails.TIER_3.ACTION}
                className="attractive-box-text"
              >
                Email Extractor
              </Link>{" "}
              to get <strong>Emails</strong>, <strong>Follower counts, engagement rate</strong> & other details of these users.
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment/>
        )}
      </React.Fragment>
    );
  }

}

export default props => (
  <AppContext.Consumer>
    {context => <NewLocation context={context} {...props} />}
  </AppContext.Consumer>
);

