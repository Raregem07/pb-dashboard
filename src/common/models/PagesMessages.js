class PagesMessages {
  constructor(data) {

    this.follower_following = data.follower_following;
    this.user_liker_commenter = data.user_liker_commenter;
    this.post_liker_commenter = data.post_liker_commenter;
    this.hashtag = data.hashtag;
    this.location = data.location;

    this.email_extractor = data.email_extractor;
    this.main_page = data.main_page;

    this.analyseFollowerFollowing= data.analyse_follower_following;
    this.analyseUser= data.analyse_user;
    this.analysePosts= data.analyse_posts;
    this.analyseDeadFollowers= data.analyse_dead_followers;
    this.commonUsers= data.common_users;
    this.relatedHashtags= data.related_hashtags;
    this.heartYourImage= data.heart_your_image;
    this.automation= data.automation;
    this.automationConfiguration= data.automation_configuration;
    this.actionsByUsername= data.actions_by_username;
    this.likeCommentFeedPosts= data.like_comment_feed_posts;
    this.hashtagLocation= data.hashtag_location;
    this.igActivityStatistics= data.ig_activity_statistics;
    this.options = data.options;

    this.ANALYTICS = data.ANALYTICS;
    this.IMPROVE_CONTENT = data.IMPROVE_CONTENT;
    this.PERFORM_ENGAGEMENT = data.PERFORM_ENGAGEMENT;
  }
}

export default PagesMessages;
