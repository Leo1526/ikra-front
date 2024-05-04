import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../design/themes';
import TransactionItem from '../../components/TransactionItem';
import RNPickerSelect from 'react-native-picker-select';

const AllTransactionsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [transactionType, setTransactionType] = useState('Tümü');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const transactions = [
    { id: '1', date: '01.05.2023', amount: -100, description: 'Kira ödemesi', sender: 'Ben', recipient: 'Kira Şirketi' },
    { id: '2', date: '15.05.2023', amount: 200, description: 'Maaş', sender: 'İşveren', recipient: 'Ben' },
    { id: '3', date: '20.05.2023', amount: -50, description: 'Hediye', sender: 'Ben', recipient: 'Arkadaş' },
    { id: '4', date: '22.05.2023', amount: 150, description: 'Alacak', sender: 'Arkadaş', recipient: 'Ben' },
    { id: '5', date: '25.05.2023', amount: -70, description: 'Market alışverişi', sender: 'Ben', recipient: 'Market' },
    { id: '6', date: '02.06.2023', amount: -150, description: 'Elektrik Faturası', sender: 'Ben', recipient: 'Enerji Şirketi' },
    { id: '7', date: '05.06.2023', amount: 300, description: 'Freelance İş', sender: 'Müşteri', recipient: 'Ben' },
    { id: '8', date: '07.06.2023', amount: -45, description: 'Kitap Satın Alma', sender: 'Ben', recipient: 'Kitapçı' },
    { id: '9', date: '10.06.2023', amount: -30, description: 'Sinema', sender: 'Ben', recipient: 'Sinema' },
    { id: '10', date: '12.06.2023', amount: 90, description: 'Hediye', sender: 'Anne', recipient: 'Ben' }
  ];

  const applyFilter = () => {
    let filtered = transactions;
    if (transactionType !== 'Tümü') {
      if (transactionType === 'Gider') {
        filtered = filtered.filter(transaction => transaction.amount < 0);
      } else if (transactionType === 'Gelir') {
        filtered = filtered.filter(transaction => transaction.amount >= 0);
      }
    }
    if (filterKeyword) {
      filtered = filtered.filter(
        transaction =>
          transaction.recipient.toLowerCase().includes(filterKeyword.toLowerCase()) ||
          transaction.sender.toLowerCase().includes(filterKeyword.toLowerCase())
      );
    }
    setFilteredTransactions(filtered);
    setModalVisible(false);
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
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
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
              <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
                <Text style={styles.applyButtonText}>Uygula</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 8,
    width: '80%',
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
    backgroundColor: colors.text,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  applyButtonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
});

export default AllTransactionsScreen
