const User = {
  posts({ id }, args, { posts }, info) {
    return posts.filter(post => {
      return post.author === id;
    });
  },
  comments({ id }, args, { comments }, info) {
    return comments.filter(comment => {
      return comment.author === id;
    });
  }
};

export { User as default };
