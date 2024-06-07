import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Clipboard } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionItem from '../../components/TransactionItem';
import { commonStyle } from '../../design/style';
import { colors } from '../../design/themes';
import { urlDev, ikraAxios, formatBalance } from '../common';

const FinanceScreen = ({ navigation }) => {
  const [cardBalance, setCardBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState(11111111);

  useEffect(() => {
    ikraAxios({
      url: urlDev + '/wallets',
      onSuccess: (data) => {
        setCardBalance(data.body.balance);
        setName(data.body.name);
        setStudentId(data.body.studentId);
        console.log(data);
      },
      onError: (error) => {
        console.error('Error fetching wallet data:', error);
      },
    });

    ikraAxios({
      url: urlDev + '/transactions/byPage?page=0&size=5',
      onSuccess: (data) => {
        setTransactions(data.body);
        console.log(transactions);
      },
      onError: (error) => {
        console.error('Error fetching transactions data: ', error);
      },
    })
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(studentId.toString());
    alert('Öğrenci numarası kopyalandı!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.centerView}>
          <View style={styles.balanceContainer}>
            <Text style={styles.userName}>{name}</Text>
            <View style={styles.studentIdContainer}>
              <Text style={styles.studentId}>{studentId}</Text>
              <IconButton
                icon="content-copy"
                size={20}
                onPress={copyToClipboard}
                style={styles.copyButton}
              />
            </View>
            <View style={styles.balanceAmountContainer}>
              <Text style={styles.balanceHeading}>Bakiye</Text>
              <Text style={styles.balanceAmount}>{formatBalance(cardBalance)} ₺</Text>
            </View>
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          <View style={styles.rightEnd}>
            <Text style={styles.transactionsHeading}>Geçmiş İşlemler</Text>
            <Button onPress={() => navigation.navigate('allTransactions')}>
              <Text style={styles.link}>Tümünü gör</Text>
            </Button>
          </View>
          {transactions.length === 0 ? (
            <View style={styles.noTransactionsContainer}>
              <Text style={styles.noTransactionsText}>Henüz hiçbir işlem yapmadınız.</Text>
            </View>
          ) : (
            <FlatList
              data={transactions}
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
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>

        <View style={styles.centerView}>
          <Button
            onPress={() => navigation.navigate('transaction')}
            style={commonStyle.secondaryButton}
            labelStyle={commonStyle.secondaryButtonLabel}
            buttonColor={colors.primary}
          >
            Para Transferi
          </Button>
        </View>
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
    ...StyleSheet.absoluteFillObject
  },
  centerView: {
    alignItems: 'center',
    padding: 16,
  },
  balanceContainer: {
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 20,
    width: '90%',
    elevation: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  studentIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  studentId: {
    fontSize: 20,
    color: colors.text,
    marginRight: 10,
  },
  copyButton: {
    marginLeft: 10,
  },
  balanceAmountContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  balanceHeading: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.text,
  },
  transactionsContainer: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    justifyContent: 'center',
  },
  transactionsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  noTransactionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTransactionsText: {
    fontSize: 18,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.secondary,
    width: '60%',
  },
  buttonText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#007AFF', // iOS sistem mavisi rengi
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default FinanceScreen;
