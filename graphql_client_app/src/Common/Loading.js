import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const Loading = ({ loading }) => (
  <View style={styles.loading}>
    <ActivityIndicator animating={loading} size="large" color="#F58855" />
  </View>
);

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;
