import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { navigateToLoginPage } from '../common';

const Settings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <Button 
            icon={({ size, color }) => (
              <Icon name="logout" size={24} color={color} /> // Adjust the size value here
            )}
            labelStyle={styles.exitStyle} 
            style={styles.exitButton}
            onPress={() => navigateToLoginPage(false)}
        >Çıkış Yap</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 100,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    flex:1, 
    justifyContent: 'flex-end'
  },
  exitStyle: {
    color: 'red',
    fontSize: '15',
  },
  exitButton: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 6,
    paddingHorizontal: 8,
  }
});

export default Settings;
