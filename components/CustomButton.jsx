// CustomButton.js

import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, fonts } from '../design/themes';

const CustomButton = ({ 
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  color = 'primary', // Varsayılan renk
  alignment = 'center' // Varsayılan hizalama
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button,
        { backgroundColor: colors[color] || colors.customRed }, // Dinamik olarak renk alın veya varsayılan olarak colors.customRed
        containerStyles,
        isLoading && { opacity: 0.5 },
        { justifyContent: alignment === 'center' ? 'center' : alignment } // Hizalama stilini uygula
      ]}
      disabled={isLoading}
    >
      <Text style={[
        styles.buttonText,
        textStyles,
      ]}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.activityIndicator}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop : 10,
    borderRadius: 10,
    minHeight: 60,
    minWidth : 250,
    flexDirection: 'row',
    alignItems: 'center', // Dikey hizalama
  },
  buttonText: {
    color: '#fff', // Metin rengini beyaz olarak ayarla
    fontSize: 16,
  },
  activityIndicator: {
    marginLeft: 8,
  },
});

export default CustomButton;
