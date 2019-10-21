import React, { Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import Portrait from './Portrait';

const Post = ({ item }) => {
  const { body, author: { name }, comments } = item;
  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.postHeader}>
          <Portrait />
            <View style={styles.postHeaderSecondLayer}>
              <Text style={styles.postAuthor}>{name}</Text>
              <Text style={styles.postDate}>Yesterday at 6:09 PM</Text>
            </View>
            <Text style={styles.postOptions}>...</Text>
          </View>
        <Text style={styles.body}>
          {body}
        </Text>
        <View style={styles.commentContainer}>
          <Text style={styles.commentIndicator}>{`${comments.length} comments`}</Text>
        </View>
      </View>
      <View style={styles.postSpacer} />
    </Fragment>
  );
};

Post.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    minHeight: 110,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  postSpacer: {
    height: 10,
    backgroundColor: '#aeaeae',
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
  postOptions: {
    color: '#222222',
    fontSize: 20,
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
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
