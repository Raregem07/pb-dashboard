const ApplicationConstants = {
  automation: {
    MAX_TARGET_PER_USER_COUNT_IN_AUTOMATION: 4,
    // TODO: Change this
    USERS_TO_GET_IN_ONE_TIME: 24,
    LOCATION_POSTS_EXPIRY_DAYS: 20,
    HASHTAG_POSTS_EXPIRY_DAYS: 20,
    FOLLOWERS_EXPIRY_DATE: 40,
    LIKERS_POSTS_EXPIRY_DAYS: 40,
    COMMENTERS_POSTS_EXPIRY_DAYS: 40,
    UNFOLLOW_AFTER_DAYS: 5,
    MAX_TASKS_IN_QUEUE: 50,
    TASKS_ALLOWED_IN_ONE_HOUR: 130,
  },
  newAutomation: {
    USERS_TO_GET_IN_ONE_TIME: 10,
    LOCATION_POSTS_EXPIRY_DAYS: 20,
    HASHTAG_POSTS_EXPIRY_DAYS: 20,
    FOLLOWERS_EXPIRY_DATE: 40
  },
  newTaskQueue: {
    POSTS_IN_ONE_PAGE: 50,
    POSTS_IN_ONE_ROW: 3
  },
  taskQueue: {
    POSTS_IN_ONE_PAGE: 50,
    POSTS_IN_ONE_ROW: 3
  },
  postDisplay: {
    POSTS_IN_ONE_PAGE: 50,
    POSTS_IN_ONE_ROW: 3
  },
  completedTasks: {
    POSTS_IN_ONE_PAGE: 50,
    POSTS_IN_ONE_ROW: 3
  },
  relatedHashtags: {
    PAGE_SIZE: 10
  },
  googleAnalytics: {
    enabledInDev: true,
    trackingCode: "UA-177308350-1"
    // trackingCode: "UA-154475603-3"
  },
  generateContent: {
    POSTS_TO_GET_IN_ONE_TIME: 100,
    HASHTAG_POSTS_EXPIRY_DAYS: 10,
    LOCATION_POSTS_EXPIRY_DAYS: 10,
    USER_POSTS_EXPIRY_DAYS: 5,
    POSTS_IN_ONE_PAGE: 50,
    POSTS_IN_ONE_ROW: 4
  },
  home: {
    ERROR_MESSAGE_APPEARING_TIME_ON_HOME_SCREEN_IN_MS: 10000
  },
  postsStatistics: {
    POSTS_IN_ONE_ROW: 3,
    POSTS_IN_ONE_PAGE: 100
  },
  blogs: {
    BROWSEC: "https://api.profilebud.com/insta/api/v2/vpn_provider",
    VPN: "https://api.profilebud.com/insta/api/v2/vpn_blog",
    RATE_LIMIT: "https://api.profilebud.com/insta/api/v2/rate_limit_blog"
  },
  detailedAnalysis: {
    WITHOUT_PAID_TRIES: 4
  },
  followerFollowing: {
    DOWNLOAD_USER_SEGMENT: 8000,
    MAX_USERS_TO_KEEP_IN_MEMORY: 50000
  },
  SLEEP_TIME_BEFORE_NEXT_REQUEST: 100,
  SLEEP_TIME_FOR_EMAIL_CALL_IN_SEC: 120,
  MIN_MAIN_SCREEN_WIDTH: 1380,
  MIN_SCREEN_ENABLED: false,
  PAYMENT_PORTAL_LINK: "https://google.com.com",

  VPN_TUTORIAL_GIF_LINK: "https://api.profilebud.com/vpn_tutorial.gif",
  MAX_PERSONAL_CALLS: 400,
  SLEEP_TIME_FOR_SADAM_MS: 10000,
  SADAM_MAX_USERS_IN_1_CALL: 50,

  DEBUG_EMAIL_SCRAPER: {
    SADAM_ON: true,
    ANONYMYSED_CALLS_ON: true,
    PERSONALISED_CALLS_ON: false,
  },

  FAKE_NOTIFICATION_TIME_IN_MS: 20000,

  SAVE_AFTER_EVERY_FOLLOWERS_SAVED: 50,

  MAX_USERS_IN_INDRA_CALL: 20,
  INDRA_WAIT_TIME_AFTER_EVERY_CALL_IN_MS: 24000,
  RETRY_AFTER_N_INDRA_CALLS: 8 ,
  WAIT_TIME_FOR_ANONYMOUS_USER_CALLS_IN_MS: 3000,
  WAIT_TIME_FOR_NORMAL_USER_WITHOUT_SADAM: 2400,

  MAX_FOLLOWER_FOLLOWING_IN_A_GO: {
    VALUE: 8000,
    GAP_TIME_IN_HOURS: 2.5,
  },
  MAX_BAD_USERS_PERCENTAGE_ALLOWED_IN_A_GO_SADAM: 40,

  JVZOO: {
    PREMIUM_PURCHASE_LINK: "https://api.profilebud.com/profilemate_redirect_link",
  },
  SUPPORT_LINK: "https://socialunderworld.freshdesk.com/support/tickets/new",
  UPLOAD_SADAM_CALLS_IN_MIN: 10,

  APP_VERSION: "1.0.0",
  MEMBERS_AREA: "https://app.profilebuddy.io",

  IS_WHITELABEL: false,


  RATE_LIMIT_EMAIL_CONFIG: {
    TIME_TO_CHECK_IN_SECONDS: 1200,
    THRESHOLD_CALLS: 3,
    TIME_IN_HOUR_FOR_SLEEP: 24
  },
  MEDIUM_BLOG: "https://www.profilebuddy.io/blog/",

  MAX_EMAIL_CALL_LIMITS: {
    BASIC: 2000,
    PREMIUM: 10000
  },

  BUNCH_SIZE_OF_EMAILS_TO_COLLECT: 5,
  URL_COLLECT_MAIL: "https://sdt.profilebud.com/api/v1/verify",
  BLOG_WHEN_ERROR_HAPPENS: "https://www.profilebuddy.io/2020/12/22/what-to-do-when-main-window-error-comes/",
  CONVERT_USERS_TO_SADAM_USERS_PROBABILITY: 0.25,
  SLEEP_IN_MS_BETWEEN_SADAM_CALLS: 1000,
};

export default ApplicationConstants;
