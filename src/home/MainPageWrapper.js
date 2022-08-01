import React from "react";
import FeatureDetails from "./FeatureDetails";
import FeaturePageHeading from "./FeaturePages/common/FeaturePageHeading";
import FeaturePageAnalyticsNote from "./FeaturePages/analytics/FeaturePageAnalyticsNote";
import BreadCrumbs from "./BreadCrumbs";
import { AppContext } from "./Home";
import NewMessageDisplayer from "./NewMessageDisplayer";
import TimeForRateLimitMessage from "../common/components/TimeForRateLimitMessage";

// props: isSleeping
class MainPageWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  getDetailsFromPathname = (url, message) => {
    const selfOrOtherAccountMessage = "Self or any Other Account";
    let details;
    let tier;
    let crumbs = [];
    let messageObj;
    switch (url) {
      case FeatureDetails.ANALYTICS.SELF.FEATURES.ANALYSE_USER.ACTION:
        details = FeatureDetails.ANALYTICS.SELF.FEATURES.ANALYSE_USER;
        tier = FeatureDetails.TOOLS_FEATURES.ANALYSE_USER;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: selfOrOtherAccountMessage,
          action: tier.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj = message.ANALYTICS.SELF.FEATURES.ANALYSE_USER.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.OTHER.FEATURES.SIMILAR_ACCOUNT.ACTION:
        details = FeatureDetails.ANALYTICS.OTHER.FEATURES.SIMILAR_ACCOUNT;
        tier = FeatureDetails.TIER_2_FEATURES.SIMILAR_ACCOUNT;
        crumbs.push({
          name: "Home",
          action: "/"
        });
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.OTHER.FEATURES.DEAD_FOLLOWERS.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.TOOLS_FEATURES.FOLLOWER_FOLLOWING_SEGREGATOR.ACTION:
        tier = FeatureDetails.TOOLS_FEATURES.FOLLOWER_FOLLOWING_SEGREGATOR;
        details = FeatureDetails.TOOLS_FEATURES.FOLLOWER_FOLLOWING_SEGREGATOR;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: FeatureDetails.TOOLS_FEATURES.FOLLOWER_FOLLOWING_SEGREGATOR.CARD_NAME,
          actions: "/tools"
        });
        if (message) {
          messageObj =
            message.IMPROVE_CONTENT.FEATURES.GET_TRENDING_CONTENT.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.SELF.FEATURES.ANALYSE_FOLLOWER_FOLLOWING
        .ACTION:
        details =
          FeatureDetails.ANALYTICS.SELF.FEATURES.ANALYSE_FOLLOWER_FOLLOWING;
        tier = FeatureDetails.TIER_2_FEATURES.ANALYSE_FOLLOWER_FOLLOWING;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: selfOrOtherAccountMessage,
          action: tier.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.SELF.FEATURES.ANALYSE_FOLLOWER_FOLLOWING
              .MESSAGE_OBJ;
        }
        break;

      case FeatureDetails.ANALYTICS.SELF.FEATURES.DEAD_FOLLOWERS.ACTION:
        details = FeatureDetails.ANALYTICS.SELF.FEATURES.DEAD_FOLLOWERS;
        tier = FeatureDetails.TIER_2_FEATURES.DEAD_FOLLOWERS;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: selfOrOtherAccountMessage,
          action: tier.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.SELF.FEATURES.DEAD_FOLLOWERS.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.SELF.FEATURES.USER_POST_ANALYTICS.ACTION:
        details = FeatureDetails.ANALYTICS.SELF.FEATURES.USER_POST_ANALYTICS;
        tier = FeatureDetails.TOOLS_FEATURES.USER_POST_ANALYTICS;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: selfOrOtherAccountMessage,
          action: tier.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.SELF.FEATURES.USER_POST_ANALYTICS.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.SELF.FEATURES.USER_LIKER_COMMENTER.ACTION:
        details = FeatureDetails.ANALYTICS.SELF.FEATURES.USER_LIKER_COMMENTER;
        tier = FeatureDetails.TIER_2_FEATURES.USER_LIKER_COMMENTER;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: selfOrOtherAccountMessage,
          action: tier.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.SELF.FEATURES.USER_LIKER_COMMENTER.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.SELF.FEATURES.POST_LIKER_COMMENTER.ACTION:
        details = FeatureDetails.ANALYTICS.SELF.FEATURES.POST_LIKER_COMMENTER;
        tier = FeatureDetails.TIER_2_FEATURES.POST_LIKER_COMMENTER;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.SELF.FEATURES.POST_LIKER_COMMENTER.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.OTHER.FEATURES.ANALYSE_USER.ACTION:
        details = FeatureDetails.ANALYTICS.OTHER.FEATURES.ANALYSE_USER;
        tier = FeatureDetails.TOOLS_FEATURES.ANALYSE_USER;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: selfOrOtherAccountMessage,
          action: tier.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.OTHER.FEATURES.ANALYSE_USER.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.OTHER.FEATURES.DETAILED_USER_ANALYSIS.ACTION:
        details = FeatureDetails.ANALYTICS.OTHER.FEATURES.DETAILED_USER_ANALYSIS;
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.OTHER.FEATURES.DETAILED_USER_ANALYSIS.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.OTHER.FEATURES.ANALYSE_FOLLOWER_FOLLOWING
        .ACTION:
        details =
          FeatureDetails.ANALYTICS.OTHER.FEATURES.ANALYSE_FOLLOWER_FOLLOWING;
        tier = FeatureDetails.TIER_2_FEATURES.ANALYSE_FOLLOWER_FOLLOWING;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: selfOrOtherAccountMessage,
          action: tier.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.OTHER.FEATURES.ANALYSE_FOLLOWER_FOLLOWING
              .MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.OTHER.FEATURES.DEAD_FOLLOWERS.ACTION:
        details = FeatureDetails.ANALYTICS.OTHER.FEATURES.DEAD_FOLLOWERS;
        tier = FeatureDetails.TIER_2_FEATURES.DEAD_FOLLOWERS;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: selfOrOtherAccountMessage,
          action: tier.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.OTHER.FEATURES.DEAD_FOLLOWERS.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.OTHER.FEATURES.HASHTAG.ACTION:
        details = FeatureDetails.ANALYTICS.OTHER.FEATURES.HASHTAG;
        tier = FeatureDetails.TIER_2_FEATURES.HASHTAG;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.OTHER.FEATURES.DEAD_FOLLOWERS.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.OTHER.FEATURES.LOCATION.ACTION:
        details = FeatureDetails.ANALYTICS.OTHER.FEATURES.LOCATION;
        tier = FeatureDetails.TIER_2_FEATURES.LOCATION;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.OTHER.FEATURES.DEAD_FOLLOWERS.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.OTHER.FEATURES.USER_POST_ANALYTICS.ACTION:
        details = FeatureDetails.ANALYTICS.OTHER.FEATURES.USER_POST_ANALYTICS;
        tier = FeatureDetails.TOOLS_FEATURES.USER_POST_ANALYTICS;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: selfOrOtherAccountMessage,
          action: tier.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.OTHER.FEATURES.USER_POST_ANALYTICS.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.OTHER.FEATURES.USER_LIKER_COMMENTER.ACTION:
        details = FeatureDetails.ANALYTICS.OTHER.FEATURES.USER_LIKER_COMMENTER;
        tier = FeatureDetails.TIER_2_FEATURES.USER_LIKER_COMMENTER;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: selfOrOtherAccountMessage,
          action: tier.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.OTHER.FEATURES.USER_LIKER_COMMENTER.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.ANALYTICS.OTHER.FEATURES.POST_LIKER_COMMENTER.ACTION:
        details = FeatureDetails.ANALYTICS.OTHER.FEATURES.POST_LIKER_COMMENTER;
        tier = FeatureDetails.TIER_2_FEATURES.POST_LIKER_COMMENTER;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          action: details.ACTION
        });
        if (message) {
          messageObj =
            message.ANALYTICS.OTHER.FEATURES.POST_LIKER_COMMENTER.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.IMPROVE_CONTENT.FEATURES.GET_TRENDING_CONTENT.ACTION:
        details = FeatureDetails.IMPROVE_CONTENT.FEATURES.GET_TRENDING_CONTENT;
        tier = FeatureDetails.TOOLS_FEATURES.GET_TRENDING_CONTENT;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.IMPROVE_CONTENT.FEATURES.GET_TRENDING_CONTENT.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.IMPROVE_CONTENT.FEATURES.TRENDING_RELATED_HASHTAGS
        .ACTION:
        details =
          FeatureDetails.IMPROVE_CONTENT.FEATURES.TRENDING_RELATED_HASHTAGS;
        tier = FeatureDetails.TOOLS_FEATURES.TRENDING_RELATED_HASHTAGS;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.IMPROVE_CONTENT.FEATURES.TRENDING_RELATED_HASHTAGS
              .MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.IMPROVE_CONTENT.FEATURES.GIVEAWAY_WINNER.ACTION:
        details = FeatureDetails.IMPROVE_CONTENT.FEATURES.GIVEAWAY_WINNER;
        tier = FeatureDetails.TOOLS_FEATURES.GIVEAWAY_WINNER;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.IMPROVE_CONTENT.FEATURES.GIVEAWAY_WINNER.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.IMPROVE_CONTENT.FEATURES.HEART_YOUR_IMAGE.ACTION:
        details = FeatureDetails.IMPROVE_CONTENT.FEATURES.HEART_YOUR_IMAGE;
        tier = FeatureDetails.TOOLS_FEATURES.HEART_YOUR_IMAGE;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.IMPROVE_CONTENT.FEATURES.HEART_YOUR_IMAGE.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.IMPROVE_CONTENT.FEATURES.SPLIT_IMAGE.ACTION:
        details = FeatureDetails.IMPROVE_CONTENT.FEATURES.SPLIT_IMAGE;
        tier = FeatureDetails.TOOLS_FEATURES.SPLIT_IMAGE;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj = message.IMPROVE_CONTENT.FEATURES.SPLIT_IMAGE.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.COMMON_USERS.ACTION:
        details = FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.COMMON_USERS;
        tier = FeatureDetails.TIER_2_FEATURES.COMMON_USERS;
        crumbs.push({
          name: tier.CRUMB_1.NAME,
          action: tier.CRUMB_1.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.PERFORM_ENGAGEMENT.FEATURES.COMMON_USERS.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS
        .TARGETED_LEADS.FEATURES.SET_CONFIGURATIONS.ACTION:
        details =
          FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS
            .TARGETED_LEADS.FEATURES.SET_CONFIGURATIONS;
        crumbs.push({
          name: FeatureDetails.PERFORM_ENGAGEMENT.MAIN_CARD.TITLE,
          action: FeatureDetails.PERFORM_ENGAGEMENT.ACTION
        });
        crumbs.push({
          name:
          FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS
            .CARD_NAME,
          action:
          FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS
              .TARGETED_LEADS.FEATURES.SET_CONFIGURATIONS.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS
        .TARGETED_LEADS.FEATURES.TASKS_TO_COMPLETES.ACTION:
        details =
          FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS
            .TARGETED_LEADS.FEATURES.TASKS_TO_COMPLETES;
        crumbs.push({
          name: FeatureDetails.PERFORM_ENGAGEMENT.MAIN_CARD.TITLE,
          action: FeatureDetails.PERFORM_ENGAGEMENT.ACTION
        });
        crumbs.push({
          name:
          FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS
            .CARD_NAME,
          action:
          FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          actions: details.ACTION
        });
        if (message) {
          messageObj =
            message.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS
              .TARGETED_LEADS.FEATURES.TASKS_TO_COMPLETES.MESSAGE_OBJ;
        }
        break;
      case FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS
        .TARGETED_LEADS.FEATURES.COMPLETED_TASKS.ACTION:
        details =
          FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS
            .TARGETED_LEADS.FEATURES.COMPLETED_TASKS;
        crumbs.push({
          name: FeatureDetails.PERFORM_ENGAGEMENT.MAIN_CARD.TITLE,
          action: FeatureDetails.PERFORM_ENGAGEMENT.ACTION
        });
        crumbs.push({
          name:
          FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS
            .CARD_NAME,
          action:
          FeatureDetails.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS.ACTION
        });
        crumbs.push({
          name: details.CARD_NAME,
          action: details.ACTION
        });
        if (message) {
          messageObj =
            message.PERFORM_ENGAGEMENT.FEATURES.GET_TARGETED_LEADS
              .TARGETED_LEADS.FEATURES.COMPLETED_TASKS.MESSAGE_OBJ;
        }
        break;
    }
    return [details, crumbs, messageObj];
  };

  render() {
    let [details, crumbs] = this.getDetailsFromPathname(
      this.props.location.pathname
    );
    let message = this.props.message;
    let text = "", level = "", link = "";
    if (message && this.props.location.pathname === message.origin) {
      text = message.messageText;
      level = message.level;
      link = message.link;
    }
    let receivedMessageObj = {
      LEVEL: level,
      MESSAGE: text,
      LINK: link
    };
    return (
      <React.Fragment>
        <FeaturePageHeading
          backgroundImage={`linear-gradient(to right, ${details.CARD_COLOR} , ${details.CARD_COLOR})`}
          text={details.MAIN_PAGE_NAME}
        />
        {/*<FeaturePageAnalyticsNote note={details.MAIN_PAGE_NOTE}/>*/}
        <br/>
        <AppContext.Consumer>
          {value => {
            let [
              _details,
              _crumbs,
              messageObjToShow
            ] = this.getDetailsFromPathname(
              this.props.location.pathname,
              value.messages
            );
            return <NewMessageDisplayer messageObj={messageObjToShow}/>;
          }}
        </AppContext.Consumer>

        <BreadCrumbs crumbs={crumbs}/>
        <br/>
        <div className="center">
          <TimeForRateLimitMessage
            isSleeping={this.props.isSleeping}
            sleepArgs={this.props.sleepArgs}
          />
        </div>
        {this.props.message && this.props.message.messageText.length !== 0 ?
          <NewMessageDisplayer messageObj={receivedMessageObj}/>
          : <React.Fragment/>}
        <br/>
        <div
          style={{
            marginLeft: 12,
            marginRight: 12
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default MainPageWrapper;
