import Post from "../../models/Post";
import sleep from "../../Sleep";
import SaveError from "../../store/SaveError";
import ApiError from "../../models/ApiError";
import GetRequest from "../GetRequest";

// Takes a user ID and returns Last 48 posts for that user
// Returns array of Post model.
async function getLimitedPostsOfAUserAnonymously(userID, nextPageToken) {
  let baseURL = "https://www.instagram.com/graphql/query";
  let params = {
    "query_hash": "42323d64886122307be10013ad2dcc44",
    "variables": {
      "id": userID,
      "first": 48,
      "after": nextPageToken
    }
  };
  let headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "*/*"
  };
  let response;
  if (process.env.NODE_ENV !== "development") {
    try {
      let url;
      if (nextPageToken) {
        url = baseURL + `?query_hash=${params.query_hash}&variables=%7B%22id%22:%22${params.variables.id}%22,%22first%22:${params.variables.first},%22after%22:%22${params.variables.after}%22%7D`;
      } else {
        url = baseURL + `?query_hash=${params.query_hash}&variables=%7B%22id%22:%22${params.variables.id}%22,%22first%22:${params.variables.first},%22after%22:${params.variables.after}%7D`;
      }
      let fetchResponse = await fetch(url, {
        method: "GET",
        headers: headers,
        credentials: "omit"
      });
      response = { data: await fetchResponse.json() };
    } catch (e) {
      let detailedError = "Could not get Last 9 posts for a user";
      let error = new ApiError(e, detailedError, "Retry after pausing for some time again or contact support@grambuddy.com");
      await SaveError(error);
      throw error;
    }
  } else {
    await sleep(100);
    response = await getPostsForUserResponse();
  }
  if (response.data.data === undefined) {
    throw new Error("Something went wrong");
  }
  let timelineMedia = response.data.data.user.edge_owner_to_timeline_media;
  let edges = timelineMedia.edges;
  let posts = [];
  for (let i = 0; i < edges.length; i++) {
    posts.push(new Post(edges[i]));
  }
  let nextPageToken1;
  if (timelineMedia.page_info.has_next_page) {
    nextPageToken1 = timelineMedia.page_info.end_cursor;
  }
  return {posts: posts, nextPageToken: nextPageToken1};
}

async function getPostsForUserResponse() {
  return {
    data: {
      "data": {
        "user": {
          "edge_owner_to_timeline_media": {
            "count": 2,
            "page_info": {
              "has_next_page": false,
              "end_cursor": null
            },
            "edges": [
              {
                "node": {
                  "id": "2121364671503266277",
                  "__typename": "GraphImage",
                  "edge_media_to_caption": {
                    "edges": []
                  },
                  "shortcode": "B1wme3kA_Hl",
                  "edge_media_to_comment": {
                    "count": 2
                  },
                  "comments_disabled": false,
                  "taken_at_timestamp": 1567106397,
                  "dimensions": {
                    "height": 750,
                    "width": 750
                  },
                  "display_url": "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                  "edge_media_preview_like": {
                    "count": 6
                  },
                  "gating_info": null,
                  "media_preview": "ACoqtX8W18juKrRoPvNwK154vMjyOo/yay5gRgAZA61m+53Qn7luq0JBInTP6UrFjhVbCnPNQ+WXOOmOQPWrJkSNAzjPPFKM9VdETTkuVatlCeQRcKCzD+I9v8/hVP7XJ7fkP8KuzSpO2WBwOMZx+dNDxjjFaOfNuQqE1srfM6XGDx371TvGROvLd8f1qaacRx7z1PQe/wD9bvWBJKWOTznrSfYdKnzu72LLE9F6UifOCGwR6Hpn/PpVIykDB5HarwChRjgYrnehvKLhv95Xng2ZZenp/Mj2qpmr00u1SM9eBn3rONO500pNrXWxp3chIRh91gSPr3qiWqVuYcnrvIz7Y6fT2qsapvUmj8C+f5sXPFavlnyfNyPu5x7VjxdfxqSZ22bcnbuHGePyppJ3TMa7futaCyyhgCCDngZBwD7/ANf/ANdRiTHB6j/a/wDrVDL/ADX+tRCRvU/maqyMeZ9z/9k=",
                  "owner": {
                    "id": "18988103076"
                  },
                  "thumbnail_src": "https://scontent-sin6-1.cdninstagram.com/vp/e4bf61f42839cc75c564d349ec735a5d/5DF4FB07/t51.2885-15/sh0.08/e35/s640x640/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                  "thumbnail_resources": [
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/25d4d7dd517abf3c8d70b0867174bb13/5DF61CA0/t51.2885-15/e35/s150x150/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 150,
                      "config_height": 150
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/5f4d1f6d244cd8d4f76588c3e48ea3ea/5E0297EA/t51.2885-15/e35/s240x240/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 240,
                      "config_height": 240
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/0f88e11939a6f903e75c99622048e754/5DFAC050/t51.2885-15/e35/s320x320/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 320,
                      "config_height": 320
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/fca2e2109ef4544014ad185acef51a59/5E0F810A/t51.2885-15/e35/s480x480/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 480,
                      "config_height": 480
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/e4bf61f42839cc75c564d349ec735a5d/5DF4FB07/t51.2885-15/sh0.08/e35/s640x640/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 640,
                      "config_height": 640
                    }
                  ],
                  "is_video": false
                }
              },
              {
                "node": {
                  "id": "2121364671503266278",
                  "__typename": "GraphImage",
                  "edge_media_to_caption": {
                    "edges": []
                  },
                  "shortcode": "B1wme3kA_Hl",
                  "edge_media_to_comment": {
                    "count": 1000000
                  },
                  "comments_disabled": false,
                  "taken_at_timestamp": 1567106397,
                  "dimensions": {
                    "height": 750,
                    "width": 750
                  },
                  "display_url": "https://scontent-sin6-1.cdninstagram.com/vp/04d366efa03221e0938e05db470b7bf8/5E135AE2/t51.2885-15/e35/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                  "edge_media_preview_like": {
                    "count": 6
                  },
                  "gating_info": null,
                  "media_preview": "ACoqtX8W18juKrRoPvNwK154vMjyOo/yay5gRgAZA61m+53Qn7luq0JBInTP6UrFjhVbCnPNQ+WXOOmOQPWrJkSNAzjPPFKM9VdETTkuVatlCeQRcKCzD+I9v8/hVP7XJ7fkP8KuzSpO2WBwOMZx+dNDxjjFaOfNuQqE1srfM6XGDx371TvGROvLd8f1qaacRx7z1PQe/wD9bvWBJKWOTznrSfYdKnzu72LLE9F6UifOCGwR6Hpn/PpVIykDB5HarwChRjgYrnehvKLhv95Xng2ZZenp/Mj2qpmr00u1SM9eBn3rONO500pNrXWxp3chIRh91gSPr3qiWqVuYcnrvIz7Y6fT2qsapvUmj8C+f5sXPFavlnyfNyPu5x7VjxdfxqSZ22bcnbuHGePyppJ3TMa7futaCyyhgCCDngZBwD7/ANf/ANdRiTHB6j/a/wDrVDL/ADX+tRCRvU/maqyMeZ9z/9k=",
                  "owner": {
                    "id": "18988103076"
                  },
                  "thumbnail_src": "https://scontent-sin6-1.cdninstagram.com/vp/e4bf61f42839cc75c564d349ec735a5d/5DF4FB07/t51.2885-15/sh0.08/e35/s640x640/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                  "thumbnail_resources": [
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/25d4d7dd517abf3c8d70b0867174bb13/5DF61CA0/t51.2885-15/e35/s150x150/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 150,
                      "config_height": 150
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/5f4d1f6d244cd8d4f76588c3e48ea3ea/5E0297EA/t51.2885-15/e35/s240x240/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 240,
                      "config_height": 240
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/0f88e11939a6f903e75c99622048e754/5DFAC050/t51.2885-15/e35/s320x320/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 320,
                      "config_height": 320
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/fca2e2109ef4544014ad185acef51a59/5E0F810A/t51.2885-15/e35/s480x480/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 480,
                      "config_height": 480
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/e4bf61f42839cc75c564d349ec735a5d/5DF4FB07/t51.2885-15/sh0.08/e35/s640x640/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 640,
                      "config_height": 640
                    }
                  ],
                  "is_video": false
                }
              },
              {
                "node": {
                  "id": "2121364671503266279",
                  "__typename": "GraphImage",
                  "edge_media_to_caption": {
                    "edges": []
                  },
                  "shortcode": "B1wme3kA_Hl",
                  "edge_media_to_comment": {
                    "count": 1000000
                  },
                  "comments_disabled": false,
                  "taken_at_timestamp": 1567106397,
                  "dimensions": {
                    "height": 750,
                    "width": 750
                  },
                  "display_url": "https://scontent-sin6-1.cdninstagram.com/vp/04d366efa03221e0938e05db470b7bf8/5E135AE2/t51.2885-15/e35/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                  "edge_media_preview_like": {
                    "count": 6
                  },
                  "gating_info": null,
                  "media_preview": "ACoqtX8W18juKrRoPvNwK154vMjyOo/yay5gRgAZA61m+53Qn7luq0JBInTP6UrFjhVbCnPNQ+WXOOmOQPWrJkSNAzjPPFKM9VdETTkuVatlCeQRcKCzD+I9v8/hVP7XJ7fkP8KuzSpO2WBwOMZx+dNDxjjFaOfNuQqE1srfM6XGDx371TvGROvLd8f1qaacRx7z1PQe/wD9bvWBJKWOTznrSfYdKnzu72LLE9F6UifOCGwR6Hpn/PpVIykDB5HarwChRjgYrnehvKLhv95Xng2ZZenp/Mj2qpmr00u1SM9eBn3rONO500pNrXWxp3chIRh91gSPr3qiWqVuYcnrvIz7Y6fT2qsapvUmj8C+f5sXPFavlnyfNyPu5x7VjxdfxqSZ22bcnbuHGePyppJ3TMa7futaCyyhgCCDngZBwD7/ANf/ANdRiTHB6j/a/wDrVDL/ADX+tRCRvU/maqyMeZ9z/9k=",
                  "owner": {
                    "id": "18988103076"
                  },
                  "thumbnail_src": "https://scontent-sin6-1.cdninstagram.com/vp/e4bf61f42839cc75c564d349ec735a5d/5DF4FB07/t51.2885-15/sh0.08/e35/s640x640/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                  "thumbnail_resources": [
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/25d4d7dd517abf3c8d70b0867174bb13/5DF61CA0/t51.2885-15/e35/s150x150/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 150,
                      "config_height": 150
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/5f4d1f6d244cd8d4f76588c3e48ea3ea/5E0297EA/t51.2885-15/e35/s240x240/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 240,
                      "config_height": 240
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/0f88e11939a6f903e75c99622048e754/5DFAC050/t51.2885-15/e35/s320x320/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 320,
                      "config_height": 320
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/fca2e2109ef4544014ad185acef51a59/5E0F810A/t51.2885-15/e35/s480x480/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 480,
                      "config_height": 480
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/e4bf61f42839cc75c564d349ec735a5d/5DF4FB07/t51.2885-15/sh0.08/e35/s640x640/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 640,
                      "config_height": 640
                    }
                  ],
                  "is_video": false
                }
              },
              {
                "node": {
                  "id": "2121364671503266280",
                  "__typename": "GraphImage",
                  "edge_media_to_caption": {
                    "edges": []
                  },
                  "shortcode": "B1wme3kA_Hl",
                  "edge_media_to_comment": {
                    "count": 1000000
                  },
                  "comments_disabled": false,
                  "taken_at_timestamp": 1567106397,
                  "dimensions": {
                    "height": 750,
                    "width": 750
                  },
                  "display_url": "https://scontent-sin6-1.cdninstagram.com/vp/04d366efa03221e0938e05db470b7bf8/5E135AE2/t51.2885-15/e35/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                  "edge_media_preview_like": {
                    "count": 6
                  },
                  "gating_info": null,
                  "media_preview": "ACoqtX8W18juKrRoPvNwK154vMjyOo/yay5gRgAZA61m+53Qn7luq0JBInTP6UrFjhVbCnPNQ+WXOOmOQPWrJkSNAzjPPFKM9VdETTkuVatlCeQRcKCzD+I9v8/hVP7XJ7fkP8KuzSpO2WBwOMZx+dNDxjjFaOfNuQqE1srfM6XGDx371TvGROvLd8f1qaacRx7z1PQe/wD9bvWBJKWOTznrSfYdKnzu72LLE9F6UifOCGwR6Hpn/PpVIykDB5HarwChRjgYrnehvKLhv95Xng2ZZenp/Mj2qpmr00u1SM9eBn3rONO500pNrXWxp3chIRh91gSPr3qiWqVuYcnrvIz7Y6fT2qsapvUmj8C+f5sXPFavlnyfNyPu5x7VjxdfxqSZ22bcnbuHGePyppJ3TMa7futaCyyhgCCDngZBwD7/ANf/ANdRiTHB6j/a/wDrVDL/ADX+tRCRvU/maqyMeZ9z/9k=",
                  "owner": {
                    "id": "18988103076"
                  },
                  "thumbnail_src": "https://scontent-sin6-1.cdninstagram.com/vp/e4bf61f42839cc75c564d349ec735a5d/5DF4FB07/t51.2885-15/sh0.08/e35/s640x640/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                  "thumbnail_resources": [
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/25d4d7dd517abf3c8d70b0867174bb13/5DF61CA0/t51.2885-15/e35/s150x150/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 150,
                      "config_height": 150
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/5f4d1f6d244cd8d4f76588c3e48ea3ea/5E0297EA/t51.2885-15/e35/s240x240/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 240,
                      "config_height": 240
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/0f88e11939a6f903e75c99622048e754/5DFAC050/t51.2885-15/e35/s320x320/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 320,
                      "config_height": 320
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/fca2e2109ef4544014ad185acef51a59/5E0F810A/t51.2885-15/e35/s480x480/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 480,
                      "config_height": 480
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/e4bf61f42839cc75c564d349ec735a5d/5DF4FB07/t51.2885-15/sh0.08/e35/s640x640/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 640,
                      "config_height": 640
                    }
                  ],
                  "is_video": false
                }
              },
              {
                "node": {
                  "id": "2121364671503266281",
                  "__typename": "GraphImage",
                  "edge_media_to_caption": {
                    "edges": []
                  },
                  "shortcode": "B1wme3kA_Hl",
                  "edge_media_to_comment": {
                    "count": 1000000
                  },
                  "comments_disabled": false,
                  "taken_at_timestamp": 1567106397,
                  "dimensions": {
                    "height": 750,
                    "width": 750
                  },
                  "display_url": "https://scontent-sin6-1.cdninstagram.com/vp/04d366efa03221e0938e05db470b7bf8/5E135AE2/t51.2885-15/e35/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                  "edge_media_preview_like": {
                    "count": 6
                  },
                  "gating_info": null,
                  "media_preview": "ACoqtX8W18juKrRoPvNwK154vMjyOo/yay5gRgAZA61m+53Qn7luq0JBInTP6UrFjhVbCnPNQ+WXOOmOQPWrJkSNAzjPPFKM9VdETTkuVatlCeQRcKCzD+I9v8/hVP7XJ7fkP8KuzSpO2WBwOMZx+dNDxjjFaOfNuQqE1srfM6XGDx371TvGROvLd8f1qaacRx7z1PQe/wD9bvWBJKWOTznrSfYdKnzu72LLE9F6UifOCGwR6Hpn/PpVIykDB5HarwChRjgYrnehvKLhv95Xng2ZZenp/Mj2qpmr00u1SM9eBn3rONO500pNrXWxp3chIRh91gSPr3qiWqVuYcnrvIz7Y6fT2qsapvUmj8C+f5sXPFavlnyfNyPu5x7VjxdfxqSZ22bcnbuHGePyppJ3TMa7futaCyyhgCCDngZBwD7/ANf/ANdRiTHB6j/a/wDrVDL/ADX+tRCRvU/maqyMeZ9z/9k=",
                  "owner": {
                    "id": "18988103076"
                  },
                  "thumbnail_src": "https://scontent-sin6-1.cdninstagram.com/vp/e4bf61f42839cc75c564d349ec735a5d/5DF4FB07/t51.2885-15/sh0.08/e35/s640x640/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                  "thumbnail_resources": [
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/25d4d7dd517abf3c8d70b0867174bb13/5DF61CA0/t51.2885-15/e35/s150x150/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 150,
                      "config_height": 150
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/5f4d1f6d244cd8d4f76588c3e48ea3ea/5E0297EA/t51.2885-15/e35/s240x240/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 240,
                      "config_height": 240
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/0f88e11939a6f903e75c99622048e754/5DFAC050/t51.2885-15/e35/s320x320/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 320,
                      "config_height": 320
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/fca2e2109ef4544014ad185acef51a59/5E0F810A/t51.2885-15/e35/s480x480/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 480,
                      "config_height": 480
                    },
                    {
                      "src": "https://scontent-sin6-1.cdninstagram.com/vp/e4bf61f42839cc75c564d349ec735a5d/5DF4FB07/t51.2885-15/sh0.08/e35/s640x640/67564073_121027232588715_3526334023757090695_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=103",
                      "config_width": 640,
                      "config_height": 640
                    }
                  ],
                  "is_video": true
                }
              }
            ]
          }
        }
      },
      "status": "ok"
    }
  };
}

export default getLimitedPostsOfAUserAnonymously;
