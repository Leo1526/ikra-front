import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, StatusBar, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, FAB, Button } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { colors } from '../../design/themes';

const LostItemsPage = () => {
  const [lostItems, setLostItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterCategory, setFilterCategory] = useState(null);
  const [temporaryFilterCategory, setTemporaryFilterCategory] = useState('all');

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


  useEffect(() => {
    // API'den kayıp eşyaları çekmek için kullanılabilir.
    // Şimdilik statik veri kullanıyoruz.
    setLostItems(sampleLostItems);
  }, []);

  const filteredItems = lostItems.filter(item => {
    if (filterCategory === 'all') return true;
    return item.isIDCategory === (filterCategory === 'id');
  });

  const applyFilter = () => {
    setFilterCategory(temporaryFilterCategory);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.heading}>Tüm İşlemler</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {filteredItems.map((item) => (
            <Card key={item.id} style={styles.itemCard}>
              {item.imageUrl && <Card.Cover source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode='contain' />}
              <Card.Content>
                <Title style={styles.itemDescription}>{item.description}</Title>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};
// Stiller için güncellenmiş bölüm
// Stiller için güncellenmiş bölüm
const styles = StyleSheet.create({
  fab: {
    position: 'absolute', // Pozisyonu sabit yap
    margin: 16, // Tüm kenarlardan 16 birim boşluk bırak
    right: 0, // Sağ kenardan sıfır birim uzaklıkta
    bottom: 0, // Alt kenardan sıfır birim uzaklıkta
    backgroundColor: colors.primary, // Arka plan rengini ayarla
  },
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    width: '100%', // ScrollView genişliğini tam olarak ayarla
    flex: 1,
    paddingBottom: 30,
  },
  itemCard: {
    width: '90%', // Kart genişliğini ekranın %90'ına ayarla
    marginBottom: 10,
    elevation: 3,
    alignSelf: 'center', // Her kartı kendi içinde merkezle
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
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  filterButtonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 10, // Sağ taraftaki metin ve buton arasında boşluk
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
