import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, text } from '../../design/themes';
import {commonStyle} from "../../design/style";
import * as common from "../common.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SignIn = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const passwordRef = useRef(null);

  const handleLogin = async  () => {
    setErrorUsername(false)
    setErrorPassword(false)
    if (username.length < 8) {
      setErrorUsername(true);
      return
    } 
    if (password.length < 2) {
      setErrorPassword(true)
      return;
    }
    else {
      const url = common.urlDev + '/login';
      const payload = {
        email: username,
        password: password
      };
      try {
        console.log(url)
        console.log(payload)
        const response = await axios.post(url, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = response.data;
        if (data.status === "ERROR" || !data.body) {
          console.log("error")
          console.log(data)
          data.messages.forEach(message => {
            console.log(data.messages)
            alert(message)
          });
            return;
        } else {
          await AsyncStorage.setItem('jwtToken', data.body.token);
          await AsyncStorage.setItem('expireDate', data.body.expireDate);
          navigation.navigate("DrawerNavigator")
        }
      } catch (error) {
        alert("Bağlantı hatası! " + error.message)
      }
    }

    const handlePasswordChange = (text) => {
      const numericText = text.replace(/[^0-9]/g, '');
      setPassword(numericText);
    };

  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.safeArea} 
      >

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Hoşgeldiniz.</Text>
          <View style={styles.form}>

          <TextInput
            label="Kullanıcı Adı"
            value={username}
            onChangeText={text => setUsername(text)}
            selectionColor={colors.primary}
            activeUnderlineColor={colors.primary}
            style={commonStyle.input}
            labelStyle={commonStyle.input}
            theme={{ colors: { primary: 'blue' } }}
            />
          {errorUsername && <Text style={commonStyle.errorText}>Kullanıcı adı en az 8 karakter uzunluğunda olmalı.</Text>}
          <TextInput
            label="Parola"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!showPassword}
            style={commonStyle.input}
            selectionColor={colors.primary}
            activeUnderlineColor={colors.primary}
            ref={passwordRef}
            theme={{ colors: { primary: 'blue' } }}
            right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} color={colors.primary} onPress={() => setShowPassword(!showPassword)} />}
            />
          {errorPassword && <Text style={commonStyle.errorText}>Şifre en az 8 karakter uzunluğunda olmalı.</Text>}
          <Button
            mode="contained"
            onPress={handleLogin}
            style={commonStyle.primaryButton}
            labelStyle={commonStyle.primaryButtonLabel}
            >
            Giriş Yap
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
            Kullanıcı adı veya parola hatalı
          </Snackbar>

          <View style={styles.textContainer}>
            <Text style={styles.signupButtonText}>Hesabın yok mu? {'\u00A0'}</Text>
            <Button
              onPress={() => navigation.navigate('sign-up')}
              labelStyle={commonStyle.secondaryButtonLabel}
              style={commonStyle.secondaryButton}
              >
              Kayıt Ol
            </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>  
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background, // Arka plan rengi
    font: fonts.regular
  },
  form: {
    marginTop: 60,
    width: '100%',
  },
  logo: {
    width: 200,
    height: 200,
  },
  appName: {
    fontSize: 20,
    marginBottom: 16,
    
    color: "#555555", // Uygulama adı rengi
  },
  input: {
    width: '100%',
    marginBottom: 8,
    backgroundColor: '#F4F6F8',
    borderRadius: 8,
    borderTopWidth: 0
  },
  button: {
    width: '100%',
    textAlign: 'center', 
    backgroundColor: colors.primary,
    marginBottom: 16,
    fontWeight: "bold",
    fontSize: "16px",
    letterSpacing: 2,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: text.primaryDark,
    fontWeight: 'light',
  },
  signupButton: {
    color: text.primaryLight,
    fontWeight: '300',
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
export default SignIn;