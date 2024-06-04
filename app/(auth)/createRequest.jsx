import React, { useState } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { TextInput, IconButton, Button, Title } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; // Kamera ikonu için
import { colors, fonts } from '../../design/themes'; // Gerekli renkler ve yazı tipleri
import { commonStyle } from '../../design/style';
import { ikraAxios, urlDev, url } from '../common';

const RequestComponent = () => {
  const [imageUri, setImageUri] = useState(null);
  const [requestText, setRequestText] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [dropdownValue, setDropdownValue] = useState(null);

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Uygulamanın fotoğraflarınıza erişimi olması gerekiyor!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5
    });

    if (!pickerResult.canceled) {
      const myUri = pickerResult.assets[0].uri; // assets dizisinden URI alınır
      console.log("file address: ", myUri);
      setImageUri(myUri);
    }
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const removeOption = index => {
    if (index > 1) { // Sadece 3. şıktan itibaren silinebilir
      const newOptions = options.filter((option, idx) => idx !== index);
      setOptions(newOptions);
    }
  };

  const handleDropdownChange = value => {
    setDropdownValue(value);
    if (value === 'CLASSIC') {
      setOptions(['Katılıyorum', 'Katılmıyorum']);
    } else {
      setOptions(['', '']);
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      "Onay",
      "Talep oluşturma bedeli 5 TL'dir. Onaylıyor musunuz?",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        { text: "Evet", onPress: handleCreateRequest }
      ]
    );
  };

  const handleCreateRequest = async () => {
    const formData = new FormData();
    formData.append('proposal', requestText);
    formData.append('proposalType', dropdownValue);
    options.forEach((option) => {
      formData.append(`options`, option);
    });
    if (imageUri) {
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('file', {
        uri: imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await ikraAxios({
        url: urlDev + "/proposals",
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onSuccess: (data) => {
          console.log("Talep oluşturuldu:", data.body);
          alert("Talep oluşturuldu!");
        },
        onError: (error) => {
          console.error("Talep oluşturulurken hata oluştu:", error);
          alert("Talep oluşturulurken bir hata oluştu.");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>Talep Oluştur</Title>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} resizeMode='contain' />}
        <TouchableOpacity style={styles.photoButton} onPress={handleChoosePhoto}>
          <MaterialIcons name="camera-alt" size={24} color={colors.primary} />
          <Text style={styles.photoButtonText}>Fotoğraf Yükle</Text>
        </TouchableOpacity>
        <TextInput
          label="Talep Metni"
          value={requestText}
          onChangeText={text => setRequestText(text)}
          mode="outlined"
          style={[commonStyle.input, styles.textInput]}
          theme={{ colors: { primary: colors.primary } }}
          labelStyle={styles.textInputLabel}
        />
        <View style={styles.spacer} />
        <RNPickerSelect
          selectedValue={dropdownValue}
          onValueChange={handleDropdownChange}
          items={[
            { label: "Klasik", value: "CLASSIC" },
            { label: "Şıkları ben belirlemek istiyorum", value: "POLL" }
          ]}
          style={pickerSelectStyles}
          placeholder={{
            label: 'Bir seçenek belirleyin',
            value: null,
          }}
        />
        {options.map((option, index) => (
          <View key={index} style={styles.optionContainer}>
            <TextInput
              label={`Seçenek ${index + 1}`}
              value={option}
              onChangeText={text => {
                if (dropdownValue !== 'CLASSIC') {
                  const newOptions = [...options];
                  newOptions[index] = text;
                  setOptions(newOptions);
                }
              }}
              mode="outlined"
              style={commonStyle.input}
              theme={{ colors: { primary: colors.primary } }}
              editable={dropdownValue !== 'CLASSIC'}
            />
            {index > 1 && dropdownValue !== 'CLASSIC' && (
              <IconButton
                icon="delete"
                onPress={() => removeOption(index)}
                color={colors.primary}
                style={styles.deleteButton}
              />
            )}
          </View>
        ))}
        {dropdownValue !== 'CLASSIC' && options.length < 5 && (
          <Button
            mode="outlined"
            onPress={addOption}
            color={colors.primary}
            style={styles.addButton}
            labelStyle={styles.buttonText}
          >
            Seçenek Ekle
          </Button>
        )}
        <Button
          mode="outlined"
          onPress={handleSubmit}
          color={colors.primary}
          style={styles.submitButton}
          labelStyle={styles.buttonText}
        >
          Talep Oluştur
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginBottom: 16,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 16,
  },
  photoButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  textInputLabel: {
    fontSize: 20,
  },
  spacer: {
    height: 20,
  },
  textInput: {
    marginBottom: 16,
    borderColor: colors.primary,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  pickerLabel: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    color: colors.text,
    fontSize: 18,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionInput: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: 'transparent',
  },
  addButton: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '100%',
    height: 50,
    backgroundColor: "#F4F6F8",
    borderRadius: 6,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  inputAndroid: {
    width: '100%',
    height: 50,
    backgroundColor: "#F4F6F8",
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default RequestComponent;
