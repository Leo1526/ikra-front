import React, { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TextInput, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from "react-native-picker-select";
import { colors } from "../../design/themes";

const createAnnouncementScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [announcementType, setAnnouncementType] = useState(null);
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!imageUri) {
      alert("Lütfen bir fotoğraf yükleyin!");
      return;
    }
    if (!announcementType) {
      alert("Lütfen bir kategori seçin!");
      return;
    }
    if (!communityName) {
      alert("Lütfen isim girin!");
      return;
    }
    if (!description) {
      alert("Lütfen açıklama girin!");
      return;
    }

    const newAnnouncement = { imageUri, communityName, description };

      const storageKey = announcementType === 'community' ? '@announcements_list' : '@department_announcements_list';
      const storedAnnouncements = await AsyncStorage.getItem(storageKey);
      const announcementsList = storedAnnouncements ? JSON.parse(storedAnnouncements) : [];
      announcementsList.push(newAnnouncement);
      await AsyncStorage.setItem(storageKey, JSON.stringify(announcementsList));
      alert("Duyuru başarıyla eklendi!");

      // Input alanlarını sıfırla
      setImageUri(null);
      setAnnouncementType(null);
      setCommunityName("");
      setDescription("");

      navigation.navigate(announcementType === 'community' ? 'commAnno' : 'depAnno');
    
  };

  const handleChoosePhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
              <Card.Title title="Duyuru Yap" titleStyle={styles.cardTitle} />
              <Card.Content>
                <Button
                  onPress={handleChoosePhoto}
                  mode="contained"
                  style={styles.uploadButton}
                >
                  Fotoğraf Yükle
                </Button>
                {imageUri && (
                  <Card.Cover
                    source={{ uri: imageUri }}
                    resizeMode="contain"
                    style={styles.imageStyle}
                  />
                )}

                <View style={styles.pickerContainer}>
                  <Text style={styles.pickerLabel}>Duyuru Tipi</Text>
                  <RNPickerSelect
                    onValueChange={(value) => setAnnouncementType(value)}
                    items={[
                      { label: "Topluluk", value: 'community' },
                      { label: "Departman", value: 'department' },
                    ]}
                    style={pickerSelectStyles}
                    placeholder={{ label: "Seçiniz", value: null }}
                  />
                </View>

                <TextInput
                  label="İsim"
                  value={communityName}
                  onChangeText={setCommunityName}
                  mode="outlined"
                  maxLength={30}
                  style={styles.textInput}
                  right={<TextInput.Affix text={`${communityName.length}/30`} />}
                />

                <TextInput
                  label="Açıklama"
                  value={description}
                  onChangeText={setDescription}
                  mode="outlined"
                  multiline
                  maxLength={150}
                  numberOfLines={3}
                  style={styles.textInput}
                  right={<TextInput.Affix text={`${description.length}/150`} />}
                />

                <View style={styles.buttonContainer}>
                  <Button
                    onPress={handleSubmit}
                    mode="contained"
                    style={styles.reportButton}
                  >
                    Duyur
                  </Button>
                </View>
              </Card.Content>
            </Card>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    marginVertical: 10, // Üst ve alt boşluk için
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    padding: 16,
    backgroundColor: colors.background,
  },
  reportButton: {
    backgroundColor: colors.primary,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: colors.primary,
  },
  card: {
    width: "90%",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "normal",
    color: colors.primary,
  },
  textInput: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
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
    borderColor: "gray",
    borderRadius: 20,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
    backgroundColor: colors.primary,
  },
});

export default createAnnouncementScreen;
