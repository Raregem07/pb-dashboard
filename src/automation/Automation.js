import React from "react";
import { Button, Card, Checkbox, Col, Collapse, Icon, Row } from "antd";
import ToggleWithName from "./ToggleWithName";
import InstagramSearchTags from "./InstagramSearchTags";
import SearchType from "../home/SearchType";
import AutomationFilter from "./AutomationFilter";
import SaveObject from "../common/chrome/SaveObject";
import GetObject from "../common/chrome/GetObject";
import sendNotification from "../common/SendNotification";
import NotificationTypeEnum from "../common/models/NotificationTypeEnum";
import AutomationInteractions from "./AutomationInterations";
import StrategyBrain from "./StrategyBrain";
import DatabaseKeys from "../common/models/DatabaseKeys";
import automationDefaultValues from "../common/constants/AutomationDefaultValues";
import MessageDisplayer from "../common/components/MessageDisplayer";
import { AppContext } from "../home/Home";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import InstagramSearch from "../common/components/InstagramSearch";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import NeedHelp from "../common/components/NeedHelp";
import SendEvent from "../common/Helpers/SendEvent";

const Meta = Card;

const { Panel } = Collapse;

class Automation extends React.Component {
  constructor(props) {
    super(props);
    this.state = automationDefaultValues;
  }

  async componentDidMount() {
    let automationSavedValues = await GetObject(DatabaseKeys.AUTOMATION);
    if (!automationSavedValues) {
      await SaveObject("automation", this.state);
      return;
    }
    this.setState({
      todo: automationSavedValues.todo,
      filter: automationSavedValues.filter,
      hashtags: automationSavedValues.hashtags,
      places: automationSavedValues.places,
      similarUsers: automationSavedValues.similarUsers,
      automationsInADay: automationSavedValues.automationsInADay,
      strategyBrain: automationSavedValues.strategyBrain,
      smartSuggestions: automationSavedValues.smartSuggestions
    });
  }

  toggleTodo = async (name, value) => {
    let todo = JSON.parse(JSON.stringify(this.state.todo));
    todo[name] = value;
    SendEvent(AnalyticsCategoryEnum.AUTOMATION_CONFIGURATION, `Config changed: Todo Name ${name} - Value ${value}`);
    this.setState({ todo: todo }, () => {
      this.saveToDB();
    });
  };

  onHashtagChange = async v => {
    this.setState({ hashtags: v }, () => {
      this.saveToDB();
    });
  };

  onLocationTagChange = async v => {
    this.setState({ places: v }, () => {
      this.saveToDB();
    });
  };

  onUserTagChange = async v => {
    this.setState({ similarUsers: v }, () => {
      this.saveToDB();
    });
  };

  onSmartSuggestionChanged = async e => {
    this.setState({smartSuggestions: e.target.checked}, () => {
      this.saveToDB()
    })
  };

  render() {
    return (
      <React.Fragment>
        <div style={{textAlign: "right"}}>
          <NeedHelp type={NeedHelpEnum.AUTOMATION_CONFIGURATIONS}/>
        </div><br />
        <Card
          title={
            <div>
              <Icon type="appstore" /> &nbsp;&nbsp;&nbsp; To-Do
            </div>
          }
          style={{ margin: 4, backgroundColor: "#fbfbfb" }}
        >
          <Row>
            <Col span={12}>
              <ToggleWithName
                name="Like"
                onToggle={this.toggleTodo}
                key1="like"
                defaultValue={this.state.todo.like}
              />
            </Col>
            <Col span={12}>
              <ToggleWithName
                name="Comment"
                onToggle={this.toggleTodo}
                key1="comment"
                defaultValue={this.state.todo.comment}
              />
            </Col>
          </Row>{" "}
          <br />
          <Row>
            <Col span={12}>
              <ToggleWithName
                name="Follow"
                onToggle={this.toggleTodo}
                key1="follow"
                defaultValue={this.state.todo.follow}
              />
            </Col>
            <Col span={12}>
              <ToggleWithName
                name="Unfollow followed accounts"
                onToggle={this.toggleTodo}
                key1="unfollowAll"
                defaultValue={this.state.todo.unfollowAll}
              />
            </Col>
          </Row>
        </Card>
        <br />

        <Card
          title={
            <div>
              <Icon type="user" /> &nbsp;&nbsp;&nbsp;<strong>Your Competitor accounts  - Most important metric ⭐ </strong> | (Set atleast 3-5 big accounts for best result)
            </div>
          }
          style={{ margin: 4, backgroundColor: "#fbfbfb" }}
        >
          <InstagramSearchTags
            tagPrepend="👤 "
            type={SearchType.USERS}
            onTagChange={this.onUserTagChange}
            tagValues={this.state.similarUsers}
            placeholder="Eg: love_food, the_foodaholic_chick, thesassypilgrim"
            analyticsCategory={AnalyticsCategoryEnum.AUTOMATION_CONFIGURATION}
          />
        </Card>
        <br />

        <Row>
          <Col span={12}>
            <Card
              title={
                <div>
                  <Icon type="number" /> &nbsp;&nbsp;&nbsp; Enter Hashtag which match your domain
                </div>
              }
              style={{ margin: 4, backgroundColor: "#fbfbfb" }}
            >
              <InstagramSearchTags
                tagPrepend="#"
                type={SearchType.HASHTAGS}
                onTagChange={this.onHashtagChange}
                tagValues={this.state.hashtags}
                placeholder="Eg: #foodgasm, #foodporn, #"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title={<div>📍 &nbsp;&nbsp;Enter Location which matches your genre</div>}
              style={{ margin: 4, backgroundColor: "#fbfbfb" }}
            >
              <InstagramSearchTags
                tagPrepend="📍 "
                type={SearchType.PLACES}
                onTagChange={this.onLocationTagChange}
                tagValues={this.state.places}
                placeholder="Eg: Food Street, Ristorante Villa Crespi, World Food Centre"
              />
            </Card>
          </Col>
        </Row>

        <br />
        <Collapse>
          <Panel header={<div style={{fontSize: 24}}>Advance Settings</div>} >
            <Card
              title={
                <div>
                  <Icon type="filter" /> &nbsp;&nbsp;&nbsp; Filters
                </div>
              }
              style={{ margin: 4, backgroundColor: "#fbfbfb" }}
            >
              <AutomationFilter
                minLikes={this.state.filter.minLikes}
                onMinLikesChange={this.onMinLikesChange}
                maxLikes={this.state.filter.maxLikes}
                onMaxLikesChange={this.onMaxLikesChange}
                minComments={this.state.filter.minComments}
                onMinCommentsChange={this.onMinCommentsChange}
                maxComments={this.state.filter.maxComments}
                onMaxCommentsChange={this.onMaxCommentsChange}
                minFollowers={this.state.filter.minFollowers}
                onMinFollowersChange={this.onMinFollowersChange}
                maxFollowers={this.state.filter.maxFollowers}
                onMaxFollowersChange={this.onMaxFollowersChange}
                minFollowing={this.state.filter.minFollowing}
                onMinFollowingChange={this.onMinFollowingChange}
                maxFollowing={this.state.filter.maxFollowing}
                onMaxFollowingChange={this.onMaxFollowingChange}
                mediaAge={this.state.filter.mediaAge}
                onMediaAgeChange={this.onMediaChange}
              />
            </Card>
            <br />

            <Card
              title={
                <div>
                  <Icon type="aliwangwang" /> &nbsp;&nbsp;&nbsp; Make your best strategy to get <strong>Posts</strong> and{" "}
                  <strong>Users</strong> on instagram to perform actions{" "}
                </div>
              }
              style={{ margin: 4, backgroundColor: "#fbfbfb" }}
            >
              <StrategyBrain
                hashtags={this.state.strategyBrain.hashtags}
                location={this.state.strategyBrain.location}
                commentersSimilarAccount={
                  this.state.strategyBrain.commentersOfSimilarAccounts
                }
                likersSimilarAccount={
                  this.state.strategyBrain.likersOfSimilarAccounts
                }
                followersSimilarAccounts={
                  this.state.strategyBrain.followersOfSimilarAccounts
                }
                onChangeStrategyHashtags={this.onChangeStrategyHashtags}
                onChangeStrategyLocation={this.onChangeStrategyLocation}
                onChangeCommentersSimilarAccount={
                  this.onChangeCommentersSimilarAccount
                }
                onChangeLikersSimilarAccount={this.onChangeLikersSimilarAccount}
                onChangeFollowersSimilarAccount={
                  this.onChangeFollowersSimilarAccount
                }
              /> <br />
            </Card>
            <Card
              title={
                <div>
                  <Icon type="interaction" /> &nbsp;&nbsp;&nbsp; Smart Suggestions &nbsp; | Removes people with high follower/following ratio
                </div>
              }
              style={{ margin: 4, backgroundColor: "#fbfbfb" }}
            >
              <Checkbox onChange={this.onSmartSuggestionChanged} checked={this.state.smartSuggestions} />
            </Card>


            <Card
              title={
                <div>
                  <Icon type="interaction" /> &nbsp;&nbsp;&nbsp; Max actions per day
                </div>
              }
              style={{ margin: 4, backgroundColor: "#fbfbfb" }}
            >
              <AutomationInteractions
                maxLikesAutomation={this.state.automationsInADay.maxLikesAutomation}
                maxCommentsAutomation={
                  this.state.automationsInADay.maxCommentsAutomation
                }
                maxFollowAutomation={
                  this.state.automationsInADay.maxFollowAutomation
                }
                onMaxLikesAutomationChange={this.onMaxLikesAutomationChange}
                onMaxCommentsAutomationChange={this.onMaxCommentsAutomationChange}
                onMaxFollowAutomationChange={this.onMaxFollowAutomationChange}
              />
            </Card>
            <br />

            <div style={{ textAlign: "center" }}>
              <Button
                size="large"
                type="primary"
                loading={this.state.saveToDBLoading}
                onClick={this.submitButtonClick}
              >
                Submit
              </Button>
            </div>
          </Panel>
        </Collapse>
        <br />
        <br />

      </React.Fragment>
    );
  }

  submitButtonClick = async () => {
    await this.saveToDB();
    sendNotification(
      NotificationTypeEnum.Success,
      "Automation Filter Settings Saved"
    );
  };

  saveToDB = async () => {
    this.setState({ saveToDBLoading: true });
    let automation = {
      todo: this.state.todo,
      filter: this.state.filter,
      hashtags: this.state.hashtags,
      places: this.state.places,
      similarUsers: this.state.similarUsers,
      automationsInADay: this.state.automationsInADay,
      strategyBrain: this.state.strategyBrain
    };
    await SaveObject(DatabaseKeys.AUTOMATION, automation);
    this.setState({ saveToDBLoading: false });
    this.props.automationSettingsChanged(automation);
  };

  onChangeStrategyHashtags = v => {
    let brain = JSON.parse(JSON.stringify(this.state.strategyBrain));
    brain.hashtags = v;
    this.setState({ strategyBrain: brain });
  };

  onChangeStrategyLocation = v => {
    let brain = JSON.parse(JSON.stringify(this.state.strategyBrain));
    brain.location = v;
    this.setState({ strategyBrain: brain });
  };

  onChangeCommentersSimilarAccount = v => {
    let brain = JSON.parse(JSON.stringify(this.state.strategyBrain));
    brain.commentersOfSimilarAccounts = v;
    this.setState({ strategyBrain: brain });
  };

  onChangeLikersSimilarAccount = v => {
    let brain = JSON.parse(JSON.stringify(this.state.strategyBrain));
    brain.likersOfSimilarAccounts = v;
    this.setState({ strategyBrain: brain });
  };

  onChangeFollowersSimilarAccount = v => {
    let brain = JSON.parse(JSON.stringify(this.state.strategyBrain));
    brain.followersOfSimilarAccounts = v;
    this.setState({ strategyBrain: brain });
  };

  onMaxLikesAutomationChange = v => {
    let automation = JSON.parse(JSON.stringify(this.state.automationsInADay));
    automation.maxLikesAutomation = v;
    this.setState({ automationsInADay: automation });
  };

  onMaxCommentsAutomationChange = v => {
    let automation = JSON.parse(JSON.stringify(this.state.automationsInADay));
    automation.maxCommentsAutomation = v;
    this.setState({ automationsInADay: automation });
  };

  onMaxFollowAutomationChange = v => {
    let automation = JSON.parse(JSON.stringify(this.state.automationsInADay));
    automation.maxFollowAutomation = v;
    this.setState({ automationsInADay: automation });
  };

  onMediaChange = v => {
    let filter = JSON.parse(JSON.stringify(this.state.filter));
    filter.mediaAge = v;
    this.setState({ filter: filter });
  };

  onMinLikesChange = v => {
    let filter = JSON.parse(JSON.stringify(this.state.filter));
    filter.minLikes = v;
    this.setState({ filter: filter });
  };

  onMaxLikesChange = v => {
    let filter = JSON.parse(JSON.stringify(this.state.filter));
    filter.maxLikes = v;
    this.setState({ filter: filter });
  };

  onMinCommentsChange = v => {
    let filter = JSON.parse(JSON.stringify(this.state.filter));
    filter.minComments = v;
    this.setState({ filter: filter });
  };

  onMaxCommentsChange = v => {
    let filter = JSON.parse(JSON.stringify(this.state.filter));
    filter.maxComments = v;
    this.setState({ filter: filter });
  };

  onMinFollowersChange = v => {
    let filter = JSON.parse(JSON.stringify(this.state.filter));
    filter.minFollowers = v;
    this.setState({ filter: filter });
  };

  onMaxFollowersChange = v => {
    let filter = JSON.parse(JSON.stringify(this.state.filter));
    filter.maxFollowers = v;
    this.setState({ filter: filter });
  };

  onMinFollowingChange = v => {
    let filter = JSON.parse(JSON.stringify(this.state.filter));
    filter.minFollowing = v;
    this.setState({ filter: filter });
  };

  onMaxFollowingChange = v => {
    let filter = JSON.parse(JSON.stringify(this.state.filter));
    filter.maxFollowing = v;
    this.setState({ filter: filter });
  };
}

export default Automation;
