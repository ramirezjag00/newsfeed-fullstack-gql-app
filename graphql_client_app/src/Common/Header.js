import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import Portrait from './Portrait';
import sendButton from '../../assets/outline_send_black_48dp.png';

const Header = () => {
  const placeholder = 'Tell us your recent Booky experience!';
  return (
    <View style={styles.container}>
      <Portrait style={styles.portrait} />
      <View style={styles.headerContent}>
        <Text style={styles.currentUser}>Juan de la Cruz</Text>
        <View style={styles.postInput}>
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor={'#aeaeae'}
          />
          <TouchableOpacity
            style={styles.sendContainer}
            onPress={() => {}}
          >
            <Image
              style={styles.sendButton}
              source={sendButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  postInput: {
    flexDirection: 'row',
  },
  textInput: {
    width: '100%',
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 30,
  },
  sendContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: -30,
  },
  sendButton: {
    height: 20,
    width: 20,
    tintColor: '#F58855',
  },
});

export default Header;
