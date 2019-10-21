import React, { Fragment } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import Portrait from './Portrait';
import meatballs from '../assets/outline_more_horiz_black_48dp.png';

const Post = ({ item, setModalVisibility }) => {
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
