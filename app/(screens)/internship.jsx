import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../design/themes";
import { urlDev, ikraAxios } from "../common";

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

  const renderItem = ({ item }) => (
    <View style={styles.internshipContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `data:${item.jobAdvertImage.mimeType};base64,${item.jobAdvertImage.bytes}` }}
          style={styles.requestImage}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text style={styles.companyName}>{item.companyName}</Text>
        <Text style={styles.internshipTitle}>{item.name}</Text>
        <Text style={styles.internshipDescription}>{item.description}</Text>
        <Text style={styles.internshipDescription}>
          <Text style={styles.labelStyle}>Website: </Text>
          {item.companyWebsite}
        </Text>
        <Text style={styles.internshipDescription}>
          <Text style={styles.labelStyle}>Başvuru linki: </Text>
          {item.applicationLink}
        </Text>
        <Text style={styles.internshipDescription}>
          <Text style={styles.labelStyle}>Son başvuru tarihi: </Text>
          {item.applicationDeadline}
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
    alignSelf: 'center',
  },
  internshipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.primary,
  },
  internshipDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.text,
  },
  labelStyle: {
    fontWeight: 'bold',
    color: colors.primary, 
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  requestImage: {
    height: 200,
    width: '100%',
  },
});

export default InternshipScreen;
