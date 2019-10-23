import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Post from './Post';

const Posts = ({
  handleCommentsVisibility,
  items,
}) => {
  if (items.length === 0) return null;
  const posts = items.map((item, index) => {
    return (
      <Post
        handleCommentsVisibility={handleCommentsVisibility}
        item={item}
        key={index}
      />
    );
  });
  return (
    <ScrollView
      horizontal={false}
      scrollEnabled
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {posts}
      </View>
    </ScrollView>
  );
};

Posts.propTypes = {
  handleCommentsVisibility: PropTypes.func,
  items: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 300,
  },
});

export default Posts;
