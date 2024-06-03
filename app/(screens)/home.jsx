import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, PanResponder } from 'react-native';
import Swiper from 'react-native-swiper';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { ikraAxios, urlDev, url } from '../common';
import Carousel from 'react-native-reanimated-carousel';
import { colors, text } from '../../design/themes';


const Home = ({ navigation }) => {
  const [balance, setBalance] = useState(0.0)
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState(0)

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [announcementImages, setAnnouncementImages] = useState([])

  const announcementSuccessHandler = (data) => {
    if (data.status === 'SUCCESS') {
      let announcements = []
      let announcementResponse = data.body;
      announcementResponse.forEach(response => {
        let obj;
        let title = response.title
        if (title.length > 37) {
          title = title.slice(0,34)
          title += "..."
        }
        if (response.image) {
          obj = {
            base64: "data:" + response.mimeType + ";base64," + response.image,
            id: response.id,
            title: title
          }
        }
        else {
          obj = {
            id: response.id,
            title: title
          }
        }
        announcements.push(obj)
      });
      setAnnouncementImages(announcements);
    }
  }

  const handleCardSuccess = (data) => {
    if (data.status === 'SUCCESS') {
      setBalance(data.body.balance)
      setName(data.body.name)
      setStudentId(data.body.studentId)
      return
    }
    setName("Cüzdan verileriniz getirilirken hata oluştu.")
  }
  useEffect(() => { 
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

    const fetchCard = () => {
      ikraAxios({
        url: urlDev + '/wallets',
        method: 'GET',
        onSuccess: handleCardSuccess,
        onError: () => {
          setLoading(false);
          alert("Ana sayfa için duyurular getirilirken hata oluştu!" + error?.message? error.message : "Bilinmeyen")
        },
        tokenRequired: true,
      })
    }
    fetchCard();
  }, []);


  const handleAnnouncementClick = (id) => {
    console.log(id)
  };

  const [isDragging, setIsDragging] = useState(false);

  const renderItem = ({ item }) => (
    <View
      onTouchStart={() => setIsDragging(false)}
      onTouchMove={() => setIsDragging(true)}
      onTouchEnd={() => {
        if (!isDragging) {
          handleAnnouncementClick(item.id);
        }
      }}
    >
      <View>
        <Image 
          source={item.base64 ? { uri: item.base64 } : require('../../assets/images/placeholder.png')} 
          style={styles.image} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{item.title}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sliderContainer}>
        <Carousel
          data={announcementImages}
          renderItem={renderItem}
          width={width}
          height={height*0.25}
          autoPlay
          loop
          autoPlayInterval = {100000}
          onSnapToItem={null}
          scrollAnimationDuration={1000}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
        />
      </View>

      {/* Card Balance Display */}
      <View style={styles.balanceContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.studentNo}>{studentId}</Text>
          <Text style={styles.balanceLabel}>Bakiye</Text>
          <Text style={styles.balance}>{balance} TL</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button labelStyle={styles.buttonLabel} style={styles.button} onPress={null}>
            PAYLAŞ
          </Button>
          <Button labelStyle={styles.buttonLabel} style={styles.button} onPress={() => console.log('Tümü')}>
            TÜMÜ
          </Button>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sliderContainer: {
    borderRadius: 5,
    height: 200,
  },
  image: {
    height: 200,
    resizeMode: 'contain'
  },
  dotStyle: {
    backgroundColor: '#90A4AE',
  },
  activeDotStyle: {
    backgroundColor: '#FF6347',
  },
  textContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 0,
  },
  titleText: {
    left: 2,
    textTransform: 'uppercase',
    right:2,
    color: 'white',
    fontSize: 20,
    fontWeight: 'thin',
  },
  balanceContainer: {
    margin: 15,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: colors.background,
    borderColor: colors.primary
  },
  infoContainer: {
    margin: 10,
    flex:3,
  },
  name: {
    color: colors.primary, 
    fontWeight: '500',// White text color
    fontSize: 20,
  },
  studentNo: {
    color: colors.secondary, // Light gray text color
    fontSize: 14,
    marginBottom: 24,
  },
  balanceLabel: {
    color: text.primaryDark, // Gray text color
    fontSize: 14,
  },
  balance: {
    color: colors.primary, // White text color
    fontSize: 28,
  },
  buttonContainer: {
    flex:1,
    marginRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  button: {
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
  },
  buttonLabel: {
    color: colors.primary,
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
