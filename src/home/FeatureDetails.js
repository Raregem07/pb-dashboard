/* eslint-disable no-unused-vars */
import React from "react";
import tier3 from "../common/images/tier_3_email.png";


import follower_following_icon from "../common/images/follower_following_black.png";
import common_user_icon from "../common/images/common_users_black.png";
import hashtag from "../common/images/hashtag.png";
import location from "../common/images/location.png";
import liker_commenter_user_icon from "../common/images/top_liker_commenter_user_black.png";
import liker_commenter_post_icon from "../common/images/post_liker_commenter_black.png";
import dead_follower_icon from "../common/images/dead_follower_ghost.png";
import similarAccountBlack from "../common/images/similar_account_black.svg";
import call_icon from "../common/images/call_icon.png";
import engagement_rate_icon from "../common/images/engagement_rate.png";
import target_users_icon from "../common/images/target_user_dashboard.png";
import follower_post_count_icon from "../common/images/follower_post_counts.png";
import website_icon from "../common/images/website_icon_small.png";
import email_icon from "../common/images/email_icon_black_white.png";

const FeatureDetails = {

  TIER_2_FEATURES: {
    ANALYSE_FOLLOWER_FOLLOWING: {
      CARD_NAME: "Follower Following",
      IDENTIFIER: "follower_following",
      ACTION: "/level_2/follower_following",
      IS_MOST_USED: false,
      CARD_COLOR: "#479CFF",

      SELF_OTHER_HEADING: "Follower Following",
      CRUMB_1: {
        NAME: "Target Users",
        ACTION: "/level_2"
      },

      SELF_ACTION: "/analytics/self/follower_following",
      OTHER_ACTION: "/analytics/other/follower_following"
    },


    DEAD_FOLLOWERS: {
      CARD_NAME: "Inactive/Ghost Followers",
      IDENTIFIER: "dead_followers",
      IS_MOST_USED: false,
      CARD_COLOR: "#479CFF",
      ACTION: "/level_2/dead_followers",

      SELF_OTHER_HEADING: "Inactive/Ghost Followers",
      CRUMB_1: {
        NAME: "Target Users",
        ACTION: "/level_2"
      },

      SELF_ACTION: "/analytics/self/dead_followers",
      OTHER_ACTION: "/analytics/other/dead_followers"
    },
    USER_LIKER_COMMENTER: {
      CARD_NAME: "User's top Likers-Commenters",
      IDENTIFIER: "user_likers_commenters",
      IS_MOST_USED: false,
      CARD_COLOR: "#479CFF",
      ACTION: "/level_2/user_liker_commenter",

      SELF_OTHER_HEADING: "User's Top Liker-Commenter",
      CRUMB_1: {
        NAME: "Target Users",
        ACTION: "/level_2"
      },

      SELF_ACTION: "/analytics/self/likers_commenters_user",
      OTHER_ACTION: "/analytics/other/likers_commenters_user"
    },
    POST_LIKER_COMMENTER: {
      CARD_NAME: "Specific Post's liker/commenters",
      IDENTIFIER: "post_likers_commenters",
      ACTION: "/analytics/other/likers_commenters_post",
      IS_MOST_USED: false,
      CARD_COLOR: "#479CFF",
      CRUMB_1: {
        NAME: "Target Users",
        ACTION: "/level_2"
      }
    },
    COMMON_USERS: {
      CARD_NAME: "Common Users between accounts",
      IDENTIFIER: "common_follower",
      ACTION: "/engage_with_target_audience/common_users",
      IS_MOST_USED: false,
      CARD_COLOR: "#479CFF",
      CRUMB_1: {
        NAME: "Target Users",
        ACTION: "/level_2"
      }
    },
    HASHTAG: {
      CARD_NAME: "From Hashtag",
      IDENTIFIER: "hashtag",
      ACTION: "/analytics/other/hashtag",
      IS_MOST_USED: true,
      CARD_COLOR: "#479CFF",

      CRUMB_1: {
        NAME: "Target Users",
        ACTION: "/level_2"
      }
    },
    LOCATION: {
      CARD_NAME: "From Locations",
      IDENTIFIER: "location",
      ACTION: "/analytics/other/location",
      IS_MOST_USED: true,
      CARD_COLOR: "#479CFF",

      CRUMB_1: {
        NAME: "Target Users",
        ACTION: "/level_2"
      }
    },
    SIMILAR_ACCOUNT: {
      CARD_NAME: "Similar Accounts",
      IDENTIFIER: "similar_account",
      ACTION: "/analytics/similar_account",
      IS_MOST_USED: true,
      CARD_COLOR: "#479CFF",

      CRUMB_1: {
        NAME: "Target Users",
        ACTION: "/level_2"
      }
    },

  },
  TOOLS_FEATURES: {

    FOLLOWER_FOLLOWING_SEGREGATOR: {
      MAIN_PAGE_NAME: "Fans & Brats Analysis",
      ACTION: "/tools/follower_following",
      CARD_NAME: "Fans & Brats Analysis",
      IDENTIFIER: "fans_and_brats_analysis",
      IS_MOST_USED: false,
      CARD_COLOR: "#7741A7",
      CRUMB_1: {
        NAME: "Tools",
        ACTION: "/tools"
      }
    },

    GET_TRENDING_CONTENT: {
      ACTION: "/improve_content/get_content",
      CARD_NAME: "Best & Trending Posts",
      IDENTIFIER: "best_posts",
      IS_MOST_USED: false,
      CARD_COLOR: "#7741A7",
      CRUMB_1: {
        NAME: "Tools",
        ACTION: "/tools"
      }
    },
    TRENDING_RELATED_HASHTAGS: {
      CARD_NAME: "Related Trending Hashtags",
      IDENTIFIER: "related_hashtags",
      ACTION: "/improve_content/trending_hashtags",
      IS_MOST_USED: false,
      CARD_COLOR: "#7741A7",
      CRUMB_1: {
        NAME: "Tools",
        ACTION: "/tools"
      }
    },
    SPLIT_IMAGE: {
      CARD_NAME: "Split Image Into Multiple Images",
      IDENTIFIER: "split_image_tool",
      ACTION: "/improve_content/split_image",
      IS_MOST_USED: false,
      CARD_COLOR: "#7741A7",
      CRUMB_1: {
        NAME: "Tools",
        ACTION: "/tools"
      }
    },
    HEART_YOUR_IMAGE: {
      CARD_NAME: "Add Liker's heart to your image",
      IDENTIFIER: "heart_image",
      ACTION: "/improve_content/heart_your_image",
      IS_MOST_USED: false,
      CARD_COLOR: "#7741A7",
      CRUMB_1: {
        NAME: "Tools",
        ACTION: "/tools"
      }
    },
    ANALYSE_USER: {
      CARD_NAME: "Any Account's Report",
      IDENTIFIER: "profile_report",
      ACTION: "/level_1/analyse_user",
      IS_MOST_USED: false,
      CARD_COLOR: "#7741A7",

      SELF_OTHER_HEADING: "Account Report",
      CRUMB_1: {
        NAME: "Tools",
        ACTION: "/tools"
      },

      SELF_ACTION: "/analytics/self/analyse_user",
      OTHER_ACTION: "/analytics/other/competitor_analysis"
    },
    USER_POST_ANALYTICS: {
      CARD_NAME: "Posts' Statistics for any account",
      IDENTIFIER: "profile_report",
      IS_MOST_USED: false,
      CARD_COLOR: "#7741A7",
      ACTION: "/level_1/posts_analytics",

      SELF_OTHER_HEADING: "Posts' Analysis",
      CRUMB_1: {
        NAME: "Tools",
        ACTION: "/tools"
      },

      SELF_ACTION: "/analytics/self/posts_analytics",
      OTHER_ACTION: "/analytics/other/posts_analytics"
    },
    GIVEAWAY_WINNER: {
      CARD_NAME: "Choose Giveaway post's Winners",
      IDENTIFIER: "giveaway_winner",
      ACTION: "/improve_content/giveaway_winner",
      IS_MOST_USED: false,
      CARD_COLOR: "#7741A7",
      CRUMB_1: {
        NAME: "Tools",
        ACTION: "/tools"
      }
    }
  },
  ANALYTICS: {
    SELF: {
      FEATURES: {
        DETAILED_USER_ANALYSIS: {
          ACTION: "/analytics/self/detailed_analysis",
          MAIN_PAGE_TOP_BAR_NAME: "Email Extractor",
          MAIN_PAGE_TEXT: "Get User data like follower-following counts, post counts, engagement rate, etc from usernames",
          CARD_COLOR: "#4355FF",
          CARD_NAME: "Email Extractor",
          IDENTIFIER: "follower_following",
          IS_MOST_USED: true,
          MAIN_PAGE_NAME: "Email Extractor",
          MAIN_PAGE_NOTE: "Get follower-following counts, post counts, engagement rate, etc from usernames",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },
        ANALYSE_FOLLOWER_FOLLOWING: {
          RIGHT_SIDER_NAME: "Download Follower Following",
          ACTION: "/analytics/self/follower_following",
          MAIN_PAGE_TOP_BAR_NAME: "View & Download your Followers-Followings",
          MAIN_PAGE_TEXT: "View & Download all your followers following",
          CARD_COLOR: "#4355FF",
          CARD_NAME: "Follower Following",
          IDENTIFIER: "follower_following",
          IS_MOST_USED: true,
          MAIN_PAGE_NAME: "Your Follower Following",
          MAIN_PAGE_NOTE: "View and Download your Follower/Following",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },
        ANALYSE_USER: {
          CARD_NAME: "Your Profile Report",
          IDENTIFIER: "profile_report",
          ACTION: "/analytics/self/analyse_user",
          IS_MOST_USED: true,
          CARD_COLOR: "#4355FF",
          MAIN_PAGE_NAME: "Get your Profile Report",
          MAIN_PAGE_NOTE: "Analyse your profile & take smart decisions based on this data",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },
        DEAD_FOLLOWERS: {
          CARD_NAME: "Dead Followers/Ghost Followers",
          IDENTIFIER: "dead_followers",
          ACTION: "/analytics/self/dead_followers",
          IS_MOST_USED: true,
          CARD_COLOR: "#4355FF",
          RIGHT_SIDER_NAME: "See your Dead/Ghost Followers",
          MAIN_PAGE_NAME: "Dead Followers/Ghost Followers",
          MAIN_PAGE_NOTE: "See People who have never liked/commented on your post but are your follower.",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },
        USER_POST_ANALYTICS: {
          CARD_NAME: "Your Posts' Statistics",
          IDENTIFIER: "post_stats",
          IS_MOST_USED: false,
          CARD_COLOR: "#4355FF",
          ACTION: "/analytics/self/posts_analytics",
          MAIN_PAGE_NAME: "Your Post Statistics",
          MAIN_PAGE_NOTE: "See likes and comments on your posts",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },
        USER_LIKER_COMMENTER: {
          RIGHT_SIDER_NAME: "Analyse your Top Likers and commenters",
          ACTION: "/analytics/self/likers_commenters_user",

          CARD_NAME: "Your Likers & Commenters",
          IDENTIFIER: "user_likers_commenters",
          IS_MOST_USED: true,
          CARD_COLOR: "#4355FF",
          MAIN_PAGE_NAME: "Your Likers & Commenters",
          MAIN_PAGE_NOTE: "Select the posts & press submit to get liker commenter analysis on the selected posts. ",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },
        POST_LIKER_COMMENTER: {
          CARD_NAME: "Specific Post's liker/Commenters",
          IDENTIFIER: "post_likers_commenters",
          IS_MOST_USED: false,
          CARD_COLOR: "#4355FF",
          ACTION: "/analytics/self/likers_commenters_post",
          MAIN_PAGE_NAME: "Specific Post's liker/Commenters",
          MAIN_PAGE_NOTE: "Get likers and commenters of a post.",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        }
      },
      COLOR_CODE: "#4355FF",
      CARD_COLOR: "#4355FF",
      TEXT: "View my own Account's Analytics",
      ACTION: "/analytics/self",
      FEATURE_PAGE_HEADING: "Analyse Self Account",
      FEATURE_PAGE_NOTE:
        "Understand your own account metrics by choosing one of the option below"
    },
    OTHER: {
      FEATURES: {
        DETAILED_USER_ANALYSIS: {
          ACTION: "/analytics/other/detailed_analysis",
          MAIN_PAGE_TOP_BAR_NAME: "Email Extractor",
          MAIN_PAGE_TEXT: "Get User data like follower-following counts, post counts, engagement rate, etc from usernames",
          CARD_COLOR: "#4355FF",
          CARD_NAME: "Email & Data Extractor",
          IDENTIFIER: "follower_following",
          IS_MOST_USED: true,
          MAIN_PAGE_NAME: "Email Extractor",
          MAIN_PAGE_NOTE: "Get Email, website, engagement rate, bio, etc from list of usernames you got in Target users",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },
        ANALYSE_FOLLOWER_FOLLOWING: {
          CARD_NAME: "Follower Following",
          IDENTIFIER: "follower_following",
          ACTION: "/analytics/other/follower_following",
          IS_MOST_USED: false,
          CARD_COLOR: "#3EB2FF",
          MAIN_PAGE_NAME: "Other People Follower/Following",
          MAIN_PAGE_NOTE: "View & Download the follower/followings of any account.",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },
        ANALYSE_USER: {
          RIGHT_SIDER_NAME: "Self & Competitor Analysis report",
          ACTION: "/analytics/other/competitor_analysis",
          CARD_NAME: "Check any user's Report",
          IDENTIFIER: "profile_report",
          IS_MOST_USED: true,
          CARD_COLOR: "#3EB2FF",
          MAIN_PAGE_NAME: "Analyse other people",
          MAIN_PAGE_NOTE: "Analyse any user and their data to build you own growth strategies",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },
        DEAD_FOLLOWERS: {
          CARD_NAME: "Dead Followers/Ghost Followers",
          IDENTIFIER: "dead_followers",
          ACTION: "/analytics/other/dead_followers",
          IS_MOST_USED: false,
          CARD_COLOR: "#3EB2FF",
          MAIN_PAGE_NAME: "Other people dead followers",
          MAIN_PAGE_NOTE: "See other people's dead/inactive followers.",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },

        SIMILAR_ACCOUNT: {
          CARD_NAME: "Similar Account",
          IDENTIFIER: "similar_account",
          ACTION: "/analytics/similar_account",
          IS_MOST_USED: true,
          CARD_COLOR: "#3EB2FF",
          MAIN_PAGE_NAME: "Find Similar Accounts",
          MAIN_PAGE_NOTE: "",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          },
          RIGHT_SIDER_NAME: "Find Similar Accounts"
        },

        HASHTAG: {
          CARD_NAME: "From Hashtag",
          IDENTIFIER: "hashtag",
          ACTION: "/analytics/other/hashtag",
          IS_MOST_USED: true,
          CARD_COLOR: "#3EB2FF",
          MAIN_PAGE_NAME: "From Hashtag",
          MAIN_PAGE_NOTE: "From hashtag note",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          },
          RIGHT_SIDER_NAME: "Users by Hashtags"
        },

        LOCATION: {
          CARD_NAME: "From Location",
          IDENTIFIER: "location",
          ACTION: "/analytics/other/location",
          IS_MOST_USED: false,
          CARD_COLOR: "#3EB2FF",
          MAIN_PAGE_NAME: "From Location",
          MAIN_PAGE_NOTE: "From location note",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },

        USER_POST_ANALYTICS: {
          CARD_NAME: "Post Statistics for Any user",
          IDENTIFIER: "post_stats",
          ACTION: "/analytics/other/posts_analytics",
          IS_MOST_USED: true,
          CARD_COLOR: "#3EB2FF",
          MAIN_PAGE_NAME: "Post statistics for any users",
          MAIN_PAGE_NOTE: "Get posts' like count, comments count, engagement rate & download posts",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },
        USER_LIKER_COMMENTER: {
          CARD_NAME: "Anyone's top Likers-Commenters",
          IDENTIFIER: "user_likers_commenters",
          ACTION: "/analytics/other/likers_commenters_user",
          IS_MOST_USED: true,
          CARD_COLOR: "#3EB2FF",
          MAIN_PAGE_NAME: "Anyone's top Likers-Commenters",
          MAIN_PAGE_NOTE: "Select the posts & press submit to get liker commenter users' data and analysis on the selected posts",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        },
        POST_LIKER_COMMENTER: {
          CARD_NAME: "Specific Post's liker/commenters",
          IDENTIFIER: "post_likers_commenters",
          ACTION: "/analytics/other/likers_commenters_post",
          IS_MOST_USED: true,
          CARD_COLOR: "#3EB2FF",
          MAIN_PAGE_NAME: "Specific Post's liker/commenter",
          MAIN_PAGE_NOTE: "View & Download list of Likers, Commenters for any specific post.",
          MESSAGE_OBJ: {
            LEVEL: "info",
            MESSAGE: "",
            LINK: ""
          }
        }
      },
      COLOR_CODE: "#3EB2FF",
      CARD_COLOR: "#086836",
      TEXT: "View any other Account's Analytics",
      ACTION: "/analytics/other",
      FEATURE_PAGE_HEADING: "Analyse other Instagram accounts",
      FEATURE_PAGE_NOTE: "Download & Analyse your competitor's account"
    },
    HEADING: "Analytics",
    HEADING_TEXT: "Your own Account or any other account on Instagram?",
    MAIN_CARD: {
      IDENTIFIER: "analytics",
      TITLE: "View an Account's analytics",
      COLOR_1: "#4355FF",
      COLOR_2: "#48C1FF",
      FEATURES: [
        "Detailed Analysis report of any account",
        "Analyse Follower Following",
        "Dead Followers / Ghost Followers",
        "Analyse Posts of any user",
        "Analyse Likers & Commenters of any user",
        "Analyse Likers & Commenters of any post"
      ]
    },
    ACTION: "/analytics"
  },
  IMPROVE_CONTENT: {
    FEATURES: {
      GET_TRENDING_CONTENT: {
        RIGHT_SIDER_NAME: "Get most trended content of your Genre",
        ACTION: "/improve_content/get_content",
        CARD_NAME: "Best & Trending Posts",
        IDENTIFIER: "best_posts",
        IS_MOST_USED: true,
        CARD_COLOR: "#7741A7",
        MAIN_PAGE_NAME: "Your Trending Content",
        MAIN_PAGE_NOTE: "Enter Hashtags, Location & Competitor account & press Get posts button",
        MESSAGE_OBJ: {
          LEVEL: "info",
          MESSAGE: "",
          LINK: ""
        }
      },
      TRENDING_RELATED_HASHTAGS: {
        CARD_NAME: "Related Trending Hashtags",
        RIGHT_SIDER_NAME: "Related-Trending #Hashtags",
        IDENTIFIER: "related_hashtags",
        ACTION: "/improve_content/trending_hashtags",
        IS_MOST_USED: true,
        CARD_COLOR: "#7741A7",
        MAIN_PAGE_NAME: "Trending Related Hashtags",
        MAIN_PAGE_NOTE: "Most important factor to make your post popular -> Trending Hashtag",
        MESSAGE_OBJ: {
          LEVEL: "info",
          MESSAGE: "",
          LINK: ""
        }
      },
      GIVEAWAY_WINNER: {
        CARD_NAME: "Choose Giveaway post's Winners",
        IDENTIFIER: "giveaway_winner",
        ACTION: "/improve_content/giveaway_winner",
        IS_MOST_USED: true,
        MAIN_PAGE_NAME: "Choose Giveaway post's Winners",
        MAIN_PAGE_NOTE: "Gives you data and can Randomly picks a giveaway winner",
        CARD_COLOR: "#4676FF",
        MESSAGE_OBJ: {
          LEVEL: "info",
          MESSAGE: "",
          LINK: ""
        }
      },
      HEART_YOUR_IMAGE: {
        CARD_NAME: "Add Liker's heart to your image",
        IDENTIFIER: "heart_image",
        ACTION: "/improve_content/heart_your_image",
        IS_MOST_USED: false,
        MAIN_PAGE_NAME: "Heart your image Tool",
        MAIN_PAGE_NOTE: "Make your post irresistable by adding this heart",
        CARD_COLOR: "#7741A7",
        MESSAGE_OBJ: {
          LEVEL: "info",
          MESSAGE: "",
          LINK: ""
        }
      },
      SPLIT_IMAGE: {
        CARD_NAME: "Split Image Into Multiple Images",
        IDENTIFIER: "split_image_tool",
        ACTION: "/improve_content/split_image",
        IS_MOST_USED: false,
        MAIN_PAGE_NAME: "Split Image Tool",
        CARD_COLOR: "#7741A7",
        MAIN_PAGE_NOTE: "Set what type of split configuration you want and get split images",
        MESSAGE_OBJ: {
          LEVEL: "info",
          MESSAGE: "",
          LINK: ""
        }
      }
    },
    COLOR_CODE: "#B663FF",
    COLOR_CODE_2: "#5B3280",
    CARD_COLOR: "#7741A7",
    FEATURE_PAGE_HEADING: "Improve your Content",
    FEATURE_PAGE_NOTE: "Download best content in your genre, Choose best hashtags & more ...",
    MAIN_CARD: {
      IDENTIFIER: "improve_content",
      TITLE: "Make your Posts better",
      COLOR_1: "#B663FF",
      COLOR_2: "#5B3280",
      FEATURES: [
        "Related & Trending Hashtags to increase engagement",
        "Best Content to Inspire & Repost of your Genre",
        "Add heart like watermark to your image",
        "Split an Image into multiple Images Grid",
        "Choose Giveaway winners for Post"
      ]
    },
    ACTION: "/improve_content"
  },
  PERFORM_ENGAGEMENT: {
    FEATURES: {
      GET_TARGETED_LEADS: {
        RIGHT_SIDER_NAME: "Get Targeted People to Follow/Like/Comment",
        ACTION: "/engage_with_target_audience/tasks",
        CARD_NAME: "Get best people & Perform tasks",
        IDENTIFIER: "tasks_to_engage_with_audience",
        TARGETED_LEADS: {
          COLOR_CODE: "#FF8089",
          COLOR_CODE_2: "#C5343F",
          CARD_COLOR: "#EB666F",
          FEATURE_PAGE_HEADING: "Get Targeted Leads",
          FEATURE_PAGE_NOTE: "Set Configurations and get the best audience in your genre & then perform tasks",
          FEATURES: {
            SET_CONFIGURATIONS: {
              CARD_NAME: "Set Configrations",
              IDENTIFIER: "set_configurations",
              ACTION: "/engage_with_target_audience/tasks/set_configuration",
              IS_MOST_USED: false,
              CARD_COLOR: "#EB666F",
              MAIN_PAGE_NAME: "Set Configurations",
              MAIN_PAGE_NOTE: "Set up your configurations here",
              MESSAGE_OBJ: {
                LEVEL: "info",
                MESSAGE: "",
                LINK: ""
              }
            },
            TASKS_TO_COMPLETES: {
              CARD_NAME: "Get Tasks to Complete",
              IDENTIFIER: "get_tasks",
              ACTION: "/engage_with_target_audience/tasks/see_tasks",
              IS_MOST_USED: true,
              CARD_COLOR: "#EB666F",
              MAIN_PAGE_NAME: "Get Targeted People & Tasks",
              MAIN_PAGE_NOTE: "Complete these tasks to gain followers as these users would follow you back",
              MESSAGE_OBJ: {
                LEVEL: "info",
                MESSAGE: "",
                LINK: ""
              }
            },
            COMPLETED_TASKS: {
              CARD_NAME: "Completed Tasks",
              IDENTIFIER: "completed_tasks",
              ACTION: "/engage_with_target_audience/tasks/completed_tasks",
              IS_MOST_USED: false,
              CARD_COLOR: "#EB666F",
              MAIN_PAGE_NAME: "Completed Tasks",
              MAIN_PAGE_NOTE: "See all your completed tasks",
              MESSAGE_OBJ: {
                LEVEL: "info",
                MESSAGE: "",
                LINK: ""
              }
            }
          }
        },
        IS_MOST_USED: true,
        CARD_COLOR: "#D74C56"
      },
      COMMON_USERS: {
        CARD_NAME: "Common Users between accounts",
        IDENTIFIER: "common_follower",
        ACTION: "/engage_with_target_audience/common_users",
        IS_MOST_USED: true,
        RIGHT_SIDER_NAME: "Common Users between 4 accounts",
        MAIN_PAGE_NAME: "Common Users",
        CARD_COLOR: "#479CFF",
        MAIN_PAGE_NOTE: "Get Common Users between accounts & get the most targeted common audience. Eg: Common users between '@barackobama', '@realdonaldtrump' and '@hillaryclinton'. ",
        MESSAGE_OBJ: {
          LEVEL: "info",
          MESSAGE: "",
          LINK: ""
        }
      }
    },
    COLOR_CODE: "#ED6871",
    COLOR_CODE_2: "#C5343F",
    CARD_COLOR: "#C5343F",
    FEATURE_PAGE_HEADING: "Engage With your Audience",
    FEATURE_PAGE_NOTE: "Choose the targeted people for you from 1 Billion people out there ...",
    MAIN_CARD: {
      IDENTIFIER: "perform_engagement",
      TITLE: "Engage with your Targeted Audience",
      COLOR_1: "#C5343F",
      COLOR_2: "#FF8089",
      FEATURES: [
        "Followers, Likers & Commenter on posts of your competitor Accounts",
        "People who posted with certain hashtags",
        "People who posted at specific location",
        "Get Common followers/following between accounts"
      ]
    },
    ACTION: "/engage_with_target_audience"
  },


  TIER_2: {
    ACTION: "/level_2",
    MAIN_CARD: {
      TITLE: "Find Users",
      BACKGROUND: "#48C1FF 0% 0% no-repeat padding-box",
      INFO: "Step 1: Get list of users in your niche",
      INFO_BACKGROUND: "#479CFF",
      ABOVE_CARD_TEXT: "Step 1: Get targeted list",
      ONE_ICON_AND_POINTS: false,

      FEATURES: [
        {
          TEXT: "Follower Following",
          img: follower_following_icon
        },
        {
          TEXT: "Hashtags",
          img: hashtag
        },
        {
          TEXT: "Locations",
          img: location
        },
        {
          TEXT: "Likers Commenters of Post",
          img: liker_commenter_post_icon
        },
        {
          TEXT: "Similar Accounts 🇳 🇪 🇼",
          img: similarAccountBlack
        },

      ],
      img: target_users_icon
    },

    CARD_COLOR: "#479CFF",
    COLOR_CODE: "#479CFF",
    FEATURE_PAGE_HEADING: "Extract Targeted Users",
    FEATURE_PAGE_NOTE: "Choose any one of the options from below"

  },
  TIER_3: {
    ACTION: "/analytics/other/detailed_analysis",
    MAIN_CARD: {
      TITLE: "Analyse Users",
      BACKGROUND: "#4355FF 0% 0% no-repeat padding-box",
      INFO: "Step 2: Get emails of targeted list",
      INFO_BACKGROUND: "#2E40E9",
      ABOVE_CARD_TEXT: "Step 2: Get data for list",
      ONE_ICON_AND_POINTS: true,

      FEATURES: [
        {
          TEXT: "Email",
          img: email_icon
        },
        {
          TEXT: "Website",
          img: website_icon
        },
        {
          TEXT: "Follower following counts",
          img: follower_post_count_icon
        },
        {
          TEXT: "Engagement Rate",
          img: engagement_rate_icon
        },
        {
          TEXT: "Contact Number & Much more...",
          img: call_icon
        }


      ],
      img: tier3
    }
  },
  TOOLS: {
    ACTION: "/tools",

    CARD_COLOR: "#7741A7",
    COLOR_CODE: "#7741A7",
    FEATURE_PAGE_HEADING: "Tools",
    FEATURE_PAGE_NOTE: "VIP Bonus"

  }
};

export default FeatureDetails;
