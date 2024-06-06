import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Title,
  Button,
  TextInput,
  IconButton,
  Divider,
} from "react-native-paper";
import { colors } from "../../design/themes";
import { ikraAxios, urlDev } from "../common";

import { commonStyle } from "../../design/style";

const MyLostItemsPage = ({ navigation }) => {
  const [lostItems, setLostItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [foundModalVisible, setFoundModalVisible] = useState(false);
  const [claimsModalVisible, setClaimsModalVisible] = useState(false);
  const [selectedClaims, setSelectedClaims] = useState([]);
  const [description, setDescription] = useState("");
  const [ownerInfo, setOwnerInfo] = useState("");
  const [lostAndFoundType, setLostAndFoundType] = useState("");
  const [foundItem, setFoundItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [idNumber, setIdNumber] = useState("");

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    try {
      const response = await ikraAxios({
        url: `${urlDev}/lostAndFound/by-user?page=0&size=100`,
        onSuccess: (data) => {
          setLostItems(data.body);
          setDisplayItems(data.body.slice(0, 5));
        },
        onError: (error) => {
          console.error("Error fetching lost items data:", error);
        },
      });
    } catch (error) {
      console.error("Error in fetchLostItems:", error);
    }
  };

  const handleShowAll = () => {
    setDisplayItems(lostItems);
  };

  const handleUpdate = async () => {
    try {
      const response = await ikraAxios({
        url: `${urlDev}/lostAndFound/update?lostAndFoundId=${editItem.id}&lostAndFoundType=${lostAndFoundType}&ownerInfo=${ownerInfo}&description=${description}`,
        method: "PUT",
        onSuccess: (data) => {
          fetchLostItems();
          setEditModalVisible(false);
        },
        onError: (error) => {
          console.error("Error updating lost item:", error);
        },
      });
    } catch (error) {
      console.error("Error in handleUpdate:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await ikraAxios({
        url: `${urlDev}/lostAndFound?lostAndFoundId=${foundItem.id}`,
        method: "DELETE",
        onSuccess: (data) => {
          fetchLostItems();
        },
        onError: (error) => {
          console.error("Error deleting lost item:", error);
        },
      });
    } catch (error) {
      console.error("Error in handleDelete:", error);
    }
    setFoundModalVisible(false);
  };

  const handleClaimsIconPress = (claims) => {
    setSelectedClaims(claims);
    setClaimsModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <View key={item.id} style={styles.itemCard}>
      {item.file && (
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `data:${item.file.mimeType};base64,${item.file.bytes}`,
            }}
            style={styles.itemImage}
            resizeMode="contain"
          />
        </View>
      )}
      <Card.Content>
        <Text style={[{ marginVertical: 8 }]}>
          <Text style={[commonStyle.textLabel]}>Açıklama: </Text>
          <Text style={[commonStyle.generalText, { fontSize: 16 }]}>
            {item.description}
          </Text>
        </Text>
        {item.lostAndFoundType === "ID_KNOWN" && (
          <Text style={[commonStyle.generalText, { marginVertical: 8 }]}>
            <Text style={[commonStyle.textLabel]}>Kime ait: </Text>
            <Text style={[commonStyle.generalText, { fontSize: 16 }]}>
              {item.ownerInfo}
            </Text>
          </Text>
        )}
      </Card.Content>
      {item.claims.length > 0 && (
        <View style={styles.notificationContainer}>
          <Text style={[commonStyle.textLabel, { marginLeft: 6 }]}>
            Talepler ({item.claims.length})
          </Text>
          <IconButton
            icon="bell"
            iconColor={colors.primary}
            size={25}
            onPress={() => handleClaimsIconPress(item.claims)}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => {
            setEditItem(item);
            setEditModalVisible(true);
            setDescription(item.description);
            setLostAndFoundType(item.lostAndFoundType);
            setOwnerInfo(item.ownerInfo);
          }}
          style={[styles.claimButton, { borderColor: colors.secondary }]}
          labelStyle={[commonStyle.generalText, { color: colors.secondary }]}
        >
          Düzenle
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            setFoundItem(item);
            setFoundModalVisible(true);
          }}
          style={[styles.claimButton, { backgroundColor: colors.primary }]}
          labelStyle={[commonStyle.generalText, { color: "white" }]}
        >
          Bulundu
        </Button>
      </View>
      {index < lostItems.length - 1 && <Divider style={styles.divider} />}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.safeArea}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
              }}
            >
              <Text style={styles.heading}>Kayıp Eşya İlanlarım</Text>
            </View>
            <FlatList
              data={displayItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.scrollView}
              ListFooterComponent={() =>
                displayItems.length < lostItems.length && (
                  <TouchableOpacity
                    style={styles.loadMoreButton}
                    onPress={handleShowAll}
                  >
                    <Text style={commonStyle.textLabel}>Tümünü Gör...</Text>
                  </TouchableOpacity>
                )
              }
            />
            <TouchableOpacity
              style={styles.newRequestButton}
              onPress={() => navigation.navigate("createLostItem")}
            >
              <Text style={styles.newRequestButtonText}>+</Text>
            </TouchableOpacity>
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
                    style={[commonStyle.modalInput]}
                    right={
                      <TextInput.Affix text={`${description.length}/100`} />
                    }
                  />

                  {lostAndFoundType === "ID_KNOWN" && (
                    <TextInput
                      label="Kimlik Bilgisi"
                      value={ownerInfo}
                      onChangeText={setOwnerInfo}
                      mode="outlined"
                      style={[commonStyle.modalInput]}
                    />
                  )}

                  <View style={styles.buttonContainer}>
                    <Button
                      onPress={() => setEditModalVisible(false)}
                      mode="outlined"
                      style={[
                        styles.claimButton,
                        { borderColor: colors.secondary },
                      ]}
                      labelStyle={[
                        commonStyle.generalText,
                        { color: colors.secondary },
                      ]}
                    >
                      Vazgeç
                    </Button>
                    <Button
                      onPress={handleUpdate}
                      mode="contained"
                      style={[
                        styles.claimButton,
                        { backgroundColor: colors.primary },
                      ]}
                      labelStyle={[commonStyle.generalText, { color: "white" }]}
                    >
                      Onayla
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
                  <Text style={styles.modalHeading}>
                    Eşya bulundu olarak işaretlenecek ve ilan silinecek. Bu
                    işlem geri alınamaz emin misiniz?
                  </Text>

                  <View style={styles.buttonContainer}>
                    <Button
                      onPress={() => setFoundModalVisible(false)}
                      mode="outlined"
                      style={[
                        styles.claimButton,
                        { borderColor: colors.secondary },
                      ]}
                      labelStyle={[
                        commonStyle.generalText,
                        { color: colors.secondary },
                      ]}
                    >
                      Vazgeç
                    </Button>

                    <Button
                      mode="contained"
                      onPress={() => {
                        handleDelete();
                      }}
                      style={[
                        styles.claimButton,
                        { backgroundColor: colors.primary },
                      ]}
                      labelStyle={[commonStyle.generalText, { color: "white" }]}
                    >
                      Evet
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal
              visible={claimsModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setClaimsModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={[styles.modalHeading, styles.centeredHeading]}>
                    Talepler
                  </Text>
                  <FlatList
                    data={selectedClaims}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.claimItem}>
                        <Text style={commonStyle.textLabel}>İletişim:</Text>
                        <Text style={[commonStyle.generalText, {marginVertical:10}]}>{item.contactInfo}</Text>
                        <Text style={commonStyle.textLabel}>Açıklama:</Text>
                        <Text style={[commonStyle.generalText, {marginVertical:10}]}>{item.description}</Text>
                      </View>
                    )}
                    contentContainerStyle={styles.flatListContentContainer}
                    style={styles.flatList}
                  />
                  <Button
                    onPress={() => setClaimsModalVisible(false)}
                    mode="contained"
                    style={[
                      styles.claimButton,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    Kapat
                  </Button>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    width: "100%",
    paddingBottom: 30,
  },
  itemCard: {
    width: "90%",
    marginBottom: 10,
    elevation: 3,
    alignSelf: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    color: colors.text,
  },
  centeredHeading: {
    textAlign: "center",
  },
  itemImage: {
    height: 200,
    width: "100%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  Container: {
    width: "100%",
    marginBottom: 16,
  },
  loadMoreButton: {
    backgroundColor: colors.background,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
  },
  claimItem: {
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 5,
    padding: 10,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  divider: {
    marginVertical: 10,
    backgroundColor: colors.text,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  newRequestButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  newRequestButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  claimButton: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: colors.background,
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: "500",
    borderColor: colors.primary,
    borderWidth: 1,
  },
  flatList: {
    maxHeight: 300,
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
});

export default MyLostItemsPage;
