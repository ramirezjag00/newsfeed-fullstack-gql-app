import React, { Fragment, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Posts from './Posts';

const GET_POSTS = gql`
  query {
    posts {
      id
      body
      author {
        name
      }
      comments {
        id
      }
    }
  }
`;

const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) return <Text style={styles.loading}>Loading ...</Text>;
  if (error) console.log(error);
  if (!loading && !error && data.posts !== posts) setPosts(data.posts);
  return (
    <View style={styles.container}>
      <Posts items={posts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
    fontSize: 20,
  },
});

export default Newsfeed;
