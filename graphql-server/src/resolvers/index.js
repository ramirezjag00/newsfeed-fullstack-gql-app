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
      const userExists = users.some(user => user.id === args.authorId);

      if (!userExists) throw new Error(`userId ${args.authorId} does not exist`);

      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.authorId
      };
      posts.push(post);
      return post;
    },
    updatePost(parent, args, { posts }, info) {
      const isExisting = posts.some(post => post.id === args.postId);
      let post;
    
      if (isExisting) {
        post = posts.find(post => {
          return post.id === args.postId;
        });
      } else {
        throw new Error(`postId ${args.postId} does not exist`);
      }

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
      const userExists = users.some(user => user.id === args.authorId);
      const isValidPost = posts.some(post => post.id === args.postId && post.published);

      if (!userExists) throw new Error(`userId ${args.authorId} does not exist`);
      if (!isValidPost) throw new Error(`postId ${args.postId} does not exist or it isn\'t published yet`);

      const comment = {
        id: uuidv4(),
        text: args.text,
        author: args.authorId,
        post: args.postId,
      };
      comments.push(comment);
      return comment;
    },
    updateComment(parent, args, { comments }, info) {
      const isExisting = comments.some(comment => comment.id === args.commentId);
      let comment;

      if (isExisting) {
        comment = comments.find(comment => {
          return comment.id === args.commentId;
        });
      } else {
        throw new Error(`commentId ${args.commentId} does not exist`);
      }

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
        name: args.name,
        email: args.email,
        age: args.age,
      };
      users.push(user);
      return user;
    },
    updateUser(parent, args, { users }, info) {
      const isExisting = users.some(user => user.id === args.userId);
      let user;

      if (isExisting) {
        user = users.find(user => {
          return user.id === args.userId;
        });
      } else {
        throw new Error(`userId ${args.userId} does not exist`);
      }

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
      const isExisting = users.some(user => user.id === args.id);
      let user;
      
      if (isExisting) {
        user = users.find(user => {
          return user.id === args.id;
        });
      } else {
        throw new Error(`id ${args.id} does not exist`)
      }

      const userIndex = users.indexOf(user);
      users.splice(userIndex, 1);
      return users;
    },
  }
};

export default resolvers;