import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Link } from '@react-navigation/native';

const RootLayout = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.text}>hacasasep</Text>
    <StatusBar style='auto' />
    <Link to="/sign-in" style={styles.link}>Go to Sign In</Link>
    <Link to="/transaction" style={styles.link}>Go to Transaction</Link>
    <Link to="/finance" style={styles.link}>Go to finance</Link>
    <Link to="/createRequest" style={styles.link}>Create request</Link>
    <Link to="/all_Requests" style={styles.link}>Go to Request Page</Link>
    <Link to="/dining" style={styles.link}>Go to Dining</Link>
    <Link to="/internship" style={styles.link}>Go to Internship</Link>
    <Link to="/myCourses" style={styles.link}>Go to My Courses</Link>
    <Link to="/createLostItem" style={styles.link}>Go to Create Lost Item</Link>
    <Link to="/all_LostItems" style={styles.link}>Go to All Lost Item Page</Link>
    <Link to="/deneme" style={styles.link}>Go to deneme Page</Link>
    <Link to="/commAnno" style={styles.link}>Go to Community Anno</Link>
    
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
