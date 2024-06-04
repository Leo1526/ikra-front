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
import { Card, Title, Button, TextInput, IconButton, Divider } from "react-native-paper";
import { colors } from "../../design/themes";
import { ikraAxios, urlDev } from "../common";


import { MaterialIcons } from '@expo/vector-icons'; // Kamera ikonu için
import { useNavigation } from '@react-navigation/native';


const MyLostItemsPage = ({navigation}) => {

  
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
            source={{ uri: `data:${item.file.mimeType};base64,${item.file.bytes}` }}
            style={styles.itemImage}
            resizeMode="contain"
          />
        </View>
      )}
      <Card.Content>
        {item.claims.length > 0 && (
          <View style={styles.notificationContainer}>
            <IconButton
              icon="bell"
              color={colors.primary}
              size={25}
              onPress={() => handleClaimsIconPress(item.claims)}
            />
            <Text style={styles.claimCount}>({item.claims.length})</Text>
          </View>
        )}
        <Title style={styles.itemDescription}>{item.description}</Title>
        {item.lostAndFoundType === "ID_KNOWN" && (
          <Text style={styles.itemOwnerInfo}>Kime ait: {item.ownerInfo}</Text>
        )}
      </Card.Content>
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
          style={[styles.statusButton, styles.lostButton]}
        >
          Düzenle
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            setFoundItem(item);
            setFoundModalVisible(true);
          }}
          style={[styles.statusButton, styles.foundButton]}
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
          <Button
            mode="contained"
            onPress={() => navigation.navigate('createLostItem')}
            style={styles.myItemsButton}
          >
            <MaterialIcons name="inbox" size={30} color={colors.primary} />
          </Button>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.heading}>Benim Kayıp Eşya İlanlarım</Text>
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
                  <Text style={styles.loadMoreButtonText}>Tümünü Gör...</Text>
                </TouchableOpacity>
              )
            }
          />
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
                  style={styles.textInput}
                  right={<TextInput.Affix text={`${description.length}/100`} />}
                />

                {lostAndFoundType === "ID_KNOWN" && (
                  <TextInput
                    label="Kimlik Bilgisi"
                    value={ownerInfo}
                    onChangeText={setOwnerInfo}
                    mode="outlined"
                    style={styles.textInput}
                  />
                )}

                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => setEditModalVisible(false)}
                    mode="outlined"
                    style={styles.cancelButton}
                  >
                    Vazgeç
                  </Button>
                  <Button
                    onPress={handleUpdate}
                    mode="contained"
                    style={styles.reportButton}
                  >
                    Bildir
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
                  Eşya bulundu olarak işaretlenecek ve ilan silinecek. Bu işlem
                  geri alınamaz emin misiniz?
                </Text>

                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => setFoundModalVisible(false)}
                    mode="outlined"
                    style={styles.cancelButton}
                  >
                    Vazgeç
                  </Button>

                  <Button
                    mode="contained"
                    onPress={() => {
                      handleDelete();
                    }}
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
                <Text style={[styles.modalHeading, styles.centeredHeading]}>Talepler</Text>
                {selectedClaims.map((claim) => (
                  <View key={claim.id} style={styles.claimItem}>
                    <Text style={styles.claimLabel}>İletişim:</Text>
                    <Text style={styles.claimInfo}>{claim.contactInfo}</Text>
                    <Text style={styles.claimLabel}>Açıklama:</Text>
                    <Text style={styles.claimInfo}>{claim.description}</Text>
                  </View>
                ))}
                <Button
                  onPress={() => setClaimsModalVisible(false)}
                  mode="contained"
                  style={styles.closeButton}
                >
                  Kapat
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
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
  },
  centeredHeading: {
    textAlign: 'center',
  },
  itemImage: {
    height: 200,
    width: '100%',
  },
  itemDescription: {
    fontSize: 18,
    marginBottom: 8,
  },
  itemOwnerInfo: {
    fontSize: 16,
    color: colors.text,
    marginTop: 4,
    fontWeight: "bold",
  },
  filterButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  filterButtonText: {
    color: colors.text,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginRight: 10,
    marginBottom: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  statusButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  foundButton: {
    backgroundColor: "green",
  },
  lostButton: {
    backgroundColor: "red",
  },
  textInput: {
    marginBottom: 16,
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
  loadMoreButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  closeButton: {
    marginTop: 10,
  },
  claimItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  claimLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  claimInfo: {
    fontSize: 16,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  claimCount: {
    marginLeft: 5,
    fontSize: 16,
    color: colors.primary,
  },
  divider: {
    marginVertical: 10,
    backgroundColor: colors.text,
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  myItemsButton: {
    backgroundColor: colors.secondary,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "flex-start",
    alignItems: 'center'

  },
});



export default MyLostItemsPage;
