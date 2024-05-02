import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../design/themes';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = () => {
    console.log('Kayıt başarılı!');
  };

  const schools = [
    { label: 'Okul 1', value: 'Okul 1' },
    { label: 'Okul 2', value: 'Okul 2' },
    { label: 'Okul 3', value: 'Okul 3' },
  ];

  return (
   
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Uygulama Adı</Text>

        <RNPickerSelect
          onValueChange={(value) => setUniversity(value)}
          items={schools}
          style={{
            inputIOS: styles.input,
            inputAndroid: styles.input,
          }}
          placeholder={{
            label: 'Bir okul seçin...',
            value: null,
          }}
          value={university}
        />

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
        <TextInput
          label="Parola"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={!showPassword}
          style={styles.input}
          right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
        />
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
          <Text style={styles.signupButtonText}>Hesabın yok mu? {'\u00A0'}</Text>
          <Button
            onPress={() => navigation.navigate('sign-in')}
            labelStyle={styles.signupButtonText}
            buttonColor={colors.secondary}
          >
            Kayıt Ol
          </Button>
        </View>

        <Text style={styles.developerText}>Developed by Developer Team</Text>
      </ScrollView>
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
    backgroundColor: 'white',
    borderRadius: 8,
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: colors.primary,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  developerText: {
    position: 'absolute',
    bottom: 10,
    color: colors.text,
  },
});

export default SignUp;
