import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title } from 'react-native-paper';
import { colors } from '../../design/themes';  // Varsayılan renkleriniz buradan alınıyor
const GridItemsPage = () => {
  const [items, setItems] = useState([
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    // Daha fazla item ekleyebilirsiniz
  ]);

  useEffect(() => {
    // Verilerinizi buradan çekebilirsiniz
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.itemCard}>
      <Card.Content>
        <Title style={styles.itemTitle}>{item.title}</Title>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}  // İki sütunlu bir grid yapısı
          columnWrapperStyle={styles.row}  // Satırları düzgün hizalamak için
        />
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
  itemCard: {
    flex: 1,  // Her card flex konteynırına eşit yer kaplar
    margin: 8,  // Her card arasında 8 birim boşluk
    marginHorizontal: 5,  // Her card arasında yatayda 5 birim boşluk
    backgroundColor: colors.secondary,  // Card arka plan rengi
    borderRadius: 8,  // Card köşe yuvarlaklığı
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,  // Her card'ın yüksekliği
  },
  itemTitle: {
    color: colors.text,
    fontSize: 16,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  }
});
