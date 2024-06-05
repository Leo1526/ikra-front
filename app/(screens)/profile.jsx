import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking, Alert, Image } from 'react-native';
import { Avatar, Button, Card, Title } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { ikraAxios, urlDev } from '../common';  // API istekleri için kullanılan özelleştirilmiş axios instance
import { useRoute } from '@react-navigation/native'; // useRoute'i import et
const ProfileScreen = () => {
  const [user, setUser] = useState({
    name: "Yükleniyor...",
    email: "Yükleniyor...",
    website: null,
    schoolName: "Yükleniyor...",
    profilePhoto: null,  // Profil resmi için bir placeholder
    schoolLogo: null  // Okul logosu için placeholder veya URI
  });
  const route = useRoute(); // Route hook'unu kullan
  const { id } = route.params || {}; // id parametresini al, eğer yoksa boş obje kullan
  const fetchProfileInfo = () => {
    const endpoint = id ? `/users/profileInfo?userId=${id}` : '/users/profileInfo'; // id varsa, URL'ye ekle
    ikraAxios({
      url: urlDev + endpoint,  // Dinamik URL
      onSuccess: (data) => {
        setUser({
          name: data.body.name,
          email: data.body.email,
          website: data.body.website,
          schoolName: data.body.schoolName,
          schoolLogo: data.body.schoolLogo ? `data:${data.body.schoolLogo.mimeType};base64,${data.body.schoolLogo.bytes}` : null,
          profilePhoto: data.body.profilePhoto ? `data:${data.body.profilePhoto.mimeType};base64,${data.body.profilePhoto.bytes}` : null,
        });
      },
      onError: (error) => {
        console.error('Error fetching profile info: ', error);
        Alert.alert("Profil Bilgisi Yükleme Hatası", "Profil bilgileri yüklenirken bir hata oluştu.");
      }
    });
  };

  useEffect(() => {
    fetchProfileInfo(); // Bileşen yüklendiğinde profil bilgilerini çek
  }, [id]); // id değiştiğinde yeniden çek

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Uygulamanın fotoğraflarınıza erişimi olması gerekiyor!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: .5,
    });

    if (!result.cancelled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();
    formData.append('file', {
      uri: uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      await ikraAxios({
        url: urlDev + "/users/profilePic",
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onSuccess: (data) => {
          console.log("Profil fotoğrafı güncellendi:", data.body);
          Alert.alert("Başarılı", "Profil fotoğrafı başarıyla güncellendi!");
          setUser(prevState => ({ ...prevState, profilePhoto: uri }));
        },
        onError: (error) => {
          console.error("Profil fotoğrafı güncellenirken hata oluştu:", error);
          Alert.alert("Hata", "Profil fotoğrafı güncellenirken bir hata oluştu.");
        },
      });
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert("Ağ Hatası", "Bir ağ hatası meydana geldi.");
    }
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
          {user.website && (
            <TouchableOpacity onPress={() => Linking.openURL(user.website)}>
              <Text style={styles.link}>
                Website
              </Text>
            </TouchableOpacity>
          )}
          <Avatar.Image 
            size={150} 
            source={user.profilePhoto ? { uri: user.profilePhoto } : DEFAULT_PHOTO}
            style={styles.avatar}
          />
{      !id &&    <Button icon="camera" mode="outlined" onPress={handleChoosePhoto}>
            Fotoğraf Yükle
          </Button>}
          <Title style={styles.title}>{user.schoolName}</Title>
          {user.schoolLogo && (
            <Image
            source={user.schoolLogo ? { uri: user.schoolLogo } : DEFAULT_PHOTO}

              style={styles.fullWidthImage}
              resizeMode='contain'
            />
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const DEFAULT_PHOTO = require("./../../assets/defaultProfile.png");

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
    marginTop: 10,
    textAlign: 'center'
  },
  centerHeaderText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  },
  fullWidthImage: {
    alignSelf: "center",
    maxWidth: 100,
    maxHeight: 100,
    width: '100%',
    height: undefined,
    aspectRatio: 1
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default ProfileScreen;
