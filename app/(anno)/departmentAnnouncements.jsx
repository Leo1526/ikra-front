import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { colors } from "../../design/themes";
import { ikraAxios, urlDev } from '../common';

const DepartmentAnnouncementScreen = ({navigation}) => {
    const [announcements, setAnnouncements] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const size = 5;
    const [lastDataLength, setLastDataLength] = useState(5)

    useEffect(() => {
        fetchAnnouncements();
      }, []);

    const fetchAnnouncements = async () => {
        if (lastDataLength < 5 ) {
            return false;
        }
        try {
          await ikraAxios({
            url: `${urlDev}/announcement/department?page=${page}&size=${size}`,
            onSuccess: (data) => {
                if (data.status === 'SUCCESS') {
                    setAnnouncements((prevAnnouncements) => [...prevAnnouncements, ...data.body]);
                    setPage((prevPage) => prevPage + 1);
                    setLastDataLength(data.body.length)
                    return;
                }
                else {
                    alert("Duyurular getirilirken hata! " +  error)
                }
            },
            onError: (error) => {
                alert('Error fetching Announcement Data: ' + error);
            },
          });
        } catch (error) {
          alert('Error in fetch Announcements: ' + error);
        } finally {
          setLoading(false);
        }
    };

    const handleViewDetails = () => {
        navigation.navigate('')
    }

    

    const renderAnnouncementItem = ({ item, index }) => (
        <View style={styles.announcementItem}>
            {item.image && (
                <Image
                    source={item.image ? { uri: `data:${item.mimeType};base64,${item.image}` } : require('../../assets/images/placeholder.png')}
                    style={styles.announcementImage}
                />
            )}
            <View style={styles.announcementContent}>
                <Text style={styles.announcementTitle}>{item.title}</Text>
                <View style={styles.announcementFooter}>
                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={handleViewDetails}
                    >
                        <Text style={styles.detailsButtonText}>View Details</Text>
                    </TouchableOpacity>
                    <Text style={styles.announcementInsertDate}>{new Date(item.insertDate).toLocaleDateString()}</Text>
                </View>
            </View>
        </View>
    );


    return (
        <SafeAreaView style={styles.container}>
            {announcements.length === 0 ? (
                <Text style={styles.noAnnouncementsText}>Duyuru Yok</Text>
            ) : (
                <FlatList
                    data={announcements}
                    renderItem={renderAnnouncementItem}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={fetchAnnouncements}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading && <Text>Loading...</Text>}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    noAnnouncementsText: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    announcementItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    announcementImage: {
        width: 100,
        height: 100,
        borderRadius: 0,
    },
    announcementContent: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'space-between',
    },
    announcementTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    announcementFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    announcementInsertDate: {
        fontSize: 12,
        color: '#555',
        alignSelf: 'flex-end',
    },
    detailsButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    detailsButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

});

export default DepartmentAnnouncementScreen;