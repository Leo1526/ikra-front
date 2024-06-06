import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../design/themes";
import { urlDev, ikraAxios } from "../common";
import { commonStyle } from "../../design/style";

const PAGE_SIZE = 5;

const InternshipScreen = () => {
  const [internshipListings, setInternshipListings] = useState([]);
  const [displayedInternships, setDisplayedInternships] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    setLoading(true);
    try {
      await ikraAxios({
        url: urlDev + "/jobs/jobAdvertsByDepartmentId",
        onSuccess: (data) => {
          setInternshipListings(data.body);
          setDisplayedInternships(data.body.slice(0, PAGE_SIZE));
        },
        onError: (error) => {
          console.error("Error fetching jobs data:", error);
        },
      });
    } catch (error) {
      console.error("Error in fetchInternships:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreInternships = () => {
    const nextPage = displayedInternships.length / PAGE_SIZE;
    const newInternships = internshipListings.slice(
      nextPage * PAGE_SIZE,
      (nextPage + 1) * PAGE_SIZE
    );
    setDisplayedInternships((prevInternships) => [
      ...prevInternships,
      ...newInternships,
    ]);
  };

  const handleUrlPress = (url) => {
    Linking.openURL("https://" + url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.internshipContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `data:${item.jobAdvertImage.mimeType};base64,${item.jobAdvertImage.bytes}`,
          }}
          style={styles.requestImage}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text
          style={[
            commonStyle.textLabel,
            {
              fontSize: 20,
              marginBottom: 15,
              color: colors.secondary,
              alignSelf: "center",
            },
          ]}
        >
          {item.companyName}
        </Text>
        <Text
          style={[
            commonStyle.textLabel,
            {
              fontSize: 16,
              marginBottom: 10,
            },
          ]}
        >
          {item.name}
        </Text>
        <Text style={[commonStyle.generalText, { marginBottom: 10 }]}>
          {item.description}
        </Text>
        <Text style={[{  marginBottom: 10 }]}>
          <Text style={[commonStyle.textLabel, { fontSize: 14 }]}>
            Website:{" "}
          </Text>
          <TouchableOpacity onPress={() => handleUrlPress(item.companyWebsite)}>
            <Text style={styles.linket}>{item.companyWebsite}</Text>
          </TouchableOpacity>
        </Text>
        <Text style={[{ marginBottom: 10 }]}>
          <Text style={[commonStyle.textLabel, { fontSize: 14 }]}>
            Başvuru linki:{" "}
          </Text>
          <TouchableOpacity onPress={() => handleUrlPress(item.applicationLink)}>
            <Text style={styles.linket}>{item.applicationLink}</Text>
          </TouchableOpacity>
        </Text>
        <Text style={[{ marginBottom: 10 }]}>
          <Text style={[commonStyle.textLabel, { fontSize: 14 }]}>
            Son başvuru tarihi:{" "}
          </Text>
          <Text style={[commonStyle.generalText]}>
            {item.applicationDeadline}
          </Text>
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <FlatList
          data={displayedInternships}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          onEndReached={loadMoreInternships}
          onEndReachedThreshold={0.1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
    padding: 20,
  },
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  list: {
    paddingBottom: 20,
  },
  internshipContainer: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: colors.secondary,
    alignSelf: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  requestImage: {
    height: 200,
    width: "100%",
  },

  linket: {
    color: "blue",
    fontSize: 14,
    fontWeight: "bold",
    top: 2,
  },
});

export default InternshipScreen;
