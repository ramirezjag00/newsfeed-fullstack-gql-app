import React, { useState } from 'react';
import { View } from 'react-native';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Loading from './Loading';
import OptionsModal from './OptionsModal';
import Posts from './Posts';
import Comments from './Comments';

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
  const [commentsVisibility, setCommentsVisibility] = useState(false);
  const [postId, setPostId] = useState('');
  const { data: postSubscriptionData } = useSubscription(POST_SUBSCRIPTIONS);
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) {
    return <Loading loading={loading} />;
  } else if (error) {
    console.log(error);
  } else if (!loading && !error && data.posts !== posts && !postSubscriptionData) {
    setPosts(data.posts.reverse());
  } else if (postSubscriptionData && posts.length !== 0) {
    const { post: { mutation, data: postData } } = postSubscriptionData;
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

  const handleCommentsVisibility = (id, visibility) => {
    setCommentsVisibility(visibility);
    setPostId(id);
  };

  return (
    <View>
      <Posts
        items={posts}
        handleCommentsVisibility={handleCommentsVisibility}
        setModalVisibility={setModalVisibility}
      />
      <Comments
        id={postId}
        handleCommentsVisibility={handleCommentsVisibility}
        setCommentsVisibility={setCommentsVisibility}
        visibility={commentsVisibility}
      />
      <OptionsModal
        setModalVisibility={setModalVisibility}
        visibility={modalVisibility}
      />
    </View>
  );
};

export default Newsfeed;
