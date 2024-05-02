import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Snackbar, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../design/themes';
import RNPickerSelect from 'react-native-picker-select';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);


  const handleSignUp = () => {
    // Kayıt işlemleri burada gerçekleştirilir
    console.log('Kayıt başarılı!');
  };
  const schools = [
    { label: 'Okul 1', value: 'Okul 1' },
    { label: 'Okul 2', value: 'Okul 2' },
    { label: 'Okul 3', value: 'Okul 3' },
  ];
  return (
    <View style={styles.container}>
      {/* Logo ve uygulama adı */}
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>Uygulama Adı</Text>

      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={schools}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
        }}
        placeholder={{
          label: 'Bir okul seçin...',
          value: null,
        }}
        value={schools}
      />
      {/* <Picker
        selectedValue={schools}
        onValueChange={(itemValue, itemIndex) => setSchool(itemValue)}
        style={[styles.input]}
      >
        {schools.map((school, index) => (
          <Picker.Item key={index} label={school.label} value={school.value} />
        ))}
      </Picker> */}

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        theme={{ colors: { primary: colors.primary } }}
        keyboardType="email-address"
      />
      
      <TextInput
        label="İsim"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
        theme={{ colors: { primary: colors.primary } }}
      />
      <TextInput
        label="Soyisim"
        value={surname}
        onChangeText={text => setSurname(text)}
        style={styles.input}
        theme={{ colors: { primary: colors.primary } }}
      />
      <TextInput
        label="Öğrenci Numarası"
        value={studentId}
        onChangeText={text => setStudentId(text)}
        style={styles.input}
        theme={{ colors: { primary: colors.primary } }}
        keyboardType="numeric"
      />
      <TextInput
        label="Parola"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={!showPassword}
        style={styles.input}
        selectionColor= {colors.primary}
        activeUnderlineColor= {colors.primary}
        theme={{ colors: { primary: 'blue' } }}
        right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} color= {colors.primary} onPress={() => setShowPassword(!showPassword)} />}

      />
      <Button
        mode="contained"
        onPress={handleSignUp}
        style={styles.button}
        buttonColor={colors.primary}
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

      {/* Giriş sayfasına yönlendirme butonu */}
      <View style={styles.textContainer}>
      <Text style={styles.signupButtonText}>Hesabın yok mu? {'\u00A0'}</Text>
      <Button
        onPress={() => navigation.navigate('sign-up')}
        labelStyle={styles.signupButtonText}
        buttonColor= {colors.secondary}
      >
         Kayıt Ol
      </Button>
      </View>

      {/* Developer Team bilgisi */}
      <Text style={styles.developerText}>Developed by Developer Team</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color :"red",
    
  },
  logo: {
    width: 100,
    height: 100,
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
    backgroundColor: colors.text,
    borderRadius : 8,
    
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  signupButtonText: {
    color: colors.primary,
  },
  developerText: {
    position: 'absolute',
    bottom: 16,
    color: colors.text,
  },
});

export default SignUp;