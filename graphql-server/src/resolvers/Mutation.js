import uuidv4 from 'uuid/v4';

const Mutation = {
  addPost(parent, args, { posts, users, pubsub }, info) {
    const userExists = users.some(user => user.id === args.data.author);

    if (!userExists) throw new Error(`userId ${args.data.author} does not exist`);
    
    const post = {
      id: uuidv4(),
      ...args.data
    };
    posts.push(post);
    pubsub.publish('post', {
      post: {
        mutation: 'CREATED',
        data: post
      }
    });
    return post;
  },
  updatePost(parent, { id, data }, { posts, pubsub }, info) {
    const { body } = data;
    const post = posts.find(post => post.id === id);
    const originalPost = { ...post };
    if (!post) throw new Error('Post not found');

    if (body) post.body = body;
    pubsub.publish('post', {
      post: {
        mutation: 'UPDATED',
        data: post
      }
    });

    return post;
  },
  deletePost(parent, args, { posts, comments, pubsub }, info) {
    const postIndex = posts.findIndex(post => post.id === args.id);

    if (postIndex === -1) throw new Error('Post not found')

    const [deletedPost] = posts.splice(postIndex, 1);
    comments = comments.filter(comment => comment.post !== args.id);
    pubsub.publish('post', {
      post: {
        mutation: 'DELETED',
        data: deletedPost
      }
    });
    return deletedPost;
  },
  addComment(parent, args, { comments, users, posts, pubsub }, info) {
    const userExists = users.some(user => user.id === args.data.author);
    const isValidPost = posts.some(post => post.id === args.data.post);

    if (!userExists) throw new Error(`userId ${args.data.author} does not exist`);
    if (!isValidPost) throw new Error(`postId ${args.data.post} does not exist`);

    const comment = {
      id: uuidv4(),
      ...args.data
    };
    comments.push(comment);
    pubsub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment
      }
    });
    return comment;
  },
  updateComment(parent, { id, data }, { comments, pubsub }, info) {
    const { text } = data;
    const comment = comments.find(comment => comment.id === id);

    if (!comment) throw new Error('Comment not found');
    if (text) comment.text = text;
    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: 'UPDATED',
        data: comment
      }
    });

    return comment;
  },
  deleteComment(parent, args, { comments, pubsub }, info) {
    const commentIndex = comments.findIndex(comment => comment.id === args.id);

    if (commentIndex === -1) throw new Error('Comment not found');

    const [deletedComment] = comments.splice(commentIndex, 1);
    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: 'DELETED',
        data: deletedComment
      }
    });
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
  updateUser(parent, { id, data }, { users }, info) {
    const { name, email } = data;
    const user = users.find(user => user.id === id);
    if (!user) throw new Error('User not found');
    
    if (email) {
      const emailTaken = users.some(user => user.email === email);
      if (emailTaken) throw new Error('Email is already taken');
      user.email = email;
    }

    if (name) user.name = name;

    return user;
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
};

export { Mutation as default};
