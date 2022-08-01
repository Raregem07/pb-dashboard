class BaseUser {
  constructor() {
    this.likedPosts = [];
    this.commentedPosts = [];
    this.commentedValues = [];
  }

  addLikedPost(post) {
    this.likedPosts = this.likedPosts.concat([post]);
  }

  addCommentedPost(post, commentValue) {
    this.commentedPosts.push(post);
    this.commentedValues.push(commentValue)
  }
}

export default BaseUser;
