import React, { useState } from 'react';
import { View, Image, Button, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Card, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { colors, fonts } from '../../design/themes'; // Gerekli renkler ve yazı tipleri

const RequestComponent = () => {
  const [imageUri, setImageUri] = useState(null);
  const [requestText, setRequestText] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Uygulamanın fotoğraflarınıza erişimi olması gerekiyor!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.1,
    });

    if (!pickerResult.cancelled) {
      const myUri = pickerResult.assets[0].uri;
      console.log("file address: ",myUri);
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

  const handleSubmit = () => {
    // Burada talep gönderme işlemlerini yapabilirsiniz.
    console.log("Talep oluşturuldu:", requestText, options);
    alert("Talep oluşturuldu!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Talep Oluştur" titleStyle={styles.cardTitle} />
        <Card.Content>
          {imageUri && <Card.Cover source={{ uri: imageUri }} resizeMode='contain'/>}
          <Button onPress={handleChoosePhoto} title="Fotoğraf Yükle" color={colors.primary} />
          <TextInput
            label="Talep Metni"
            value={requestText}
            onChangeText={text => setRequestText(text)}
            mode="outlined"
            style={styles.textInput}
          />
          {options.map((option, index) => (
            <View key={index} style={styles.optionContainer}>
              <TextInput
                label={`Seçenek ${index + 1}`}
                value={option}
                onChangeText={text => {
                  const newOptions = [...options];
                  newOptions[index] = text;
                  setOptions(newOptions);
                }}
                mode="outlined"
                style={styles.optionInput}
              />
              {index > 1 && (
                <IconButton
                  icon="delete"
                  onPress={() => removeOption(index)}
                  color={colors.error}
                  style={styles.deleteButton}
                />
              )}
            </View>
          ))}
          {options.length < 5 && <Button disabled={options.length >= 5} onPress={addOption} title="Seçenek Ekle" color={colors.primary} style={styles.button} />}
          <View style={styles.buttonSeparator} />
          <Button onPress={handleSubmit} title="Talep Oluştur" color={colors.primary} style={styles.button} />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
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
  textInput: {
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionInput: {
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: 'transparent',
  },
  button: {
    marginBottom: 10,
  },
  buttonSeparator: {
    height: 10,
  },
});

export default RequestComponent;
