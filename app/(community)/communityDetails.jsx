import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, FlatList, YellowBox  } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ikraAxios, urlDev } from '../common';
import { colors } from "../../design/themes";

const CommunityDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstIterate, setFirstIterate] = useState(true)

  const [announcements, setAnnouncements] = useState([]);
  const [page, setPage] = useState(0);
  const [lastDataLength, setLastDataLength] = useState(5);
  const size = 5;

  useEffect(() => {
    YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
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
    fetchAnnouncements();
  }, [id]);

  const handleSuccess = (data) => {
    setFirstIterate(false)
    if (data.status === 'SUCCESS') {
      setCommunity(data.body);
    } else {
      alert("Topluluk detaylarını çekerken hata." + data.messages[0]);
    }
  };

  const handleError = (error) => {
    setFirstIterate(false)
    alert("Topluluk getirilirken bilinmeyen hata! " + error.message);
  };

  const fetchAnnouncements = async () => {
    if (lastDataLength < size) {
      return false;
    }
    setLoading(true);
    try {
      await ikraAxios({
        url: `${urlDev}/communities/announcements/${id}?page=${page}&size=${size}`,
        onSuccess: (data) => {
          if (data.status === 'SUCCESS') {
            setAnnouncements((prevAnnouncements) => [...prevAnnouncements, ...data.body]);
            setPage((prevPage) => prevPage + 1);
            setLastDataLength(data.body.length);
          } else {
            alert("Duyurular getirilirken hata: " + error);
          }
        },
        onError: (error) => {
          alert('Duyurular getirilirken bilinmeyen hata! ' + error);
        },
      });
    } catch (error) {
      alert('Duyurular getirilirken bilinmeyen hata: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id) => {
    navigation.navigate('announcementDetails', { id });
  };

  const renderAnnouncementItem = ({ item }) => (
    <View style={styles.announcementItem}>
      <Image
        source={item.image ? { uri: `data:${item.mimeType};base64,${item.image}` } : require('../../assets/images/announcement-placeholder.png')}
        style={styles.announcementImage}
      />
      <View style={styles.announcementContent}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => handleViewDetails(item.id)}>
          <Text style={styles.detailsButtonText}>Detayları Göster &#10140;</Text>
        </TouchableOpacity>
        <View style={styles.announcementFooter}>
          <Text style={styles.announcementInsertDate}>{new Date(item.insertDate).toLocaleDateString()}</Text>
        </View>
      </View>
    </View>
  );

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
      <View style={styles.titleEtc}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/icons/community.png')}
            style={styles.communityIcon}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{community.name}</Text>
            <Text style={styles.universityName}>{community.universityName}</Text>
          </View>
          {bytes && (
            <Image
              source={{ uri: `data:${mimeType};base64,${bytes}` }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/icons/description.png')}
              style={styles.descriptionIcon}
            />
            <Text style={styles.description}>{community.description}</Text>
          </View>
          <View style={styles.row}>
            <Image
              source={require('../../assets/icons/contact.png')}
              style={styles.contactIcon}
            />
            <Text style={styles.email}>{community.email}</Text>
            <Image
              source={require('../../assets/icons/copy.png')}
              style={styles.copyIcon}
            />
          </View>
        </View>
      </View>
      <View style={styles.duyurularTextContainer}>
        <Image
            source={require('../../assets/icons/announcement-white.png')}
            style={styles.announcementIcon}
          />
        <Text style={styles.announcementText}>DUYURULAR</Text>
      </View>
      {firstIterate ? (      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>) : (
      <View style={styles.announcementsContainer}>
        {announcements.length === 0 ? (
          <Text style={styles.noAnnouncementsText}>Duyuru Yok</Text>
        ) : (
          <FlatList
            nestedScrollEnabled={true}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1 }}
            data={announcements}
            renderItem={renderAnnouncementItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={fetchAnnouncements}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
      )}
      {/* <View style={styles.addAnnouncementView}>
        <Button 
          style={styles.addAnnouncementButton}
          labelStyle={styles.addAnnouncementLabel}>
          +
        </Button>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // addAnnouncementView: {
  //   height: 100,
  //   width: 100,
  //   position: 'absolute',
  //   right:20,
  //   bottom:20,
  // },
  // addAnnouncementButton: {
  //   borderRadius: 100,
  //   backgroundColor: colors.primaryDark,
  // },
  // scrollContainer: {
  //   flexGrow: 1,
  //   alignItems: 'center',
  //   paddingTop:2,
  // },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 20,
  },
  communityIcon: {
    width: 40,
    height: 40,
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.primaryDark
  },
  universityName: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  descriptionIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  announcementIcon :{
    width: 36,
    height: 36,
    marginRight: 40,
    marginLeft: 40,
  },
  announcementText: {
    fontSize: 20,
    fontWeight: 'thin',
    letterSpacing: 3,
    color: colors.background,
  },
  contactIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  copyIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    color: colors.primaryDark
  },
  email: {
    fontSize: 16,
    textAlign: 'left',
    color: colors.primaryDark
  },
  noAnnouncementsText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  duyurularTextContainer: {
    maxHeight: 40,
    flex:1,
    flexDirection:'row',
    alignContent: 'center',
    alignItems:'center',
    backgroundColor: colors.primaryLight,
    width: "100%"
  },
  announcementsContainer: {
    borderTopWidth:1,
    borderTopColor: colors.primaryDark,
    flex: 1,
    width: '100%',
  },
  announcementItem: {
    paddingVertical:10,
    paddingLeft:10,
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryDark,
  },
  announcementImage: {
    width: '25%', 
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  announcementContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsButton: {
    backgroundColor: colors.primary,
    padding: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  detailsButtonText: {
    color: colors.background,
    fontWeight: 'thin',
  },
  announcementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  announcementInsertDate: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    fontSize: 12,
    color: '#555',
  },
});

export default CommunityDetails;
