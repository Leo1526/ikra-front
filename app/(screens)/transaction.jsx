import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Platform, KeyboardAvoidingView, Text, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput, Button, Modal, List, Checkbox } from 'react-native-paper'; // Modal ve List ekledik
import { colors, fonts, text} from '../../design/themes'; // Gerekli renkler ve yazı tipleri
import { SafeAreaView } from 'react-native-safe-area-context';
import * as commonStyles from '../../design/style';
import { ikraAxios } from '../common';
import { urlDev, url } from '../common';

const TransactionPage = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientDisplayName, setRecipientDisplayName] = useState('');
  const [visible, setVisible] = useState(false); // Modal görünürlüğü için state ekledik
  const [sendToRecipients, setSendToRecipients] = useState(false); // Kayıtlı alıcılara gönder seçeneği
  const [fetchedName, setFetchedName] = useState("");
  const [recipients, setRecipients] = useState([]);
  

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

  const nameMasker = (name) => {
    const nameParts = name.split(' ');
    const maskedName = nameParts.map((part) => {
      if (part.length > 1) {
        const firstLetter = part.charAt(0);
        const otherLetters = "*".repeat(part.length - 1);
        return firstLetter + otherLetters;
      } else {
        return part; // for single character parts, do not mask
      }
    }).join(' ');
    return maskedName;
  };

  const fetchRecipientName = async () => {
    console.log("onedit");
    if(accountNumber == ""){
      setRecipientDisplayName("");
      setRecipientName("");
      return;
    }

    console.log("request öncesi");
    await ikraAxios({
      url: urlDev + '/users/nameByStudentId?studentId=' + accountNumber,
      onSuccess: (data) => {
        const usersName = `${data.body.firstName} ${data.body.lastName}`;
        const maskedName = nameMasker(usersName);
        setRecipientDisplayName(maskedName);
        setRecipientName(usersName);
      },
      onError: (error) => {
        console.error('Error fetching transactions data: ', error);
      },
    });

    console.log("request sonrası");
  
  };

  const handleSendMoney = async () => {
    if(accountNumber == ""){
      Alert.alert("Hata", "Lütfen hesap numarasını giriniz.");
      return;
    }
    else if (amount == "") {
      Alert.alert("Hata", "Lütfen yollamak istediğiniz miktarı giriniz.");
      return;
    }
    else if (parseFloat(amount) <= 0) {
      Alert.alert("Hata", "Lütfen sıfırdan büyük bir miktar giriniz.");
      return;
    }


    if (enteredName.toLowerCase() === recipientName.toLowerCase()) {
      makeTxRequest();
    } else {
      Alert.alert("Yanlış isim", "Girilen isim hesap sahibiyle uyuşmuyor, lütfen kontrol edin.");
    }
  };

  const makeTxRequest = async () => {
    ikraAxios({
      url: urlDev + '/transactions',
      method: 'POST',
      data: {
        "receiver" : accountNumber,
        "amount" : amount,
        "description" : description,
        "txType" : "WITH_STUDENT_NO",
        "saveUser": sendToRecipients
      },
      onSuccess: (data) => {
        console.log(data);
        if (data.status == "ERROR"){
          Alert.alert("Bakiye yetersiz!");
        } else {
          Alert.alert("Para gönderme işlemi başarılı!");
        }
        
        
      },
      onError: (error) => {
        console.error('Error executing transaction: ', error);
      },
    })
  };

  const getSavedUsers = async () => {
    ikraAxios({
      url: urlDev + '/savedUser',
      method: 'GET',
      onSuccess: (data) => {
        console.log(data);
        setRecipients(data.body);
        setVisible(true);
      },
      onError: (error) => {
        console.error('Error fetching saved user data: ', error);
      },
    })
  }

  // Diğer fonksiyonlar ve JSX içeriği buraya gelecek

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        onPress={getSavedUsers}
        style={styles.savedReceiversButton}
        contentStyle={styles.buttonContent} // İçerik stilini belirtmek için contentStyle kullanıyoruz
        labelStyle={styles.buttonLabel} // Etiketin stilini belirtmek için labelStyle kullanıyoruz
      >
        Kayıtlı Alıcıları Göster
      </Button>


          <TextInput
            label="Öğrenci Numarası"
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

          <Button mode="contained" onPress={handleSendMoney} style={commonStyles.primaryButton}>
            Para Gönder
          </Button>



          {/* Modal */}
          <Modal style={{ height: '65%' }} visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <View style={styles.modalContent}>
          <Text style={styles.subheader}>Kayıtlı Alıcılar</Text>
            <ScrollView style={{ height: '100%' }}>
              <List.Section>
                {recipients.map((recipient) => (
                  <TouchableOpacity key={recipient.studentId} onPress={() => selectRecipient(recipient)} style={styles.touchable}>
                    <List.Item title={`${recipient.studentId} - ${recipient.name}`} />
                  </TouchableOpacity>
                ))}
              </List.Section>
            </ScrollView>
          </View>
        </Modal>

        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    backgroundColor: colors.secondaryBackground,
    padding: 10,
    borderRadius: 10,
  },
  touchable: {
    backgroundColor: colors.background,
    borderColor: colors.text,
    borderWidth: 1, // Kenarlık kalınlığı
    borderColor: colors.primary, // Kenarlık rengi
    borderRadius: 10,
    margin: 4,
  },

  subheader: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: "bold",
    color: text.secondaryDark,
    marginBottom: 5,
    textAlign: "center"
  },

  input: {
    width: '90%',
    marginBottom: 16,
    backgroundColor: colors.background, // SignIn'den alınan giriş alanı rengi
    borderRadius: 8,
  },
  button: {
    width: '90%',
    padding: 10,
    marginBottom: 16,
    backgroundColor: colors.primary, // SignIn'den alınan buton rengi
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
    backgroundColor: colors.secondaryBackground,
    margin: 40,
    borderRadius: 10,
  },
  buttonContent: {
    width: '100%', // İçerik genişliğini buton genişliğine eşitliyoruz
  },
  buttonLabel: {
    fontSize: 16, // Yazı boyutunu ayarlayabilirsiniz
    color: text.secondaryDark,
    fontWeight: "normal"
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
