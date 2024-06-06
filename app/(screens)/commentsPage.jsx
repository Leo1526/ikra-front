import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { Avatar } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { ikraAxios, url, urlDev } from "../common";
import { commonStyle } from "../../design/style";

const hoursSpentMapping = {
  ZERO_FIVE: "0-5",
  FIVE_TEN: "5-10",
  TEN_FIFTEEN: "10-15",
  FIFTEEN_TWENTY: "15-20",
  TWENTY_TWENTYFIVE: "20-25",
  TWENTYFIVE_THIRTY: "25-30",
};

const Comment = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ay 0'dan başlar, bu yüzden 1 eklenir.
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year}
    ${hours}:${minutes}`;
  };

  return (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <Avatar.Text size={40} label={item.userInitials} />
        <View style={styles.commentHeaderText}>
          <AirbnbRating
            count={5}
            reviews={[]}
            defaultRating={item.quality}
            size={20}
            isDisabled={true}
            showRating={false}
          />
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
        </View>
      </View>
      <Text style={commonStyle.generalText}>{item.comment}</Text>
      {!expanded && (
        <TouchableOpacity onPress={() => setExpanded(true)}>
          <Text style={styles.showMoreText}>Daha fazla göster</Text>
        </TouchableOpacity>
      )}
      {expanded && (
        <View>
          <Text style={commonStyle.generalText}>
            Ders Zorluğu: {item.difficulty}/10
          </Text>
          <Text style={commonStyle.generalText}>
            Alınan Not: {item.courseGrade}
          </Text>
          <Text style={commonStyle.generalText}>
            Harcanan Saat: {hoursSpentMapping[item.hoursSpent]}
          </Text>
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
    if (noMoreComments) return;
    if (loading) return;

    setLoading(true);
    try {
      await ikraAxios({
        url: `${urlDev}/courseStats/byCourseId?courseId=${course.id}&page=${page}&size=${ITEMS_PER_PAGE}`,
        method: "GET",
        onSuccess: (data) => {
          console.log(data.body[0]);

          if (data.body.length === 0) {
            setNoMoreComments(true);
          }
          setComments((prevComments) => [...prevComments, ...data.body]);
          setPage((prevPage) => prevPage + 1);
        },
        onError: (error) => {
          console.error("Error fetching meal data:", error);
        },
      });
    } catch (error) {
      console.error("Error in fetchProposals:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return <Comment item={item} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={commonStyle.mainContainer}>
        <Text
          style={[commonStyle.textLabel, { fontSize: 20, textAlign: "center" }]}
        >
          {course.name}
        </Text>
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={fetchComments}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && <Text>Yükleniyor...</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: StatusBar.currentHeight,
  },
  flatListContent: {
    padding: 10,
  },
  commentCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  commentHeaderText: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  dateText: {
    color: "#888",
    marginLeft: 10,
    flex: 1,
    textAlign: "right",
  },
  showMoreText: {
    color: "#007bff",
    marginTop: 10,
  },
});

export default CommentsPage;
