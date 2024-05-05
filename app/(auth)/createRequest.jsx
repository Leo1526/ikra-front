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
    // Kullanıcının galerisine erişim izni isteme
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Uygulamanın fotoğraflarınıza erişimi olması gerekiyor!");
      return;
    }
  
    // ImagePicker ile galeriden resim seçme
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!pickerResult.cancelled) {
      myUri = pickerResult.assets[0].uri;
      console.log(myUri);
      setImageUri(myUri);
    }
  };
  
  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const removeOption = index => {
    const newOptions = options.filter((option, idx) => idx !== index);
    setOptions(newOptions);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Create a Request" titleStyle={styles.cardTitle} />
        <Card.Content>
          {imageUri && <Card.Cover source={{ uri: imageUri }} />}
          <Button onPress={handleChoosePhoto} title="Upload Image" color={colors.primary} />
          <TextInput
            label="Request Text"
            value={requestText}
            onChangeText={text => setRequestText(text)}
            mode="outlined"
            style={styles.textInput}
          />
          {options.map((option, index) => (
            <View key={index} style={styles.optionContainer}>
              <TextInput
                label={`Option ${index + 1}`}
                value={option}
                onChangeText={text => {
                  const newOptions = [...options];
                  newOptions[index] = text;
                  setOptions(newOptions);
                }}
                mode="outlined"
                style={styles.optionInput}
              />
              <IconButton
                icon="delete"
                onPress={() => removeOption(index)}
                color={colors.error}
                style={styles.deleteButton}
              />
            </View>
          ))}
          <Button disabled={options.length >= 5} onPress={addOption} title="Add Option" color={colors.primary} />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: colors.background,
    justifyContent:"center"
  },
  card: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
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
});

export default RequestComponent;
