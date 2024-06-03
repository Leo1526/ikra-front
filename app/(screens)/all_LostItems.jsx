import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, StatusBar ,Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, FAB, Button, TextInput} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { colors } from '../../design/themes';

const LostItemsPage = () => {
  const [claimModalVisible, setClaimModalVisible] = useState(false);
  const [claimLostItemId, setClaimLostItemId] = useState(0);
  const [contactInfo, setContactInfo] = useState('');
  const [description, setDescription] = useState('');
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

  const claimButton = (id) => {
    setClaimLostItemId(id)
    setClaimModalVisible(true);
  }

  const sendClaim = () => {
    console.log('Claim submitted:', contactInfo, description);


    " back end request"
    setClaimModalVisible(false);

  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.heading}>Tüm İşlemler</Text>
          <Button style={styles.filterButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.filterButtonText}>Filtrele</Text>
          </Button>
        </View>
        <ScrollView style={styles.scrollView}>
          {filteredItems.map((item) => (
            <Card key={item.id} style={styles.itemCard}>
              {item.imageUrl && <Card.Cover source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode='contain' />}
              <Card.Content>
                <Title style={styles.itemDescription}>{item.description}</Title>
              </Card.Content>
              <Button
                mode="contained"
                onPress={() => claimButton(item.id)}
                style={styles.claimButton}
              >
                Bu eşya bana ait
              </Button>
            </Card>
          ))}
        </ScrollView>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          onDismiss={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>Filtrele</Text>
              <RNPickerSelect
                onValueChange={setTemporaryFilterCategory}
                items={[
                  { label: 'Kimlik', value: 'id' },
                  { label: 'Kimlik Değil', value: 'notId' },
                  { label: 'Tümü', value: 'all' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Tümü', value: "all" }}
              />
              <Button
                mode="contained"
                onPress={applyFilter}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Uygula
              </Button>
            </View>
          </View>
        </Modal>
        <Modal
          visible={claimModalVisible}
          onDismiss={() => setClaimModalVisible(false)}
          onRequestClose={() => setClaimModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
          transparent={true}

        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>İletişim Bilgisi Giriniz</Text>
              <TextInput
                label="İletişim Bilgisi"
                value={contactInfo}
                onChangeText={setContactInfo}
                mode="outlined"
                style={styles.input}
              />
              <Text style={styles.modalHeading}>Açıklama Giriniz</Text>
              <TextInput
                label="Açıklama"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                multiline={true}
                numberOfLines={4}
                style={styles.input}
              />
              <Button
                mode="contained"
                onPress={() => {
                  sendClaim();
                }}
                style={styles.button}
              >
                Gönder
              </Button>
            </View>
          </View>
        </Modal>

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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  claimButton: {
    backgroundColor: colors.primary,  // Butonun arka plan rengi
    paddingVertical: 8,              // Dikey padding değeri
    paddingHorizontal: 16,           // Yatay padding değeri
    marginVertical: 8,               // Üst ve alt boşluk değeri
    borderRadius: 20,                // Butonun köşe yuvarlaklığı, daha oval hale getirir
    width: '80%',                    // Butonun genişliği kart genişliği ile aynı olur
    justifyContent: 'center',        // İçeriklerin merkezlenmesi
    alignSelf: "center",
  },
  inputHeading: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#FF6347',  // Arka plan rengi
    paddingVertical: 8,          // Dikey padding
    marginVertical:5,
    paddingHorizontal: 20,       // Yatay padding
    borderRadius: 5,             // Köşe yuvarlaklığı
  },
  buttonLabel: {
    color: '#FFFFFF',            // Yazı rengi
    fontSize: 16,                // Yazı boyutu
  }
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
