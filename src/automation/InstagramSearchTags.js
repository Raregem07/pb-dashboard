import React from 'react';
import InstagramSearch from "../common/components/InstagramSearch";
import {Tag} from "antd";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";

class InstagramSearchTags extends React.Component {
  constructor(props) {
    super(props);
    this.colors = this.getColors();
  }

  handleClose = (tag) => {
    let selectedTags = JSON.parse(JSON.stringify(this.props.tagValues));
    for (let i = 0; i < selectedTags.length; i++) {
      if (tag === (selectedTags[i].name || selectedTags[i].title || selectedTags[i].username)) {
        selectedTags.splice(i,1);
        break;
      }
    }
    this.props.onTagChange(selectedTags);
  };

  shuffle = (array) => array.sort(() => Math.random() - 0.5);

  getColors = () => {
    let colors = ["magenta", "geekblue", "red", "volcano", "purple", "blue", "gold", "orange"];
    return this.shuffle(colors);
  };

  onSelect = (v) => {
    let selectedTags = JSON.parse(JSON.stringify(this.props.tagValues));
    if (v.username && v.isPrivate && v.following === false) {
      sendNotification(NotificationTypeEnum.Failure, `${v.username}'s Account is Private`);
      return;
    }
    for (let i = 0; i < selectedTags.length; i++) {
      if (v.name && selectedTags[i].name === v.name) {
        sendNotification(NotificationTypeEnum.Failure, "Tag already present");
        return;
      }
      if (v.username && selectedTags[i].username === v.username) {
        sendNotification(NotificationTypeEnum.Failure, "Username to actions_by_username already present");
        return;
      }
      if (v.pk && selectedTags[i].pk === v.pk) {
        sendNotification(NotificationTypeEnum.Failure, "Location already present");
        return;
      }
    }
    selectedTags.push(v);
    this.props.onTagChange(selectedTags);
  };

  render() {
    let tagsJSX = [];
    let colorsLength = this.colors.length;
    for (let i = 0; i < this.props.tagValues.length; i++) {
      let tagValue = this.props.tagValues[i];
      let tagName = tagValue.name || tagValue.title || tagValue.username ;
      let tagDisplayName = this.props.tagPrepend + tagName;
      tagsJSX.push(
        <Tag
          color={this.colors[i % colorsLength]}
          key={tagName} closable
          onClose={() => this.handleClose(tagName)}
        >
          {tagDisplayName}
        </Tag>
      );
    }
    return (<React.Fragment>
      {tagsJSX} <br/> <br/>
      <InstagramSearch
        width="90%"
        type={this.props.type}
        onSelect={this.onSelect}
        placeholder={this.props.placeholder}
        clearStateOnSelection={true}
        analyticsCategory={this.props.analyticsCategory}
      />
    </React.Fragment>);
  }
}

export default InstagramSearchTags;
