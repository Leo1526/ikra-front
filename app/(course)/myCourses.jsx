import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const availableCourses = [
  { code: 'CS101', name: 'Computer Science 101' },
  { code: 'MATH201', name: 'Mathematics 201' },
  { code: 'ENG301', name: 'English 301' },
  { code: 'PHY101', name: 'Physics 101' },
  { code: 'CHEM101', name: 'Chemistry 101' },
  { code: 'BIO101', name: 'Biology 101' },
  { code: 'HIST101', name: 'History 101' },
  { code: 'PSY101', name: 'Psychology 101' },
  { code: 'SOC101', name: 'Sociology 101' },
  { code: 'PHIL101', name: 'Philosophy 101' },
  { code: 'ART101', name: 'Art 101' },
  { code: 'MUS101', name: 'Music 101' },
  { code: 'ECON101', name: 'Economics 101' },
  { code: 'BUS101', name: 'Business 101' },
  { code: 'LAW101', name: 'Law 101' },
  { code: 'MED101', name: 'Medicine 101' },
  { code: 'NURS101', name: 'Nursing 101' },
  { code: 'PHARM101', name: 'Pharmacy 101' },
  { code: 'ENGR101', name: 'Engineering 101' },
  { code: 'ARCH101', name: 'Architecture 101' },
];

const MyCoursesScreen = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(availableCourses);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCourses = async () => {
      const storedCourses = await loadCoursesFromStorage();
      setMyCourses(storedCourses);
      filterAvailableCourses(storedCourses);
    };

    fetchCourses();
  }, []);

  const saveCoursesToStorage = async (courses) => {
    try {
      const jsonValue = JSON.stringify(courses);
      await AsyncStorage.setItem('@course_list', jsonValue);
    } catch (e) {
      console.error("Error saving courses to storage", e);
    }
  };

  const loadCoursesFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@course_list');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Error loading courses from storage", e);
      return [];
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      filterAvailableCourses(myCourses);
    } else {
      const filtered = availableCourses.filter(course =>
        course.code.toLowerCase().includes(text.toLowerCase())
      ).filter(course => !myCourses.some(myCourse => myCourse.code === course.code));
      setFilteredCourses(filtered);
    }
  };

  const filterAvailableCourses = (currentCourses) => {
    const filtered = availableCourses.filter(course => 
      !currentCourses.some(myCourse => myCourse.code === course.code)
    );
    setFilteredCourses(filtered);
  };

  const toggleSelectCourse = (course) => {
    if (selectedCourses.some(item => item.code === course.code)) {
      setSelectedCourses(selectedCourses.filter(item => item.code !== course.code));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const addSelectedCourses = async () => {
    const newCourses = selectedCourses.filter(course => !myCourses.some(item => item.code === course.code));
    const updatedCourses = [...myCourses, ...newCourses];
    setMyCourses(updatedCourses);
    await saveCoursesToStorage(updatedCourses);
    setSelectedCourses([]);
    filterAvailableCourses(updatedCourses);
    setModalVisible(false);
  };

  const removeCourse = (course) => {
    Alert.alert(
      "Ders Silinecek",
      "Emin misiniz?",
      [
        { text: "Hayır", onPress: () => {}, style: "cancel" },
        { text: "Evet", onPress: async () => {
          const updatedCourses = myCourses.filter(item => item.code !== course.code);
          setMyCourses(updatedCourses);
          await saveCoursesToStorage(updatedCourses);
          await resetAttendance(course.code);
          filterAvailableCourses(updatedCourses);
        }}
      ]
    );
  };

  const resetAttendance = async (courseCode) => {
    try {
      const storedAttendance = await loadAttendanceFromStorage();
      delete storedAttendance[courseCode];
      const jsonValue = JSON.stringify(storedAttendance);
      await AsyncStorage.setItem('@attendance_list', jsonValue);
    } catch (e) {
      console.error("Error resetting attendance", e);
    }
  };

  const loadAttendanceFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@attendance_list');
      return jsonValue != null ? JSON.parse(jsonValue) : {};
    } catch (e) {
      console.error("Error loading attendance from storage", e);
      return {};
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSearchText('');
    filterAvailableCourses(myCourses);
  };

  const navigateToAttendance = (course) => {
    navigation.navigate('courseAttendance', { course });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.heading}>Derslerim</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => { setModalVisible(true); filterAvailableCourses(myCourses); }}>
        <Text style={styles.buttonText}>Ders Ekle</Text>
      </TouchableOpacity>

      <FlatList
        data={myCourses}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.courseContainer} onPress={() => navigateToAttendance(item)}>
            <Text style={styles.courseText}>{item.code} - {item.name}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeCourse(item)}>
              <Text style={styles.buttonText}>Sil</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.code}
        ListEmptyComponent={<Text style={styles.emptyText}>Henüz ders eklemediniz.</Text>}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchBar}
              placeholder="Ders Kodu Ara"
              value={searchText}
              onChangeText={handleSearch}
            />
            <FlatList
              data={filteredCourses.slice(0, 10)}
              renderItem={({ item }) => (
                <View style={styles.modalCourseContainer}>
                  <View>
                    <Text style={styles.modalCourseCode}>{item.code}</Text>
                    <Text style={styles.modalCourseName}>{item.name}</Text>
                  </View>
                  <TouchableOpacity style={styles.checkbox} onPress={() => toggleSelectCourse(item)}>
                    <Text style={styles.checkboxText}>{selectedCourses.some(course => course.code === item.code) ? '✓' : ''}</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.code}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Vazgeç" onPress={handleCloseModal} />
              <Button title="Ekle" onPress={addSelectedCourses} />
            </View>
          </View>
        </View>
      </Modal>
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
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  courseText: {
    fontSize: 16,
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
    height: '70%'
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalCourseCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCourseName: {
    fontSize: 14,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 18,
    color: '#4CAF50',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default MyCoursesScreen;
