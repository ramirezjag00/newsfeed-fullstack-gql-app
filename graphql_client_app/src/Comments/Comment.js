import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Portrait from '../Common/Portrait';

const Comment = ({
  name,
  setModalVisibility,
  text,
}) => {
  return (
    <View style={styles.commentContainer}>
      <Portrait />
      <TouchableOpacity
        style={styles.commentSecondaryContainer}
        onLongPress={() => setModalVisibility(true)}
      >
        <Text style={styles.commentAuthor}>{name}</Text>
        <Text style={styles.commentText}>{text}</Text>
        <Text style={styles.commentDate}>3h</Text>
      </TouchableOpacity>
    </View>
  );
};

Comment.propTypes = {
  name: PropTypes.string,
  setModalVisibility: PropTypes.func,
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  commentSecondaryContainer: {
    flex: 1,
  },
  commentAuthor: {
    color: '#222222',
    fontSize: 14,
    fontWeight: '800',
    paddingBottom: 5,
  },
  commentText: {
    color: '#222222',
    fontSize: 14,
    paddingBottom: 5,
  },
  commentDate: {
    color: '#7A7A7A',
    fontSize: 11,
    fontWeight: '800',
    paddingBottom: 5,
  },
});

export default Comment;
