import React from "react";
import HashtagSearch from "../new_hashtag_location/HashtagSearch";
import AccountChosen from "./AccountChosen";
import {Divider, Spin} from "antd";
import DownloadSimilarUsers from "./DownloadSimilarUsers";
import DisplaySimilarUsers from "./DisplaySimilarUsers";
import QueryBox from "../analytics/QueryBox";
import {AppContext} from "../home/Home";
import GetSimilarAccountsApi from "../common/api_call/new_api_calls/GetSimilarAccountsApi";
import DownloadHashtags from "../new_hashtag_location/DownloadHashtags";
import HowToOpenCSVTutorial from "../common/components/HowToOpenCSVTutorial";
import {Link} from "react-router-dom";
import FeatureDetails from "../home/FeatureDetails";
import suggestedUserImg from "../common/images/suggested_users_1.png"
import similarUsernameExplanationImg from "../common/images/similar_username_explanation.png"

class SimilarAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      similarAccounts: [],
      username: "",
      downloadButtonPressed: false
    };
  }

  onAccountChosen = (searchUser) => {
    let userID = searchUser.pk;
    this.setState({loading: true, username: searchUser.username});
    this.getSimilarUsers(userID);
  };

  getSimilarUsers = async (userID) => {
    let similarAccounts = await GetSimilarAccountsApi(userID);
    console.log(similarAccounts, 'Line 29 | Class: SimilarAccount | Function: getSimilarUsers: ')
    this.setState({similarAccounts: similarAccounts, loading: false})
  };

  render() {
    return <React.Fragment>
      <div className="center">
        <AccountChosen
          onAccountChosen={this.onAccountChosen}
        />
      </div>

      <Divider />
      {this.state.loading ? <div className="center"><Spin/></div> : <React.Fragment/>}

      <DownloadSimilarUsers
        similarAccounts={this.state.similarAccounts}
        downloadPressed={() => {this.setState({downloadButtonPressed: true})}}
        similarAccountName={this.state.username}
      />

      {this.state.downloadButtonPressed ? <div><br /><HowToOpenCSVTutorial /><br /></div>
        : <React.Fragment />}

      <DisplaySimilarUsers
        similarAccountName={this.state.username}
        similarAccounts={this.state.similarAccounts}
      />

      {this.state.similarAccounts.length < 1 ?
        <div className={"center"}>
          <h2>Now, What are Similar / Suggested Users? 👇</h2>
          <img src={suggestedUserImg} height={"60%"}  alt={"explanation of suggested users"}/>
          <br />
          <img src={similarUsernameExplanationImg} width={"85%"}  alt={"explanation of suggested users"}/>
        </div>
        : <React.Fragment />}

      {this.state.similarAccounts.length > 0 ? (
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
  }
}

export default props => (
  <AppContext.Consumer>
    {context => <SimilarAccount context={context} {...props} />}
  </AppContext.Consumer>
);
