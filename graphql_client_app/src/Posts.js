import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Post from './Post';

const Posts = ({ items }) => {
  if (items.length === 0) return null;
  const posts = items.map((item, index) => <Post key={index} item={item} />);
  return (
    <ScrollView
      bounces
      horizontal={false}
      scrollEnabled
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {posts}
    </ScrollView>
  );
};

Posts.propTypes = {
  items: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default Posts;
