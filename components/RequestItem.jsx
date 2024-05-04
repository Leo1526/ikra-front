import React, { useState } from 'react';
import { View, Image, Button, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const RequestComponent = () => {
  const [imageUri, setImageUri] = useState(null);
  const [requestText, setRequestText] = useState('');
  const [options, setOptions] = useState(['', '']);

  const pickImage = async () => {
    // Burada bir resim seçme işlevi ekleyin
    // Örneğin react-native-image-picker kullanabilirsiniz
    // setImageUri ile seçilen resmin URI'sini güncelleyin
    console.log("Resim seçme fonksiyonu burada olacak.");
  };

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button title="Resim Yükle" onPress={pickImage} />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        
        <TextInput
          label="Talep Metni"
          value={requestText}
          onChangeText={setRequestText}
          style={styles.input}
        />

        {options.map((option, index) => (
          <TextInput
            key={index}
            label={`Şık ${index + 1}`}
            value={option}
            onChangeText={(text) => updateOption(index, text)}
            style={styles.input}
          />
        ))}

        <Button
          title="+ Şık Ekle"
          onPress={handleAddOption}
          disabled={options.length >= 5}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20
  },
  input: {
    marginTop: 20
  }
});

export default RequestComponent;
