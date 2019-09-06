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
    deletePost(parent, args, { posts }, info) {
      const isExisting = posts.some(post => post.id === args.id);
      let post;

      if (isExisting) {
        post = posts.find(post => {
          return post.id === args.id;
        });
      } else {
        throw new Error(`id ${args.id} does not exist`);
      }
      
      const postIndex = posts.indexOf(post);
      posts.splice(postIndex, 1);
      return posts;
    },
    addComment(parent, args, { comments, users, posts }, info) {
      const userExists = users.some(user => user.id === args.author);
      const isValidPost = posts.some(post => post.id === args.post && post.published);

      if (!userExists) throw new Error(`userId ${args.author} does not exist`);
      if (!isValidPost) throw new Error(`postId ${args.post} does not exist or it isn\'t published yet`);

      const comment = {
        id: uuidv4(),
        ...args
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
      const isExisting = comments.some(comment => comment.id === args.id);
      let comment;
      
      if (isExisting) {
        comment = comments.find(comment => {
          return comment.id === args.id;
        });
      } else {
        throw new Error(`id ${args.id} does not exist`);
      }

      const commentIndex = comments.indexOf(comment);
      comments.splice(commentIndex, 1);
      return comments;
    },
    addUser(parent, args, { users }, info) {
      const emailTaken = users.some(user => user.email === args.email);

      if (emailTaken) throw new Error('Email already taken');
      
      const user = {
        id: uuidv4(),
        ...args
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
    deleteUser(parent, args, { users }, info) {
      const isExisting = users.some(user => user.id === args.id);
      let user;
      
      if (isExisting) {
        user = users.find(user => {
          return user.id === args.id;
        });
      } else {
        throw new Error(`id ${args.id} does not exist`);
      }

      const userIndex = users.indexOf(user);
      users.splice(userIndex, 1);
      return users;
    },
  }
};

export default resolvers;