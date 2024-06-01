import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

const initialAttendance = [
  { code: 'CS101', week: 1, attendance: 1 },
  { code: 'CS101', week: 2, attendance: 0 },
  { code: 'CS101', week: 3, attendance: 1 },
  { code: 'CS101', week: 4, attendance: 0 },
  { code: 'CS101', week: 5, attendance: 0 },
  // Devam eden haftalar için initialAttendance'ı gerektiği şekilde genişletebilirsiniz.
];

const CourseAttendanceScreen = () => {
  const route = useRoute();
  const { course } = route.params;
  const [attendanceWeeks, setAttendanceWeeks] = useState(initialAttendance);
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [currentWeek, setCurrentWeek] = useState(5);

  useEffect(() => {
    const fetchAttendance = async () => {
      const storedAttendance = await loadAttendanceFromStorage();
      const courseAttendance = storedAttendance[course.code] || initialAttendance;
      setAttendanceWeeks(courseAttendance);
    };

    fetchAttendance();
  }, []);

  const saveAttendanceToStorage = async (newAttendance) => {
    try {
      const storedAttendance = await loadAttendanceFromStorage();
      storedAttendance[course.code] = newAttendance;
      const jsonValue = JSON.stringify(storedAttendance);
      await AsyncStorage.setItem('@attendance_list', jsonValue);
    } catch (e) {
      console.error("Error saving attendance to storage", e);
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

  const generateCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(randomCode);
  };

  const handleAttendance = async () => {
    if (code.length !== 6) {
      Alert.alert('Hatalı Kod', 'Lütfen 6 haneli bir kod girin.');
      return;
    }

    if (code === generatedCode) {
      const newAttendanceWeeks = attendanceWeeks.map(item =>
        item.week === currentWeek ? { ...item, attendance: 1 } : item
      );
      setAttendanceWeeks(newAttendanceWeeks);
      await saveAttendanceToStorage(newAttendanceWeeks);
      setCode('');
      Keyboard.dismiss(); // Klavyeyi kapat
    } else {
      Alert.alert('Hatalı Kod', 'Girdiğiniz kod hatalı. Lütfen tekrar deneyin.');
    }
  };

  const attendanceRate = () => {
    const attended = attendanceWeeks.filter(item => item.attendance === 1).length;
    return `${attended}/${currentWeek}`;
  };

  return (
    
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.heading}>{course.code}</Text>
        <Text style={styles.subHeading}>{course.name}</Text>
        <Text style={styles.attendanceRate}>Yoklama Oranı: {attendanceRate()}</Text>
        <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
        <FlatList
          data={attendanceWeeks}
          renderItem={({ item }) =>
            item.week === currentWeek ? (
              item.attendance === 1 ? (
                <View style={styles.weekContainer}>
                  <Text style={styles.weekText}>Hafta {item.week}: Geldi</Text>
                </View>
              ) : (
                <View style={styles.weekContainer}>
                  <Text style={styles.weekText}>Hafta {item.week}: </Text>
                  <TextInput
                    style={styles.codeInput}
                    placeholder="Yoklama Kodu Gir"
                    value={code}
                    onChangeText={setCode}
                    keyboardType="numeric"
                    maxLength={6}
                  />
                  <TouchableOpacity style={styles.submitButton} onPress={handleAttendance}>
                    <Text style={styles.buttonText}>Onayla</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <View style={styles.weekContainer}>
                <Text style={styles.weekText}>
                  Hafta {item.week}: {item.attendance === 1 ? 'Geldi' : 'Gelmedi'}
                </Text>
              </View>
            )
          }
          keyExtractor={(_, index) => index.toString()}
        />
        </KeyboardAvoidingView>
        <View style={styles.generateCodeContainer}>
          <TouchableOpacity style={styles.generateCodeButton} onPress={generateCode}>
            <Text style={styles.buttonText}>Kod Üret</Text>
          </TouchableOpacity>
          {generatedCode && <Text style={styles.generatedCodeText}>Kod: {generatedCode}</Text>}
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  attendanceRate: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
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
  weekText: {
    fontSize: 16,
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
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  generateCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  generateCodeButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  generatedCodeText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#000',
  },
});

export default CourseAttendanceScreen;
