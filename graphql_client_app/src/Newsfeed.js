import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/react-hooks';

import Loading from './Loading';
import PostOptions from './PostOptions';
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
  const [modalVisibility, setModalVisibility] = useState(false);
  const { data: subscriptionData } = useSubscription(POST_SUBSCRIPTIONS);
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) {
    return <Loading loading={loading} />;
  } else if (error) {
    console.log(error);
  } else if (!loading && !error && data.posts !== posts && !subscriptionData) {
    setPosts(data.posts.reverse());
  } else if (subscriptionData && posts.length !== 0) {
    const { post: { mutation, data: postData } } = subscriptionData;
    const postIndex = posts.findIndex(post => post.id === postData.id);
    if (postIndex !== -1) {
      let postsCopy = posts;
      if (mutation === 'DELETED') {
        postsCopy.splice(postIndex, 1);
        setPosts(postsCopy);
      } else if (mutation === 'UPDATED') {
        const originalPost = posts[postIndex];
        if (originalPost.body !== postData.body || originalPost.title !== postData.title) {
          postsCopy.splice(postIndex, 1, postData);
          setPosts(postsCopy);
        }
      }
    } else if (mutation === 'CREATED') {
      setPosts([postData, ...posts]);
    }
  }

  return (
    <View style={styles.container}>
      <Posts
        items={posts}
        setModalVisibility={setModalVisibility}
      />
      <PostOptions
        setModalVisibility={setModalVisibility}
        visibility={modalVisibility}
      />
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
