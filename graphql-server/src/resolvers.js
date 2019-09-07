import uuidv4 from 'uuid/v4';

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
    addPost(parent, args, { posts, users }, info) {
      const userExists = users.some(user => user.id === args.data.author);

      if (!userExists) throw new Error(`userId ${args.data.author} does not exist`);

      const post = {
        id: uuidv4(),
        ...args.data
      };
      posts.push(post);
      return post;
    },
    updatePost(parent, args, { posts }, info) {
      const isExisting = posts.some(post => post.id === args.id);
      let post;
    
      if (isExisting) {
        post = posts.find(post => {
          return post.id === args.id;
        });
      } else {
        throw new Error(`postId ${args.id} does not exist`);
      }

      const postIndex = posts.indexOf(post);
      const updatedPost = { ...args };
      posts.splice(postIndex, 1, updatedPost);
      return updatedPost;
    },
    deletePost(parent, args, { posts, comments }, info) {
      const postIndex = posts.findIndex(post => post.id === args.id);

      if (postIndex === -1) throw new Error('Post not found')

      const [deletedPost] = posts.splice(postIndex);
      comments = comments.filter(comment => comment.post !== args.id);
      return deletedPost;
    },
    addComment(parent, args, { comments, users, posts }, info) {
      const userExists = users.some(user => user.id === args.data.author);
      const isValidPost = posts.some(post => post.id === args.data.post && post.published);

      if (!userExists) throw new Error(`userId ${args.data.author} does not exist`);
      if (!isValidPost) throw new Error(`postId ${args.data.post} does not exist or it isn\'t published yet`);

      const comment = {
        id: uuidv4(),
        ...args.data
      };
      comments.push(comment);
      return comment;
    },
    updateComment(parent, args, { comments }, info) {
      const isExisting = comments.some(comment => comment.id === args.id);
      let comment;

      if (isExisting) {
        comment = comments.find(comment => {
          return comment.id === args.id;
        });
      } else {
        throw new Error(`commentId ${args.id} does not exist`);
      }

      const commentIndex = comments.indexOf(comment);
      const updatedComment = { ...args };
      comments.splice(commentIndex, 1, updatedComment)
      return updatedComment;
    },
    deleteComment(parent, args, { comments }, info) {
      const commentIndex = comments.findIndex(comment => comment.id === args.id);

      if (commentIndex === -1) throw new Error('Comment not found');

      const [deletedComment] = comments.splice(commentIndex, 1);
      return deletedComment;
    },
    addUser(parent, args, { users }, info) {
      const emailTaken = users.some(user => user.email === args.data.email);

      if (emailTaken) throw new Error('Email already taken');
      
      const user = {
        id: uuidv4(),
        ...args.data
      };
      users.push(user);
      return user;
    },
    updateUser(parent, args, { users }, info) {
      const isExisting = users.some(user => user.id === args.id);
      let user;

      if (isExisting) {
        user = users.find(user => {
          return user.id === args.id;
        });
      } else {
        throw new Error(`userId ${args.id} does not exist`);
      }

      const userIndex = users.indexOf(user);
      const updatedUser = { ...args };
      users.splice(userIndex, 1, updatedUser);
      return updatedUser;
    },
    deleteUser(parent, args, { users, posts, comments }, info) {
      const userIndex = users.findIndex(user => user.id === args.id);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const [deletedUser] = users.splice(userIndex, 1);

      posts = posts.filter(post => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter(comment => comment.post !== post.id);
        }

        return !match;
      });

      comments = comments.filter(comment => comment.author !== args.id);

      return deletedUser;
    },
  }
};

export default resolvers;