const Query = {
  users(parent, { queryName, id }, { users }, info) {
    if (id && !queryName) {
      return users.filter(user => {
        return user.id === id;
      });
    };

    if (queryName && !id) {
      return users.filter(user => {
        return user.name.toLowerCase().includes(queryName.toLowerCase());
      });
    };

    return users;
  },
  posts(parent, { queryContent, id }, { posts }, info) {
    if (id && !queryContent) {
      return posts.filter(post => {
        return post.id === id;
      });
    };

    if (queryContent && !id) {
      return posts.filter(post => {
        return (
          post.title.toLowerCase().includes(queryContent.toLowerCase()) ||
          post.body.toLowerCase().includes(queryContent.toLowerCase())
        );
      });
    }

    return posts;
  },
  comments(parent, { queryText, id }, { comments }, info) {
    if (id && !queryText) {
      return comments.filter(comment => {
        return comment.id === id;
      });
    };

    if (queryText && !id) {
      return comments.filter(comment => {
        return comment.text.toLowerCase().includes(queryText.toLowerCase());
      });
    };

    return comments;
  }
};

export { Query as default };
