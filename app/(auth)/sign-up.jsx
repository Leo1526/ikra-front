import React, { useState, useEffect  } from 'react';
import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, Text, ActivityIndicator } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { colors, text } from '../../design/themes';
import { ikraAxios, urlDev, url } from '../common';
import { API_BASE_URL } from '../../constants/constants';
import PinInput from '../../components/PinInput';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('')
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigation = useNavigation();
  const [departmentSelectbox, setDepartmentSelectBox] = useState(true);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [miniLoading, setMiniLoading] = useState(false);
  const [departments, setDepartments] = useState([])

  const [mailExts, setMailExts] = useState([])
  const [mailExtension, setMailExtension] = useState('')

  const schoolSuccessHandler = (data) => {
    var newSchools = []
    var mails = []
    const schoolsResponse = data.body
    schoolsResponse.forEach(element => {
      school = {
        label: element.name,
        value: element.id,
      }
      newSchools.push(school)
      mails.push({id: element.id, mailExt: element.mailExt})
    });
    setMailExts(mails)
    setSchools(newSchools)
    setLoading(false)
  }

  departmentSuccessHandler = (data) => {
    var newDepartments = []
    const departmentsResponse = data.body
    departmentsResponse.forEach(element => {
      bolum = {
        label: element.name,
        value: element.id
      }
      newDepartments.push(bolum)
    });
    setDepartments(newDepartments)
    setMiniLoading(false)
  }


  const fetchDepartments = () => {
    if (university) {
      ikraAxios({
        url: urlDev + '/universities/departments/all?universityId=' + university,
        method: 'GET',
        onSuccess: departmentSuccessHandler,
        tokenRequired: false,
        setLoading: setMiniLoading
      });
    }
  }

  useEffect(() => {
    const fetchSchools = () => {
      ikraAxios({
        url: urlDev + '/universities/all',
        method: 'GET',
        onSuccess: schoolSuccessHandler,
        setLoading: setLoading,
        onError: (error) => {
          console.error('Error fetching schools:', error);
          setLoading(false);
          alert("Okulları getirilirken hata oluştu!")
        },
        tokenRequired: false
      });
    };
    fetchSchools();
  }, []);

  const handleRegisterSuccess = (data) => {
    if (data.status === "SUCCESS") {
      alert("Kayıt başarılı! Lütfen mail adresinizi kontrol edin.")
      setLoading(false)
      navigation.navigate('sign-in')
      return
    }
    alert("Hata! " + data?.messages[0] ? data.messages[0] : "")
    return;
  }
  const handleRegisterError = (data) => {
    setLoading(false) 
    console.log(data)
    alert("Kayıt bilinmeyen hata oluştu!" + data?.messages[0] ? data.messages[0] : "")
  }
  const handleSignUp = async () => {
    const url = urlDev + '/register';
    console.log(url)
    const payload = {
      universityId: university,
      departmentId: department,
      studentNo: studentId,
      email: email,
      firstname: name,
      lastname: surname,
      password: password
    };
    if (validateSignUpForm(payload)) {
      return false;
    }
    try {
      console.log("istek atılmak üzere")
      ikraAxios({url: url, data: payload, 
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        tokenRequired: false,
        onSuccess:handleRegisterSuccess,
        onError:handleRegisterError,
        setLoading: setLoading
      });
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
      setSnackbarVisible(true);
    }
  };
  const validateSignUpForm = (form) => {
    setLoading(false)
    if (!form.universityId) {
      alert("Lütfen üniversite seçiniz.")
      return true
    }
    if (!form.departmentId) {
      alert("Lütfen bölümünüzü seçiniz.")
      return true
    }
    if (!form.studentNo) {
      alert("Lütfen okul numaranızı giriniz.")
      return true
    }
    if (!form.email) {
      alert("Lütfen email adresinizi giriniz.")
      return true
    }
    else {
      const ext = form.email.slice(form.email.indexOf("@") + 1);
      console.log(ext)
      console.log(mailExtension)
      if (mailExtension != ext) {
        alert("Mail adresi uzantısı ve okul uyuşmuyor.")
        return true
      }
    }
    if (!form.firstname) {
      alert("Lütfen adınızı giriniz.")
      return true;
    }
    if (!form.lastname) {
      alert("Lütfen soyadınızı giriniz.")
      return true;
    }
    if (password < 8) {
      alert("Parola en az 8 hane olabilir.")
      return true;
    }
  }
  const handleSchoolSelect = (value) => {
    if (!value) {
      return
    }
    setUniversity(value)
    mailExts.forEach(element => {
      if (value==element.id) {
        setMailExtension(element.mailExt)
      }
    })
    fetchDepartments(value);
  }
 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.safeArea}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          {loading ? (
          <ActivityIndicator />
          ) : (
          <View style={styles.page}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <RNPickerSelect
              onValueChange={(value) => handleSchoolSelect(value)}
              items={schools}
              style={{
                inputIOS: styles.selectBoxInput,
                inputAndroid: styles.selectBoxInput,
              }}
              placeholder={{
                label: 'Okul seçiniz.',
                value: null,
              }}
              value={university}
            />
            {miniLoading ? (
              <ActivityIndicator />
            ) : (
            <RNPickerSelect
              onValueChange={(value) => setDepartment(value)}
              
              items={departments}
              disabled={departments.length === 0}
              style={{
                inputIOS: styles.selectBoxInput,
                inputAndroid: styles.selectBoxInput,
              }}
              placeholder={{
                label: 'Departman seçiniz.',
                value: null,
              }}
              value={department}
            />)}
            <TextInput
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              label="İsim"
              value={name}
              onChangeText={text => setName(text)}
              style={styles.input}
            />
            <TextInput
              label="Soyisim"
              value={surname}
              onChangeText={text => setSurname(text)}
              style={styles.input}
            />
            <TextInput
              label="Öğrenci Numarası"
              value={studentId}
              onChangeText={text => setStudentId(text)}
              style={styles.input}
              keyboardType="numeric"
            />
            {/* <TextInput
              label="Parola"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={!showPassword}
              style={styles.input}
              right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
            /> */}
<PinInput length={6} pinWidth = {50} onPinComplete={(pin) => {console.log('PIN:', pin); setPassword(pin)}} />
<PinInput length={6} pinWidth = {50} labelAlign= {"center"} label = {"Parola Tekrarı"}placeholderText={"TEKRAR"} onPinComplete={(pin) => {console.log('PIN:', pin); setPassword(pin)}} />
            
            <Button
              mode="contained"
              onPress={handleSignUp}
              style={styles.button}
            >
              Kayıt Ol
            </Button>

            <Snackbar
              visible={snackbarVisible}
              onDismiss={() => setSnackbarVisible(false)}
              duration={3000}
              action={{
                label: 'Tamam',
                onPress: () => setSnackbarVisible(false),
              }}
            >
              Kayıt olma işlemi başarısız oldu.
            </Snackbar>

            <View style={styles.textContainer}>
              <Text style={styles.signUpText}>Hesabın var mı? {'\u00A0'}</Text>
              <Button
                onPress={() => navigation.navigate('sign-in')}
                labelStyle={styles.signupButtonText}
                buttonColor={colors.secondary}
              >
                Giriş Yap
              </Button>
            </View>
          </View>)}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
  },
  page: {
    
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
  input: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
    height: 50,
  },
  selectBoxInput: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
    height: 50,
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    marginBottom: 16,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: text.primaryLight,
    fontWeight: 'bold',
  },
  signupText: {
    color: text.primaryDark,
    fontWeight: 'bold',
  },
  developerText: {
    position: 'absolute',
    bottom: 10,
    color: colors.text,
  },
  safeArea: {
    flexGrow: 1,
    backgroundColor: colors.background
  }
});

export default SignUp;