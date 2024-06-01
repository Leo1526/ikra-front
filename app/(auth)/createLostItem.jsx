import React, { useState } from 'react';
import { View, StyleSheet,Text, ScrollView, Platform } from 'react-native';
import { TextInput, Card, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { colors, fonts } from '../../design/themes'; // Gerekli renkler ve yazı tipleri

const LostItemComponent = () => {
  const [imageUri, setImageUri] = useState(null);
  const [description, setDescription] = useState('');
  const [isIDCategory, setIsIDCategory] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (!imageUri) {
      alert("Lütfen bir fotoğraf yükleyin!");
      return;
    }
    if (!description) {
      alert("Lütfen eşya tanımı girin!");
      return;
    }
    if (isIDCategory === null) {
      alert("Lütfen bir kategori seçin!");
      return;
    }
  
    // Tüm kontroller geçtiğinde işlemleri burada yap
    console.log("Kayıp Eşya Kaydedildi:", description, isIDCategory);
    alert("Kayıp Eşya başarıyla bildirildi!");
  };

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Uygulamanın fotoğraflarınıza erişimi olması gerekiyor!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!pickerResult.cancelled) {
      setImageUri(pickerResult.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>

      <Card style={styles.card}>
        <Card.Title title="Kayıp Eşya Bildir" titleStyle={styles.cardTitle} />
        <Card.Content>
        <Button onPress={handleChoosePhoto} mode="contained" style={styles.uploadButton}>
  Fotoğraf Yükle
  </Button>{imageUri && <Card.Cover source={{ uri: imageUri }} resizeMode='contain' style={styles.imageStyle} />
            }

            <TextInput
            label="Başlık"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            maxLength={15}
            style={styles.textInput}
            right={<TextInput.Affix text={`${title.length}/15`} />}
            />
            
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
    onValueChange={(value) => setIsIDCategory(value)}
    items={[
      { label: 'ID', value: true },
      { label: 'Diğer', value: false },
    ]}
    style={pickerSelectStyles}
    placeholder={{ label: 'Seçiniz', value: null }}
  />
</View>

          <View style={styles.buttonContainer}>
          <Button onPress={handleSubmit} mode="contained" style={styles.reportButton}>
  Bildir
</Button>

          </View>
        </Card.Content>
      </Card>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    imageStyle: {
        marginVertical: 10, // Üst ve alt boşluk için
      }
,      
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, paddingBottom: 20,
    padding: 16,
    backgroundColor: colors.background,
  },
  reportButton: {
    backgroundColor: colors.primary,
    marginBottom: 10,
  }
,  
  uploadButton: {
    backgroundColor: colors.primary,
  },  
  card: {
    width: '90%',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: colors.primary,
  },
  reportButton: {
    backgroundColor: colors.primary,
  },
  textInput: {
    marginBottom: 16,
  }
,  
  buttonContainer: {
    marginTop: 10,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    color: colors.background,
    marginBottom: 8,
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
    color: colors.text,
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 20,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
    backgroundColor:colors.primary
    

  },
});

export default LostItemComponent;
