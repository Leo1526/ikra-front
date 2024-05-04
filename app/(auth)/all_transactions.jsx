import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../design/themes';
import { TextInput, Modal, Button } from 'react-native-paper';
import TransactionItem from '../../components/TransactionItem';
import RNPickerSelect from 'react-native-picker-select';

const AllTransactionsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [transactionType, setTransactionType] = useState('Tümü');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const transactions = [
    { id: '1', date: '01.05.2023', type: 'Kira', amount: -100, description: 'Kira ödemesi', sender: 'Ben', recipient: 'Kira Şirketi' },
    { id: '2', date: '15.05.2023', type: 'Maaş', amount: 200, description: 'Maaş', sender: 'İşveren', recipient: 'Ben' },
    { id: '3', date: '20.05.2023', type: 'Diğer', amount: -50, description: 'Hediye', sender: 'Ben', recipient: 'Arkadaş' },
    { id: '4', date: '22.05.2023', type: 'Diğer', amount: 150, description: 'Alacak', sender: 'Arkadaş', recipient: 'Ben' },
    { id: '5', date: '25.05.2023', type: 'Yemek', amount: -70, description: 'Market alışverişi', sender: 'Ben', recipient: 'Market' },
    { id: '6', date: '02.06.2023', type: 'Diğer', amount: -150, description: 'Elektrik Faturası', sender: 'Ben', recipient: 'Enerji Şirketi' },
    { id: '7', date: '05.06.2023', type: 'Transfer', amount: 300, description: 'Freelance İş', sender: 'Müşteri', recipient: 'Ben' },
    { id: '8', date: '07.06.2023', type: 'Diğer', amount: -45, description: 'Kitap Satın Alma', sender: 'Ben', recipient: 'Kitapçı' },
    { id: '9', date: '10.06.2023', type: 'Eğlence', amount: -30, description: 'Sinema', sender: 'Ben', recipient: 'Sinema' },
    { id: '10', date: '12.06.2023', type: 'Diğer', amount: 90, description: 'Hediye', sender: 'Anne', recipient: 'Ben' }
  ];
  

  const applyFilter = () => {
    let filtered = transactions;
  
    // İşlem tipine göre filtreleme
    if (transactionType !== 'Tümü') {
      if (transactionType === 'Gider') {
        filtered = filtered.filter(transaction => transaction.amount < 0);
      } else if (transactionType === 'Gelir') {
        filtered = filtered.filter(transaction => transaction.amount >= 0);
      }
      if (filtered.length === 0) {
        Alert.alert('Uyarı', 'Filtreleme sonucunda hiçbir işlem bulunamadı.');
        setModalVisible(false);
        setFilterKeyword('');
        return;
      }
    }

    if (transactionType !== 'Tümü') {
      filtered = filtered.filter(transaction => transaction.type === transactionType);
      if (filtered.length === 0) {
        Alert.alert('Uyarı', 'Filtreleme sonucunda hiçbir işlem bulunamadı.');
        setModalVisible(false);
        setFilterKeyword('');
        return;
      }
    }
  
    // İsim veya gönderici/alan kişiye göre filtreleme
    if (filterKeyword) {
      const keywordLowerCase = filterKeyword.toLowerCase();
      filtered = filtered.filter(
        transaction =>
          transaction.recipient.toLowerCase().includes(keywordLowerCase) ||
          transaction.sender.toLowerCase().includes(keywordLowerCase)
      );
  
      // Eğer filtrelenmiş bir sonuç yoksa, filtered array'ini boş bırak
      if (filtered.length === 0) {
        Alert.alert('Uyarı', 'Filtreleme sonucunda hiçbir işlem bulunamadı.');
        setModalVisible(false);
        setFilterKeyword('');
        return;
      }
      
    }
    
    
    setFilteredTransactions(filtered);
    setModalVisible(false);
    setFilterKeyword('');
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.filterButtonText}>Filtrele</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Tüm İşlemler</Text>
        <FlatList
          data={filteredTransactions.length > 0 ? filteredTransactions : transactions}
          renderItem={({ item }) => (
            <TransactionItem
              date={item.date}
              description={item.description}
              sender={item.sender}
              recipient={item.recipient}
              amount={item.amount}
            />
          )}
          keyExtractor={item => item.id}
        />
        <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={styles.modalContent}
          >
            <Text style={styles.modalHeading}>Filtrele</Text>
            <Text style={styles.inputHeading}>İsme göre filtrele</Text>
            <TextInput
              style={styles.input}
              value={filterKeyword}
              onChangeText={text => setFilterKeyword(text)}
            />
            <Text style={styles.inputHeading}>İşlem tipine göre filtrele</Text>
            <RNPickerSelect
              onValueChange={(value) => setTransactionType(value)}
              items={[
                { label: 'Tümü', value: 'Tümü' },
                { label: 'Gider', value: 'Gider' },
                { label: 'Gelir', value: 'Gelir' },
              ]}
              style={{
                inputIOS: styles.input,
                inputAndroid: styles.input,
              }}
            />
            <RNPickerSelect
              onValueChange={(value) => setTransactionType(value)}
              items={[
                { label: 'Tümü', value: 'Tümü' },
                { label: 'Transfer', value: 'Transfer' },
                { label: 'Yemek', value: 'Yemek' },
                { label: 'Alışveriş', value: 'Alışveriş' },
                { label: 'Diğer', value: 'Diğer' },
              ]}
              style={{
                inputIOS: styles.input,
                inputAndroid: styles.input,
              }}
            />
            <Button mode="contained" style={styles.applyButton} onPress={applyFilter}>
              Uygula
            </Button>
          </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  filterButtonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    margin: 40,
    borderRadius: 10,
  },
  modalContent: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 8,
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '90%'
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  inputHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: 'white', // SignIn'den alınan giriş alanı rengi
    borderRadius: 8,
    height: 50,
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: colors.secondary,
  },
});

export default AllTransactionsScreen;
