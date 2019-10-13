import React, { Fragment, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/react-hooks';

import Posts from './Posts';
import Loading from './Loading';

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

const POST_SUBSCRIPTIONS = gql`
  subscription {
    post {
      mutation
      data {
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
  }
`;

const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) {
    return <Loading loading={loading} />;
  } else if (error) {
    console.log(error);
  } else if (!loading && !error && data.posts !== posts) {
    setPosts(data.posts);
  }

  const subscribeToNewPosts = () => {
    const { data: { post: { data } }, loading } = useSubscription(POST_SUBSCRIPTIONS);
    if (loading) {
      return <Loading loading={loading} />;
    } else if (!loading) {
      setPosts(data);
    }
  };

  useEffect(() => {
    subscribeToNewPosts();
  }, []);

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
});

export default Newsfeed;
