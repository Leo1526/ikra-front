import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback,  Alert, Keyboard, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { colors, text } from '../../design/themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import { ikraAxios, urlDev } from '../common';
import { ActivityIndicator, Button,TextInput } from 'react-native-paper';
import { commonStyle } from '../../design/style';


const CourseAttendanceScreen = () => {
  const route = useRoute();
  const { course } = route.params;
  const [attendanceWeeks, setAttendanceWeeks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [selectedInstructor, setSelectedInstructor] = useState(0);
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
    console.log("fetching location");
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
  };

  const fetchAttendanceLog = async (instructorId) => {
    if (instructorId == 'null') {
      return;
    }
    setSelectedInstructor(instructorId);
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
        "latitude": latitude,
        "longitude": longitude,
        "code": inputCode
      },
      onSuccess: (data) => {
        console.log(data);
        setLoading(false);

        if (data.status != 'ERROR') {
          Alert.alert("Yoklama işlemi başarılı!");
        }
        else {
          Alert.alert(data.messages[0]);
        }

        fetchAttendanceLog(selectedInstructor);
      },
      onError: (error) => {
        console.log("Error creating attendant: ", error)
        setLoading(false);
        Alert.alert("Yoklama işlemi başarısız!", error.message);
      },
    });

    setInputCode("");
    setLoading(false);

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
          <Text style={[commonStyle.textLabel]}>{index + 1}.</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={[commonStyle.generalText, {fontSize: 16, color: text.lightBlack, textAlign: 'center'}]}>{formattedDate}</Text>
          <Text style={[commonStyle.generalText, {fontSize: 14, color: text.darkGray, textAlign: 'center'}]}>{formattedTime}</Text>
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
      <View style={commonStyle.mainContainer}>

        <View style={commonStyle.mainContainer}>
          {loading ? (<ActivityIndicator></ActivityIndicator>) :
            (
              <View style={styles.mainContainer}>
                <Text style={[commonStyle.textLabel, {fontSize: 28, marginBottom: 10, textAlign: 'center'}]}>{course.courseCode}</Text>
                <Text style={[commonStyle.generalText, {fontSize: 22, marginBottom: 20, textAlign: 'center', color: colors.primary}]}>{course.name}</Text>

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
                    ListEmptyComponent={() => (
                      <View style={styles.emptyContainer}>
                        <Text style={[commonStyle.generalText, {color: text.darkGray, fontSize: 16}]}>Daha önce yoklama alınmadı.</Text>
                      </View>
                    )}
                  />
                </KeyboardAvoidingView>

                <Button
                  style={[commonStyle.secondaryButton, { width: "90%", bottom: 15, alignSelf: "center" }]} // Stilleri bir dizi içinde birleştir
                  labelStyle={commonStyle.secondaryButtonLabel}
                  onPress={() => setModalVisible(true)}
                >
                  Yoklama Ver
                </Button>
              </View>
            )
          }
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={commonStyle.modalOverlay}>
                <TouchableWithoutFeedback onPress={() => { }}>
                  <View style={commonStyle.modalContent}>
                    <TextInput
                      style={commonStyle.modalInput}
                      placeholder="6 haneli kodu girin"
                      value={inputCode}
                      onChangeText={setInputCode}
                      keyboardType="numeric"
                      maxLength={6}
                    />
                    <Button style={commonStyle.secondaryButton} labelStyle={commonStyle.secondaryButtonLabel} onPress={handleAttendance}>
                      Onayla
                    </Button>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  mainContainer: {
    width: "100%",
    height: "100%",

  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center'
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
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
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
