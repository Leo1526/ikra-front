import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionItem = ({ date, description, sender, recipient, amount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{date}</Text>
        <Text style={[styles.amount, amount < 0 ? styles.negative : styles.positive]}>
          {amount < 0 ? `${amount} TL` : `+${amount} TL`}
        </Text>
      </View>
      <Text style={styles.description}>
        Açıklama: {description}, Gönderen: {sender}, Alıcı: {recipient}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  negative: {
    color: 'red',
  },
  positive: {
    color: 'green',
  },
  description: {
    fontSize: 14,
    color: '#333',
  }
});

export default TransactionItem;
