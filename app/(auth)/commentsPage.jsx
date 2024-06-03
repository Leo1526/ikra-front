import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, Image } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { Avatar } from 'react-native-paper';

const exampleCommentsResponse = {
  comments: [
    {
      id: 1,
      userName: 'Ali',
      date: '2023-06-01',
      commentText: "Bu ders çok faydalıoydı.",
      qualityRating: 4,
      difficultyRating: 7,
      grade: "A1",
      hoursSpent: "10-15"
    },
    {
      id: 2,
      userName: 'Ayşe',
      date: '2023-06-02',
      commentText: "Dersin içeriği çok zengin.",
      qualityRating: 5,
      difficultyRating: 5,
      grade: "A2",
      hoursSpent: "15-20"
    },
    {
      id: 3,
      userName: 'Veli',
      date: '2023-06-03',
      commentText: "Zorluğu oldukça iyiydi.",
      qualityRating: 3,
      difficultyRating: 8,
      grade: "B1",
      hoursSpent: "20-25"
    },
    {
      id: 4,
      userName: 'Fatma',
      date: '2023-06-04',
      commentText: "Eğitmenler çok yardımcı oldu.",
      qualityRating: 4,
      difficultyRating: 6,
      grade: "B2",
      hoursSpent: "10-15"
    },
    {
      id: 5,
      userName: 'Mehmet',
      date: '2023-06-05',
      commentText: "Bu ders gerçekten harikaydı.",
      qualityRating: 5,
      difficultyRating: 7,
      grade: "A1",
      hoursSpent: "15-20"
    },
    {
      id: 6,
      userName: 'Zeynep',
      date: '2023-06-06',
      commentText: "İçerik çok detaylıydı.",
      qualityRating: 4,
      difficultyRating: 5,
      grade: "A2",
      hoursSpent: "20-25"
    },
    {
      id: 7,
      userName: 'Ahmet',
      date: '2023-06-07',
      commentText: "Ders süperdi.",
      qualityRating: 5,
      difficultyRating: 4,
      grade: "A3",
      hoursSpent: "25-30"
    },
    {
      id: 8,
      userName: 'Elif',
      date: '2023-06-08',
      commentText: "Zorluk seviyesi oldukça iyiydi.",
      qualityRating: 3,
      difficultyRating: 8,
      grade: "B1",
      hoursSpent: "0-5"
    },
    {
      id: 9,
      userName: 'Cem',
      date: '2023-06-09',
      commentText: "Ders çok iyi işlendi.",
      qualityRating: 5,
      difficultyRating: 6,
      grade: "B2",
      hoursSpent: "5-10"
    },
    {
      id: 10,
      userName: 'Yasemin',
      date: '2023-06-10',
      commentText: "Çok verimli bir dersti.",
      qualityRating: 5,
      difficultyRating: 7,
      grade: "A1",
      hoursSpent: "10-15"
    },
    {
      id: 11,
      userName: 'Ali',
      date: '2023-06-11',
      commentText: "Bu ders çok faydalıydı.",
      qualityRating: 4,
      difficultyRating: 7,
      grade: "A1",
      hoursSpent: "10-15"
    },
    {
      id: 12,
      userName: 'Ayşe',
      date: '2023-06-12',
      commentText: "Dersin içeriği çok zengin.",
      qualityRating: 5,
      difficultyRating: 5,
      grade: "A2",
      hoursSpent: "15-20"
    },
    {
      id: 13,
      userName: 'Veli',
      date: '2023-06-13',
      commentText: "Zorluğu oldukça iyiydi.",
      qualityRating: 3,
      difficultyRating: 8,
      grade: "B1",
      hoursSpent: "20-25"
    },
    {
      id: 14,
      userName: 'Fatma',
      date: '2023-06-14',
      commentText: "Eğitmenler çok yardımcı oldu.",
      qualityRating: 4,
      difficultyRating: 6,
      grade: "B2",
      hoursSpent: "10-15"
    },
    {
      id: 15,
      userName: 'Mehmet',
      date: '2023-06-15',
      commentText: "Bu ders gerçekten harikaydı.",
      qualityRating: 5,
      difficultyRating: 7,
      grade: "A1",
      hoursSpent: "15-20"
    },
    {
      id: 16,
      userName: 'Zeynep',
      date: '2023-06-16',
      commentText: "İçerik çok detaylıydı.",
      qualityRating: 4,
      difficultyRating: 5,
      grade: "A2",
      hoursSpent: "20-25"
    },
    {
      id: 17,
      userName: 'Ahmet',
      date: '2023-06-17',
      commentText: "Ders süperdi.",
      qualityRating: 5,
      difficultyRating: 4,
      grade: "A3",
      hoursSpent: "25-30"
    },
    {
      id: 18,
      userName: 'Elif',
      date: '2023-06-18',
      commentText: "Zorluk seviyesi oldukça iyiydi.",
      qualityRating: 3,
      difficultyRating: 8,
      grade: "B1",
      hoursSpent: "0-5"
    },
    {
      id: 19,
      userName: 'Cem',
      date: '2023-06-19',
      commentText: "Ders çok iyi işlendi.",
      qualityRating: 5,
      difficultyRating: 6,
      grade: "B2",
      hoursSpent: "5-10"
    },
    {
      id: 20,
      userName: 'Yasemin',
      date: '2023-06-20',
      commentText: "Çok verimli bir dersti.",
      qualityRating: 5,
      difficultyRating: 7,
      grade: "A1",
      hoursSpent: "10-15"
    },
    {
      id: 21,
      userName: 'Ali',
      date: '2023-06-21',
      commentText: "Bu ders çok faydalıydı.",
      qualityRating: 4,
      difficultyRating: 7,
      grade: "A1",
      hoursSpent: "10-15"
    },
    {
      id: 22,
      userName: 'Ayşe',
      date: '2023-06-22',
      commentText: "Dersin içeriği çok zengin.",
      qualityRating: 5,
      difficultyRating: 5,
      grade: "A2",
      hoursSpent: "15-20"
    },
    {
      id: 23,
      userName: 'Veli',
      date: '2023-06-23',
      commentText: "Zorluğu oldukça iyiydi.",
      qualityRating: 3,
      difficultyRating: 8,
      grade: "B1",
      hoursSpent: "20-25"
    },
    {
      id: 24,
      userName: 'Fatma',
      date: '2023-06-24',
      commentText: "Eğitmenler çok yardımcı oldu.",
      qualityRating: 4,
      difficultyRating: 6,
      grade: "B2",
      hoursSpent: "10-15"
    },
    {
      id: 25,
      userName: 'Mehmet',
      date: '2023-06-25',
      commentText: "Bu ders gerçekten harikaydı.",
      qualityRating: 5,
      difficultyRating: 7,
      grade: "A1",
      hoursSpent: "15-20"
    }
  ]
};

const Comment = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <Avatar.Text size={40} label={item.userName.slice(0, 2)} />
        <View style={styles.commentHeaderText}>
          <AirbnbRating
            count={5}
            reviews={[]}
            defaultRating={item.qualityRating}
            size={15}
            isDisabled={true}
            showRating={false}
          />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
      <Text>{item.commentText}</Text>
      {!expanded && (
        <TouchableOpacity onPress={() => setExpanded(true)}>
          <Text style={styles.showMoreText}>Daha fazla göster</Text>
        </TouchableOpacity>
      )}
      {expanded && (
        <View>
          <Text>Ders Zorluğu: {item.difficultyRating}/10</Text>
          <Text>Alınan Not: {item.grade}</Text>
          <Text>Harcanan Saat: {item.hoursSpent}</Text>
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
    //************use params ile ders id çekilecek*********************
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchComments(page);
  }, [page]);

  const fetchComments = async (page) => {
    setLoading(true);
    try {
      const data = exampleCommentsResponse;
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = page * ITEMS_PER_PAGE;
      const newComments = data.comments.slice(startIndex, Math.min(endIndex, data.comments.length));
      setComments((prevComments) => [...prevComments, ...newComments]);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    setLoading(false);
  };

  const renderItem = ({ item }) => {
    return <Comment item={item} />;
  };

  const loadMoreComments = () => {
    if (!loading && comments.length < exampleCommentsResponse.comments.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.logo} />
        <Text style={styles.headerText}>Ders İsmi</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreComments}
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