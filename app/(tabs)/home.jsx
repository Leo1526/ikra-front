import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Text, Button, IconButton, Card } from 'react-native-paper';

const { height } = Dimensions.get('window');

const Home = () => {
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.announcementContainer}>
        <ScrollView horizontal pagingEnabled>
          {/* Replace with dynamic announcement images */}
          <Image source={{ uri: 'https://via.placeholder.com/350' }} style={styles.announcementImage} />
          <Image source={{ uri: 'https://via.placeholder.com/350' }} style={styles.announcementImage} />
          <Image source={{ uri: 'https://via.placeholder.com/350' }} style={styles.announcementImage} />
        </ScrollView>
      </View>
      <Card style={styles.balanceCard}>
        <Text style={styles.balanceText}>Current Balance: $100</Text>
      </Card>
      <View style={styles.iconContainer}>
        {Array.from({ length: 8 }).map((_, index) => (
          <IconButton
            key={index}
            icon="apps" // Replace with appropriate icons
            size={40}
            onPress={() => console.log('Navigate to screen', index + 1)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F6F8',
    padding: 16,
  },
  announcementContainer: {
    height: height * 0.2,
  },
  announcementImage: {
    width: Dimensions.get('window').width - 32, // Full width minus padding
    height: '100%',
    borderRadius: 8,
    marginRight: 16,
  },
  balanceCard: {
    marginVertical: 20,
    padding: 16,
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#354D73',
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default Home;
