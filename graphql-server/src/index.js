import { GraphQLServer, PubSub } from 'graphql-yoga';

import resolvers from './resolvers';
import db from './db';

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    ...db,
    pubsub
  }
});

server.start(() => console.log('Server is running on localhost:4000'));