import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../design/themes';

import { Rating } from 'react-native-ratings';


const initialMealList = [
  { id: 1, date: '24.05.2024', day: 'Cuma', mealType: 'Kahvaltı', calorie: 500, menu: ['Yumurta', 'Zeytin', 'Peynir', 'Domates'], averageRating: null, totalRating: null, countRating: null },
  { id: 2, date: '24.05.2024', day: 'Cuma', mealType: 'Öğle Yemeği', calorie: 966, menu: ['Domates Çorba', 'Etli Kuru Fasulye', 'Bulgur Pilav', 'Yoğurt'], averageRating: null, totalRating: null, countRating: null },
  { id: 3, date: '24.05.2024', day: 'Cuma', mealType: 'Akşam Yemeği', calorie: 800, menu: ['Mercimek Çorba', 'Tavuk Şiş', 'Pilav', 'Salata'], averageRating: null, totalRating: null, countRating: null },
  { id: 4, date: '25.05.2024', day: 'Cumartesi', mealType: 'Kahvaltı', calorie: 400, menu: ['Poğaça', 'Süt', 'Bal', 'Reçel'], averageRating: null, totalRating: null, countRating: null },
  { id: 5, date: '25.05.2024', day: 'Cumartesi', mealType: 'Öğle Yemeği', calorie: 850, menu: ['Tavuk Çorba', 'Sebzeli Makarna', 'Yoğurt', 'Meyve'], averageRating: null, totalRating: null, countRating: null },
  { id: 6, date: '25.05.2024', day: 'Cumartesi', mealType: 'Akşam Yemeği', calorie: 700, menu: ['Balık Çorba', 'Izgara Köfte', 'Bulgur Pilavı', 'Cacık'], averageRating: null, totalRating: null, countRating: null },
  { id: 7, date: '26.05.2024', day: 'Pazar', mealType: 'Kahvaltı', calorie: 450, menu: ['Simit', 'Çay', 'Zeytin', 'Peynir'], averageRating: null, totalRating: null, countRating: null },
  { id: 8, date: '26.05.2024', day: 'Pazar', mealType: 'Öğle Yemeği', calorie: 920, menu: ['Yoğurt Çorbası', 'Karnabahar Yemeği', 'Pilav', 'Ayran'], averageRating: null, totalRating: null, countRating: null },
  { id: 9, date: '26.05.2024', day: 'Pazar', mealType: 'Akşam Yemeği', calorie: 750, menu: ['Domates Çorbası', 'Köfte', 'Patates Kızartması', 'Meyve'], averageRating: null, totalRating: null, countRating: null },
  { id: 10, date: '27.05.2024', day: 'Pazartesi', mealType: 'Kahvaltı', calorie: 480, menu: ['Yulaf Ezmesi', 'Meyve Suyu', 'Peynir', 'Zeytin'], averageRating: null, totalRating: null, countRating: null },
  { id: 11, date: '27.05.2024', day: 'Pazartesi', mealType: 'Öğle Yemeği', calorie: 900, menu: ['Mercimek Çorbası', 'Tavuk Sote', 'Bulgur Pilavı', 'Yoğurt'], averageRating: null, totalRating: null, countRating: null },
  { id: 12, date: '27.05.2024', day: 'Pazartesi', mealType: 'Akşam Yemeği', calorie: 780, menu: ['Domates Çorbası', 'Izgara Balık', 'Pilav', 'Salata'], averageRating: null, totalRating: null, countRating: null },
  { id: 13, date: '28.05.2024', day: 'Salı', mealType: 'Kahvaltı', calorie: 420, menu: ['Sandviç', 'Süt', 'Marmelat', 'Çay'], averageRating: null, totalRating: null, countRating: null },
  { id: 14, date: '28.05.2024', day: 'Salı', mealType: 'Öğle Yemeği', calorie: 850, menu: ['Tavuk Çorbası', 'Makarna', 'Yoğurt', 'Meyve'], averageRating: null, totalRating: null, countRating: null },
  { id: 15, date: '28.05.2024', day: 'Salı', mealType: 'Akşam Yemeği', calorie: 700, menu: ['Mercimek Çorbası', 'Izgara Tavuk', 'Bulgur Pilavı', 'Meyve'], averageRating: null, totalRating: null, countRating: null },
  { id: 16, date: '29.05.2024', day: 'Çarşamba', mealType: 'Kahvaltı', calorie: 480, menu: ['Omlet', 'Süt', 'Reçel', 'Ekmek'], averageRating: null, totalRating: null, countRating: null },
  { id: 17, date: '29.05.2024', day: 'Çarşamba', mealType: 'Öğle Yemeği', calorie: 900, menu: ['Domates Çorbası', 'Kıymalı Patates Yemeği', 'Pilav', 'Yoğurt'], averageRating: null, totalRating: null, countRating: null },
  { id: 18, date: '29.05.2024', day: 'Çarşamba', mealType: 'Akşam Yemeği', calorie: 750, menu: ['Mercimek Çorbası', 'Fırında Tavuk', 'Bulgur Pilavı', 'Salata'], averageRating: null, totalRating: null, countRating: null },
  { id: 19, date: '30.05.2024', day: 'Perşembe', mealType: 'Kahvaltı', calorie: 420, menu: ['Poğaça', 'Çay', 'Peynir', 'Zeytin'], averageRating: null, totalRating: null, countRating: null },
  { id: 20, date: '30.05.2024', day: 'Perşembe', mealType: 'Öğle Yemeği', calorie: 850, menu: ['Tavuk Çorbası', 'Makarna', 'Yoğurt', 'Meyve'], averageRating: null, totalRating: null, countRating: null },
  { id: 21, date: '30.05.2024', day: 'Perşembe', mealType: 'Akşam Yemeği', calorie: 700, menu: ['Domates Çorbası', 'Izgara Köfte', 'Bulgur Pilavı', 'Meyve'], averageRating: null, totalRating: null, countRating: null },
  { id: 22, date: '31.05.2024', day: 'Cuma', mealType: 'Kahvaltı', calorie: 500, menu: ['Yumurta', 'Zeytin', 'Peynir', 'Domates'], averageRating: null, totalRating: null, countRating: null },
  { id: 23, date: '31.05.2024', day: 'Cuma', mealType: 'Öğle Yemeği', calorie: 966, menu: ['Domates Çorba', 'Etli Kuru Fasulye', 'Bulgur Pilav', 'Yoğurt'], averageRating: null, totalRating: null, countRating: null },
  { id: 24, date: '31.05.2024', day: 'Cuma', mealType: 'Akşam Yemeği', calorie: 800, menu: ['Mercimek Çorba', 'Tavuk Şiş', 'Pilav', 'Salata'], averageRating: null, totalRating: null, countRating: null },
  { id: 25, date: '01.06.2024', day: 'Cumartesi', mealType: 'Kahvaltı', calorie: 400, menu: ['Poğaça', 'Süt', 'Bal', 'Reçel'], averageRating: null, totalRating: null, countRating: null },
  { id: 26, date: '01.06.2024', day: 'Cumartesi', mealType: 'Öğle Yemeği', calorie: 850, menu: ['Tavuk Çorba', 'Sebzeli Makarna', 'Yoğurt', 'Meyve'], averageRating: null, totalRating: null, countRating: null },
  { id: 27, date: '01.06.2024', day: 'Cumartesi', mealType: 'Akşam Yemeği', calorie: 700, menu: ['Balık Çorba', 'Izgara Köfte', 'Bulgur Pilavı', 'Cacık'], averageRating: null, totalRating: null, countRating: null },
  { id: 28, date: '02.06.2024', day: 'Pazar', mealType: 'Kahvaltı', calorie: 450, menu: ['Simit', 'Çay', 'Zeytin', 'Peynir'], averageRating: null, totalRating: null, countRating: null },
  { id: 29, date: '02.06.2024', day: 'Pazar', mealType: 'Öğle Yemeği', calorie: 920, menu: ['Yoğurt Çorbası', 'Karnabahar Yemeği', 'Pilav', 'Ayran'], averageRating: null, totalRating: null, countRating: null },
  { id: 30, date: '02.06.2024', day: 'Pazar', mealType: 'Akşam Yemeği', calorie: 750, menu: ['Domates Çorbası', 'Köfte', 'Patates Kızartması', 'Meyve'], averageRating: null, totalRating: null, countRating: null }
];

const PAGE_SIZE = 3;

const DiningMenuScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mealList, setMealList] = useState(initialMealList);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchMeals = async () => {
      const storedMeals = await loadMealsFromStorage();
      setMealList(storedMeals);
    };

    fetchMeals();
  }, []);

  const saveMealsToStorage = async (meals) => {
    try {
      const jsonValue = JSON.stringify(meals);
      await AsyncStorage.setItem('@meal_list', jsonValue);
    } catch (e) {
      // Hata ile başa çık
      console.error("Error saving meals to storage", e);
    }
  };

  const loadMealsFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@meal_list');
      return jsonValue != null ? JSON.parse(jsonValue) : initialMealList;
    } catch (e) {
      // Hata ile başa çık
      console.error("Error loading meals from storage", e);
      return initialMealList;
    }
  };


  const resetRatings = async () => {
    const resetMealList = mealList.map(meal => ({
      ...meal,
      averageRating: null,
      totalRating: null,
      countRating: null
    }));
  
    try {
      const jsonValue = JSON.stringify(resetMealList);
      await AsyncStorage.setItem('@meal_list', jsonValue);
      setMealList(resetMealList); // State'i de güncelleyin
    } catch (e) {
      // Hata ile başa çık
      console.error("Error resetting ratings", e);
    }
  };

  
  const handleRating = async (meal, rating) => {
    const updatedMealList = mealList.map(item => {
      if (item.id === meal.id) {
        const newTotalRating = (item.totalRating || 0) + rating;
        const newCountRating = (item.countRating || 0) + 1;
        const newAverageRating = newTotalRating / newCountRating;
        return {
          ...item,
          totalRating: newTotalRating,
          countRating: newCountRating,
          averageRating: newAverageRating.toFixed(1), // Keep one decimal point
        };
      }
      return item;
    });

    setMealList(updatedMealList);
    await saveMealsToStorage(updatedMealList);
    setSelectedMeal(null);
    setRatingModalVisible(false);
  };

  const openRatingModal = (meal) => {
    setRating(0);
    setSelectedMeal(meal);
    setRatingModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.mealContainer}>
      <Text style={styles.date}>{item.date} {item.day}</Text>
      <Text style={styles.mealType}>{item.mealType}</Text>
      <Text style={styles.calorie}>Kalori: {item.calorie}</Text>
      <Text style={styles.menuTitle}>Menü:</Text>
      {item.menu.map((menuItem, index) => (
        <Text key={index} style={styles.menuItem}>{menuItem}</Text>
      ))}
      <Text style={styles.rating}>Puan: {item.averageRating ? item.averageRating : 'Değerlendirilmedi'} ({item.countRating ? item.countRating : 0})</Text>
      <TouchableOpacity style={styles.ratingButton} onPress={() => openRatingModal(item)}>
        <Text style={styles.ratingButtonText}>Değerlendir</Text>
      </TouchableOpacity>
    </View>
  );

  const totalPages = Math.ceil(mealList.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = mealList.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return (
      <View style={styles.paginationContainer}>
        {pages.map((page, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.pageButton,
              currentPage === page && styles.activePageButton
            ]}
            onPress={() => page !== '...' && handlePageChange(page)}
          >
            <Text style={styles.pageButtonText}>{page}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.heading}>Yemekhane Listesi</Text>
      <FlatList
        data={currentData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      {renderPagination()}

      <Modal
        animationType="slide"
        transparent={true}
        visible={ratingModalVisible}
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yemek Değerlendir</Text>
            <Text style={styles.modalMealName}>{selectedMeal?.mealType} - {selectedMeal?.date}</Text>
            <Rating
              startingValue={0}
              showRating
              onFinishRating={(rating) => setRating(rating)}
              style={{ paddingVertical: 10 }}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Vazgeç"
                onPress={() => setRatingModalVisible(false)}
              />
              <Button
                title="Puan Ver"
                onPress={() => handleRating(selectedMeal, rating)}
                disabled={rating === 0}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Button title="Ratingleri Sıfırla" onPress={resetRatings} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  mealContainer: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.text,
  },
  mealType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.secondary,
  },
  calorie: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.text,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.text,
  },
  menuItem: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.text,
  },
  rating: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.text,
  },
  ratingButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end'
  },
  ratingButtonText: {
    color: colors.text,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  pageButton: {
    margin: 5,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: colors.secondary,
  },
  pageButtonText: {
    color: colors.text,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMealName: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  }
});

export default DiningMenuScreen;
