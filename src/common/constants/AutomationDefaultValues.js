import MediaAgeEnum from "../models/MediaAgeEnum";

const automationDefaultValues = {
  todo: {
    like: true,
    comment: true,
    follow: true,
    likeAndFollow: false,
    unfollowAll: true,
    unfollowNonFollowers: false
  },
  filter: {
    minLikes: 0,
    maxLikes: 10000,
    minComments: 0,
    maxComments: 10000,
    minFollowers: 0,
    maxFollowers: 10000,
    minFollowing: 0,
    maxFollowing: 10000,
    mediaAge: MediaAgeEnum.ANY
  },
  automationsInADay: {
    maxLikesAutomation: 300,
    maxCommentsAutomation: 150,
    maxFollowAutomation: 80
  },
  strategyBrain: {
    hashtags: 6,
    location: 6,
    commentersOfSimilarAccounts: 9,
    likersOfSimilarAccounts: 9,
    followersOfSimilarAccounts: 9
  },
  hashtags: [],
  places: [],
  similarUsers: [],
  saveToDBLoading: false,
  smartSuggestions: true
};

export default automationDefaultValues;