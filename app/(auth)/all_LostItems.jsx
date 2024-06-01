import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, StatusBar, Modal } from 'react-native';
import { Card, Title,FAB, Button } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { colors } from '../../design/themes';
import { useNavigation } from '@react-navigation/native';

const LostItemsPage = () => {
  const [lostItems, setLostItems] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterCategory, setFilterCategory] = useState(null);
  const navigation = useNavigation();

  const sampleLostItems = [
    {
      id: 1,
      title: "Siyah Cüzdan",
      description: "Siyah deri cüzdan, içerisinde kimlik ve kredi kartları var.",
      imageUrl: "https://example.com/image1.png",
      isIDCategory: false
    },
    {
      id: 2,
      title: "Mavi Kimlik Kartı",
      description: "Mavi renkli yeni tip kimlik kartı. İsim: Ahmet Yılmaz.",
      imageUrl: "https://example.com/image2.png",
      isIDCategory: true
    },
    {
      id: 3,
      title: "Kırmızı Anahtarlık",
      description: "Kırmızı anahtarlık, üzerinde 4 farklı anahtar bulunmaktadır.",
      imageUrl: "https://example.com/image3.png",
      isIDCategory: false
    },
    {
      id: 4,
      title: "Gümüş Saat",
      description: "Gümüş renkli el saati, üzerinde küçük bir kazıma var.",
      imageUrl: "https://example.com/image4.png",
      isIDCategory: false
    },
    {
      id: 5,
      title: "Yeşil Kitap",
      description: "Yeşil kapaklı bir kitap, 'Felsefenin Kısa Tarihi' yazıyor.",
      imageUrl: "https://example.com/image5.png",
      isIDCategory: false
    }
  ];

  const navigateToOneLostItem = (it) => {
    navigation.navigate('oneLostItem', {item:it})
  }
  

  const navigateToCreateLostItem = () => {
    navigation.navigate('createLostItem');  // Bu, 'CreateLostItem' adlı sayfaya yönlendirir
  };

  useEffect(() => {
    // API'den kayıp eşyaları çekmek için kullanılabilir.
    // Şimdilik statik veri kullanıyoruz.
    setLostItems(sampleLostItems);
  }, []);

  const filteredItems = lostItems.filter(item => {
    if (filterCategory === null) return true;
    if (filterCategory === 'all') return true;
    return filterCategory === 'id' ? item.isIDCategory : !item.isIDCategory;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Button onPress={() => setFilterModalVisible(true)} style={styles.filterButton}>
        Filtrele
      </Button>
      <ScrollView style={styles.scrollView}>
      <View style={{ height: 30 }}></View>  
        {filteredItems.map((item) => (

          <Card key={item.id} style={styles.itemCard}>
          <TouchableOpacity onPress={() => navigateToOneLostItem(item)}>
          {item.imageUrl && <Card.Cover source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode='contain' />}

            <Card.Content>
              <Title style={styles.itemDescription}>{item.title}</Title>
            </Card.Content>
          </TouchableOpacity>

          </Card>
        ))}
        <View style={{ height: 30 }}></View>  
      </ScrollView>


      <Modal
        visible={filterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Kategori Seçiniz</Text>
            <RNPickerSelect
              onValueChange={(value) => setFilterCategory(value)}
              items={[
                { label: 'ID', value: 'id' },
                { label: 'Diğer', value: 'other' },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: 'Tümü', value: 'all' }}
            />
            <Button onPress={() => setFilterModalVisible(false)} style={styles.modalButton}>
              Filtrele
            </Button>
          </View>
        </View>
      </Modal>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigateToCreateLostItem()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: (StatusBar.currentHeight || 20) + 20,
  
  },
  scrollView: {
    width: '80%', // Genişlik artırıldı
    flex: 1,
    paddingBottom: 30, // ScrollView içeriğinin en altına 30 birim boşluk ekler
  }
,  
itemCard: {
  width: '100%', // Genişlik artırıldı
  marginBottom: 10,
  elevation: 3,
  alignSelf: 'center', // Card'ları ortalamak için
},
  itemImage: {
    height: 200,
    backgroundColor: colors.text,
  },
  itemDescription: {
    fontSize: 18,
    marginBottom: 8,
  },
  filterButton: {
    backgroundColor: colors.primary,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: colors.text,
  },
  modalButton: {
    backgroundColor: colors.primary,
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
  },
});

export default LostItemsPage;
