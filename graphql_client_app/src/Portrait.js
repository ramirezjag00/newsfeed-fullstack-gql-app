import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const Portrait = ({ style }) => (
  <View style={[styles.container, style]}>
    <View style={styles.portrait} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingRight: 15,
  },
  portrait: {
    backgroundColor: '#f5f5f5',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

Portrait.propTypes = {
  style: PropTypes.object,
};

export default Portrait;
