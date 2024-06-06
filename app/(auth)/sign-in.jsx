import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Text,TouchableOpacity  } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, text } from '../../design/themes';
import {commonStyle} from "../../design/style";
import * as common from "../common.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PinInput from '../../components/PinInput.jsx';
import { ikraAxios } from '../common.js';

const SignIn = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [previousUserName, setPreviousUserName] = useState(null);
  const [previousUserMail, setPreviousUserMail] = useState(null);
  const passwordRef = useRef(null);
  const [forgetMyPasswordMode, setForgetMyPasswordMode] = useState(false)


  const getAsyncData = async (key,onAccess) => {
    try {
      const value = await AsyncStorage.getItem(key);

      if(value !== null) {
        onAccess(value)
        return value;
      }
    } catch(e) {
      return null
    }
  };

  const getPreviousUserData = async () =>{
    await getAsyncData('userName', (value) => {
      setPreviousUserName(value);
    });
    await getAsyncData('userMail', (value) => {
      setPreviousUserMail(value);
      setUsername(value)
    });
  } 

  useEffect(() => {
    const fetchData = async () => {
      await getPreviousUserData();
    };

    fetchData();
  }, []);


  const handleLogin = async  () => {
    setErrorUsername(false)
    setErrorPassword(false)
    if (username.length < 8) {
      setErrorUsername(true);
      return
    } 
    if (password.length < 6) {
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
          await AsyncStorage.setItem('userMail', username);

          navigation.navigate("DrawerNavigator")
        }
      } catch (error) {
        alert("Bağlantı hatası! " + error.message)
      }
    }
  };

  const changeUserEmail = () => {
    setPreviousUserName('')
    setPreviousUserMail('')
  }

  const activateForgetMyPassword = () => {
    setForgetMyPasswordMode(true)
  }

  const forgetMyPasswordSubmit = () => {
    if (!username) {
      alert("Lütfen email adresinizi girin.")
    }
    ikraAxios({
      url: common.urlDev + "/resetPassword?username="+username,
      method: 'POST',
      tokenRequired: false,
      onSuccess: (data) => {
        console.log()
        if (data.body.status === 'SUCCESS') {
          alert("Mailinize yeni şifreniz iletildi.\nGiriş yaptıktan sonra şifrenizi değiştirebilirsiniz.")
          return;
        }
        alert("Şifremi unuttum servisinde hata! " + data.body.message)
      },
      onError: () => {
        alert("Şifremi unuttum servisinde beklenmeyen hata!")
      }
    })
  }

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
            {previousUserName && !forgetMyPasswordMode && (
              <View style={{flex:1,flexDirection:'column', alignItems:'center', justifyContent: 'center',width:"100%"}}>
                <Text style={styles.appName}>{previousUserName}</Text>
                <TouchableOpacity onPress={changeUserEmail} style={styles.changeUserMailButton}>
                  <Text style={styles.changeUserMailText}>Çıkış Yap</Text>
                </TouchableOpacity>
              </View>
              ) }
          <View style={styles.form}>

            {(!previousUserName || forgetMyPasswordMode ) && <TextInput
              label="Kullanıcı Adı"
              value={username}
              onChangeText={text => setUsername(text)}
              selectionColor={colors.primary}
              activeUnderlineColor={colors.primary}
              style={commonStyle.input}
              labelStyle={commonStyle.input}
              theme={{ colors: { primary: colors.primaryDark } }}
              />}
            {/* {errorUsername && <Text style={commonStyle.errorText}>Kullanıcı adı en az 8 karakter uzunluğunda olmalı.</Text>} */}
            {/* <TextInput
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
              /> */}
            {!forgetMyPasswordMode && 
              <PinInput length={6} pinWidth={47} onPinComplete={(pin) => {console.log('PIN:', pin); setPassword(pin)}} />
            }
            {/* {errorPassword && <Text style={commonStyle.errorText}>Şifre en az 8 karakter uzunluğunda olmalı.</Text>} */}
            {!forgetMyPasswordMode ? (
              <Button
                mode="contained"
                onPress={handleLogin}
                style={commonStyle.primaryButton}
                labelStyle={commonStyle.primaryButtonLabel}
                >
                Giriş Yap
              </Button>
            ):(
              <Button
                mode="contained"
                onPress={forgetMyPasswordSubmit}
                style={commonStyle.primaryButton}
                labelStyle={commonStyle.primaryButtonLabel}
                >
                Şifremi Gönder
              </Button>
            )}
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

            {!forgetMyPasswordMode &&             
              <View style={styles.textContainer}>
                <TouchableOpacity onPress={activateForgetMyPassword}>
                  <Text style={styles.signupButtonText}>Şifremi unuttum. {'\u00A0'}</Text>
                </TouchableOpacity>
                <Button
                  onPress={() => navigation.navigate('sign-up')}
                  labelStyle={commonStyle.secondaryButtonLabel}
                  style={commonStyle.secondaryButton}>
                  Kayıt Ol
                </Button>
              </View>}
              {forgetMyPasswordMode &&
                <View style={styles.container}>
                  <Button onPress={() => setForgetMyPasswordMode(false)}
                    labelStyle={commonStyle.secondaryButtonLabel}
                    style={commonStyle.secondaryButton}>
                    Geri Dön
                  </Button>
                </View>
              }
          </View>
        </ScrollView>
      </SafeAreaView>  
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pin: {
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  
  container: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background, // Arka plan rengi
    font: fonts.regular
  },
  form: {
    flex:7,
    marginTop: 30,
    width: '100%',
  },
  logo: {
    width: 200,
    height: 200,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  changeUserMailButton: {
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 5,
    backgroundColor: colors.background,
    marginTop: 8,
    paddingVertical: 0, 
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  changeUserMailText: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal:4,
    margin: 0,
    color: colors.red
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
    flex:1,
    backgroundColor: colors.background
  }
});
export default SignIn;