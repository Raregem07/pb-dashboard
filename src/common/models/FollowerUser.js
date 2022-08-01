import BaseUser from "./BaseUser";

class FollowerUser extends BaseUser{
  constructor(edge) {
    super();
    let node = edge.node;
    this.id = node.id;
    this.username = node.username;
    this.fullName = node.full_name;
    this.profilePic = node.profile_pic_url;
    this.isVerified = node.is_verified;
    this.isPrivate = node.is_private;
    this.followedByViewer = node.followed_by_viewer;
    this.requestedByViewer = node.requested_by_viewer;
  }
}

export default FollowerUser;
