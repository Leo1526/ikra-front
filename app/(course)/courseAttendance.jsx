import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, Keyboard, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { colors } from '../../design/themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import { ikraAxios, urlDev } from '../common';
import { ActivityIndicator } from 'react-native-paper';

const CourseAttendanceScreen = () => {
  const route = useRoute();
  const { course } = route.params;
  const [attendanceWeeks, setAttendanceWeeks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Konum izni reddedildi!');
        return;
      }
    })();

    fetchLocation();

  }, []);

  const fetchLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
  };

  const fetchAttendanceLog = async (instructorId) => {
    if (instructorId == 'null') {
      return;
    }
    await ikraAxios({
      url: `${urlDev}/attendant/studentAttendanceLog?courseId=${course.id}&instructorId=${instructorId}`,
      onSuccess: (data) => {
        setAttendanceWeeks(data.body);
      },
      onError: (error) => {
        console.error('Error fetching attendance data:', error);
      },
    });
  };

  const handleAttendance = async () => {
    setLoading(true);
    setModalVisible(false);

    
    
    await ikraAxios({
      url: `${urlDev}/attendant`,
      method: 'POST',
      data: {
        "courseId": course.id,
        "latitude": location.coords.latitude,
        "longitude": location.coords.longitude,
        "code": inputCode
      },
      onSuccess: (data) => {
        console.log(data);
        setLoading(false);
        Alert.alert("Yoklama işlemi başarılı!");
      },
      onError: (error) => {
        console.log("Error creating attendant: ", error)
        setLoading(false);
        Alert.alert("Yoklama işlemi başarısız!", error.message);
      },
    });

    setInputCode("");

  };

  const handleSelectInstructor = (value) => {
    fetchAttendanceLog(value);
  };

  const renderAttendanceItem = ({ item, index }) => {
    const attendanceDate = new Date(item.attendance.startTimeStamp);
    const formattedDate = `${attendanceDate.getDate()}.${attendanceDate.getMonth() + 1}.${attendanceDate.getFullYear()}`;
    const formattedTime = `${attendanceDate.getHours()}:${attendanceDate.getMinutes() < 10 ? '0' + attendanceDate.getMinutes() : attendanceDate.getMinutes()}`;

    return (
      <View style={styles.weekContainer}>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{index + 1}.</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.timeText}>{formattedTime}</Text>
        </View>
        {item.hasAttended ? (
          <Icon name="check" size={24} color="green" />
        ) : (
          <Icon name="times" size={24} color="red" />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {
        loading ? (<ActivityIndicator></ActivityIndicator>) :
        (
          <View style={styles.mainContainer}>
            <Text style={styles.heading}>{course.courseCode}</Text>
            <Text style={styles.subHeading}>{course.name}</Text>

            <RNPickerSelect
              onValueChange={handleSelectInstructor}
              items={course.instructors.map(instructor => ({
                label: `${instructor.firstName} ${instructor.lastName}`,
                value: instructor.id,
              }))}
              style={pickerSelectStyles}
              placeholder={{
                label: 'Hoca seçiniz.',
                value: null,
              }}
            />

            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : null}
            >
              <FlatList
                data={attendanceWeeks}
                renderItem={renderAttendanceItem}
                keyExtractor={(item) => item.attendance.id.toString()}
              />
            </KeyboardAvoidingView>
            
            <TouchableOpacity style={styles.attendanceButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>Yoklama Ver</Text>
            </TouchableOpacity>
          </View>
        )
      }
      
      

      

      

      

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalInput}
              placeholder="6 haneli kodu girin"
              value={inputCode}
              onChangeText={setInputCode}
              keyboardType="numeric"
              maxLength={6}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleAttendance}>
              <Text style={styles.buttonText}>Onayla</Text>
            </TouchableOpacity>
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
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#354D73',
  },
  subHeading: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    color: '#354D73',
  },
  selectBoxInput: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  attendanceRate: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  numberContainer: {
    width: 30,
    alignItems: 'center',
  },
  numberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  codeInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  attendanceButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 5,
  },
  modalInput: {
    height: 50,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  generateCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginTop: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputAndroid: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default CourseAttendanceScreen;
