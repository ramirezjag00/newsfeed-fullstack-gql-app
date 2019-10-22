import React, { Fragment, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Portrait from './Portrait';
import meatballs from '../assets/outline_more_horiz_black_48dp.png';
import { useSubscription } from '@apollo/react-hooks';

const COMMENT_SUBSCRIPTIONS = gql`
  subscription comments($id: ID!) {
    comment (postId: $id) {
      mutation
      data {
        id
      }
    }
  }
`;

const Post = ({ item, handleCommentsVisibility, setModalVisibility }) => {
  const { id, body, author: { name }, comments } = item;
  let commentsCopy = comments;
  const [commentsCount, setCommentsCount] = useState(commentsCopy.length);
  const { data } = useSubscription(COMMENT_SUBSCRIPTIONS, { variables: { id } });
  if (data && commentsCopy.length === commentsCount) {
    const { comment: { mutation, data: commentData } } = data;
    const commentIndex = commentsCopy.findIndex(comment => comment.id === commentData.id);
    if (commentIndex !== -1 && mutation === 'DELETED') {
      commentsCopy.splice(commentIndex,1);
      setCommentsCount(commentsCopy.length);
    } else if (commentIndex === -1 && mutation === 'CREATED') {
      commentsCopy.push(commentData);
      setCommentsCount(commentsCopy.length);
    }
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.postHeader}>
          <Portrait />
            <View style={styles.postHeaderSecondLayer}>
              <Text style={styles.postAuthor}>{name}</Text>
              <Text style={styles.postDate}>Yesterday at 6:09 PM</Text>
            </View>
            <TouchableOpacity
              style={styles.postOptionsContainer}
              onPress={() => setModalVisibility(true)}
            >
              <Image source={meatballs} style={styles.postOptions} />
            </TouchableOpacity>
          </View>
        <Text style={styles.body}>
          {body}
        </Text>
        <TouchableOpacity
          style={styles.commentContainer}
          onPress={() => handleCommentsVisibility(id, true)}
        >
          <Text style={styles.commentIndicator}>{`${commentsCount} comments`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postSpacer} />
    </Fragment>
  );
};

Post.propTypes = {
  item: PropTypes.object.isRequired,
  handleCommentsVisibility: PropTypes.func,
  setModalVisibility: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    minHeight: 110,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  postSpacer: {
    height: 10,
    backgroundColor: '#dadada',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  postAuthor: {
    fontWeight: '800',
    color: '#222222',
    fontSize: 16,
  },
  postHeaderSecondLayer: {
    flex: 1,
    flexDirection: 'column',
  },
  postOptionsContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
  },
  postOptions: {
    height: 20,
    width: 20,
    tintColor: '#222222',
  },
  postDate: {
    color: '#222222',
    fontSize: 11,
  },
  body: {
    color: '#222222',
    fontSize: 14,
  },
  commentContainer: {
    alignSelf: 'flex-end',
  },
  commentIndicator: {
    color: '#222222',
    fontSize: 11,
  },
});

export default Post;
