import uuidv4 from 'uuid/v4';

const Mutation = {
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
  updateComment(parent, { id, data }, { comments, posts }, info) {
    const { text, post: postId } = data;
    const comment = comments.find(comment => comment.id === id);
    const isExistingPost = posts.some(post => (post.id === postId) && post.published);

    if (!comment) throw new Error('Comment not found');
    if (!isExistingPost) throw new Error('Post not found');

    if (text) comment.text = text;

    return comment;
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
  updateUser(parent, { id, data }, { users }, info) {
    const { name, email, age } = data;
    const user = users.find(user => user.id === id);
    if (!user) throw new Error('User not found');
    
    if (email) {
      const emailTaken = users.some(user => user.email === email);
      if (emailTaken) throw new Error('Email is already taken');
      user.email = email;
    }

    if (name) user.name = name;
    if (age !== undefined) user.age = age;

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
