import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../design/themes";
import { ikraAxios, urlDev } from '../common';

const AnnouncementsScreen = ({ navigation }) => {
    const [schoolAnnouncements, setSchoolAnnouncements] = useState([]);
    const [departmentAnnouncements, setDepartmentAnnouncements] = useState([]);
    const [communityAnnouncements, setCommunityAnnouncements] = useState([]);

    const [schoolPage, setSchoolPage] = useState(0);
    const [departmentPage, setDepartmentPage] = useState(0);
    const [communityPage, setCommunityPage] = useState(0);

    const [loading, setLoading] = useState(false);
    const size = 5;

    const [schoolLastDataLength, setSchoolLastDataLength] = useState(5);
    const [departmentLastDataLength, setDepartmentLastDataLength] = useState(5);
    const [communityLastDataLength, setCommunityLastDataLength] = useState(5);
    
    const [activePage, setActivePage] = useState('schoolAnnouncements');

    useEffect(() => {
        navigateSchoolAnnouncements();
    }, []);

    const fetchSchoolAnnouncements = async () => {
        if (schoolLastDataLength < 5) {
            return false;
        }
        try {
          await ikraAxios({
            url: `${urlDev}/announcement/school?page=${schoolPage}&size=${size}`,
            onSuccess: (data) => {
                if (data.status === 'SUCCESS') {
                    setSchoolAnnouncements((prevSchoolAnnouncements) => [...prevSchoolAnnouncements, ...data.body]);
                    setSchoolPage((prevSchoolPage) => prevSchoolPage + 1);
                    setSchoolLastDataLength(data.body.length);
                    return;
                } else {
                    alert("Okul duyuruları getirilirken hata! " +  error);
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

    const fetchCommunityAnnouncements = async () => {
        if (communityLastDataLength < 5) {
            return false;
        }
        try {
            await ikraAxios({
                url: `${urlDev}/announcement/communities?page=${communityPage}&size=${size}`,
                onSuccess: (data) => {
                    if (data.status === 'SUCCESS') {
                        setCommunityAnnouncements((prevCommunityAnnouncements) => [...prevCommunityAnnouncements, ...data.body]);
                        setCommunityPage((prevCommunityPage) => prevCommunityPage + 1);
                        setCommunityLastDataLength(data.body.length);
                        return;
                    } else {
                        alert("Duyurular getirilirken hata! " +  error);
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

    const fetchDepartmentAnnouncements = async () => {
        if (departmentLastDataLength < 5) {
            return false;
        }
        try {
          await ikraAxios({
            url: `${urlDev}/announcement/department?page=${departmentPage}&size=${size}`,
            onSuccess: (data) => {
                if (data.status === 'SUCCESS') {
                    setDepartmentAnnouncements((prevDepartmentAnnouncements) => [...prevDepartmentAnnouncements, ...data.body]);
                    setDepartmentPage((prevDepartmentPage) => prevDepartmentPage + 1);
                    setDepartmentLastDataLength(data.body.length);
                    return;
                } else {
                    alert("Duyurular getirilirken hata! " +  error);
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
        navigation.navigate('');
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

    const navigateSchoolAnnouncements = () => {
        setActivePage('schoolAnnouncements');
        setLoading(true);
        fetchSchoolAnnouncements();
    }

    const navigateDepartmentAnnouncements = () => {
        setActivePage('departmentAnnouncements');
        setLoading(true);
        fetchDepartmentAnnouncements();
    }

    const navigateCommunityAnnouncements = () => {
        setActivePage('communityAnnouncements');
        setLoading(true);
        fetchCommunityAnnouncements();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateSchoolAnnouncements} style={activePage === 'schoolAnnouncements' ? styles.activeIconContainer : styles.iconContainer}>
                    <Image source={require('../../assets/icons/school-dark.png')} style={styles.icon} />
                    {activePage === 'schoolAnnouncements' && <View style={styles.activeLine}></View>}
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateDepartmentAnnouncements} style={activePage === 'departmentAnnouncements' ? styles.activeIconContainer : styles.iconContainer}>
                    <Image source={require('../../assets/icons/department.png')} style={styles.icon} />
                    {activePage === 'departmentAnnouncements' && <View style={styles.activeLine}></View>}
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateCommunityAnnouncements} style={activePage === 'communityAnnouncements' ? styles.activeIconContainer : styles.iconContainer}>
                    <Image source={require('../../assets/icons/community-announcement.png')} style={styles.icon} />
                    {activePage === 'communityAnnouncements' && <View style={styles.activeLine}></View>}
                </TouchableOpacity>
            </View>
            {activePage === 'schoolAnnouncements' ? (
                schoolAnnouncements.length === 0 ? (
                    <Text style={styles.noAnnouncementsText}>Duyuru Yok</Text>
                ) : (
                    <FlatList
                        contentContainerStyle={{ flexGrow: 1, marginTop:20 }}
                        style={{ flex: 1 }}
                        data={schoolAnnouncements}
                        renderItem={renderAnnouncementItem}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={fetchSchoolAnnouncements}
                        onEndReachedThreshold={0.5}
                        // ListFooterComponent={loading && <Text>Yükleniyor...</Text>}
                    />
                )
            ) : null}
            {activePage === 'departmentAnnouncements' ? (
                departmentAnnouncements.length === 0 ? (
                    <Text style={styles.noAnnouncementsText}>Duyuru Yok</Text>
                ) : (
                    <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={{ flex: 1 }}
                        data={departmentAnnouncements}
                        renderItem={renderAnnouncementItem}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={fetchDepartmentAnnouncements}
                        onEndReachedThreshold={0.5}
                        // ListFooterComponent={loading && <Text>Yükleniyor...</Text>}
                    />
                )
            ) : null}
            {activePage === 'communityAnnouncements' ? (
                communityAnnouncements.length === 0 ? (
                    <Text style={styles.noAnnouncementsText}>Duyuru Yok</Text>
                ) : (
                    <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={{ flex: 1 }}
                        data={communityAnnouncements}
                        renderItem={renderAnnouncementItem}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={fetchCommunityAnnouncements}
                        onEndReachedThreshold={0.5}
                        // ListFooterComponent={loading && <Text>Yükleniyor...</Text>}
                    />
                )
            ) : null}
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
        width: "100%",
        backgroundColor: colors.background,
        ...StyleSheet.absoluteFillObject
    },
    header: {
        position: "absolute",
        top: 0,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#698FC8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        zIndex: 1000
    },
    iconContainer: {
        alignItems: 'center',
    },
    activeIconContainer: {
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
    },
    activeLine: {
        marginTop: 5,
        height: 3,
        borderRadius:10,
        width: 30,
        backgroundColor: colors.primary,
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

export default AnnouncementsScreen;
