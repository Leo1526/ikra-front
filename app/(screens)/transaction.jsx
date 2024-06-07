import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Platform, KeyboardAvoidingView, Text, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput, Button, Modal, List, Checkbox } from 'react-native-paper';
import { colors, fonts, text } from '../../design/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as commonStyles from '../../design/style';
import { ikraAxios } from '../common';
import { urlDev, url } from '../common';
import { commonStyle } from '../../design/style';

const CheckboxWithLabel = ({ label, status, onPress }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Text style={styles.checkboxLabel}>{label}</Text>
      <Checkbox.Android
        status={status}
        onPress={onPress}
      />
    </View>
  );
};

const TransactionPage = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientDisplayName, setRecipientDisplayName] = useState('');
  const [visible, setVisible] = useState(false);
  const [sendToRecipients, setSendToRecipients] = useState(false);
  const [fetchedName, setFetchedName] = useState("");
  const [recipients, setRecipients] = useState([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const selectRecipient = (selectedRecipient) => {
    const fetchedName = selectedRecipient.name;
    const maskedName = nameMasker(fetchedName);

    setRecipientDisplayName(maskedName);
    setRecipientName(fetchedName);
    setEnteredName(fetchedName);
    setAccountNumber(selectedRecipient.accountNumber);

    hideModal();
  };

  const nameMasker = (name) => {
    const nameParts = name.split(' ');
    const maskedName = nameParts.map((part) => {
      if (part.length > 1) {
        const firstLetter = part.charAt(0);
        const otherLetters = "*".repeat(part.length - 1);
        return firstLetter + otherLetters;
      } else {
        return part;
      }
    }).join(' ');
    return maskedName;
  };

  const fetchRecipientName = async () => {
    if (accountNumber === "") {
      setRecipientDisplayName("");
      setRecipientName("");
      return;
    }

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
  };

  const handleSendMoney = async () => {
    if (accountNumber === "") {
      Alert.alert("Hata", "Lütfen hesap numarasını giriniz.");
      return;
    } else if (amount === "") {
      Alert.alert("Hata", "Lütfen yollamak istediğiniz miktarı giriniz.");
      return;
    } else if (parseFloat(amount) <= 0) {
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
        "receiver": accountNumber,
        "amount": amount,
        "description": description,
        "txType": "WITH_STUDENT_NO",
        "saveUser": sendToRecipients
      },
      onSuccess: (data) => {
        if (data.status === "ERROR") {
          Alert.alert("Bakiye yetersiz!");
        } else {
          Alert.alert("Para gönderme işlemi başarılı!");
        }
      },
      onError: (error) => {
        console.error('Error executing transaction: ', error);
      },
    });
  };

  const getSavedUsers = async () => {
    ikraAxios({
      url: urlDev + '/savedUser',
      method: 'GET',
      onSuccess: (data) => {
        setRecipients(data.body);
        setVisible(true);
      },
      onError: (error) => {
        console.error('Error fetching saved user data: ', error);
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.safeArea}
        >
          <ScrollView style={styles.scroll} >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />

              <Button
                mode="outlined"
                onPress={getSavedUsers}
                style={commonStyle.secondaryButton}
                contentStyle={styles.buttonContent}
                labelStyle={commonStyle.secondaryButtonLabel}
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
                    onChangeText={(text) => setEnteredName(text)}
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

              <CheckboxWithLabel
                label="Kayıtlı alıcılara kaydet"
                status={sendToRecipients ? 'checked' : 'unchecked'}
                onPress={() => setSendToRecipients(!sendToRecipients)}
              />

              <Button mode="contained" onPress={handleSendMoney} style={commonStyle.secondaryButton} labelStyle={commonStyle.secondaryButtonLabel}>
                Para Gönder
              </Button>

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
          </ScrollView>
        </KeyboardAvoidingView>
      
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    flexGrow:1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
  },
  modalContent: {
    backgroundColor: colors.secondaryBackground,
    padding: 10,
    borderRadius: 10,
  },
  touchable: {
    backgroundColor: colors.background,
    borderColor: colors.text,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    margin: 4,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: text.secondaryDark,
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    marginBottom: 24,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  logo: {
    width: 100,
    height: 100,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.text,
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
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
  },
});

export default TransactionPage;
