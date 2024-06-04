import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, Image } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { Avatar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { ikraAxios, url, urlDev } from '../common';

const hoursSpentMapping = {
  ZERO_FIVE: "0-5",
  FIVE_TEN: "5-10",
  TEN_FIFTEEN: "10-15",
  FIFTEEN_TWENTY: "15-20",
  TWENTY_TWENTYFIVE: "20-25",
  TWENTYFIVE_THIRTY: "25-30"
};

const Comment = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <Avatar.Text size={40} label={item.userInitials} />
        <View style={styles.commentHeaderText}>
          <AirbnbRating
            count={5}
            reviews={[]}
            defaultRating={item.quality}
            size={15}
            isDisabled={true}
            showRating={false}
          />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
      <Text>{item.comment}</Text>
      {!expanded && (
        <TouchableOpacity onPress={() => setExpanded(true)}>
          <Text style={styles.showMoreText}>Daha fazla göster</Text>
        </TouchableOpacity>
      )}
      {expanded && (
        <View>
          <Text>Ders Zorluğu: {item.difficulty}/10</Text>
          <Text>Alınan Not: {item.courseGrade}</Text>
          <Text>Harcanan Saat: {hoursSpentMapping[item.hoursSpent]}</Text>
          <TouchableOpacity onPress={() => setExpanded(false)}>
            <Text style={styles.showMoreText}>Daha az göster</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const ITEMS_PER_PAGE = 10;

const CommentsPage = () => {
  route = useRoute();
  course = route.params;
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noMoreComments, setNoMoreComments] = useState(false);


  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    if(noMoreComments) return;
    if (loading) return;

    setLoading(true);
    try {
      await ikraAxios({
        url: `${urlDev}/courseStats/byCourseId?courseId=${course.id}&page=${page}&size=${ITEMS_PER_PAGE}`,
        method: 'GET',
        onSuccess: (data) => {
          if(data.body.length === 0){
            setNoMoreComments(true);
          }
          setComments((prevComments) => [...prevComments, ...data.body]);
          setPage((prevPage) => prevPage + 1);
        },
        onError: (error) => {
          console.error('Error fetching meal data:', error);
        },
      });
    } catch (error) {
      console.error('Error in fetchProposals:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return <Comment item={item} />;
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>{course.name}</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={fetchComments}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <Text>Yükleniyor...</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flatListContent: {
    padding: 10,
  },
  commentCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentHeaderText: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  dateText: {
    color: '#888',
    marginLeft: 10,
    flex: 1,
    textAlign: 'right',
  },
  showMoreText: {
    color: '#007bff',
    marginTop: 10,
  },
});

export default CommentsPage;