import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ikraAxios, urlDev } from '../common';  // Ensure to update the import path as necessary
import { colors } from "../../design/themes";

const AnnouncementDetails = ({navigation}) => {
  const route = useRoute();
  const { id } = route.params;
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncementDetails = async () => {
      try {
        await ikraAxios({
          url: `${urlDev}/announcement/${id}`,
          method: 'GET',
          onSuccess: handleSuccess,
          onError: handleError,
          setLoading: setLoading,
        });
      } catch (error) {
        console.error('Error fetching announcement details:', error);
        alert("Duyurular getirilirken hata! " + error.message);
      }
    };

    fetchAnnouncementDetails();
  }, [id]);

  const handleSuccess = (data) => {
    if (data.status === 'SUCCESS') {
      setAnnouncement(data.body);
    } else {
      alert("Duyuru detaylarını çekerken hata." + data.messages[0]);
    }
  };

  const handleError = (error) => {
    alert("Duyurular getirilirken bilinmeyen hata! " + error.message);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (!announcement) {
    return (
      <View style={styles.container}>
        <Text>Duyuru bulunamadı.</Text>
      </View>
    );
  }

  const handleDeleteSuccess = (data) => {
    if (data.status === 'SUCCESS' && data.body) {
      alert("Duyuru silindi.")
      navigation.goBack()
      return true;
    }
    alert("Duyuru silinemedi. " + data.messages[0])
  } 

  const handleDeleteError = (data) => {
    alert("Duyuru silinemedi. " + data.messages[0])
  }

  const deleteAnnouncement = async () => {
    try {
      await ikraAxios({
        url: `${urlDev}/announcement/delete/${id}`,
        method: 'POST',
        onSuccess: handleDeleteSuccess,
        onError: handleDeleteError,
        setLoading: setLoading,
      });
    } catch (error) {
      console.error('Error fetching announcement details:', error);
      alert("Duyuru silinirken hata! " + error.message);
    }
  }

  const handleDelete = () => {
    deleteAnnouncement()
  }

  const handleCommunityPress = (communityId) => {
    navigation.navigate('communityDetails', communityId)
  }

  const { image, mime, title, body, communityId, communityName ,insertDate, canEdit } = announcement;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {canEdit && (
        <View style={styles.editButtonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleDelete}>
            <Image source={require('../../assets/icons/delete.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      )}
      {image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:${mime};base64,${image}` }}
            style={styles.image}
            resizeMode="contain"
          />
          {communityName && (
            <TouchableOpacity style={styles.communityButton} onPress={() => handleCommunityPress(communityId)}>
              <Text style={styles.communityButtonText}>{communityName}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
        <Text style={styles.insertDate}>
          {new Date(insertDate).toLocaleDateString()}
        </Text>
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
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  communityButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: colors.secondary,
    padding: 5,
    borderRadius: 5,
  },
  communityButtonText: {
    color: colors.background,
    fontWeight: 'bold',
  },
  editButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    backgroundColor: colors.secondary,
    borderRadius: 8  
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    marginRight: 5,
    color: colors.background,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    marginBottom: 20,
  },
  insertDate: {
    fontSize: 14,
    color: '#555',
    textAlign: 'right',
  },
});

export default AnnouncementDetails;
