import ApplicationConstants from "./constants/ApplicationConstants";

const Messages = {
  DETAILED_USER_CALL_FAILED: ["Please use some proxy VPN for best results. Download free VPN here", ApplicationConstants.blogs.BROWSEC, "warning"],
  LIKES_DISABLED: ["Cannot show like Count for this account", "#", "warning"],
  MAX_USERS_SCRAPED: [`Only 50k Followers/Following can be scraped in Free trial | Purchase ProfileMate to download users for however big account you want`, ApplicationConstants.PAYMENT_PORTAL_LINK, "warning"],
  MAX_USERS_SCRAPED_TOTAL: [`You have scraped max users allowed for your account | Purchase ProfileMate to download users for however big account you want`, ApplicationConstants.PAYMENT_PORTAL_LINK, "warning"],
  TRIAL_OVER_LEVEL_3_CALLS: ["Subscription Over. Purchase ProfileMate to continue", "#", "warning"],
  INCREASE_SPEED_OF_CALLS_PURCHASE_MESSAGE: ["Getting data at normal speed. Increase your speed & daily limits by 5 times by investing in Profilemate's Premium version", ApplicationConstants.JVZOO.PREMIUM_PURCHASE_LINK, "info"],
  WAIT_FOR_SOME_TIME_USERNAME_TO_USER_ID_FAILED: ["Wait for some time. Too many calls. |  Purchase the Subscription to get 10 times fast calls & no errors like this!", "#", "warning"],
  MAX_HASHTAGS_SCRAPED: ["Max users for Hashtags scraped for your subscription. Purchase ProfileMate Subscription to Get more users for hashtags", "#", "warning"],
  MAX_LOCATIONS_SCRAPED: ["Max users for Locations scraped for your subscription. Purchase ProfileMate Subscription to Get more users for locations", "#", "warning"],
  EMAIL_USERS_OVER: ["Max Users for a day over | Download the Completed data & continue after 24 hours. Purchase Supercharged Calls Edition from JVZoo for Increased limits", ApplicationConstants.JVZOO.PREMIUM_PURCHASE_LINK, "warning"],
};

export default Messages;
