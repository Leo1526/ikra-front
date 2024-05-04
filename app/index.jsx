import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Link } from '@react-navigation/native';

const RootLayout = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.text}>hacasasep</Text>
    <StatusBar style='auto' />
    <Link to="/sign-in" style={styles.link}>Go to assa In</Link>
    <Link to="/transaction" style={styles.link}>Go to deneme</Link>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default RootLayout
