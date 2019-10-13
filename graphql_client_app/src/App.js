import React from 'react';
import {
  SafeAreaView,
  Text,
  View
} from 'react-native';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'; 
import { HttpLink } from 'apollo-link-http'; 
import { ApolloProvider } from '@apollo/react-hooks';

import Newsfeed from './Newsfeed';
import Header from './Header';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <SafeAreaView style={{ backgroundColor: '#F58855' }} />
    <SafeAreaView>
      <View>
        <Header />
        <Newsfeed />
      </View>
    </SafeAreaView>
  </ApolloProvider>
);

export default App;
