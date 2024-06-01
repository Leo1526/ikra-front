// OneLostItemPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { colors } from '../../design/themes';

const oneLostItem = ( {route} ) => {
  console.log(route); 

  return (
    <View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  card: {
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: colors.primary,
  },
});

export default oneLostItem;
