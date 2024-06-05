import React, { useState, useEffect, useRef } from 'react';
import { View, RefreshControl,Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, PanResponder } from 'react-native';
import Swiper from 'react-native-swiper';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { ikraAxios, urlDev, url } from '../common';
import Carousel from 'react-native-reanimated-carousel';
import { colors, text } from '../../design/themes';
import * as Clipboard from 'expo-clipboard';


const Home = ({ navigation }) => {
  const [refreshVal, setRefreshVal] = useState(0)
  const [balance, setBalance] = useState(0.0)
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState(0)

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [announcementImages, setAnnouncementImages] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  // Refresh fonksiyonunu tanımlayın
  const onRefresh = () => {
    setRefreshing(true);
    setRefreshVal(refreshVal+1);
    // Burada API çağrısı yapılabilir veya başka bir işlem gerçekleştirilebilir
    // Örneğin, veri yenileme işlemi burada simüle ediliyor
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);  // 2 saniye sonra refreshing'i false yap
  };
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
      return 
    }
    alert("Hata oluştu: " + data.messages[0])
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
          alert("Ana sayfa için cüzdan getirilirken hata oluştu!" + error?.message? error.message : "Bilinmeyen")
        },
        tokenRequired: true,
      })
    }
    fetchCard();
  }, [refreshVal]);


  const handleAnnouncementClick = (id) => {
    console.log(id)
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(studentId);
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
    <ScrollView style={styles.container}      refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
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
          <View style={styles.bakiyeContainer}>
            <Text style={styles.currency}>₺</Text>
            <Text style={styles.balance}>{balance}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button labelStyle={styles.buttonLabel} style={styles.button} onPress={copyToClipboard}>
            PAYLAŞ
          </Button>
          <Button onPress={() => navigation.navigate('finance')} labelStyle={styles.buttonLabel} style={styles.button} >
            TÜMÜ
          </Button>
        </View>
      </View>

      <View style={styles.iconContainer}>
      <View style={styles.iconRow}>
        <TouchableOpacity style={[styles.iconButton, styles.borderBottomOnly]} onPress={() => navigation.navigate('courses')}>
          <View style={styles.pngContainer}>
            <Image source={require("./../../assets/icons/school.png")} style={styles.icon} />
          </View>
          <Text style={styles.menuLabel}>Dersler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.middleElement]} onPress={() => navigation.navigate('announcements')}>
          <View style={styles.pngContainer}>
            <Image source={require("../../assets/icons/announcement.png")} style={styles.icon} />
          </View>
          <Text style={styles.menuLabel}>Duyurular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.borderBottomOnly]} onPress={() => navigation.navigate('dining')}>
          <View style={styles.pngContainer}>
            <Image source={require("../../assets/icons/dining.png")} style={styles.icon} />
          </View>
          <Text style={styles.menuLabel}>Yemek Listesi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('lostItems')}>
          <View style={styles.pngContainer}>
            <Image source={require("../../assets/icons/lost-item.png")} style={styles.icon} />
          </View>
          <Text style={styles.menuLabel}>Kayıp Eşya</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.middleElementSecondRow]} onPress={() => navigation.navigate('requests')}>
          <View style={styles.pngContainer}>
            <Image source={require("../../assets/icons/request.png")} style={styles.icon} />
          </View>
          <Text style={styles.menuLabel}>İstekler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('internship')}>
          <View style={styles.pngContainer}>
            <Image source={require("../../assets/icons/internship.png")} style={styles.icon} />
          </View>
          <Text style={styles.menuLabel}>Stajlar</Text>
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
    marginTop: 30,
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
    fontWeight: '400',// White text color
    fontSize: 20,
  },
  studentNo: {
    color: colors.secondary, // Light gray text color
    fontSize: 15,
    marginBottom: 24,
  },
  balanceLabel: {
    color: colors.primary, // Gray text color
    fontSize: 14,
  },
  balance: {
    color: colors.primary, // White text color
    fontSize: 48,
  },
  bakiyeContainer : {
    flexDirection: 'row',
    color: colors.primary, // White text color
    alignItems: 'baseline', // Aligns the baseline of the text
  },
  currency: {
    color: colors.primary,
    fontSize: 24, // Smaller font size for the currency symbol
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
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    width: '90%', // Adjust as needed
  },
  iconButton: {
    alignItems: 'center',
    flex: 1,
    padding: 10, // Add padding for better spacing
  },
  borderBottomOnly: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryDark,
  },
  middleElement: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.primaryDark,
  },
  middleElementSecondRow: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.primaryDark,
  },
  pngContainer: {
    width: 70, // Set a fixed width
    height: 70, // Set a fixed height
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40, // Smaller width for the icon
    height: 40, // Smaller height for the icon
  },
  menuLabel: {
    marginTop: 4,
    color: colors.primaryDark
  },
});

export default Home;
