import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Modal from 'react-native-modal';

import Loading from '../Common/Loading';
import Comment from '../Comments/Comment';

import closeButton from '../../assets/outline_clear_black_48dp.png';

const COMMENT_SUBSCRIPTIONS = gql`
  subscription comments($id: ID!) {
    comment (postId: $id) {
      mutation
      data {
        id
        text
        author {
          name
        }
        post {
          id
        }
      }
    }
  }
`;

const GET_POST_COMMENTS = gql`
  query posts($id: ID!) {
    posts (id: $id) {
      comments {
        id
        text
        author {
          name
        }
        post {
          id
        }
      }
    }
  }
`;

const Comments = ({
  id,
  visibility,
  handleCommentsVisibility,
}) => {
  if (!id && !visibility) return null;
  const [comments, setComments] = useState([]);
  const { data: commentSubscriptionData } = useSubscription(COMMENT_SUBSCRIPTIONS, { variables: { id } });
  const { data, error, loading } = useQuery(GET_POST_COMMENTS, { variables: { id } });
  if (loading) {
    return <Loading loading={loading} />;
  } else if (error) {
    console.log(error);
  } else if (!loading && !error && data.posts[0].comments !== comments && !commentSubscriptionData) {
    setComments(data.posts[0].comments.reverse());
  } else if (commentSubscriptionData && comments.length !== 0) {
    const { comment: { mutation, data: commentData } } = commentSubscriptionData;
    const commentIndex = comments.findIndex(comment => comment.id === commentData.id);
    if (commentIndex !== -1) {
      let commentsCopy = comments;
      if (mutation === 'DELETED') {
        commentsCopy.splice(commentIndex, 1);
        setComments(commentsCopy);
      } else if (mutation === 'UPDATED') {
        const originalComment = comments[commentIndex];
        if (originalComment.text !== commentData.text) {
          commentsCopy.splice(commentIndex, 1, commentData);
          setComments(commentsCopy);
        }
      }
    } else if (mutation === 'CREATED') {
      setComments([commentData, ...comments]);
    }
  }

  const commentsUI = comments.map((comment, index) => {
    return (
      <Comment
        item={comment}
        key={index}
      />
    );
  });

  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropColor={'#222222'}
      backdropOpacity={0.50}
      isVisible={visibility}
      onBackdropPress={() => handleCommentsVisibility('', false)}
      style={styles.modal}
      useNativeDriver={true}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handleCommentsVisibility('', false)}
          style={styles.closeAction}
        >
          <Image
            source={closeButton}
            style={styles.closeButton}
          />
        </TouchableOpacity>
        <View style={styles.line} />
        <ScrollView
          horizontal={false}
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {commentsUI}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    height: '96%',
    width: '100%',
    bottom: 0,
    left: 0,
  },
  closeAction: {
    marginRight: 5,
    marginTop: 5,
    marginBottom: 3,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  closeButton: {
    tintColor: '#7a7a7a',
    height: 15,
    width: 15,
  },
  line: {
    borderBottomColor: '#dadada',
    borderBottomWidth: 1,
  },
});

Comments.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleCommentsVisibility: PropTypes.func.isRequired,
  visibility: PropTypes.bool.isRequired,
};

export default Comments;
