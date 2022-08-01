import React from 'react';
import DisplayOptions from "./DisplayOptions";
import PostAnalysisDownloader from "./PostAnalysisDownloader";
import UsersDisplayer from "./UsersDisplayer";
import PostsDisplayer from "./PostsDisplayer";
import AnalysePostsDisplayEnum from "./AnalysePostsDisplayEnum";
import User from "../common/models/User";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";


// Props: users (list of Users with likedPosts and commentedPosts), posts (with likedUsers and commentedUsers), isDataReceived
class AnalysePostDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whatToShow: AnalysePostsDisplayEnum.USERS,
      likesGreaterThanEqualTo: 0,
      likesLessThan: 100000,
      commentsGreaterThanEqualTo: 0,
      commentsLessThan: 100000,
      bioSubstring: ""
    };
    this.onWhatToShowChange = this.onWhatToShowChange.bind(this);
    this.onLikesGreaterThanChange = this.onLikesGreaterThanChange.bind(this);
    this.onLikesLessThanChange = this.onLikesLessThanChange.bind(this);
    this.onCommentsGreaterThanChange = this.onCommentsGreaterThanChange.bind(this);
    this.onCommentsLessThanChange = this.onCommentsLessThanChange.bind(this);
  }

  onBioSubstringChange = (e) => {
    this.setState({bioSubstring: e.target.value});
  };

  onWhatToShowChange(v) {
    ReactGA.event({
      category: AnalyticsCategoryEnum.ANALYSE_POST,
      action: `User clicked ${v.target.value} in what to show in posts`
    });
    this.setState({whatToShow: v.target.value});
  }

  onLikesGreaterThanChange(v) {
    this.setState({likesGreaterThanEqualTo: v});
  }

  onLikesLessThanChange(v) {
    this.setState({likesLessThan: v});
  }

  onCommentsGreaterThanChange(v) {
    this.setState({commentsGreaterThanEqualTo: v});
  }

  onCommentsLessThanChange(v) {
    this.setState({commentsLessThan: v});
  }

  filterUsers() {
    let conditionalUsers = [];
    let originalUsers = this.props.users;
    for (let i = 0; i < originalUsers.length; i++) {
      let u = originalUsers[i];
      let newUser = new User(u.profileURL, u.username, u.fullName, u.id, u.followedByViewer, null, null, u.isVerified, u.isPrivate);
      let newUserLikedPosts = [];
      for (let j = 0; j < u.likedPosts.length; j++) {
        if (u.likedPosts[j].likesConditionMet(this.state.likesGreaterThanEqualTo, this.state.likesLessThan)) {
          newUserLikedPosts.push(u.likedPosts[j]);
        }
      }
      newUser.bulkSetLikedPosts(newUserLikedPosts);
      for (let j = 0; j < u.commentedPosts.length; j++) {
        if (u.commentedPosts[j].commentsConditionMet(this.state.commentsGreaterThanEqualTo, this.state.commentsLessThan)) {
          newUser.addCommentedPost(u.commentedPosts[j], u.commentedValues[j])
        }
      }
      conditionalUsers.push(newUser);
    }
    return conditionalUsers;
  }

  filterPosts() {
    let conditionalPosts = [];
    let originalPosts = this.props.posts;
    for (let i = 0; i < originalPosts.length; i++) {
      if (originalPosts[i].likesConditionMet(this.state.likesGreaterThanEqualTo, this.state.likesLessThan)
        && originalPosts[i].commentsConditionMet(this.state.commentsGreaterThanEqualTo, this.state.commentsLessThan)
        && originalPosts[i].substringConditionMet(this.state.bioSubstring)) {
        conditionalPosts.push(originalPosts[i]);
      }
    }
    return conditionalPosts;
  }

  render() {
    if(this.props.users.length === 0) {
      return <div />
    }
    // console.log(this.props.users, this.props.posts, this.state);
    return (<div>
      <PostAnalysisDownloader posts={this.props.posts} users={this.props.users} />
      <DisplayOptions
        onlyPosts={false}
        onWhatToShowChange={this.onWhatToShowChange}
        whatToShowValue={this.state.whatToShow}
        onLikesGreaterThanChange={this.onLikesGreaterThanChange}
        likesGreaterThanEqualToValue={this.state.likesGreaterThanEqualTo}
        onLikesLessThanChange={this.onLikesLessThanChange}
        likesLessThanValue={this.state.likesLessThan}
        onCommentsGreaterThanChange={this.onCommentsGreaterThanChange}
        commentsGreaterThanEqualToValue={this.state.commentsGreaterThanEqualTo}
        onCommentsLessThanChange={this.onCommentsLessThanChange}
        commentsLessThanValue={this.state.commentsLessThan}
        bioSubstring={this.state.bioSubstring}
        onBioSubstringChange={this.onBioSubstringChange}
      />
      <UsersDisplayer whatToShow={this.state.whatToShow} posts={this.props.posts} users={this.filterUsers()} />
      <PostsDisplayer whatToShow={this.state.whatToShow} posts={this.filterPosts()} />
    </div>)
  }
}

export default AnalysePostDisplay;
