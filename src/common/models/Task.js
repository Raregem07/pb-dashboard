class Task {
  constructor(type, user, count) {
    this.type = type;
    this.user = user;
    this.count = count;
  }

  setPost(post) {
    this.post = post;
  }
}

export default Task;