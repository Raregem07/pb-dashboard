class OptionsModel {
  constructor(
    pageSizeForFetchingUsers,
    pageSizeForFetchingFeedAndPosts,
    intervalBetweenFollowUnfollowRequestsInSeconds,
    intervalBetweenLikingRequestsInSeconds,
    intervalBetweenRequestsToGetDetailedInfoInSeconds,
    sleepTimeFor429InSeconds,
    intervalBetweenComments,
    speed
  ) {
    this.pageSizeForFetchingUsers = pageSizeForFetchingUsers;
    this.pageSizeForFetchingFeedAndPosts = pageSizeForFetchingFeedAndPosts;
    this.intervalBetweenFollowUnfollowRequestsInSeconds = intervalBetweenFollowUnfollowRequestsInSeconds;
    this.intervalBetweenLikingRequestsInSeconds = intervalBetweenLikingRequestsInSeconds;
    this.intervalBetweenRequestsToGetDetailedInfoInSeconds = intervalBetweenRequestsToGetDetailedInfoInSeconds;
    this.sleepTimeFor429InSeconds = sleepTimeFor429InSeconds;
    this.intervalBetweenComments = intervalBetweenComments;
    this.speed = speed;
  }
}

export default OptionsModel;
