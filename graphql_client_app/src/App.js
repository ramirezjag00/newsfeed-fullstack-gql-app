import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'; 
import { HttpLink } from 'apollo-link-http'; 
import { ApolloProvider } from '@apollo/react-hooks';

import Newsfeed from './Newsfeed';

const client = new ApolloClient({
  link: new HttpLink({ 
    uri: 'http://localhost:4000',
  }),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.containerTitle}>NewsFeed</Text>
        <Newsfeed />
      </View>
    </SafeAreaView>
  </ApolloProvider>
);

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  containerTitle: {
    color: '#000000',
    fontSize: 35,
    textAlign: 'center',
  }
});

export default App;
