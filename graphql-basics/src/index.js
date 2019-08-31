import { GraphQLServer } from 'graphql-yoga';

import typeDefs from './typeDefinitions';
import resolvers from './resolvers/index';
import { users, comments, posts } from './mockData';

const context = () => {
  return {
    users,
    comments,
    posts
  };
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context
});

server.start(() => console.log('Server is running on localhost:4000'))