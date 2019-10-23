import React from 'react';
import { SafeAreaView, View } from 'react-native';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import Newsfeed from '../src/Posts/Newsfeed';
import Header from '../src/Common/Header';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/',
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <SafeAreaView style={{ backgroundColor: '#F58855' }} />
    <SafeAreaView style={{ paddingBottom: 20 }} >
      <View>
        <Header />
        <Newsfeed />
      </View>
    </SafeAreaView>
  </ApolloProvider>
);

export default App;
