import React from "react";
import HashtagSearch from "./HashtagSearch";
import ProcessHashtag from "./ProcessHashtag";
import DisplayHashtagStats from "./DisplayHashtagStats";
import DownloadHashtags from "./DownloadHashtags";
import { Link, Prompt } from "react-router-dom";
import FeatureDetails from "../home/FeatureDetails";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import { Button, Col, Row, Spin } from "antd";
import Messages from "../common/Messages";
import { AppContext } from "../home/Home";
import NoPermission from "../common/components/NoPermission";
import ReactMarkdown from "react-markdown";

class NewHashtag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenHT: null,
      htValues: [],
      loading: false
    };
    this.process = null;
  }

  onHashtagChosen = chosenHT => {
    if (this.state.loading || this.state.htValues.length > 0 || this.state.chosenHT !== null) {
      return;
    }
    this.setState({ chosenHT: chosenHT });
    let hashtagName = chosenHT.name;
    let hashtagID = chosenHT.id;
    this.process = new ProcessHashtag(
      hashtagName,
      hashtagID,
      this.htValuesCallback,
      this.processEndCallback,
      this.maxScrapeDoneCallback
    );
    this.process.start(null);
    this.setState({ loading: true });
  };

  maxScrapeDoneCallback = () => {
    this.setState({ loading: false });
    // this.props.passMessage(...Messages.MAX_HASHTAGS_SCRAPED);
    sendNotification(NotificationTypeEnum.Success, "Max users scraped. Choose different hashtag.", true);
  };

  processEndCallback = () => {
    this.setState({ loading: false });
    sendNotification(NotificationTypeEnum.Success, `Posts over for Hashtag ${this.state.chosenHT.name}. Enter new hashtag`, true);
  };

  htValuesCallback = newHT => {
    let newHTValues = this.state.htValues.concat(newHT);
    this.setState({ htValues: newHTValues });
    // console.log(newHT, "Class: NewHashtag, Function: , Line 36 newHT(): ");
  };

  componentWillUnmount() {
    if (this.process) {
      this.process.stopAPICalls();
    }
  }


  render() {
    let htName = "";
    if (this.state.chosenHT) {
      htName = "#" + this.state.chosenHT.name;
    }
    return (
      <React.Fragment>
        <Prompt
          message="You will lose this data. Download this data first. Do you want to continue?"
          when={this.state.loading}
        />
        {this.props.context.mainMessages.hashtag === "" ? <React.Fragment /> :
          <div className="main-message">
            <ReactMarkdown source={this.props.context.mainMessages.hashtag} />
          </div>
        }

        <HashtagSearch onHashtagChosen={this.onHashtagChosen}/>
        {this.state.loading ? <div className="center"><br /><Spin/></div> : <React.Fragment/>}
        <br/>

        <DisplayHashtagStats
          htValues={this.state.htValues}
          htName={htName}
        />
        <br/>
        <DownloadHashtags htValues={this.state.htValues} htName={htName}/>
        {this.state.htValues.length > 0 ? (
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
    {context => <NewHashtag context={context} {...props} />}
  </AppContext.Consumer>
);

