import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ikraAxios, urlDev } from '../common';
import { commonStyle } from '../../design/style';
const MyCoursesScreen = ({navigate}) => {
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
    const newCourses = [course];
    const updatedCourses = [...myCourses, ...newCourses];

    await ikraAxios({
      url: urlDev + '/savedCourse?courseId=' + course.id,
      method: 'POST',
      onSuccess: (data) => {},
      onError: (error) => {
        console.error('Error adding saved course:', error);
      },
    });

    setMyCourses(updatedCourses);
    setModalVisible(false);
  };

  const removeCourse = (course) => {
    Alert.alert(
      "Ders Silinecek",
      "Emin misiniz?",
      [
        { text: "Hayır", onPress: () => {}, style: "cancel" },
        { text: "Evet", onPress: async () => {
          const updatedCourses = myCourses.filter(item => item.courseCode !== course.courseCode);
          setMyCourses(updatedCourses);
        }}
      ]
    );

    ikraAxios({
      url: urlDev + '/savedCourse?courseId=' + course.id,
      method: 'DELETE',
      onSuccess: (data) => {},
      onError: (error) => {
        console.error('Error adding saved course:', error);
      },
    });
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
<View style = {commonStyle.mainContainer}>

      <Text style={styles.heading}>Derslerim</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleOpenModal}>
        <Text style={styles.buttonText}>Ders Ekle</Text>
      </TouchableOpacity>

      <FlatList
        data={myCourses}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.courseContainer} onPress={() => navigateToAttendance(item)}>
            <Text style={styles.courseText}><Text style={styles.courseCode}>{item.courseCode}</Text>{'\n'}{item.name}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeCourse(item)}>
              <Text style={styles.buttonText}>Sil</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.courseCode}
        ListEmptyComponent={<Text style={styles.emptyText}>Henüz ders eklemediniz.</Text>}
      />

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
                        <Text style={styles.modalCourseCode}>{item.courseCode}</Text>
                        <Text style={styles.modalCourseName}>{item.name}</Text>
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
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
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
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
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
