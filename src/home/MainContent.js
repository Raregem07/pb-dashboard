import React from "react";
import { Route, Switch } from "react-router-dom";
import ErrorBoundary from "../common/components/ErrorBoundary";
import ImproveContentFeaturePage from "./FeaturePages/ImproveContentFeaturePage";
import EngageWithTargetAudienceFeaturePage from "./FeaturePages/EngageWithTargetAudienceFeaturePage";
import Tutorial from "../tutorial/Tutorial";
import Dashboard from "../dashboard/Dashboard";
import TasksPage from "./FeaturePages/engage_with_target_audience/TasksPage";
import MainPageWrapper from "./MainPageWrapper";
import Analytics from "../analytics/Analytics";
import AnalyseUser from "../analyse_user/AnalyseUser";
import DeadFollowers from "../dead_followers/DeadFollowers";
import GenerateContent from "../generate_content/GenerateContent";
import RelatedHashtags from "../related_hashtags/RelatedHashtags";
import EmbedImage from "../embed_image/EmbedImage";
import SplitImage from "../split_image/SplitImage";
import CommonUsers from "../common_users/CommonUsers";
import Automation from "../automation/Automation";
import getMainUser from "../common/chrome/GetMainUser";
import NewAnalysePosts from "../analyse_posts/NewAnalysePosts";
import LikerCommenterFromPost from "../liker_commenter_from_post/LikerCommenterFromPost";
import AnalysePosts from "../analyse_posts/AnalysePosts";
import AutomationBrain from "./AutomationBrain";
import GetOrSetValue from "../common/store/GetOrSetValue";
import DatabaseKeys from "../common/models/DatabaseKeys";
import MakeTasksObject from "../action_queue/MakeTasksObject";
import automationDefaultValues from "../common/constants/AutomationDefaultValues";
import OptionsDefaultValue from "../common/constants/OptionsDefaultValue";
import TaskQueue from "../action_queue/TaskQueue";
import CompletedTasks from "../completed_tasks/CompletedTasks";
import GiveawayWinner from "../giveaway_winner/GiveawayWinner";
import Help from "../options/Help";
import SendMessage from "../common/chrome/SendMessage";
import DetailedUsername from "../analytics/DetailedUsername";
import TutorialAnalyseUser from "../tutorial/TutorialAnalyseUser";
import TutorialAnalyseFollowerFollowing from "../tutorial/TutorialAnalyseFollowerFollowing";
import TutorialAnalyseDetailedUser from "../tutorial/TutorialAnalyseDetailedUser";
import TutorialAnalyseDeadFollowers from "../tutorial/TutorialAnalyseDeadFollowers";
import TutorialAnalyseUserPosts from "../tutorial/TutorialAnalyseUserPosts";
import TutorialAnalyseUserLikerCommenter from "../tutorial/TutorialAnalyseUserLikerCommenter";
import TutorialAnalysePostLikerCommenter from "../tutorial/TutorialAnalysePostLikerCommenter";
import TutorialGenerateContent from "../tutorial/TutorialGenerateContent";
import TutorialRelatedHashtags from "../tutorial/TutorialRelatedHashtags";
import TutorialGiveawayWinner from "../tutorial/TutorialGiveawayWinner";
import TutorialHeartImage from "../tutorial/TutorialHeartImage";
import TutorialSplitImage from "../tutorial/TutorialSplitImage";
import TutorialCommonUsers from "../tutorial/TutorialCommonUsers";
import TutorialTargetedEngagement from "../tutorial/TutorialTargetedEngagement";
import TutorialRateLimit from "../tutorial/TutorialRateLimit";
import Tier1LandingPage from "./FeaturePages/tier_1/Tier1LandingPage";
import FeatureDetails from "./FeatureDetails";
import SelfOrOther from "./FeaturePages/SelfOrOther";
import Tier2LandingPage from "./FeaturePages/tier_2/Tier2LandingPage";
import ToolsLandingPage from "./FeaturePages/tools/ToolsLandingPage";
import EmailExtractor from "../email_extractor/EmailExtractor";
import Faq from "../faq/Faq";
import NewHashtag from "../new_hashtag_location/NewHashtag";
import NewLocation from "../new_hashtag_location/NewLocation";
import Account from "../account/Account";
import ToolsFollowerFollowing from "../tools_follower_following/ToolsFollowerFollowing";
import Support from "../support/Support";
import SimilarAccount from "../similar_account/SimilarAccount";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSleeping: false,
      username: "",
      message: {
        origin: "",
        messageText: "",
        link: "",
        level: ""
      },

      tasks: [],
      completedTasks: [],

      isFetchingPosts: false,

      options: OptionsDefaultValue
    };

    const automationBrainCallbacks = {
      isFetchingPosts: this.isFetchingPosts,
      updateTasks: this.updateTasks,
      taskCompleted: this.taskCompleted
    };
    this.automationBrain = new AutomationBrain(automationBrainCallbacks);

  }

  isFetchingPosts = isFetchingPostsValue => {
    this.setState({ isFetchingPosts: isFetchingPostsValue });
  };

  updateTasks = tasks => {
    this.setState({ tasks: tasks });
  };

  taskCompleted = task => {
    this.setState({ completedTasks: this.state.completedTasks.concat([task]) });
  };

  sleepStatusChanged = (isSleeping, sleepArgs) => {
    this.setState({ isSleeping, sleepArgs });
  };

  handleActions = (tasks) => {
    this.automationBrain.addTasks(tasks);
  };

  automationSettingsChanged = (newSettings) => {
    this.automationBrain.settingsChanged(newSettings);
  };

  deleteCompletedTask = async (task) => {
    let completedTasks = this.state.completedTasks;
    completedTasks = completedTasks.filter((t) => t !== task);
    this.setState({ completedTasks });
  };

  async componentDidMount() {
    let mainUser = await getMainUser();
    let username = mainUser.viewer.username;
    this.setState({ username });

    await SendMessage("startBackgroundScrape");

    let tasks = await GetOrSetValue(DatabaseKeys.TASKS, []);
    let tasksObject = MakeTasksObject(tasks);
    this.automationBrain.updateTasksFully(tasksObject);
    this.setState({ tasks: tasksObject });

    let completedTasks = await GetOrSetValue(DatabaseKeys.COMPLETED_TASKS, []);
    let completedTasksObjects = MakeTasksObject(completedTasks);
    this.setState({ completedTasks: completedTasksObjects });

    let automationSettings = await GetOrSetValue(
      DatabaseKeys.AUTOMATION,
      automationDefaultValues
    );

    this.automationBrain.updateAutomationSettingsFully(automationSettings);

    let options = await GetOrSetValue(
      DatabaseKeys.OPTIONS,
      OptionsDefaultValue
    );

    this.automationBrain.updateOptionsFully(options);
    this.setState({ options: options });
  }

  passMessage = (origin, messageText, link, level) => {
    this.setState({
      message: {
        origin: origin,
        messageText: messageText,
        link: link,
        level: level
      }
    });
  };

  render() {

    return (
      <React.Fragment>
        <Switch>
          <Route
            exact={true}
            path={`/`}
            render={props => (
              <ErrorBoundary page="/dashboard">
                <Dashboard {...props} />
              </ErrorBoundary>
            )}
          />
          <Route
            exact={true}
            path={`/tools`}
            render={props => (
              <ErrorBoundary page="/tools">
                <ToolsLandingPage {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/level_1`}
            render={props => (
              <ErrorBoundary page="/level_1">
                <Tier1LandingPage {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/level_2`}
            render={props => (
              <ErrorBoundary page="/level_2">
                <Tier2LandingPage {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/level_1/analyse_user`}
            render={props => (
              <ErrorBoundary page="/level_1/analyse_user">
                <SelfOrOther
                  data={FeatureDetails.TOOLS_FEATURES.ANALYSE_USER}
                  {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/level_1/posts_analytics`}
            render={props => (
              <ErrorBoundary page="/level_1/posts_analytics">
                <SelfOrOther
                  data={FeatureDetails.TOOLS_FEATURES.USER_POST_ANALYTICS}
                  {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/level_2/follower_following`}
            render={props => (
              <ErrorBoundary page="/level_2/follower_following">
                <SelfOrOther
                  data={FeatureDetails.TIER_2_FEATURES.ANALYSE_FOLLOWER_FOLLOWING}
                  {...props} />
              </ErrorBoundary>
            )}
          />


          <Route
            exact={true}
            path={`/level_2/user_liker_commenter`}
            render={props => (
              <ErrorBoundary page="/level_2/user_liker_commenter">
                <SelfOrOther
                  data={FeatureDetails.TIER_2_FEATURES.USER_LIKER_COMMENTER}
                  {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/other/hashtag`}
            render={props => (
              <ErrorBoundary page="/analytics/other/hashtag">
                <MainPageWrapper
                  location={props.location}
                  isSleeping={this.state.isSleeping}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <NewHashtag
                    passMessage={(text, link, level) => this.passMessage("/analytics/other/hashtag", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/other/location`}
            render={props => (
              <ErrorBoundary page="/analytics/other/location">
                <MainPageWrapper
                  location={props.location}
                  isSleeping={this.state.isSleeping}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <NewLocation
                    passMessage={(text, link, level) => this.passMessage("/analytics/other/location", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />


          <Route
            exact={true}
            path={`/analytics/self/follower_following`}
            render={props => (
              <ErrorBoundary page="/analytics/self/follower_following">
                <MainPageWrapper
                  location={props.location}
                  isSleeping={this.state.isSleeping}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <Analytics
                    self={true}
                    location={props.location}
                    sleepStatusChanged={this.sleepStatusChanged}
                    handleActions={this.handleActions}
                    passMessage={(text, link, level) => this.passMessage("/analytics/self/follower_following", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />


          <Route
            exact={true}
            path={`/analytics/other/follower_following`}
            render={props => (
              <ErrorBoundary page="/analytics/other/follower_following">
                <MainPageWrapper
                  location={props.location}
                  isSleeping={this.state.isSleeping}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <Analytics
                    self={false}
                    location={props.location}
                    sleepStatusChanged={this.sleepStatusChanged}
                    handleActions={this.handleActions}
                    passMessage={(text, link, level) => this.passMessage("/analytics/other/follower_following", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/self/detailed_analysis`}
            render={props => (
              <ErrorBoundary page="/analytics/self/detailed_analysis">
                <MainPageWrapper
                  location={props.location}
                  isSleeping={this.state.isSleeping}
                  sleepArgs={this.state.sleepArgs}
                >
                  <DetailedUsername
                    self={true}
                    username={this.state.username}
                    location={props.location}
                    sleepStatusChanged={this.sleepStatusChanged}
                    handleActions={this.handleActions}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/other/detailed_analysis`}
            render={props => (
              <ErrorBoundary page="/analytics/other/detailed_analysis">
                <MainPageWrapper
                  location={props.location}
                  isSleeping={this.state.isSleeping}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <EmailExtractor
                    username={this.state.username}
                    location={props.location}
                    sleepStatusChanged={this.sleepStatusChanged}
                    passMessage={(text, link, level) => this.passMessage("/analytics/other/detailed_analysis", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/self/analyse_user`}
            render={props => (
              <ErrorBoundary page="/analytics/self/analyse_user">
                <MainPageWrapper
                  isSleeping={this.state.isSleeping}
                  location={props.location}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <AnalyseUser
                    self={true}
                    sleepStatusChanged={this.sleepStatusChanged}
                    passMessage={(text, link, level) => this.passMessage("/analytics/self/analyse_user", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/other/competitor_analysis`}
            render={props => (
              <ErrorBoundary page="/analytics/other/competitor_analysis">
                <MainPageWrapper
                  isSleeping={this.state.isSleeping}
                  location={props.location}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <AnalyseUser
                    self={false}
                    sleepStatusChanged={this.sleepStatusChanged}
                    passMessage={(text, link, level) => this.passMessage("/analytics/other/competitor_analysis", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/self/posts_analytics`}
            render={props => (
              <ErrorBoundary page="/analytics/self/posts_analytics">
                <MainPageWrapper
                  isSleeping={this.state.isSleeping}
                  location={props.location}
                  message={this.state.message}
                >
                  <NewAnalysePosts
                    self={true}
                    username={this.state.username}
                    passMessage={(text, link, level) => this.passMessage("/analytics/self/posts_analytics", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/other/posts_analytics`}
            render={props => (
              <ErrorBoundary page="/analytics/other/posts_analytics">
                <MainPageWrapper
                  isSleeping={this.state.isSleeping}
                  location={props.location}
                  message={this.state.message}
                >
                  <NewAnalysePosts
                    self={false}
                    username={this.state.username}
                    passMessage={(text, link, level) => this.passMessage("/analytics/other/posts_analytics", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/self/likers_commenters_post`}
            render={props => (
              <ErrorBoundary page="/analytics/self/likers_commenters_post">
                <MainPageWrapper
                  isSleeping={this.state.isSleeping}
                  location={props.location}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <LikerCommenterFromPost
                    sleepStatusChanged={this.sleepStatusChanged}
                    passMessage={(text, link, level) => this.passMessage("/analytics/self/likers_commenters_post", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/other/likers_commenters_post`}
            render={props => (
              <ErrorBoundary page="/analytics/other/likers_commenters_post">
                <MainPageWrapper
                  isSleeping={this.state.isSleeping}
                  location={props.location}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <LikerCommenterFromPost
                    sleepStatusChanged={this.sleepStatusChanged}
                    passMessage={(text, link, level) => this.passMessage("/analytics/other/likers_commenters_post", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/self/likers_commenters_user`}
            render={props => (
              <ErrorBoundary page="/analytics/self/likers_commenters_user">
                <MainPageWrapper
                  isSleeping={this.state.isSleeping}
                  location={props.location}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <AnalysePosts
                    self={true}
                    username={this.state.username}
                    sleepStatusChanged={this.sleepStatusChanged}
                    passMessage={(text, link, level) => this.passMessage("/analytics/self/likers_commenters_user", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/other/likers_commenters_user`}
            render={props => (
              <ErrorBoundary page="/analytics/other/likers_commenters_user">
                <MainPageWrapper
                  isSleeping={this.state.isSleeping}
                  location={props.location}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <AnalysePosts
                    self={false}
                    username={this.state.username}
                    sleepStatusChanged={this.sleepStatusChanged}
                    passMessage={(text, link, level) => this.passMessage("analytics/other/likers_commenters_user", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/improve_content`}
            render={props => (
              <ErrorBoundary page="/improve_content">
                <ImproveContentFeaturePage {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/improve_content/get_content`}
            render={props => (
              <ErrorBoundary page="/improve_content/get_content">
                <MainPageWrapper
                  location={props.location}
                >
                  <GenerateContent {...props} />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/improve_content/trending_hashtags`}
            render={props => (
              <ErrorBoundary page="/improve_content/trending_hashtags">
                <MainPageWrapper
                  location={props.location}
                >
                  <RelatedHashtags {...props} />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/improve_content/giveaway_winner`}
            render={props => (
              <ErrorBoundary page="/improve_content/giveaway_winner">
                <MainPageWrapper
                  location={props.location}
                >
                  <GiveawayWinner {...props} />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/improve_content/heart_your_image`}
            render={props => (
              <ErrorBoundary page="/improve_content/heart_your_image">
                <MainPageWrapper
                  location={props.location}
                >
                  <EmbedImage/>
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/improve_content/split_image`}
            render={props => (
              <ErrorBoundary page="/improve_content/split_image">
                <MainPageWrapper
                  location={props.location}
                >
                  <SplitImage/>
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/engage_with_target_audience`}
            render={props => (
              <ErrorBoundary page="/engage_with_target_audience">
                <EngageWithTargetAudienceFeaturePage
                  username={this.state.username}
                  {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/engage_with_target_audience/tasks`}
            render={props => (
              <ErrorBoundary page="/engage_with_target_audience/tasks">
                <TasksPage {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/engage_with_target_audience/common_users`}
            render={props => (
              <ErrorBoundary page="/engage_with_target_audience/common_users">
                <MainPageWrapper
                  isSleeping={this.state.isSleeping}
                  location={props.location}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <CommonUsers
                    location={props.location}
                    sleepStatusChanged={this.sleepStatusChanged}
                    handleActions={this.handleActions}
                    passMessage={(text, link, level) => this.passMessage("/engage_with_target_audience/common_users", text, link, level)}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/engage_with_target_audience/tasks/set_configuration`}
            render={props => (
              <ErrorBoundary page="/engage_with_target_audience/tasks/set_configuration">
                <MainPageWrapper
                  location={props.location}
                >
                  <Automation
                    automationSettingsChanged={this.automationSettingsChanged}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/engage_with_target_audience/tasks/see_tasks`}
            render={props => (
              <ErrorBoundary page="/engage_with_target_audience/tasks/see_tasks">
                <MainPageWrapper
                  location={props.location}
                >
                  <TaskQueue
                    tasks={this.state.tasks}
                    deleteTask={this.automationBrain.deleteTask}
                    manualCompleteTask={
                      this.automationBrain.manualCompleteTask
                    }
                    onTaskOnOffChange={
                      this.automationBrain.onTaskOnOffChange
                    }
                    clearTasks={this.automationBrain.clearTasks}
                    areAutomationsSet={this.automationBrain.areAutomationsSet()}
                    isFetchingPosts={this.state.isFetchingPosts}
                    areActionsSet={this.automationBrain.areTodosSet()}
                    {...props}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/engage_with_target_audience/tasks/completed_tasks`}
            render={props => (
              <ErrorBoundary page="/engage_with_target_audience/tasks/completed_tasks">
                <MainPageWrapper
                  isSleeping={this.state.isSleeping}
                  location={props.location}
                >
                  <CompletedTasks
                    completedTasks={this.state.completedTasks}
                    deleteCompletedTask={this.deleteCompletedTask}
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tools/follower_following`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tools/follower_following">
                <MainPageWrapper
                  location={props.location}
                >
                  <ToolsFollowerFollowing {...props} />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            exact={true}
            path={`/analytics/similar_account`}
            render={props => (
              <ErrorBoundary page="/analytics/similar_account">
                <MainPageWrapper
                  location={props.location}
                  isSleeping={this.state.isSleeping}
                  sleepArgs={this.state.sleepArgs}
                  message={this.state.message}
                >
                  <SimilarAccount
                  />
                </MainPageWrapper>
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial">
                <Tutorial {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/support`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/support">
                <Support {...props} />
              </ErrorBoundary>
            )}
          />


          <Route
            path={`/faq`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/faq">
                <Faq {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/account`}
            render={props => (
              <ErrorBoundary page="/account">
                <Account {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/analyse_user`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/analyse_user">
                <TutorialAnalyseUser {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/analyse_follower_following`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/analyse_follower_following">
                <TutorialAnalyseFollowerFollowing {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/analyse_detailed_user`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/analyse_detailed_user">
                <TutorialAnalyseDetailedUser {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/analyse_dead_followers`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/analyse_dead_followers">
                <TutorialAnalyseDeadFollowers {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/analyse_user_posts`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/analyse_user_posts">
                <TutorialAnalyseUserPosts {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/analyse_user_liker_commenter`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/analyse_user_liker_commenter">
                <TutorialAnalyseUserLikerCommenter {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/analyse_post_liker_commenter`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/analyse_post_liker_commenter">
                <TutorialAnalysePostLikerCommenter {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/related_hashtags`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/related_hashtags">
                <TutorialRelatedHashtags {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/generate_content`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/generate_content">
                <TutorialGenerateContent {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/giveaway_winner`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/giveaway_winner">
                <TutorialGiveawayWinner {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/heart_image`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/heart_image">
                <TutorialHeartImage {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/split_image`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/split_image">
                <TutorialSplitImage {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/common_users`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/common_users">
                <TutorialCommonUsers {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/targeted_engagement`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/targeted_engagement">
                <TutorialTargetedEngagement {...props} />
              </ErrorBoundary>
            )}
          />

          <Route
            path={`/tutorial/rate_limit`}
            exact={true}
            render={props => (
              <ErrorBoundary page="/tutorial/rate_limit">
                <TutorialRateLimit {...props} />
              </ErrorBoundary>
            )}
          />


        </Switch>
      </React.Fragment>
    );
  }
}

export default MainContent;
