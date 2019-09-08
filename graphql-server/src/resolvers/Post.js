const Post = {
  author({ author }, args, { users }, info) {
    return users.find(user => {
    return user.id === author;
    });
  },
  comments({ id }, args, { comments }, info) {
    return comments.filter(comment => {
    return comment.post === id;
    });
  }
};

export { Post as default };
