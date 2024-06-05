import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../design/themes';
import { ikraAxios, urlDev } from '../common';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';


const PAGE_SIZE = 3;

const DiningMenuScreen = () => {
  const [refreshVal, setRefreshVal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [mealList, setMealList] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchMeals();
  }, [refreshVal]);

  const fetchMeals = async () => {
    console.log(urlDev + '/meal?page=' + page + '&size=3');
    await ikraAxios({
      url: urlDev + '/meal?page=' + page + '&size=3',
      onSuccess: (data) => {
        setMealList(prevMealList => [...prevMealList, ...data.body]);
        setPage(page + 1);
        console.log(data);
      },
      onError: (error) => {
        console.error('Error fetching meal data:', error);
      },
    });
  };

  const handleRating = async (meal, rating) => {
    await ikraAxios({
      url: urlDev + '/mealReview?mealId=' + meal + '&points=' + rating,
      method: 'POST',
      onSuccess: (data) => {
        setRefreshVal(refreshVal+1)
        setRatingModalVisible(false);
      },
      onError: (error) => {
        console.error('Error submitting rating:', error);
      },
    });

    
  };

  const openRatingModal = (meal) => {
    setRating(meal.usersReview);
    setSelectedMeal(meal);
    setRatingModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.mealContainer}>
      <View style={styles.mealHeader}>
        <Text style={styles.date}>{item.date.split("-")[2]}.{item.date.split("-")[1]}.{item.date.split("-")[0]}</Text>
      </View>
      <View style={styles.menuContainer}>
        <Text style={styles.menu}>{item.menu}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.starContainer}>
          <Icon name="star" size={16} color={colors.text} />
          <Text style={styles.rating}>
            {item.avgRating ? item.avgRating : 'Değerlendirilmedi'} ({item.reviewCount ? item.reviewCount : 0})
          </Text>
        </View>
        <TouchableOpacity style={styles.ratingButton} onPress={() => openRatingModal(item)}>
          <Text style={styles.ratingButtonText}>Değerlendir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const totalPages = Math.ceil(mealList.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = mealList.slice(startIndex, endIndex);

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchMeals();
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handlePageChange('prev')} style={styles.iconButton}>
            <Icon name="chevron-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.heading}>Yemek Listesi</Text>
          <TouchableOpacity onPress={() => handlePageChange('next')} style={styles.iconButton}>
            <Icon name="chevron-right" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={currentData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      </View>
      

      <Modal
        animationType="slide"
        transparent={true}
        visible={ratingModalVisible}
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yemek Değerlendir</Text>
            <Rating
              startingValue={rating}
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
                onPress={() => handleRating(selectedMeal.id, rating)}
                disabled={rating === 0}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingVertical: 0
  },
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    flex: 1,
  },
  list: {
    paddingBottom: 20,
  },
  mealContainer: {
    backgroundColor: colors.background,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  menu: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 5,
  },
  ratingButton: {
    backgroundColor: colors.secondary,
    padding: 5,
    borderRadius: 5,
  },
  ratingButtonText: {
    color: colors.text,
    fontSize: 14,
  },
  iconButton: {
    padding: 10,
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  loadMoreButtonText: {
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
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default DiningMenuScreen;
