import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const deneme = () => {
  return (
    <View style={styles.container}>
      {/* Buton bileşeni */}
      <Button mode="contained" onPress={() => console.log('Butona basıldı')}>
        Basit Buton
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default deneme;
