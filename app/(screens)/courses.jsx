import React, { useState, useEffect } from 'react';
import { View, FlatList,TouchableOpacity, StyleSheet, Text, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Button, TextInput } from 'react-native-paper';
import { colors } from '../../design/themes';  // Varsayılan renkleriniz buradan alınıyor
import { useNavigation } from '@react-navigation/native';

const GridItemsPage = () => {

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
  const navigation = useNavigation();

  useEffect(() => {
    // Verilerinizi buradan çekebilirsiniz
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.itemCard}>
    <TouchableOpacity onPress={() => navigation.navigate('one_course', { course: item })}>

      <Card.Content>
        <Title style={styles.itemTitle}>{item.kod}</Title>
        <Title style={styles.itemTitle}>{item.isim}</Title>
      </Card.Content>
    </TouchableOpacity>

    </Card>
  );

  const handleFilter = (kod) => {
    if (kod) {
      const filtered = items.filter(item => item.kod === kod);
      
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);  // Filtre yoksa tüm itemları göster
    }
    setFilterModalVisible(false);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Tüm İşlemler</Text>
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
            />
            <Button
              mode="contained"
              onPress={() => handleFilter(filteredKod)}
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
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',  // Bu satır başlık ve düğmenin düzgün hizalanmasını sağlar
  },
  itemCard: {
    flex: 0.5,  // Yarım flex değeri iki sütunlu düzen için
    margin: 8,
    marginHorizontal: 5,
    backgroundColor: '#f4511e',  // Örnek: Kırmızı arka plan
    borderRadius: 8,
    justifyContent: 'center',  // İçerikleri dikeyde ortala
    alignItems: 'center',  // İçerikleri yatayda ortala
    height: 150,
  },
  itemTitle: {
    color: '#ffffff',  // Yazı rengi beyaz
    fontSize: 16,
    textAlign: 'center',  // Yazıları merkeze hizala
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  filterButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    borderRadius: 10
  },
  modalHeading: {
    fontSize: 20,
    marginBottom: 10
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10
  }
});

export default GridItemsPage;
