import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../design/themes';

const TransactionItem = ({ txTime, description, sender, receiver, amount, change }) => {
  const [date, time] = txTime.split('T');
  const[year, month, day] = date.split('-');
  const formattedTime = time.split('.')[0].slice(0, 5); // Extracting HH:mm from the time

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{day + "." + month + "." + year}</Text>
          <Text style={styles.time}>{formattedTime}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.detail}>Gönderen: {sender}</Text>
          <Text style={styles.detail}>Alıcı: {receiver}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, change < 0 ? styles.negative : styles.positive]}>
            {change < 0 ? `${change} TL` : `+${change} TL`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    width: 90,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  time: {
    fontSize: 14,
    color: '#555',
    paddingLeft: 20
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: '#333',
  },
  amountContainer: {
    width: 80,
    alignItems: 'flex-end',
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
});

export default TransactionItem;
