import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Post from './Post';

const Posts = ({ items, setModalVisibility, handleCommentsVisibility }) => {
  if (items.length === 0) return null;
  const posts = items.map((item, index) => {
    return (
      <Post
        item={item}
        key={index}
        setModalVisibility={setModalVisibility}
        handleCommentsVisibility={handleCommentsVisibility}
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
  items: PropTypes.array.isRequired,
  handleCommentsVisibility: PropTypes.func,
  setModalVisibility: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 300,
  },
});

export default Posts;
