import React, { Fragment, useState } from 'react';
import {
  ActivityIndicator,
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
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating={loading} size="large" color="#F58855" />
      </View>
    );
  } else if (error) {
    console.log(error);
  } else if (!loading && !error && data.posts !== posts) {
    setPosts(data.posts);
  }

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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Newsfeed;
