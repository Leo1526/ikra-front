import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Platform,StatusBar, Modal,KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, FAB, Button, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { colors } from '../../design/themes';

const LostItemsPage = () => {
  const [lostItems, setLostItems] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [foundModalVisible, setFoundModalVisible] = useState(false);
  const [filterCategory, setFilterCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [isIDCategory, setIsIDCategory] = useState(false);
  const [foundItem, setFoundItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [idNumber, setIdNumber] = useState(''); 


  const sampleLostItems = [
    {
      id: 1,
      title: "Siyah Cüzdan",
      description: "Siyah deri cüzdan, içerisinde kimlik ve kredi kartları var.",
      imageUrl: "https://example.com/image1.png",
      isIDCategory: false,
      idNumber: ""
    },
    {
      id: 2,
      title: "Mavi Kimlik Kartı",
      description: "Mavi renkli yeni tip kimlik kartı. İsim: Ahmet Yılmaz.",
      imageUrl: "https://example.com/image2.png",
      isIDCategory: true,
      idNumber: "123456"

    },
    {
      id: 3,
      title: "Kırmızı Anahtarlık",
      description: "Kırmızı anahtarlık, üzerinde 4 farklı anahtar bulunmaktadır.",
      imageUrl: "https://example.com/image3.png",
      isIDCategory: false,
      idNumber: ""

    },
    {
      id: 4,
      title: "Gümüş Saat",
      description: "Gümüş renkli el saati, üzerinde küçük bir kazıma var.",
      imageUrl: "https://example.com/image4.png",
      isIDCategory: false,
      idNumber: ""
    },
    {
      id: 5,
      title: "Yeşil Kitap",
      description: "Yeşil kapaklı bir kitap, 'Felsefenin Kısa Tarihi' yazıyor.",
      imageUrl: "https://example.com/image5.png",
      isIDCategory: false,
      idNumber: ""
    }
  ];


  const handleSubmit = () => {
    console.log("Kayıp Eşya Kaydedildi:", description, isIDCategory);
  }

  useEffect(() => {
    // API'den kayıp eşyaları çekmek için kullanılabilir.
    // Şimdilik statik veri kullanıyoruz.
    setLostItems(sampleLostItems);
  }, []);



  const itemFound = () => {
    setFoundModalVisible(false);
  }

  const itemEdit = () => {
    setEditModalVisible(false);
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.safeArea}
  >
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.heading}>Tüm İşlemler</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {lostItems.map((item) => (
            <Card key={item.id} style={styles.itemCard}>
              {item.imageUrl && <Card.Cover source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode='contain' />}
              <Card.Content>
                <Title style={styles.itemDescription}>{item.description}</Title>
              </Card.Content>
              <View style={styles.buttonContainer}>

                <Button
                  mode="contained"
                  onPress={() => { setEditItem(item); setEditModalVisible(true); setIsIDCategory(item.isIDCategory); setIdNumber(item.idNumber)}}
                  style={[styles.statusButton, styles.lostButton]}
                >
                  Düzenle
                </Button>
                <Button
                  mode="contained"
                  onPress={() => { setFoundItem(item); setFoundModalVisible(true); setDescription(item.description)}}
                  style={[styles.statusButton, styles.foundButton]}
                >
                  Bulundu
                </Button>
              </View>
            </Card>
          ))}
        </ScrollView>
        <Modal
          visible={editModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>Kayıp Eşya Düzenle</Text>
              <TextInput
                label="Eşya Tanımı"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                multiline
                maxLength={100}
                numberOfLines={2}
                style={styles.textInput}
                right={<TextInput.Affix text={`${description.length}/100`} />}
              />

              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Kategori Seçiniz</Text>
                <RNPickerSelect
                value= {isIDCategory}
                  onValueChange={(value) => setIsIDCategory(value)}
                  items={[
                    { label: 'ID', value: true },
                    { label: 'Diğer', value: false },
                  ]}
                  style={pickerSelectStyles}
                />
              </View>

              {isIDCategory && (
                <TextInput
                  label="Kimlik Bilgisi"
                  value={idNumber}
                  onChangeText={setIdNumber}
                  mode="outlined"
                  style={styles.textInput}
                />
              )}

              <View style={styles.buttonContainer}>
                <Button onPress={handleSubmit} mode="contained" style={styles.reportButton}>
                  Bildir
                </Button>

              </View>

            </View>
          </View>
        </Modal>

        <Modal
          visible={foundModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setFoundModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>Bulundu olarak işaretleyeceksiniz. Bu işlem geri alınamaz</Text>

              <Button
                mode="contained"
                onPress={() => { itemFound() }}
              >
                Bulundu
              </Button>


            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
    </KeyboardAvoidingView>

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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Butonlar arasında eşit boşluk bırak
    padding: 10,
  },
  statusButton: {
    flex: 1, // Her iki buton da eşit genişlikte olacak
    marginHorizontal: 5, // Butonlar arasında boşluk
  },
  foundButton: {
    backgroundColor: 'green', // Bulundu butonu için yeşil renk
  },
  lostButton: {
    backgroundColor: 'red', // Kayıp butonu için kırmızı renk
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
