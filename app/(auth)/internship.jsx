import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../design/themes'; 
import { images } from "../../constants";

import { urlDev, ikraAxios } from '../common';

const PAGE_SIZE = 10;

const InternshipScreen = () => {
  const [internshipListings, setInternshipListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
        const response = await ikraAxios({
          url: urlDev + '/jobs/jobAdvertsByDepartmentId',
          onSuccess: (data) => {
          },
          onError: (error) => {
            console.error('Error fetching jobs data:', error);
          },
        });
    
        console.log(response);  // API'den dönen tüm veriyi konsola yazdır
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
      <Image source={images.logo} style={styles.companyLogo} />
      <View>
        <Text style={styles.internshipDepartment}>{item.companyName}</Text>
        <Text style={styles.internshipCompany}>{item.companyWebsite}</Text>
        <Text style={styles.internshipDescription}>{item.description}</Text>
        <Text style={styles.internshipContact}>İletişim: {item.applicationLink}</Text>
        <Text style={styles.internshipAddress}>Adres: {item.name}</Text>
        <Text style={styles.internshipDeadline}>Son Başvuru Tarihi: {item.applicationDeadline}</Text>
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
  internshipContainer: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  companyLogo: {
    width: 150,
    height: 64,
    alignSelf: "center",
    resizeMode: "contain"
  },
  internshipDepartment: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.secondary,
  },
  internshipCompany: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  internshipDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.text,
  },
  internshipContact: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.text,
  },
  internshipAddress: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.text,
  },
  internshipDeadline: {
    fontSize: 14,
    color: colors.text,
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
});

export default InternshipScreen;