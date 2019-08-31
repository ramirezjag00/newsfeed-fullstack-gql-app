const resolvers = {
  Query: {
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
  },
  Post: {
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
  },
  User: {
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
  },
  Comment: {
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
  },
  Mutation: {
    addPost(parent, args, { posts }, info) {
      const postsCount = posts.length;
      const post = {
        id: `${postsCount + 1}`,
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.authorId
      };
      posts.push(post);
      return post;
    },
    updatePost(parent, args, { posts }, info) {
      const post = posts.find(post => {
        return post.id === args.postId;
      });
      const postIndex = posts.indexOf(post);
      const updatedPost = {
        id: args.postId,
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.authorId
      };
      posts.splice(postIndex, 1, updatedPost)
      return updatedPost;
    },
    deletePost(parent, args, { posts }, info) {
      const post = posts.find(post => {
        return post.id === args.id;
      });
      const postIndex = posts.indexOf(post);
      posts.splice(postIndex, 1);
      return posts;
    },
    addComment(parent, args, { comments }, info) {
      const commentsCount = comments.length;
      const comment = {
        id: `${commentsCount + 1}`,
        text: args.text,
        author: args.authorId,
        post: args.postId,
      };
      comments.push(comment);
      return comment;
    },
    updateComment(parent, args, { comments }, info) {
      const comment = comments.find(comment => {
        return comment.id === args.commentId;
      });
      const commentIndex = comments.indexOf(comment);
      const updatedComment = {
        id: args.commentId,
        text: args.text,
        author: args.authorId,
        post: args.postId
      };
      comments.splice(commentIndex, 1, updatedComment)
      return updatedComment;
    },
    deleteComment(parent, args, { comments }, info) {
      const comment = comments.find(comment => {
        return comment.id === args.id;
      });
      const commentIndex = comments.indexOf(comment);
      comments.splice(commentIndex, 1);
      return comments;
    },
    addUser(parent, args, { users }, info) {
      const usersCount = users.length;
      const user = {
        id: `${usersCount + 1}`,
        name: args.name,
        email: args.email,
        age: args.age,
      };
      users.push(user);
      return user;
    },
    updateUser(parent, args, { users }, info) {
      const user = users.find(user => {
        return user.id === args.userId;
      });
      const userIndex = users.indexOf(user);
      const updatedUser = {
        id: args.userId,
        name: args.name,
        email: args.email,
        age: args.age
      };
      users.splice(userIndex, 1, updatedUser)
      return updatedUser;
    },
    deleteUser(parent, args, { users }, info) {
      const user = users.find(user => {
        return user.id === args.id;
      });
      const userIndex = users.indexOf(user);
      users.splice(userIndex, 1);
      return users;
    },
  }
};

export default resolvers;