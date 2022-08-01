import React from "react";
import RelatedHashtags from "../related_hashtags/RelatedHashtags";
import { Button, Card, Col, Input, Row, Table } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import Icons from "../common/components/Icons";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import HashtagTags from "./HashtagTags";
import { TagCloud } from "react-tagcloud";
import Shuffle from "../common/Helpers/ShuffleArray";
import * as htmlToImage from "html-to-image";
import ShowDataAndCountAsPoster from "./ShowDataAndCountAsPoster";

const { Column } = Table;
const { TextArea } = Input;

class HashtagsStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
    this.hashtagCount = RelatedHashtags.extractTokensFromPosts(
      this.props.posts,
      "#"
    );
  }

  onTagAddition = tag => {
    let tags = [...this.state.tags, tag];
    this.setState({ tags });
  };

  getSelectedHashtagsInStrings = () => {
    let hashtagString = "";
    this.state.tags.map(hashtag => {
      hashtagString = hashtagString + " " + hashtag;
    });
    return hashtagString;
  };

  onClipboardCopy = () => {
    ReactGA.event({
      category: AnalyticsCategoryEnum.ANALYSE_USER,
      action: "hashtags_copied"
    });
    sendNotification(NotificationTypeEnum.Success, "Copied to clipboard");
  };

  getSelectedHashtagsDisplay() {
    return (
      <div>
        <Row gutter={24}>
          <Col span={18}>
            <TextArea
              value={this.getSelectedHashtagsInStrings()}
              rows={2}
              placeholder="Selected Hashtags will come here"
            />
          </Col>

          <Col span={6}>
            <CopyToClipboard
              text={this.getSelectedHashtagsInStrings()}
              onCopy={this.onClipboardCopy}
            >
              <span>
                <Button>Copy To Clipboard</Button>
              </span>
            </CopyToClipboard>
          </Col>
        </Row>
        <br />
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.posts !== nextProps.posts) {
      this.hashtagCount = RelatedHashtags.extractTokensFromPosts(
        nextProps.posts,
        "#"
      );
    }
    return true;
  }

  save() {
    htmlToImage
      .toJpeg(document.getElementById("hashtagDisplay"), { quality: 0.95 })
      .then(function(dataUrl) {
        var link = document.createElement("a");
        link.download = "hashtag.jpeg";
        link.href = dataUrl;
        link.click();
      });
  }

  render() {
    let posterData = Shuffle(
      this.hashtagCount.map(ht => {
        ht["value"] = ht["name"];
        return ht;
      })
    );
    return (
      <Card
        title={
          <div>{Icons.HASHTAG} &nbsp;&nbsp;&nbsp;User Hashtag's Trends</div>
        }
        style={{ margin: 12, backgroundColor: "#fbfbfb" }}
      >
        {this.getSelectedHashtagsDisplay()} <br />
        <HashtagTags
          tagsAndCounts={this.hashtagCount}
          onTagClick={this.onTagAddition}
        />
        <ShowDataAndCountAsPoster
          data={posterData}
          icon={"HASHTAG"}
          title="Hashtag trends in Poster"
          context="hashtag"
        />
      </Card>
    );
  }
}

export default HashtagsStats;
