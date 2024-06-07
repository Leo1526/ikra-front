import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { navigateToLoginPage } from '../common';
import {colors} from '../../design/themes'

const Settings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <Button
          icon={({ size, color }) => (
            <Icon name="lock-outline" size={24} color={colors.primaryDark} /> // Adjust the size value here
          )}
          labelStyle={styles.defaultStyle} 
          style={styles.defaultButton}
          onPress={() => navigation.navigate('changePassword')}
        >
          Şifre Değiştir
        </Button>
      </View>
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
    width:"100%",
    flexDirection: 'column',
    paddingVertical: 100,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.secondaryBackground,
  },
  footer: {
    width: "100%",
    flex:1, 
    justifyContent: 'flex-end'
  },
  upperRow: {
    width: "75%",
    flex:1, 
    justifyContent: 'flex-start'
  },
  exitStyle: {
    color: colors.red,
    fontSize: '15',
  },
  exitButton: {
    width: "100%",
    borderRadius:0,
    paddingVertical:2,
    borderBottomWidth:2,
    borderTopWidth: 2,
    borderColor: colors.red,
  },
  defaultStyle: {
    color: colors.primaryDark,
    fontSize: '15',
  },
  defaultButton: {
    borderRadius:0,
    paddingVertical:2,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: colors.primaryDark,
  }
});

export default Settings;
