import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../design/themes';
import { TextInput, Modal, Button } from 'react-native-paper';
import TransactionItem from '../../components/TransactionItem';
import RNPickerSelect from 'react-native-picker-select';
import { urlDev, ikraAxios } from '../common';


const AllTransactionsScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [transactionType, setTransactionType] = useState('Tümü');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [noMoreComments, setNoMoreComments] = useState(false);
  const [page, setPage] = useState(0);
  const size = 5;


  useEffect(() => {
    handleGetTransactions();
  }, []);
  
  const handleGetTransactions = () => {
    if(noMoreComments) {
      return;
    }

    ikraAxios({
      url: urlDev + '/transactions/byPage?page=' + page + '&size=' + size,
      onSuccess: (data) => {
        if(data.body.length < size) {
          setNoMoreComments(true);
        }
        setPage(page + 1);
        setTransactions((prevTransactions) => [...prevTransactions, ...data.body]);
        console.log(transactions);
      },
      onError: (error) => {
        console.error('Error fetching transactions data: ', error);
      },
    })
  }

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
        <View style= {{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.heading}>Tüm İşlemler</Text>
        </View>
        <FlatList
          data={filteredTransactions.length > 0 ? filteredTransactions : transactions}
          onEndReached={handleGetTransactions}
          renderItem={({ item }) => (
            <TransactionItem
              txTime={item.txTime}
              description={item.description}
              sender={item.sender}
              receiver={item.receiver}
              amount={item.amount}
              currencySymbol="₺"
              change={item.change}
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
            <Text style={styles.inputHeading}>Gelir/Gider'e göre filtrele</Text>
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
              placeholder={{
                label: 'Gelir/Gider seçin...',
                value: null,
              }}
            />
            <Text style={styles.inputHeading}>İşlem tipine göre filtrele</Text>
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
              placeholder={{
                label: 'Bir işlem tipi seçin...',
                value: null,
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
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    flexDirection: 'row'
  },
  filterButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-end',
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
