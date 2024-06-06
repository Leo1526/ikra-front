import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Button, TextInput } from 'react-native-paper';
import { colors } from '../../design/themes';  // Varsayılan renkleriniz buradan alınıyor
import { ikraAxios, url, urlDev } from '../common';
import { commonStyle } from '../../design/style';

const GridItemsPage = ({ navigation }) => {

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filteredKod, setFilteredKod] = useState('');
  const [items, setItems] = useState([
    { id: '1', kod: 'bbm301', isim: 'Data Structures' },
    { id: '2', kod: 'bbm302', isim: 'Algorithms' },
    { id: '3', kod: 'bbm303', isim: 'Operating Systems' },
    { id: '4', kod: 'bbm304', isim: 'Computer Networks' },
    { id: '5', kod: 'bbm305', isim: 'Database Systems' },
    { id: '6', kod: 'bbm306', isim: 'Software Engineering' },
    { id: '7', kod: 'bbm307', isim: 'Artificial Intelligence' },
    { id: '8', kod: 'bbm308', isim: 'Machine Learning' },
    { id: '9', kod: 'bbm309', isim: 'Web Development' },
    { id: '10', kod: 'bbm310', isim: 'Mobile Application Development' }
  ]);
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    fetchAllCoursesByDepartmentId();
    // Verilerinizi buradan çekebilirsiniz
  }, []);

  const fetchAllCourses = async () => {
    console.log("fetchAllCourses");
    await ikraAxios({
      url: urlDev + '/courses/universityId',
      onSuccess: (data) => {
        setItems(data.body);
        console.log('Fetched courses:', data.body);
      },
      onError: (error) => {
        console.error('Error fetching courses:', error);
      },
    });
  };

  const fetchAllCoursesByDepartmentId = async () => {
    console.log("fetchAllCourses");
    await ikraAxios({
      url: urlDev + '/courses/departmentId',
      onSuccess: (data) => {
        setItems(data.body);
        setFilteredItems(data.body);
        console.log('Fetched courses:', data.body);
      },
      onError: (error) => {
        console.error('Error fetching courses:', error);
      },
    });
  };

  const renderItem = ({ item }) => (
    <Card style={styles.itemCard}>
      <TouchableOpacity onPress={() => navigation.navigate('courseDetailPage', { courseId: item.id })}>
        <Card.Content>
          <Title style={[commonStyle.textLabel, {color: colors.primaryLight, textAlign: 'center'}]}>{item.courseCode}</Title>
          <Title style={[commonStyle.generalText, {fontSize: 16, textAlign: 'center'}]}>{item.name}</Title>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );

  const handleFilter = (kod) => {
    if (kod) {
      const filtered = items.filter(item => item.courseCode.toLowerCase().includes(kod.toLowerCase()));
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);  // Filtre yoksa tüm itemları göster
    }
    setFilterModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={commonStyle.mainContainer}>
        <View style={styles.container}>
          <Text style={[commonStyle.textLabel, {fontSize: 24, color: colors.primary}]}>Tüm Dersler</Text>
          <Button
            icon="filter"
            mode="contained"
            onPress={() => setFilterModalVisible(true)}
            style={styles.filterButton}
          >
            Filtrele
          </Button>
        </View>
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}  // İki sütunlu bir grid yapısı
          columnWrapperStyle={styles.row}  // Satırları düzgün hizalamak için
          contentContainerStyle={styles.listContentContainer}  // Liste içeriğinin stili
        />
        <Modal
          visible={filterModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={commonStyle.modalOverlay}>
            <View style={commonStyle.modalContent}>
              <Text style={commonStyle.modalHeading}>Kod'a Göre Filtrele</Text>
              <TextInput
                label="Kod Girin"
                value={filteredKod}
                onChangeText={setFilteredKod}
                style={commonStyle.modalInput}
                mode="outlined"
                theme={{ colors: { primary: colors.primary } }}
              />
              <Button
                mode="contained"
                onPress={() => handleFilter(filteredKod)}
                style={commonStyle.primaryButton}
              >
                Filtrele
              </Button>
            </View>
          </View>
        </Modal>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  itemCard: {
    flex: 0.5,
    margin: 8,
    backgroundColor: colors.cardBackground,  // Varsayılan kart arka plan rengi
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  filterButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  listContentContainer: {
    paddingBottom: 16,
    borderColor: colors.primary
  },
});

export default GridItemsPage;
