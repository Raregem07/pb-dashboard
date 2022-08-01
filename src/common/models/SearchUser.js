class SearchUser {
  constructor(graph_ql) {
    if (!graph_ql) {
      return;
    }
    let user = graph_ql.user;
    this.pk = user.pk;
    this.username=user.username;
    this.fullName = user.full_name;
    this.isPrivate=user.is_private;
    this.profileURL = user.profile_pic_url;
    this.followerCount = user.follower_count;
    this.byline = user.byline;
    this.mutualFollowerCount = user.mutual_followers_count;
    this.following = user.friendship_status.following;
    this.outgoingRequest = user.outgoing_request;
    this.seen = user.seen;
  }

  readableLine() {
    return `🤹 ${this.username}`;
  }
}

export default SearchUser;

/*
{
      "position": 0,
      "user": {
        "pk": "5025556581",
        "username": "_mansi_mittal_",
        "full_name": "Mansi Mittal",
        "is_private": false,
        "profile_pic_url": "https://instagram.fbom19-1.fna.fbcdn.net/v/t51.2885-19/s150x150/17663096_381586892234499_1483080738776547328_a.jpg?_nc_ht=instagram.fbom19-1.fna.fbcdn.net&oh=6d73b4706ac1c647a8105bf909987542&oe=5E8F1223",
        "profile_pic_id": "1487008747667022428_5025556581",
        "is_verified": false,
        "has_anonymous_profile_picture": false,
        "mutual_followers_count": 100,
        "can_see_primary_country_in_settings": false,
        "friendship_status": {
          "following": true,
          "is_private": false,
          "incoming_request": false,
          "outgoing_request": false,
          "is_bestie": false,
          "is_restricted": false
        },
        "latest_reel_media": 0,
        "seen": 0,
        "social_context": "Following",
        "search_social_context": "Following"
      }
    }
    }
 */
