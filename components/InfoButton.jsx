import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InfoButton = ({ infoText }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ marginHorizontal: 10 }}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="information-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{infoText}</Text>
            <Button title="Kapat" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%'
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20
  }
});

export default InfoButton;
