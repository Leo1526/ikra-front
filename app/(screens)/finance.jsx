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

        <View style={styles.balanceContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.studentNo}>{studentId}</Text>
            <Text style={styles.balanceLabel}>Bakiye</Text>
            <View style={styles.bakiyeContainer}>
              <Text style={styles.currency}>₺</Text>
              <Text style={styles.balance}>{formatBalance(cardBalance)}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              icon="share-variant" 
              labelStyle={styles.buttonLabel} 
              style={styles.button} 
              onPress={copyToClipboard} 
            >PAYLAŞ</Button>
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
    margin: 15,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: colors.background,
    borderColor: colors.primary,
  },
  infoContainer: {
    margin: 10,
    flex: 18,
  },
  name: {
    color: colors.primary, 
    fontWeight: '400',
    fontSize: 20,
  },
  studentNo: {
    color: colors.secondary, 
    fontSize: 15,
    marginBottom: 24,
  },
  balanceLabel: {
    color: colors.primary, 
    fontSize: 14,
  },
  balance: {
    color: colors.primary, 
    fontSize: 48,
  },
  bakiyeContainer: {
    flexDirection: 'row',
    color: colors.primary, 
    alignItems: 'baseline', 
  },
  currency: {
    color: colors.primary,
    fontSize: 24, 
  },
  buttonContainer: {
    flex: 10,
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    marginRight:15,
  },
  button: {
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    marginVertical: 15,
    alignSelf: 'stretch',
  },
  buttonLabel: {
    color: colors.primary,
    fontSize:14,
  },
  transactionsContainer: {
    flex: 2,
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
