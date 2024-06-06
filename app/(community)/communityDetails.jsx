import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ikraAxios, urlDev } from '../common'; 
import { colors } from "../../design/themes";

const CommunityDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("hadi" + id)
    const fetchCommunityDetails = async () => {
      try {
        await ikraAxios({
          url: `${urlDev}/communities/get/${id}`,
          method: 'GET',
          onSuccess: handleSuccess,
          onError: handleError,
          setLoading: setLoading,
        });
      } catch (error) {
        console.error('Error fetching community details:', error.message);
        alert("Topluluk getirilirken hata! " + error.message);
      }
    };

    fetchCommunityDetails();
  }, [id]);

  const handleSuccess = (data) => {
    if (data.status === 'SUCCESS') {
      setCommunity(data.body);
    } else {
      alert("Topluluk detaylarını çekerken hata." + data.messages[0]);
    }
  };

  const handleError = (error) => {
    alert("Topluluk getirilirken bilinmeyen hata! " + error.message);
  };

  const handleFetchAnnouncements = () => {
    navigation.navigate('Announcements', { communityId: community.id });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (!community) {
    return (
      <View style={styles.container}>
        <Text>Topluluk bulunamadı.</Text>
      </View>
    );
  }
  
  const { bytes, mimeType } = community.image;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {bytes && (
        <Image
          source={{ uri: `data:${mimeType};base64,${bytes}` }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{community.name}</Text>
        <Text style={styles.universityName}>{community.universityName}</Text>
        <Text style={styles.description}>{community.description}</Text>
        <Text style={styles.email}>{community.email}</Text>
        <TouchableOpacity style={styles.button} onPress={handleFetchAnnouncements}>
          <Text style={styles.buttonText}>Duyuruları Getir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  universityName: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommunityDetails;
