class MainUserSharedData {
  constructor(data, email) {
    this.csrfToken = data.config.csrf_token;
    this.viewer = data.config.viewer;
    this.countryCode = data.country_code;
    this.rolloutHash = data.rollout_hash;
    this.email = email;
  }
}

export default MainUserSharedData;

/*
viewer: {
  badge_count: "{"seq_id": 1, "badge_count": 1, "badge_count_at_ms": 1565987246196}"
  biography: "23, Bangalore↵Cat Lover | IITian"
  external_url: null
  full_name: "Aditya Chopra"
  has_phone_number: false
  has_profile_pic: true
  id: "15918157809"
  is_joined_recently: false
  is_private: false
  profile_pic_url: "https://instagram.fblr2-1.fna.fbcdn.net/vp/4df079dc1f80cbe8892a848c05f42b26/5DDE72F9/t51.2885-19/s150x150/62175231_2263442173969638_8664891928912855040_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net"
  profile_pic_url_hd: "https://instagram.fblr2-1.fna.fbcdn.net/vp/4df079dc1f80cbe8892a848c05f42b26/5DDE72F9/t51.2885-19/s150x150/62175231_2263442173969638_8664891928912855040_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net"
  username: "aditya_kumar_chopra__"
  }
 */
