import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { colors } from "../../design/themes";

const DepartmentAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadAnnouncements();
    }
  }, [isFocused]);

  const loadAnnouncements = async () => {
    const storedAnnouncements = await AsyncStorage.getItem(
      "@department_announcements_list"
    );
    const announcementsList = storedAnnouncements
      ? JSON.parse(storedAnnouncements)
      : [];
    setAnnouncements(announcementsList);
  };

  const deleteAnnouncement = async (index) => {
    const updatedAnnouncements = announcements.filter((_, i) => i !== index);
    setAnnouncements(updatedAnnouncements);
    await AsyncStorage.setItem(
      "@department_announcements_list",
      JSON.stringify(updatedAnnouncements)
    );
  };

  const confirmDeleteAnnouncement = (index) => {
    Alert.alert(
      "Duyuru Sil",
      "Bu duyuruyu silmek istediğinizden emin misiniz?",
      [
        { text: "Hayır", style: "cancel" },
        { text: "Evet", onPress: () => deleteAnnouncement(index) },
      ]
    );
  };

  const renderAnnouncement = ({ item, index }) => (
    <View style={styles.card}>
      {item.imageUri && (
        <Image source={{ uri: item.imageUri }} style={styles.imageStyle} />
      )}
      <Text style={styles.communityName}>{item.communityName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDeleteAnnouncement(index)}
      >
        <Text style={styles.buttonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("createAnno")}
        >
          <Text style={styles.buttonText}>Duyuru Ekle</Text>
        </TouchableOpacity>

        <FlatList
          data={announcements}
          renderItem={renderAnnouncement}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  imageStyle: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  communityName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
});

export default DepartmentAnnouncement;
