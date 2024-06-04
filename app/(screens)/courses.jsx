import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Button, TextInput } from 'react-native-paper';
import { colors } from '../../design/themes';  // Varsayılan renkleriniz buradan alınıyor
import { ikraAxios, url, urlDev } from '../common';

const GridItemsPage = ({navigation}) => {

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filteredKod, setFilteredKod] = useState('');
  const [items, setItems] = useState([]);
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
      <TouchableOpacity onPress={() => navigation.navigate('courseDetailPage', { course: item })}>
        <Card.Content>
          <Title style={styles.itemTitle}>{item.courseCode}</Title>
          <Title style={styles.itemText}>{item.name}</Title>
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
      <View style={styles.container}>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Kod'a Göre Filtrele</Text>
            <TextInput
              label="Kod Girin"
              value={filteredKod}
              onChangeText={setFilteredKod}
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: colors.primary } }}
            />
            <Button
              mode="contained"
              onPress={() => handleFilter(filteredKod)}
              style={styles.modalButton}
            >
              Filtrele
            </Button>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
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
    elevation: 5,
  },
  itemTitle: {
    color: colors.textPrimary,  // Varsayılan yazı rengi
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  itemText: {
    color: colors.textPrimary,  // Varsayılan yazı rengi
    fontSize: 16,
    textAlign: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  filterButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  listContentContainer: {
    paddingBottom: 16,
    paddingTop: 8,  // FlatList'in üst kısmına padding ekleyin
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  modalHeading: {
    fontSize: 20,
    marginBottom: 10,
    color: colors.textPrimary,
  },
  input: {
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: colors.primary,
  },
});

export default GridItemsPage;
