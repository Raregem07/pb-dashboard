import BaseUser from "./BaseUser";

class CommenterUser extends BaseUser{
  constructor(edge) {
    super();
    let owner = edge.node.owner;
    this.id = owner.id;
    this.username = owner.username;
    this.profilePic = owner.profile_pic_url;
    this.commentValue = edge.node.text;
    this.likedPosts = [];
    this.commentedPosts = [];
    this.commentedValues = [];
  }
}

export default CommenterUser;
