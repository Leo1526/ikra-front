import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Snackbar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors,fonts } from '../../design/themes';
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      // Kullanıcı doğrulandı, burada giriş işlemini gerçekleştirin
      console.log('Giriş başarılı!');
    } else {
      // Kullanıcı doğrulanamadı, hata mesajı göster
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo ve uygulama adı */}
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>Uygulama Adı</Text>

      <TextInput
        label="Kullanıcı Adı"
        value={username}
        onChangeText={text => setUsername(text)}
        selectionColor= {colors.primary}
        activeUnderlineColor= {colors.primary}
        style={styles.input}
        theme={{ colors: { primary: 'blue' } }}
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
        onPress={handleLogin}
        style={styles.button}
        buttonColor= {colors.primary}
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
    backgroundColor: colors.background, // Arka plan rengi
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text, // Uygulama adı rengi
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  developerText: {
    position: 'absolute',
    bottom: 16,
    color: colors.text, // Developer Team bilgisi rengi
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color :"red",
    
  },
  signupButtonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
