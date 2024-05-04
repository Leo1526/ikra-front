import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../design/themes';
import { SafeAreaView } from 'react-native-safe-area-context';

const FinanceScreen = () => {
  const navigation = useNavigation();

  // Example card balance and transactions
  const cardBalance = 1000;
  const transactions = [
    { id: 1, recipient: 'Ali', amount: 50, date: '01/05/2024' },
    { id: 2, recipient: 'Ayşe', amount: 100, date: '29/04/2024' },
    { id: 3, recipient: 'Veli', amount: 200, date: '25/04/2024' },
    { id: 4, recipient: 'Fatma', amount: 75, date: '22/04/2024' },
    { id: 5, recipient: 'Ahmet', amount: 150, date: '18/04/2024' },
    { id: 1, recipient: 'Ali', amount: 50, date: '01/05/2024' },
    { id: 2, recipient: 'Ayşe', amount: 100, date: '29/04/2024' },
    { id: 3, recipient: 'Veli', amount: 200, date: '25/04/2024' },
    { id: 4, recipient: 'Fatma', amount: 75, date: '22/04/2024' },
    { id: 5, recipient: 'Ahmet', amount: 150, date: '18/04/2024' },
    { id: 1, recipient: 'Ali', amount: 50, date: '01/05/2024' },
    { id: 2, recipient: 'Ayşe', amount: 100, date: '29/04/2024' },
    { id: 3, recipient: 'Veli', amount: 200, date: '25/04/2024' },
    { id: 4, recipient: 'Fatma', amount: 75, date: '22/04/2024' },
    { id: 5, recipient: 'Ahmet', amount: 150, date: '18/04/2024' },
  ];

  const lastFiveTransactions = transactions.slice(-5);

  const renderItem = ({ item }) => (
    <View style={styles.transaction}>
      <Text style={styles.transactionText}>
        {item.recipient}: {item.amount} TL - {item.date}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceHeading}>Kart Bakiyesi</Text>
        <View style={styles.balanceAmountContainer}>
          <Text style={styles.currencySymbol}>TL</Text>
          <Text style={styles.balanceAmount}>{cardBalance}</Text>
        </View>
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.transactionsHeading}>Geçmiş İşlemler</Text>
        <FlatList
          data={lastFiveTransactions}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.transactionsList}
          height = {150}
        />
      </View>

      <Button
        onPress={() => navigation.navigate('send-money')}
        style={styles.button}
        labelStyle={styles.buttonText}
        buttonColor={colors.secondary}
      >
        Para Gönder
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: ''
  },
  balanceContainer: {
    backgroundColor: colors.text,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  balanceHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.background,
  },
  balanceAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.background,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background,
    marginLeft: 5,
  },
  transactionsContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  transactionsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  transactionsList: {
    marginTop: 10,
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
  },
  buttonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
});

export default FinanceScreen;
