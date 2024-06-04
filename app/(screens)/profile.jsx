import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const user = {
  name: "Adnan Özsoy",
  email: "adnanozsoy@gmail.com",
  website: "https://avesis.hacettepe.edu.tr/adnan.ozsoy",
  schoolName: "Hacettepe Üniversitesi",
  schoolLogoUrl: require("./hctplogo.png"),
  profileImageUrl: require("./adnan.jpg")
};

const ProfileScreen = () => {
  // URL'yi açan fonksiyon
  const openURL = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title 
          title={user.name} 
          subtitle={user.email}
          titleStyle={styles.centerHeaderText}
          subtitleStyle={styles.centerText}
        />
        <Card.Content>
        <TouchableOpacity onPress={() => openURL(user.website)}>
            <Text style={[styles.link, styles.centerText]}>
              Websitesi
            </Text>
          </TouchableOpacity>
          <Avatar.Image 
            size={150} 
            source={user.profileImageUrl}
            style={styles.avatar}
          />
          <Button icon="camera" mode="outlined" onPress={() => console.log('Update Profile Photo')}>
            Fotoğraf Yükle
          </Button>
          <Title style={[styles.title, styles.centerText]}>{user.schoolName}</Title>

          <Avatar.Image 
            size={100} 
            source={user.schoolLogoUrl}
            style={styles.schoolLogo}
          />
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
  centerHeaderText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  },
  schoolLogo: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
    marginBottom: 10
  }
});

export default ProfileScreen;
