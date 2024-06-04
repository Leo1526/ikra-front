import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../design/themes";
import { images } from "../../constants";

import { urlDev, ikraAxios } from "../common";

const PAGE_SIZE = 10;

const InternshipScreen = () => {
  const [internshipListings, setInternshipListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ikraAxios({
        url: urlDev + "/jobs/jobAdvertsByDepartmentId",
        onSuccess: (data) => {},
        onError: (error) => {
          console.error("Error fetching jobs data:", error);
        },
      });

      console.log(response); // API'den dönen tüm veriyi konsola yazdır
      setInternshipListings(response.body);
    };

    fetchData();

    
  }, []);

  const totalPages = Math.ceil(internshipListings.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = internshipListings.slice(startIndex, endIndex);

  const renderItem = ({ item }) => (
    <View style={styles.internshipContainer}>
      <Image source={images.intern} style={styles.companyPhoto} />
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
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return (
      <View style={styles.paginationContainer}>
        {pages.map((page, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.pageButton,
              currentPage === page && styles.activePageButton,
            ]}
            onPress={() => page !== "..." && handlePageChange(page)}
          >
            <Text style={styles.pageButtonText}>{page}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.heading}>Staj İlanları</Text>
      <FlatList
        data={currentData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
      {renderPagination()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.text,
    textAlign: "center",
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
  companyPhoto: {
    width: 300,
    height: 150,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 20,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: colors.secondary,
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
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
});

export default InternshipScreen;
