class EmailUser {
  constructor(data) {
    let user = data.user;
    this.id = user.pk;
    this.username = user.username;
    this.fullName = user.full_name;
    this.isPrivate = user.is_private;
    this.profileURL = user.profile_pic_url;
    this.isVerified = user.is_verified;
    this.postCount = user.media_count;
    this.followerCount = user.follower_count;
    this.followingCount = user.following_count;
    this.biography = user.biography;
    this.externalURL = user.external_url;

    this.businessCategoryName = user.category;
    this.email = user.public_email;
    if (!this.email) {
      this.email = "";
    }
    this.isBusiness = user.is_business;

    this.igtvVideos = user.total_igtv_videos;
    this.userTagsCount = user.usertags_count;
    this.publicPhoneNumber = user.public_phone_number;
    this.publicPhoneCountryCode = user.public_phone_country_code;
    this.cityName = user.city_name;
    this.engagementRate=-1;
    this.isEmailUser = true;
  }

  setMoreDetails(finalEmail, engagementRate) {
    this.finalEmail = finalEmail;
    this.engagementRate = engagementRate;
  }

  setEngagementRate(engagementRate) {
    this.engagementRate = engagementRate;
  }

  setCampaignName(campaignName) {
    this.campaignName = campaignName;
  }

}

export default EmailUser;
