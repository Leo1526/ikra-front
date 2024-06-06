import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ikraAxios, urlDev } from '../common';
import { commonStyle } from '../../design/style';
import { Button, IconButton } from 'react-native-paper';
import { colors } from '../../design/themes';
const MyCoursesScreen = ({ navigate }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetchMyCourses();
    fetchAllCourses();
  }, []);

  const fetchMyCourses = async () => {
    await ikraAxios({
      url: urlDev + '/savedCourse',
      onSuccess: (data) => {
        setMyCourses(data.body);
      },
      onError: (error) => {
        console.error('Error fetching meal data:', error);
      },
    });
  };

  const fetchAllCourses = async () => {
    console.log("fetchAllCourses");
    await ikraAxios({
      url: urlDev + '/courses/universityId',
      onSuccess: (data) => {
        setAllCourses(data.body);
        console.log('Fetched courses:', data.body);
      },
      onError: (error) => {
        console.error('Error fetching courses:', error);
      },
    });
  };

  const addSelectedCourse = async (course) => {
    await ikraAxios({
      url: urlDev + '/savedCourse?courseId=' + course.id,
      method: 'POST',
      onSuccess: (data) => { fetchMyCourses(); console.log(myCourses) },
      onError: (error) => {
        console.error('Error adding saved course:', error);
      },
    });

    setModalVisible(false);
  };

  const removeCourse = (course) => {
    Alert.alert(
      "Ders Silinecek",
      "Emin misiniz?",
      [
        { text: "Hayır", onPress: () => { return}, style: "cancel" },
        {
          text: "Evet", onPress: async () => {

            ikraAxios({
              url: urlDev + '/savedCourse?courseId=' + course.id,
              method: 'DELETE',
              onSuccess: (data) => { fetchMyCourses()},
              onError: (error) => {
                console.error('Error adding saved course:', error);
              },
            });
          }
        }
      ]
    );


  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSearchText('');
  };

  const handleOpenModal = () => {
    setFilteredCourses(allCourses);
    setModalVisible(true);
  };

  const handleSearch = () => {
    filteredCourses.forEach((element) => console.log(element.courseCode));
    const filteredList = allCourses.filter(course =>
      course.courseCode.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredCourses(filteredList);
    console.log('Search clicked, search text:', searchText);
  };

  const navigateToAttendance = (course) => {
    navigation.navigate('attendances', { course });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={commonStyle.mainContainer}>
        <FlatList
          data={myCourses}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.courseContainer} onPress={() => navigateToAttendance(item)}>
              <Text style={styles.courseText}>
                <Text style={[commonStyle.textLabel]}>{item.courseCode}</Text>
                {'\n'}{item.name}
              </Text>
              <IconButton
                icon="trash-can"
                size={24} // İstediğiniz boyutu burada belirleyin
                onPress={() => removeCourse(item)}
                style={styles.removeButton}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.courseCode}
          ListEmptyComponent={<Text style={styles.emptyText}>Henüz ders eklemediniz.</Text>}
        />
        <View style={{ flex: 1, position: "absolute", bottom: 15, width: "90%", alignSelf: "center" }}>
          <Button style={commonStyle.secondaryButton} labelStyle={commonStyle.secondaryButtonLabel} onPress={handleOpenModal}>
            Ders Ekle
          </Button>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.searchContainer}>
                    <TextInput
                      style={styles.searchBar}
                      placeholder="Ders Kodu Ara"
                      value={searchText}
                      onChangeText={setSearchText}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                      <Icon name="search" size={20} color="#000" />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={filteredCourses}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.modalCourseContainer} onPress={() => addSelectedCourse(item)}>
                        <View>
                          <Text style={commonStyle.textLabel}>{item.courseCode}</Text>
                          <Text style={commonStyle.generalText}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.courseCode}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                  />
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
  safeArea: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: colors.listItem,
    borderRadius: 0,
    elevation: 5,
  },
  modalCourseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  courseText: {
    fontSize: 16,
  },
  courseCode: {
    fontWeight: 'bold',
  },
  addButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  removeButton: {
    padding: 3,
  },
  buttonText: {
    color: colors,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#aaa',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    height: '70%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
    padding: 10,
  },

  modalCourseCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCourseName: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 1,
  },
});

export default MyCoursesScreen;
