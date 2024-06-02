import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const user = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  schoolName: "University of Example",
  schoolLogoUrl: "https://via.placeholder.com/150",
  profileImageUrl: "https://via.placeholder.com/150"
};


const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={user.name} subtitle={user.email} />
        <Card.Content>
          <Avatar.Image size={150} source={{ uri: user.profileImageUrl }} style={styles.avatar} />
          <Button icon="camera" mode="outlined" onPress={() => console.log('Update Profile Photo')}>
            Update Photo
          </Button>
          <Title style={styles.title}>{user.name}</Title>
          <Paragraph>{user.email}</Paragraph>
          <Paragraph>{user.schoolName}</Paragraph>
          <Avatar.Image size={100} source={{ uri: user.schoolLogoUrl }} style={styles.schoolLogo} />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    width: '100%',
    padding: 20
  },
  avatar: {
    alignSelf: 'center',
    marginVertical: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10
  },
  schoolLogo: {
    marginTop: 10,
    alignSelf: 'center'
  }
});

export default ProfileScreen;
