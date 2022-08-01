import React from 'react';
import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";
import SaveObject from "../common/chrome/SaveObject";
import { Button, Card, Col, Icon, Spin } from "antd";
import InstagramSearchTags from "../automation/InstagramSearchTags";
import SearchType from "../home/SearchType";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import PostsOrchestrator from "./PostsOrchestrator";
import Row from "antd/es/grid/row";
import ActionButtons from "./ActionButtons";
import PostsDisplay from "./PostsDisplay";
import Shuffle from "../common/Helpers/ShuffleArray";
import SendEvent from "../common/Helpers/SendEvent";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";


class GenerateContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtags: [],
      locations: [],
      competitorAccounts: [],
      posts: [],
      postsFetching: false
    };
    this.postsOrchestrator = new PostsOrchestrator(this.state, this.populatePosts);
  }

  async componentDidMount() {
    let alreadySetConfigurations = await GetOrSetValue(DatabaseKeys.GENERATE_CONTENT_SETTINGS, {hashtags: [], locations: [], competitorAccounts: []});
    this.setState({hashtags: alreadySetConfigurations.hashtags, locations: alreadySetConfigurations.locations, competitorAccounts: alreadySetConfigurations.competitorAccounts});
    this.postsOrchestrator = new PostsOrchestrator(alreadySetConfigurations, this.populatePosts);

    let posts = await GetOrSetValue(DatabaseKeys.GENERATE_CONTENT_POSTS, []);
    this.setState({posts});
  }

  populatePosts = (posts) => {
    let alreadyExistingPosts = [...this.state.posts];
    let combinedPosts = Shuffle(alreadyExistingPosts.concat(posts));
    this.setState({posts: combinedPosts});
    this.savePosts();
  };

  onHashtagChange = async v => {
    this.setState({ hashtags: v }, () => {
      this.saveToDB();
      this.postsOrchestrator.updateState(this.state);
    });
  };

  onLocationTagChange = async v => {
    this.setState({ locations: v }, () => {
      this.saveToDB();
      this.postsOrchestrator.updateState(this.state);
    });
  };

  onUserTagChange = async v => {
    this.setState({ competitorAccounts: v }, () => {
      this.saveToDB();
      this.postsOrchestrator.updateState(this.state);
    });
  };

  saveToDB = async () => {
    let settings = {
      hashtags: this.state.hashtags,
      locations: this.state.locations,
      competitorAccounts: this.state.competitorAccounts,
    };
    await SaveObject(DatabaseKeys.GENERATE_CONTENT_SETTINGS, settings);
  };

  getPosts = () => {
    SendEvent(AnalyticsCategoryEnum.GENERATE_CONTENT, "Get Posts Button Clicked", "");
    this.setState({postsFetching: true});
    this.postsOrchestrator.getPosts(this.postsFetchingComplete);
  };

  postsFetchingComplete = () => {
    this.setState({postsFetching: false});
  };

  clearPosts = () => {
    this.setState({posts: []}, () => {
      this.savePosts();
    });
  };

  savePosts = async () => {
    await SaveObject(DatabaseKeys.GENERATE_CONTENT_POSTS, this.posts);
  };


  render() {
    return <React.Fragment>
      <Row>
        <Col span={19 } />
      </Row>
      <Row gutter={16}>
        <Col span={12}> <Card
          title={
            <div>
              <Icon type="number" /> &nbsp;&nbsp;&nbsp; Hashtags
            </div>
          }
          style={{ margin: 4, backgroundColor: "#fbfbfb" }}
        >
          <InstagramSearchTags
            tagPrepend="#"
            type={SearchType.HASHTAGS}
            onTagChange={this.onHashtagChange}
            tagValues={this.state.hashtags}
            placeholder="Enter Hashtag which match your domain. Eg: food, foodie, foodfetish, foodporn"
          />
        </Card></Col>
        <Col span={12}>
          <Card
            title={<div>📍 &nbsp;&nbsp;Location</div>}
            style={{ margin: 4, backgroundColor: "#fbfbfb" }}
          >
            <InstagramSearchTags
              tagPrepend="📍 "
              type={SearchType.PLACES}
              onTagChange={this.onLocationTagChange}
              tagValues={this.state.locations}
              placeholder="Eg: Eiffel Tower, Broken Beach, Tokyo, Venice"
            />
          </Card>
        </Col>

      </Row>
      <br />
      <Row>
        <Col span={12}>
          <Card
            title={
              <div>
                <Icon type="user" /> &nbsp;&nbsp;Similar Accounts / Competitor Accounts
              </div>
            }
            style={{ margin: 4, backgroundColor: "#fbfbfb" }}
          >
            <InstagramSearchTags
              tagPrepend="👤 "
              type={SearchType.USERS}
              onTagChange={this.onUserTagChange}
              tagValues={this.state.competitorAccounts}
              placeholder="Eg: love_food, the_foodaholic_chick, thesassypilgrim"
              analyticsCategory={AnalyticsCategoryEnum.AUTOMATION_CONFIGURATION}
            />
          </Card>
        </Col>
      </Row>
      <br />

      <ActionButtons getPosts={this.getPosts} clearPosts={this.clearPosts}/><br />
      {this.state.postsFetching ? <div className="center"><Spin /></div>: <React.Fragment />}
      <PostsDisplay posts={this.state.posts} />
    </React.Fragment>
  }
}

export default GenerateContent;
