import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Title, Button, TextInput, Divider } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { colors } from "../../design/themes";
import { ikraAxios, urlDev } from "../common";

import { commonStyle } from "../../design/style";

const LostItemsPage = ({ navigation }) => {
  const [claimModalVisible, setClaimModalVisible] = useState(false);
  const [claimLostItemId, setClaimLostItemId] = useState(0);
  const [contactInfo, setContactInfo] = useState("");
  const [claimDescription, setClaimDescription] = useState("");
  const [lostItems, setLostItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [temporaryFilterCategory, setTemporaryFilterCategory] = useState("all");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const size = 5;

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await ikraAxios({
        url: `${urlDev}/lostAndFound/get-all?page=${page}&size=${size}`,
        onSuccess: (data) => {
          setLostItems((prevLostItems) => [...prevLostItems, ...data.body]);
          setPage((prevPage) => prevPage + 1);
        },
        onError: (error) => {
          console.error("Error fetching lost items data:", error);
        },
      });
    } catch (error) {
      console.error("Error in fetchLostItems:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = lostItems.filter((item) => {
    if (filterCategory === "all") return true;
    return item.lostAndFoundType === filterCategory;
  });

  const applyFilter = () => {
    setFilterCategory(temporaryFilterCategory);
    setModalVisible(false);
  };

  const claimButton = (id) => {
    setClaimLostItemId(id);
    setClaimModalVisible(true);
  };

  const sendClaim = async () => {
    if (!contactInfo || !claimDescription) {
      return;
    }
    try {
      await ikraAxios({
        url:
          urlDev +
          "/claim?claimedItemId=" +
          claimLostItemId +
          "&contactInfo=" +
          contactInfo +
          "&description=" +
          claimDescription,
        method: "POST",
        onSuccess: (response) => {
          setClaimLostItemId("");
          setContactInfo("");
          setClaimDescription("");
        },
        onError: (error) => {
          console.error("claim oluşturulamadı:", error);
        },
      });
    } catch (e) {
      console.error("Error creating claim", e);
    }

    setClaimModalVisible(false);
  };

  const renderLostItem = ({ item, index }) => (
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
      <View style={styles.itemContent}>
        <Text style={[{ marginVertical: 8, marginLeft: 8 }]}>
          <Text style={[commonStyle.textLabel]}>Açıklama: </Text>
          <Text style={[commonStyle.generalText, { fontSize: 16 }]}>
            {item.description}
          </Text>
        </Text>
        {item.lostAndFoundType === "ID_KNOWN" && (
          <Text style={[{ marginVertical: 8, marginLeft: 8 }]}>
          <Text style={[commonStyle.textLabel]}>Kime ait: </Text>
          <Text style={[commonStyle.generalText, { fontSize: 16 }]}>
            {item.ownerInfo}
          </Text>
        </Text>
        )}
      </View>
      <Button
        mode="contained"
        onPress={() => claimButton(item.id)}
        style={commonStyle.secondaryButton}
        labelStyle={commonStyle.secondaryButtonLabel}
      >
        Bu eşya bana ait
      </Button>
      {index < lostItems.length - 1 && <Divider style={styles.divider} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Button
            icon="file-document"
            mode="contained"
            onPress={() => navigation.navigate("myLostItems")}
            style={styles.myItemsButton}
          >
            İlanlarım
          </Button>

          <Button
            icon={"filter"}
            mode="contained"
            style={styles.filterButton}
            labelStyle={commonStyle.secondaryButtonLabel}
            onPress={() => setModalVisible(true)}
          >
            Filtrele
          </Button>
        </View>

        <FlatList
          data={filteredItems}
          renderItem={renderLostItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          onEndReached={fetchLostItems}
          onEndReachedThreshold={0.5}
        />
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          onDismiss={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={commonStyle.modalOverlay}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={commonStyle.modalContent}>
                  <Text style={commonStyle.modalHeading}>Filtrele</Text>
                  <RNPickerSelect
                    placeholder={{ label: "Kategori seçiniz...", value: null }}
                    onValueChange={setTemporaryFilterCategory}
                    items={[
                      { label: "Tümü", value: "all" },
                      { label: "Kimlik", value: "ID_KNOWN" },
                      { label: "Kimlik Değil", value: "ID_NOT_KNOWN" },
                    ]}
                    style={pickerSelectStyles}
                  />
                  <Button
                    mode="contained"
                    onPress={applyFilter}
                    style={commonStyle.secondaryButton}
                    labelStyle={commonStyle.secondaryButtonLabel}
                  >
                    Uygula
                  </Button>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          visible={claimModalVisible}
          onRequestClose={() => setClaimModalVisible(false)}
          onDismiss={() => setClaimModalVisible(false)}
          transparent={true}
        >
          <TouchableWithoutFeedback onPress={() => setClaimModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalHeading}>
                    İletişim Bilgisi Giriniz
                  </Text>
                  <TextInput
                    label="İletişim Bilgisi"
                    value={contactInfo}
                    onChangeText={setContactInfo}
                    mode="outlined"
                    style={commonStyle.modalInput}
                  />
                  <Text style={styles.modalHeading}>Açıklama Giriniz</Text>
                  <TextInput
                    label="Açıklama"
                    value={claimDescription}
                    onChangeText={setClaimDescription}
                    mode="outlined"
                    style={commonStyle.modalInput}
                  />

                  <View style={styles.buttonContainer}>
                    <Button
                      onPress={() => setClaimModalVisible(false)}
                      mode="outlined"
                      style={styles.cancelButton}
                      labelStyle={commonStyle.secondaryButtonLabel}
                    >
                      Vazgeç
                    </Button>
                    <Button
                      mode="contained"
                      onPress={sendClaim}
                      disabled={!contactInfo || !claimDescription}
                      style={[
                        { width: undefined, backgroundColor: colors.primary },
                      ]}
                    >
                      Gönder
                    </Button>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </SafeAreaView>
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
  list: {
    width: "100%",
    paddingBottom: 30,
  },
  itemCard: {
    width: "90%",
    marginBottom: 10,
    elevation: 3,
    alignSelf: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  itemImage: {
    height: 200,
    width: "100%",
  },
  itemContent: {
    borderColor: colors.primary,
    padding: 10,
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  cancelButton: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  divider: {
    marginVertical: 10,
    backgroundColor: colors.text,
  },
  myItemsButton: {
    marginLeft: 10,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 115,
  },
  filterButton: {
    marginRight: 10,
    backgroundColor: colors.background,
    borderRadius: 20,
    borderColor: colors.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "space-between",
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
    color: "black",
    paddingRight: 30,
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 15,
  },
});

export default LostItemsPage;
