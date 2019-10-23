import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import closeButton from '../../assets/outline_clear_black_48dp.png';
import editButton from '../../assets/outline_edit_black_48dp.png';
import deleteButton from '../../assets/outline_delete_black_48dp.png';

const OptionsModal = ({ visibility, setModalVisibility, text }) => {
  const edit = `Edit ${text}`;
  const remove = `Delete ${text}`;

  return (
    <View>
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
          <TouchableOpacity onPress={() => setModalVisibility(false)} style={styles.closeAction}>
            <Image
              source={closeButton}
              style={styles.closeButton}
            />
          </TouchableOpacity>
          <View style={styles.line} />
          <View style={styles.actionContainer}>
            <View style={styles.actionRow}>
              <Image
                source={editButton}
                style={styles.actionButton}
              />
              <Text style={styles.actionText}>{edit}</Text>
            </View>
            <View style={styles.actionRow}>
              <Image
                source={deleteButton}
                style={styles.actionButton}
              />
              <Text style={styles.actionText}>{remove}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    height: 125,
    width: '100%',
    bottom: 0,
    left: 0,
  },
  closeAction: {
    marginRight: 5,
    marginTop: 5,
    marginBottom: 3,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  closeButton: {
    tintColor: '#7a7a7a',
    height: 15,
    width: 15,
  },
  line: {
    borderBottomColor: '#dadada',
    borderBottomWidth: 1,
  },
  actionContainer: {
    flexDirection: 'column',
    paddingVertical: 12,
  },
  actionRow: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingBottom: 15,
    alignItems: 'center',
  },
  actionButton: {
    tintColor: '#7a7a7a',
    height: 20,
    width: 20,
  },
  actionText: {
    paddingLeft: 15,
    color: '#7a7a7a',
    fontSize: 14,
  },
});

OptionsModal.propTypes = {
  setModalVisibility: PropTypes.func,
  text: PropTypes.string,
  visibility: PropTypes.bool,
};

export default OptionsModal;
