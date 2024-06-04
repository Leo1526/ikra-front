import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionItem from '../../components/TransactionItem';
import { Link } from '@react-navigation/native';
import { colors } from '../../design/themes';
import { urlDev, ikraAxios } from '../common';

const FinanceScreen = ({navigation}) => {
  const [cardBalance, setCardBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    ikraAxios({
      url: urlDev + '/wallets',
      onSuccess: (data) => {
        setCardBalance(data.balance);
        console.log(data);
      },
      onError: (error) => {
        console.error('Error fetching wallet data:', error);
      },
    });


    ikraAxios({
      url: urlDev + '/transactions/byPage?page=0&size=5',
      onSuccess: (data) => {
        //console.log(data);
        setTransactions(data.body);
        console.log(transactions);
      },
      onError: (error) => {
        console.error('Error fetching transactions data: ', error);
      },
    })
  }, []);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.centerView}>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceHeading}>Kart Bakiyesi</Text>
            <View style={styles.balanceAmountContainer}>
              <Text style={styles.currencySymbol}>₺</Text>
              <Text style={styles.balanceAmount}>{cardBalance}</Text>
            </View>
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          <View style={styles.rightEnd}>
            <Text style={styles.transactionsHeading}>Geçmiş İşlemler</Text>
            <Link to="/all_transactions">
              <Text style={styles.link}>Tümünü gör</Text>
            </Link>
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
            style={styles.button}
            labelStyle={styles.buttonText}
            buttonColor={colors.secondary}
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
  },
  centerView: {
    alignItems: 'center',
    padding: 16,
  },
  balanceContainer: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    width: '60%'
  },
  balanceHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  balanceAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 5,
  },
  transactionsContainer: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    justifyContent: 'center', // Center content vertically
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
  transaction: {
    backgroundColor: colors.text,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  transactionText: {
    fontSize: 16,
    color: colors.background,
  },
  button: {
    backgroundColor: colors.secondary,
    width: '60%',
  },
  buttonText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16
  },
  link: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default FinanceScreen;
