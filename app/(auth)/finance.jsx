import React from 'react';
import { View,ScrollView, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../design/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionItem from '../../components/TransactionItem';
import { Link } from '@react-navigation/native';


const FinanceScreen = () => {
  const navigation = useNavigation();

  // Example card balance and transactions
  const cardBalance = 1000;
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

  const lastTenTransactions = transactions.slice(-10);

  const renderItem = ({ item }) => (
    <View style={styles.transaction}>
      <Text style={styles.transactionText}>
        {item.recipient}: {item.amount} TL - {item.date}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.centerView}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceHeading}>Kart Bakiyesi</Text>
          <View style={styles.balanceAmountContainer}>
            <Text style={styles.currencySymbol}>TL</Text>
            <Text style={styles.balanceAmount}>{cardBalance}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.transactionsContainer}>
        <View style= {styles.rightEnd}>
        <Text style={styles.transactionsHeading}>Geçmiş İşlemler
        </Text>
        <View style={styles.rightEnd}>
          <Link to="/all_transactions"
          >
            <Text style= {styles.link}>Tümünü gör</Text>
          </Link>
        </View>
        
        </View>
        <View style={{ maxHeight: '80%' }}>
    <FlatList
      data={lastTenTransactions}
      renderItem={({ item }) => (
        <TransactionItem
          date={item.date}
          description={item.description}
          type={item.type}
          sender={item.sender}
          recipient={item.recipient}
          amount={item.amount}
        />
      )}
      keyExtractor={item => item.id}
    />
  </View>

      </View>

      <View style= {styles.centerView}>
        <Button
          onPress={() => navigation.navigate('transaction')}
          style={styles.button}
          labelStyle={styles.buttonText}
          buttonColor={colors.secondary}
        >
          Para Transferi
        </Button>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center'
  },
  centerView: {
    justifyContent:'center',
    alignItems: 'center'
  },
  balanceContainer: {
    backgroundColor: colors.text,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    width: '60%'
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
    maxHeight: '70%',
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
    width: '60%',
  },
  buttonText: {
    color: colors.text,
    fontWeight: 'bold',
    alignItems: 'baseline'
  },
  link: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

});

export default FinanceScreen;
