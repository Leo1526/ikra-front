import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Link } from '@react-navigation/native';
import {checkTokenExpiration} from './common'
import App from '../App'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Index = () => {
  const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
    const jwtToken = async () => {
      setJwtToken(checkTokenExpiration())
    }
  })
  return (
    <SafeAreaProvider style={styles.scontainer}>
      <App style={styles.container} />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  scontainer: {
    flex:1,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex:1,
    ...StyleSheet.absoluteFillObject,
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

export default Index
