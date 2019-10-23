import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Portrait from '../Common/Portrait';
import OptionsModal from '../Common/OptionsModal';

const Comment = ({ item }) => {
  const { id, text, author: { name } } = item;
  const [modalVisibility, setModalVisibility] = useState(false);

  return (
    <Fragment>
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
      <OptionsModal
        body={text}
        id={id}
        setModalVisibility={setModalVisibility}
        text={'Comment'}
        visibility={modalVisibility}
      />
    </Fragment>
  );
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

Comment.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Comment;
