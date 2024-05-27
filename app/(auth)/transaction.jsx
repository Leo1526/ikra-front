import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Platform, KeyboardAvoidingView, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Modal, List, Checkbox } from 'react-native-paper'; // Modal ve List ekledik
import { colors, fonts } from '../../design/themes'; // Gerekli renkler ve yazı tipleri
import { SafeAreaView } from 'react-native-safe-area-context';
const TransactionPage = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientDisplayName, setRecipientDisplayName] = useState('');
  const [visible, setVisible] = useState(false); // Modal görünürlüğü için state ekledik
  const [sendToRecipients, setSendToRecipients] = useState(false); // Kayıtlı alıcılara gönder seçeneği
  // Örnek kayıtlı alıcılar
  const recipients = [
    { accountNumber: '21945872', name: 'Salih Bakkal' },
    { accountNumber: '12345678', name: 'Ahmet Market' },
    { accountNumber: '98765432', name: 'Ayşe Restoran' },    
    { accountNumber: '11111111', name: 'New Recipient 1' },
    { accountNumber: '22222222', name: 'New Recipient 2' },
    { accountNumber: '33333333', name: 'New Recipient 3' },
    { accountNumber: '44444444', name: 'New Recipient 4' },
    { accountNumber: '55555555', name: 'New Recipient 5' },
    { accountNumber: '66666666', name: 'New Recipient 6' },
    { accountNumber: '77777777', name: 'New Recipient 7' },
    { accountNumber: '88888888', name: 'New Recipient 8' },
    { accountNumber: '99999999', name: 'New Recipient 9' },
    { accountNumber: '10101010', name: 'New Recipient 10' },
    { accountNumber: '12121212', name: 'New Recipient 11' },
    { accountNumber: '13131313', name: 'New Recipient 12' },
    { accountNumber: '14141414', name: 'New Recipient 13' },
    { accountNumber: '15151515', name: 'New Recipient 14' },
    { accountNumber: '16161616', name: 'New Recipient 15' }

  ];

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const selectRecipient = (selectedRecipient) => {
    const fetchedName = selectedRecipient.name; // Backend'den gelen isim
    const maskedName = nameMasker(fetchedName);

    setRecipientDisplayName(maskedName);
    setRecipientName(fetchedName);
    setEnteredName(fetchedName);
    setAccountNumber(selectedRecipient.accountNumber);

    hideModal(); // Modalı kapat
  };

  const nameMasker = (name) =>{
    const fetchedName = name; // Backend'den gelen isim
    const nameParts = fetchedName.split(' ');
    const maskedName = nameParts.map((part, index) => {

        const firstLetter = part.charAt(0);
        const otherLetters = "*".repeat(part.length-1);
        return firstLetter + otherLetters + ' ';
      
    }).join(' ');
    return maskedName;
  }

  const fetchRecipientName = async () => {
    if(accountNumber == ""){
        setRecipientDisplayName("");
        setRecipientName("");
        return;
    }

    // Bu fonksiyon backend'e hesap numarasıyla sorgu atacak
    // Örnek olarak statik bir isim döndürelim
    const fetchedName = "Salih Bakkal"; // Backend'den gelen isim
    const maskedName = nameMasker(fetchedName);


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



    if (sendToRecipients) {
      // Kayıtlı alıcılara gönder seçeneği seçili ise backend'e sorgu atılacak
      // Burada işlemin gerçekleştirileceği fonksiyonu çağırabilirsiniz
      console.log('Backend\'e sorgu atılıyor...');
    } else {
      // Kayıtlı alıcılara gönder seçeneği seçili değilse normal işlem yapılacak
      // Burada işlemin gerçekleştirileceği fonksiyonu çağırabilirsiniz
      console.log('Normal işlem gerçekleştiriliyor...');
    }
  };
  // Diğer fonksiyonlar ve JSX içeriği buraya gelecek

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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

          {/* Kayıtlı alıcıları göstermek için buton */}
          <Button
        mode="outlined"
        onPress={showModal}
        style={styles.savedReceiversButton}
        contentStyle={styles.buttonContent} // İçerik stilini belirtmek için contentStyle kullanıyoruz
        labelStyle={styles.buttonLabel} // Etiketin stilini belirtmek için labelStyle kullanıyoruz
      >
        Kayıtlı Alıcıları Göster
      </Button>


          <TextInput
            label="Hesap Numarası"
            value={accountNumber}
            onChangeText={(text) => {
              const filteredText = text.replace(/[^0-9]/g, '');
              setAccountNumber(filteredText);
            }}
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
                onChangeText={(text) => {
                  setEnteredName(text);
                }}
                style={styles.input}
              />
            </>
          ) : null}
          <TextInput
            label="Gönderilecek Miktar"
            value={amount}
            onChangeText={(text) => {
              const filteredText = text.replace(/[^0-9]/g, '');
              setAmount(filteredText);
            }}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            label="Açıklama"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            maxLength={50}
            multiline
            numberOfLines={2}
            right={<TextInput.Affix text={`${description.length}/50`} />}
          />

          <Checkbox.Item
            label="Kayıtlı alıcılara kaydet"
            status={sendToRecipients ? 'checked' : 'unchecked'}
            onPress={() => setSendToRecipients(!sendToRecipients)}
            style={styles.checkbox}
            labelStyle={styles.checkboxLabel}
          />

          <Button mode="contained" onPress={handleSendMoney} style={styles.button}>
            Para Gönder
          </Button>



          {/* Modal */}
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <View style={styles.modalContent}>
          <Text style={styles.subheader}>Kayıtlı Alıcılar</Text>
            <ScrollView style={{ height: '75%' }}>
              <List.Section>
                {recipients.map((recipient) => (
                  <TouchableOpacity key={recipient.accountNumber} onPress={() => selectRecipient(recipient)} style={styles.touchable}>
                    <List.Item title={`${recipient.accountNumber} - ${recipient.name}`} />
                  </TouchableOpacity>
                ))}
              </List.Section>
            </ScrollView>
          </View>
        </Modal>
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
  modalContent: {
    backgroundColor: colors.primary,
    padding: 10,
  },
  touchable: {
    backgroundColor: colors.text,
    borderColor: colors.secondary,
    borderWidth: 1, // Kenarlık kalınlığı
    borderColor: colors.primary, // Kenarlık rengi
    borderRadius: 10
  },
  
  subheader: {
    fontSize: 18,
    fontWeight: "normal",
    color: colors.text,
    marginBottom: 5,
    textAlign: "center"
  },
  
  input: {
    width: '90%',
    marginBottom: 16,
    backgroundColor: colors.text, // SignIn'den alınan giriş alanı rengi
    borderRadius: 8,
  },
  button: {
    width: '90%',
    padding: 10,
    marginBottom: 16,
    backgroundColor: colors.secondary, // SignIn'den alınan buton rengi
  },
  savedReceiversButton: {
    width: '80%',
    marginBottom: 16,
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
    backgroundColor: colors.background,
  },
  modal: {
    backgroundColor: colors.primary,
    margin: 40,
    borderRadius: 10,

  },
  buttonContent: {
    width: '100%', // İçerik genişliğini buton genişliğine eşitliyoruz
  },
  buttonLabel: {
    fontSize: 16, // Yazı boyutunu ayarlayabilirsiniz
    color: colors.secondary,
    fontWeight : "normal"
  },
  checkbox: {
    alignSelf: 'flex-start',
    marginLeft: '5%',

  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.text,
  },
  
});

export default TransactionPage;
