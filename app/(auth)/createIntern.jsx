import React, { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TextInput, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../design/themes";
import { urlDev, ikraAxios } from '../common';

const AddInternshipScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [positionName, setPositionName] = useState("");
  const [departmentIds, setDepartmentIds] = useState([]);
  const [applicationLink, setApplicationLink] = useState("");
  const [description, setDescription] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");

  const handleSubmit = async () => {
    if (!companyName || !companyWebsite || !positionName || !applicationLink || !description || !applicationDeadline) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const newInternship = {
      companyId: null,
      companyName,
      companyWebsite,
      name: companyWebsite,
      departmentIds,
      applicationLink,
      file: null,
      description,
      applicationDeadline,
    };

    try {
      await ikraAxios({
        url: urlDev + "/jobs",
        method: "POST",
        data: {
            "companyId": null,
            "companyName": companyName,
            "companyWebsite": companyWebsite,
            "name": positionName,
            "departmentIds": [2],
            "applicationLink": applicationLink,
            "file": null,
            "description": description,
            "applicationDeadline": applicationDeadline
          },
        onSuccess: (response) => {
          console.log("Staj ilanı başarıyla oluşturuldu:", response);
          alert("Staj ilanı başarıyla oluşturuldu!");
          // Input alanlarını sıfırla
          setCompanyName("");
          setCompanyWebsite("");
          setPositionName("");
          setDepartmentIds([]);
          setApplicationLink("");
          setDescription("");
          setApplicationDeadline("");
          setImageUri(null);

        },
        onError: (error) => {
          console.error("Staj ilanı oluşturulamadı:", error);
          alert("Staj ilanı oluşturulamadı!");
        },
      });
    } catch (e) {
      console.error("Error creating internship announcement", e);
    }
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
              <Card.Title title="Staj İlanı Yarat" titleStyle={styles.cardTitle} />
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

                <TextInput
                  label="Şirket Adı"
                  value={companyName}
                  onChangeText={setCompanyName}
                  mode="outlined"
                  style={styles.textInput}
                />

                <TextInput
                  label="Şirket Websitesi"
                  value={companyWebsite}
                  onChangeText={setCompanyWebsite}
                  mode="outlined"
                  style={styles.textInput}
                />

                <TextInput
                  label="Pozisyon Adı"
                  value={positionName}
                  onChangeText={setPositionName}
                  mode="outlined"
                  style={styles.textInput}
                />

                <TextInput
                  label="Başvuru Linki"
                  value={applicationLink}
                  onChangeText={setApplicationLink}
                  mode="outlined"
                  style={styles.textInput}
                />

                <TextInput
                  label="Açıklama"
                  value={description}
                  onChangeText={setDescription}
                  mode="outlined"
                  multiline
                  style={styles.textInput}
                />

                <TextInput
                  label="Son Başvuru Tarihi"
                  value={applicationDeadline}
                  onChangeText={setApplicationDeadline}
                  mode="outlined"
                  style={styles.textInput}
                />

                <View style={styles.buttonContainer}>
                  <Button
                    onPress={handleSubmit}
                    mode="contained"
                    style={styles.reportButton}
                  >
                    Gönder
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
});

export default AddInternshipScreen;
