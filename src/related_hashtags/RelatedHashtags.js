import React from "react";
import InstagramSearch from "../common/components/InstagramSearch";
import SearchType from "../home/SearchType";
import { Button, Col, Divider, Input, Row, Spin, Table } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import GetTop9PostsForHashtag from "../common/api_call/GetTop9Hashtags";
import { AppContext } from "../home/Home";
import I18 from "../common/chrome/I18";
import MessageDisplayer from "../common/components/MessageDisplayer";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import ReplaceSubstring from "../common/Helpers/ReplaceSubstring";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";


const { Column } = Table;
const { TextArea } = Input;

class RelatedHashtags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHashtagObj: null,
      isLoading: false,
      selectedRowKeys: [],
      relatedHashtags: [],
      hashtagsPostCount: null
    };
  }

  static getTokensFromString(postText) {
    postText = ReplaceSubstring(postText, /\n/g, " ");
    postText = ReplaceSubstring(postText, / +/g, " ");
    return postText.split(" ");
  }

  static separateHashtags(longHashtagsString) {
    let tokens = longHashtagsString.split("#");
    return tokens.filter(t => t.length > 0).map(t => {
      return "#" + t;
    });
  }

  static extractTokensFromPosts(posts, startingSymbol) {
    let hashtagDict = new Map();
    for (let i = 0; i < posts.length; i++) {
      let postText = posts[i].text;
      if (postText.length < 1) {
        continue;
      }
      let tokens = RelatedHashtags.getTokensFromString(postText);
      for (let j = 0; j < tokens.length; j++) {
        let tokenName = tokens[j];
        if (tokenName.length > 25) {
          // tokens = tokens.concat(RelatedHashtags.separateHashtags(tokenName));
          continue;
        }
        if (tokenName.startsWith(startingSymbol)) {
          if (hashtagDict.has(tokenName)) {
            hashtagDict.set(tokenName, hashtagDict.get(tokenName) + 1);
          } else {
            hashtagDict.set(tokenName, 1);
          }
        }
      }
    }
    let tokenValues = [];
    for (let [name, count] of hashtagDict) {
      tokenValues.push({ name: name, count: count });
    }
    return tokenValues.sort((h1, h2) => (h1.count < h2.count) ? 1 : -1).slice(0, tokenValues.length);
  }

  onHashtagSelect = enteredHashtag => {
    this.setState({ selectedHashtagObj: enteredHashtag });
  };

  onHashtagSubmit = async () => {
    let hashtagName = this.state.selectedHashtagObj.name;
    ReactGA.event({
      category: AnalyticsCategoryEnum.RELATED_HASHTAGS,
      action: `Get Related Hashtags Button Clicked`,
      label: `hashtag selected: ${hashtagName}`
    });
    this.setState({ isLoading: true });
    let top9HashtagsResponse = await GetTop9PostsForHashtag(hashtagName);
    let hashtagsPostCount = top9HashtagsResponse.postCount;
    let posts = top9HashtagsResponse.topPosts;
    let extractedHastags = RelatedHashtags.extractTokensFromPosts(posts, "#");
    this.setState({ isLoading: false, relatedHashtags: extractedHastags, hashtagsPostCount: hashtagsPostCount });
  };

  getSelectedHashtagsInStrings = () => {
    let hashtagString = "";
    this.state.selectedRowKeys.map(hashtag => {
      hashtagString = hashtagString + " " + hashtag;
    });
    return hashtagString;
  };

  noPermissions = () => {
    sendNotification(NotificationTypeEnum.Failure, I18("trial_over_message"), true);
  };

  render() {
    let relatedHashtagsDisplay = this.getRelatedHashtagsDisplay();
    let loadingDisplay = this.getLoadingDisplay();
    let selectedHashtags = this.getSelectedHashtagsDisplay();
    return (
      <React.Fragment>
        <Row>
          <Col span={19}>
            <div style={{ textAlign: "center" }}>

              <InstagramSearch
                type={SearchType.HASHTAGS}
                placeholder="Eg: nature"
                width={400}
                onSelect={this.onHashtagSelect}
              />
              &nbsp;&nbsp;
              <AppContext.Consumer>
                {value => {
                  let permissions = {improve_content: true};
                  let buttonOnClickCallback = this.onHashtagSubmit;
                  return <Button
                    onClick={buttonOnClickCallback}
                    type="primary"
                    disabled={!this.state.selectedHashtagObj}
                  >
                    Submit
                  </Button>;
                }}
              </AppContext.Consumer>
            </div>
          </Col>
        </Row>

        <Divider/>
        {loadingDisplay}
        {selectedHashtags}
        {relatedHashtagsDisplay}
      </React.Fragment>
    );
  }

  getSelectedHashtagsDisplay() {
    if (this.state.relatedHashtags.length <= 0) {
      return <div/>;
    }
    return <div>
      <Row gutter={24}>
        <Col span={18}>
          <TextArea
            value={this.getSelectedHashtagsInStrings()}
            rows={2}
            placeholder="Selected Hashtags will come here"
          />
        </Col>

        <Col span={6}>
          <CopyToClipboard text={this.getSelectedHashtagsInStrings()}
                           onCopy={() => {
                             ReactGA.event({
                               category: AnalyticsCategoryEnum.RELATED_HASHTAGS,
                               action: `Copy To Clipboard Pressed`
                             });
                             sendNotification(NotificationTypeEnum.Success, "Copied to clipboard");
                           }}>
            <span><Button>Copy Hashtags</Button></span>
          </CopyToClipboard>
        </Col>
      </Row>
      <br/>
    </div>;
  }

  getLoadingDisplay() {
    if (this.state.isLoading) {
      return (
        <div style={{ textAlign: "center" }}>
          <Spin/>
          <br/>
        </div>
      );
    }
    return <div/>;
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  getRelatedHashtagsDisplay() {
    if (this.state.relatedHashtags.length <= 0) {
      return <div/>;
    }
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (<div>
        <div className="center"><strong>Total Posts for
          #{this.state.selectedHashtagObj.name} = {this.state.hashtagsPostCount} </strong>
        <br/>
        Select the hashtags and copy them to use in you post to increase your post's reach. </div>
        <Table
          pagination={false}
          rowSelection={rowSelection}
          dataSource={this.state.relatedHashtags.map(ht => {
            ht["key"] = ht.name;
            return ht;
          })}
        >
          <Column
            title="Name"
            dataIndex="name"
            key="name"
            render={cell => {
              return <strong>{cell}</strong>;
            }}
          />

          <Column
            title="Total Occurences in top 9 Posts"
            dataIndex="count"
            key="count"
            render={cell => {
              return <strong>{cell}</strong>;
            }}
          />

          {/*Total Posts, Is Banned?, Posts Per Hour, Average likes, Average Comments, Min Likes on top 9 Posts*/}

        </Table>
      </div>
    );
  }
}

export default RelatedHashtags;
