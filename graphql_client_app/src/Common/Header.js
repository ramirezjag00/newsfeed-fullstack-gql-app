import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import Portrait from './Portrait';

const Header = () => {
  const placeholder = 'Tell us your recent Booky experience!';
  return (
    <View style={styles.container}>
      <Portrait style={styles.portrait} />
      <View style={styles.headerContent}>
        <Text style={styles.currentUser}>Juan de la Cruz</Text>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={'#aeaeae'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F58855',
    height: 80,
    padding: 20,
    flexDirection: 'row',
  },
  portrait: {
    paddingRight: 20,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'column',
  },
  currentUser: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '800',
  },
  textInput: {
    width: 240,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    fontSize: 12,
    paddingLeft: 10,
  },
});

export default Header;
