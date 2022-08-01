import DetailedUser from "../models/DetailedUser";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";
import axios from "axios";

async function getDetailedUserObjectFromUsername(username, makeCallWithCookies = true) {
  let r, response;
  try {
    r = await fetch("https://www.instagram.com/" + username + "/?__a=1", {
      credentials: "omit"
    });

    let data;
    if (r.ok) {
      let t = await r.text();
      if (t.search("Restricted profile") !== -1) {
        return new DetailedUser("User Restricted", -1, -1, false, false, false, false, "", "", username, "User Restricted", "", 0, {
          count: 0,
          edges: []
        }, 0, null, false, "NA");
      }
      data = JSON.parse(t);
    } else if (r.status === 404) {
      return new DetailedUser("User does not exists", -1, -1, false, false, false, false, "", "", username, "User does not exist", "", 0, {
        count: 0,
        edges: []
      }, 0, null, false, "NA");
    } else {
      throw new Error("Anonymysed Call failed");
    }

    ReactGA.event({
      category: AnalyticsCategoryEnum.DETAILED_USER_CALL_SUCCESSFUL,
      action: "get detailed User object from username",
      label: `username: ${username}`
    });
    let iUser = data.graphql.user;
    let isBusinessAccount = iUser.is_business_account || iUser.should_show_category;
    let du = new DetailedUser(
      iUser.biography, iUser.edge_followed_by.count, iUser.edge_follow.count,
      iUser.follows_viewer, iUser.followed_by_viewer, isBusinessAccount,
      iUser.is_private, iUser.profile_pic_url, iUser.profile_pic_url_hd, iUser.username,
      iUser.full_name, iUser.external_url, iUser.edge_mutual_followed_by.count, iUser.edge_owner_to_timeline_media,
      iUser.edge_mutual_followed_by, iUser.id, iUser.blocked_by_viewer, iUser.business_category_name
    );
    du.addV2Details(iUser);
    return du;
  } catch (e) {
    if (!makeCallWithCookies) {
      ReactGA.event({
        category: AnalyticsCategoryEnum.API_ERROR,
        action: "get detailed User object from username",
        label: `username: ${username}`
      });
      let errorMessage = "Ratelimited by instagram. Please wait for some time and try again";
      throw new Error(errorMessage);
    }
    // sendNotification(NotificationTypeEnum.Success, "Please use a VPN. Eg: Browsec chrome extension");

    let url = `https://www.instagram.com/${username}/?__a=1&__d=dis`;
    let response;
    try {
      response = await axios.get(url);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        return new DetailedUser("User does not exists", 0, 0, false, false, false, false, "", "", username, "User does not exist", "", 0, {count: 0}, 0, null, false, "NA");
      }
      console.log("Error in making personalised call to get detailed analysis", e, "Class: getDetailedUserObjectFromUsername, Function: , Line 37 \"Error in making personalised call to get detailed analysis\",e(): ");
      ReactGA.event({
        category: AnalyticsCategoryEnum.API_ERROR,
        action: "get detailed User object from username",
        label: `username: ${username}`
      });
      let errorMessage = "Ratelimited by instagram. Please wait for some time and try again";
      throw new Error(errorMessage);
    }
    let iUser = response.data.graphql.user;
    let du = new DetailedUser(iUser.biography, iUser.edge_followed_by.count, iUser.edge_follow.count,
      iUser.follows_viewer, iUser.followed_by_viewer, iUser.is_business_account,
      iUser.is_private, iUser.profile_pic_url, iUser.profile_pic_url_hd, iUser.username,
      iUser.full_name, iUser.external_url, iUser.edge_mutual_followed_by.count, iUser.edge_owner_to_timeline_media,
      iUser.edge_mutual_followed_by, iUser.id, iUser.blocked_by_viewer, iUser.business_category_name);
    du.addV2Details(iUser);
    return du;
  }
}

export default getDetailedUserObjectFromUsername;

// biography: "Bangalore ↔️ Delhi ↔️ Jodhpur↵Dance | Music | Travel | Code↵CSE IIT-J'20↵👻 ➡️ ajat_prabha"
// blocked_by_viewer: false
// business_category_name: null
// connected_fb_page: null
// country_block: false
// edge_felix_video_timeline: {count: 0, page_info: {…}, edges: Array(0)}
// edge_follow: {count: 205}
// edge_followed_by: {count: 416}
// edge_media_collections: {count: 0, page_info: {…}, edges: Array(0)}
// edge_mutual_followed_by: {count: 55, edges: Array(3)}
// edge_owner_to_timeline_media: {count: 38, page_info: {…}, edges: Array(12)}
// edge_saved_media: {count: 0, page_info: {…}, edges: Array(0)}
// external_url: "https://ajatprabha.in/"
// external_url_linkshimmed: "https://l.instagram.com/?u=https%3A%2F%2Fajatprabha.in%2F&e=ATPkfYb8hpVML_PGDc1r54bUJG8rd_dizwpvPlXA5RPPpLTrzrYGNeyLfnXHW6JQNN-Ez-OWrr_0yw6dPfUzu0gcAYZM-J9n"
// followed_by_viewer: true
// follows_viewer: true
// full_name: "Ajat Prabha"
// has_blocked_viewer: false
// has_channel: false
// has_requested_viewer: false
// highlight_reel_count: 17
// id: "1618088212"
// is_business_account: false
// is_joined_recently: false
// is_private: false
// is_verified: false
// profile_pic_url: "https://instagram.fblr2-1.fna.fbcdn.net/vp/17d3db0c39ea1714a0c02136596ceed7/5DBF4324/t51.2885-19/s150x150/65577770_2384575025199852_6486439024088055808_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net"
// profile_pic_url_hd: "https://instagram.fblr2-1.fna.fbcdn.net/vp/47f447305aac249d88e72b0ce1fc7a0f/5DB86D5C/t51.2885-19/s320x320/65577770_2384575025199852_6486439024088055808_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net"
// requested_by_viewer: false
// username: "ajatprabha"
