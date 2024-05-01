import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Snackbar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigation = useNavigation();

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
        style={styles.input}
        theme={{ colors: { primary: 'blue' } }}
      />
      <TextInput
        label="Parola"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        style={styles.input}
        theme={{ colors: { primary: 'blue' } }}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        color="blue"
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

      {/* Hesap yoksa kayıt sayfasına yönlendirme butonu */}
      <Button
        onPress={() => navigation.navigate('SignIn')}
        style={styles.signupButton}
        labelStyle={styles.signupButtonText}
        color="blue"
      >
        Hesabın yok mu? Kayıt Ol
      </Button>

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
    backgroundColor: '#f0f0f0', // Arka plan rengi
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'blue', // Uygulama adı rengi
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
  signupButtonText: {
    color: 'blue',
  },
  developerText: {
    position: 'absolute',
    bottom: 16,
    color: 'gray', // Developer Team bilgisi rengi
  },
});

export default LoginScreen;
