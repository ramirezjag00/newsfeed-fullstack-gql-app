import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Portrait from './Portrait';
import useUpdate from '../utils/useUpdate';

const Edit = ({
  body,
  closeOptionsModal,
  id,
  setModalVisibility,
  text,
  visibility,
}) => {
  const [value, setValue] = useState(body);
  const isValid = value.length >= 3 && value !== body;
  const gqlUpdateAction = useUpdate(id, text, value);
  
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropColor={'#222222'}
      backdropOpacity={0.50}
      isVisible={visibility}
      onBackdropPress={() => setModalVisibility(false)}
      style={styles.modal}
      useNativeDriver={true}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            EDIT
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.editContainer}>
          <Portrait style={{ paddingRight: 10 }} />
          <View style={styles.editSecondaryContainer}>
            <TextInput
              autoFocus={true}
              keyboardType={'default'}
              multiline={true}
              onChangeText={post => setValue(post)}
              selectionColor={'#F58855'}
              style={styles.textInput}
              underlineColorAndroid={'transparent'}
              value={value}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setModalVisibility(false)}
              >
                <Text style={styles.cancel}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.updateButton, isValid && { backgroundColor: '#F58855' }]}
                onPress={() => {
                  gqlUpdateAction();
                  setModalVisibility(false);
                  closeOptionsModal(false);
                }}
                disabled={!isValid}
              >
                <Text style={styles.update}>
                  UPDATE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    height: '96%',
    width: '100%',
    bottom: 0,
    left: 0,
  },
  line: {
    borderBottomColor: '#dadada',
    borderBottomWidth: 1,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#222222',
    fontSize: 14,
    fontWeight: '800',
    paddingVertical: 5,
  },
  editContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 304,
    minHeight: 30,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    borderColor: '#dadada',
    borderWidth: 1,
    fontSize: 12,
  },
  editSecondaryContainer: {
    flexDirection: 'column',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    paddingTop: 10,
  },
  actionButton: {
    width: 64,
    height: 30,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    marginRight: 5,
    borderColor: '#222222',
    backgroundColor: '#ffffff',
  },
  updateButton: {
    borderColor: 'transparent',
    backgroundColor: '#dadada',
  },
  cancel: {
    fontSize: 12,
    color: '#222222',
  },
  update: {
    fontSize: 12,
    color: '#ffffff',
  },
});

Edit.propTypes = {
  body: PropTypes.string.isRequired,
  closeOptionsModal: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
};

export default Edit;
