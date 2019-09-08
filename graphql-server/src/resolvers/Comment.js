const Comment = {
  author({ author }, args, { users }, info) {
    return users.find(user => {
      return user.id === author;
    });
  },
  post({ post }, args, { posts }, info) {
    return posts.find(item => {
      return item.id === post;
    });
  }
};

export { Comment as default };
