import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Post from './Post';

const Posts = ({
  handleCommentsVisibility,
  items,
}) => {
  if (items.length === 0) return null;
  const posts = items.map(item => {
    return (
      <Post
        handleCommentsVisibility={handleCommentsVisibility}
        item={item}
        key={item.id}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 300,
  },
});

Posts.propTypes = {
  handleCommentsVisibility: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default Posts;
