import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SongOptionsModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.openButton}>
        <Text>Show Overlay</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalBackground}>
          <TouchableOpacity style={styles.modalBackground} onPress={() => setIsVisible(false)} />
          <View style={styles.modalContainer}>
            <Text>This is a half-page modal!</Text>
            <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.closeButton}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    height: '50%', // Half page
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'lightcoral',
    borderRadius: 5,
    marginTop: 20,
  },
});

export default SongOptionsModal;
