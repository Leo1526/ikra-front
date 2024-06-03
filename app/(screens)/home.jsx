import React, { useState, useEffect  } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Card, Title, Paragraph } from 'react-native-paper';
import { ikraAxios, urlDev, url } from '../common';


const Home = ({ navigation }) => {
  const [announcementImages, setAnnouncementImages] = useState([])

  const announcementSuccessHandler = (data) => {
    if (data.status === 'SUCCESS' || data.body) {
      console.log(data.body)
    }
  }
  console.log("buradasın")
  useEffect(() => { 
    console.log("buradasın")
    const fetchAnnouncements = () => {
      ikraAxios({
        url: urlDev + '/announcement/all',
        method: 'GET',
        onSuccess: announcementSuccessHandler,
        onError: (error) => {
          setLoading(false);
          alert("Ana sayfa için duyurular getirilirken hata oluştu!" + error?.message? error.message : "Bilinmeyen")
        },
        tokenRequired: true
      });
    };
    fetchAnnouncements();
  }, []);


  const handleAnnouncementClick = (id) => {
    // Navigate to the respective announcement page
    // navigation.navigate('Announcement', { id });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Sliding Announcement Photos */}
      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          loop
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          onIndexChanged={(index) => handleAnnouncementClick(announcementImages[index].id)}
        >
          {announcementImages.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => handleAnnouncementClick(image.id)}>
              <Image source={{ uri: image.url }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </Swiper>
      </View>

      {/* Card Balance Display */}
      <View style={styles.balanceContainer}>
        <Card>
          <Card.Content>
            <Title>Card Balance</Title>
            <Paragraph>100 TL</Paragraph>
          </Card.Content>
        </Card>
      </View>

      {/* Navigation Icon Buttons */}
      <View style={styles.iconContainer}>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Page1')}>
            <Image source={{ uri: 'https://example.com/icon1.png' }} style={styles.icon} />
            <Text>Page 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Page2')}>
            <Image source={{ uri: 'https://example.com/icon2.png' }} style={styles.icon} />
            <Text>Page 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Page3')}>
            <Image source={{ uri: 'https://example.com/icon3.png' }} style={styles.icon} />
            <Text>Page 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Page4')}>
            <Image source={{ uri: 'https://example.com/icon4.png' }} style={styles.icon} />
            <Text>Page 4</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Page5')}>
            <Image source={{ uri: 'https://example.com/icon5.png' }} style={styles.icon} />
            <Text>Page 5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Page6')}>
            <Image source={{ uri: 'https://example.com/icon6.png' }} style={styles.icon} />
            <Text>Page 6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Page7')}>
            <Image source={{ uri: 'https://example.com/icon7.png' }} style={styles.icon} />
            <Text>Page 7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Page8')}>
            <Image source={{ uri: 'https://example.com/icon8.png' }} style={styles.icon} />
            <Text>Page 8</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  sliderContainer: {
    height: 200,
  },
  image: {
    width: width,
    height: 200,
  },
  dotStyle: {
    backgroundColor: '#90A4AE',
  },
  activeDotStyle: {
    backgroundColor: '#FF6347',
  },
  balanceContainer: {
    margin: 20,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default Home;
