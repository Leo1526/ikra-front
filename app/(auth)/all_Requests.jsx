import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { colors } from '../../design/themes';

const RequestsPage = ({ navigation }) => {
  const [requests, setRequests] = useState([]);

  
  const sampleRequests = [
    {
      id: 1,
      imageUrl: "https://example.com/image1.png",
      requestText: "Hangi kahve türünü tercih edersiniz?",
      options: [
        { text: "Türk Kahvesi", percentage: 50 },
        { text: "Filtre Kahve", percentage: 30 },
        { text: "Espresso", percentage: 15 },
        { text: "Cappuccino", percentage: 5 }
      ]
    },
    {
      id: 2,
      imageUrl: null,
      requestText: "En sevdiğiniz mevsim hangisidir?",
      options: [
        { text: "İlkbahar", percentage: 25 },
        { text: "Yaz", percentage: 50 },
        { text: "Sonbahar", percentage: 20 },
        { text: "Kış", percentage: 5 }
      ]
    },
    {
      id: 3,
      imageUrl: "https://example.com/image3.png",
      requestText: "Hangi sporu yapmayı en çok seversiniz?",
      options: [
        { text: "Futbol", percentage: 40 },
        { text: "Basketbol", percentage: 25 },
        { text: "Yüzme", percentage: 20 },
        { text: "Tenis", percentage: 10 },
        { text: "Voleybol", percentage: 5 }
      ]
    }
  ];

  useEffect(() => {
    // API'den talepleri çekmek için kullanılabilir.
    // Şimdilik statik veri kullanıyoruz.
    setRequests(sampleRequests.map(request => ({
      ...request,
      showResults: false,  // Tüm şıkların sonuçlarını gösterme kontrolü
    })));
  }, []);

  const handleOptionPress = (requestId, optionIndex) => {
    setRequests(currentRequests =>
      currentRequests.map(request => {
        if (request.id === requestId) {
          request.showResults =  true;
          return {
            ...request,
            options: request.options.map((option, index) => {
              if (index === optionIndex) {
                return { ...option, selected: true };
              }
              return { ...option, selected: false };
            })
          };
        }
        return request;
      })
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content"   />
      <ScrollView style={styles.scrollView}>
        {requests.map((request) => (
          <Card key={request.id} style={styles.requestCard}>
            {/* {request.imageUrl && <Card.Cover source={{ uri: request.imageUrl }} style={styles.requestImage}  resizeMode='contain'/>} */}
            {request.imageUrl && <Card.Cover source={require('../../assets/images/logo.png')} style={styles.requestImage}  resizeMode='contain'/>}

            <Card.Content>
              <Title style={styles.requestText}>{request.requestText}</Title>
              {request.options.map((option, index) => (
                <TouchableOpacity key={index} style={styles.optionContainer} onPress={() => handleOptionPress(request.id, index)}>
                  <View  style={[styles.optionBackground, { backgroundColor: colors.text } ]}>
                    <Text style={styles.optionText}>{option.text}</Text>
                    {request.showResults && (
                      <View style={[styles.progressBar, { backgroundColor: option.selected ? colors.secondary : colors.primary }, { width: `${option.percentage}%` }]}/>
                    )}
                  </View>
                  {request.showResults && (
                    <Text style={styles.percentageText}>{option.percentage}%</Text>
                  )}
                </TouchableOpacity>
              ))}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scrollView: {
    flex: 1,
    padding: 10,
    paddingTop: (StatusBar.currentHeight || 20)  + 5, // Cihazın status bar yüksekliğini dikkate alır
  },
  requestCard: {
    marginBottom: 10,
    elevation: 3
  },
  requestImage: {
    height: 200,
    backgroundColor: colors.text
  },
  requestText: {
    fontSize: 18,
    marginBottom: 8
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  optionBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    position: 'relative',
    backgroundColor: 'rgba(0, 123, 255, 0.2)'
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.primary
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    zIndex: 1
  },
  percentageText: {
    width: 50,
    fontSize: 16,
    color: colors.background,
    fontWeight: 'bold',
    textAlign: 'right'
  }
});

export default RequestsPage;
