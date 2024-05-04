import React, { useState } from 'react';
import { View, Image,StyleSheet,Platform, KeyboardAvoidingView, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors, fonts } from '../../design/themes'; // Gerekli renkler ve yazı tipleri
import { SafeAreaView } from 'react-native-safe-area-context';
const TransactionPage = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientDisplayName, setRecipientDisplayName] = useState('');

  const fetchRecipientName = async () => {
    if(accountNumber == ""){
        setRecipientDisplayName("");
        setRecipientName("");
        return;
    }

    // Bu fonksiyon backend'e hesap numarasıyla sorgu atacak
    // Örnek olarak statik bir isim döndürelim
    const fetchedName = 'Salih Bakkal'; // Backend'den gelen isim
    const maskedName = fetchedName.replace(/(\w)\w*\s(\w)\w*/, '$1*** $2***');
    setRecipientDisplayName(maskedName);
    setRecipientName(fetchedName);
  };

  const handleSendMoney = async () => {
    if(accountNumber == ""){
        Alert.alert("Hata", "Lütfen hesap numarasını giriniz.");
        return;
    }
    else if(amount == ""){
        Alert.alert("Hata", "Lütfen yollamak istediğiniz miktarı giriniz.");
        return;
      }
    else if (parseFloat(amount) <= 0) {
        Alert.alert("Hata", "Lütfen sıfırdan büyük bir miktar giriniz.");
        return;
      }
      

    if (enteredName.toLowerCase() === recipientName.toLowerCase()) {
    // Burada backend'e para gönderme isteği atılacak
    Alert.alert("Başarılı", "Para gönderme işlemi başarılı.");
    } else {
    Alert.alert("Yanlış isim", "Girilen isim hesap sahibiyle uyuşmuyor, lütfen kontrol edin.");
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.safeArea} 
    >

    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
                  <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Uygulama Adı</Text>
      <TextInput
        label="Hesap Numarası"
        value={accountNumber}
        onChangeText={text => 
            {const filteredText = text.replace(/[^0-9]/g, '');
            setAccountNumber(filteredText);}}
        style={styles.input}
        keyboardType="numeric"
        onEndEditing={fetchRecipientName}
      />
      {recipientDisplayName ? (
        <>
          <Text style={styles.infoText}>Alıcı: {recipientDisplayName}</Text>
          <TextInput
            label="Alıcı Adını Doğrula"
            value={enteredName}
            onChangeText={text => {
                
                setEnteredName(text);
              }}
            style={styles.input}
          />
        </>
      ) : null}
      <TextInput
        label="Gönderilecek Miktar"
        value={amount}
        onChangeText={text => {
            const filteredText = text.replace(/[^0-9]/g, '');
            setAmount(filteredText);}
        }
        style={styles.input}
        keyboardType="numeric"
      />
                <TextInput
            label="Açıklama"
            value={description}
            onChangeText={text => setDescription(text)}
            style={styles.input}
            maxLength={50}
            multiline
            numberOfLines={2} 
            right={<TextInput.Affix text={`${description.length}/50`} />}
          />
      <Button mode="contained" onPress={handleSendMoney} style={styles.button}>
        Para Gönder
      </Button>
    </View>
    </SafeAreaView>  
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background, // SignIn'den alınan genel arka plan rengi
  },
  input: {
    width: '90%',
    marginBottom: 16,
    backgroundColor: 'white', // SignIn'den alınan giriş alanı rengi
    borderRadius: 8,
  },
  button: {
    width: '90%',
    padding: 10,
    marginBottom: 16,
    backgroundColor: colors.secondary, // SignIn'den alınan buton rengi
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
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.text, // SignIn'den alınan metin rengi
  },
  safeArea: {
    flexGrow: 1,
    backgroundColor: colors.background
  }
});

export default TransactionPage;
