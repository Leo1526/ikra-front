import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { colors } from '../../design/themes';
import { ikraAxios, urlDev } from '../common';

const RequestsPage = ({navigation}) => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noMoreComments, setNoMoreComments] = useState(false);
  const size = 5;

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    if(noMoreComments) return;
    if (loading) return;

    setLoading(true);
    try {
      await ikraAxios({
        url: `${urlDev}/proposals/universityId?page=${page}&size=${size}`,
        onSuccess: (data) => {
          if(data.body.length < size){
            setNoMoreComments(true);
          }
          setRequests((prevRequests) => [...prevRequests, ...data.body]);
          setPage((prevPage) => prevPage + 1);
        },
        onError: (error) => {
          console.error('Error fetching meal data:', error);
        },
      });
    } catch (error) {
      console.error('Error in fetchProposals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionPress = async (requestId, optionId) => {
    try {
      const newRequest = await fetchCreateVote(optionId);
      if (newRequest.body != null) {
        setRequests(prevRequests =>
          prevRequests.map(request =>
            request.id == newRequest.body.id ? newRequest.body : request
          )
        );
      }
    } catch (error) {
      console.error('Error handling option press:', error);
    }
  };

  const fetchCreateVote = async (optionId) => {
    try {
      const response = await ikraAxios({
        url: `${urlDev}/proposalVotes?optionId=${optionId}`,
        method: 'POST',
        onSuccess: (data) => {
          return data.body;
        },
        onError: (error) => {
          console.error('Error creating vote:', error);
        },
      });
      return response;
    } catch (error) {
      console.error('Error in fetchCreateVote:', error);
    }
  };

  const renderRequestItem = ({ item, index }) => (
    <View key={item.id} style={styles.requestCard}>
      {item.image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:${item.image.mimeType};base64,${item.image.bytes}` }}
            style={styles.requestImage}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={styles.requestContent}>
        <Text style={styles.requestText}>{item.proposal}</Text>
        {item.options.map((option) => (
          <TouchableOpacity key={option.id} style={styles.optionContainer} onPress={() => handleOptionPress(item.id, option.id)}>
            <View style={styles.optionRow}>
              <View style={[styles.dot, { backgroundColor: item.usersVote === option.id ? colors.secondary : colors.primary }]} />
              <Text style={styles.optionText}>{option.description}</Text>
            </View>
            {item.userHasVoted && (
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${option.votePct * 100}%`, backgroundColor: colors.primary }]}>
                  <Text style={styles.percentageText}>{`${Math.round(option.votePct * 100)}%`}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      {index < requests.length - 1 && <Divider style={styles.divider} />}
    </View>
  );

  const handleNewRequestPress = () => {
    // Handle the action when the new request button is pressed
    console.log('New request button pressed');
    navigation.navigate('createRequest');
    // For example, navigate to a new screen or open a modal
  };

  return (
    
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={requests}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollView}
        onEndReached={fetchProposals}
        onEndReachedThreshold={0.5}
      />
      <TouchableOpacity style={styles.newRequestButton} onPress={handleNewRequestPress}>
        <Text style={styles.newRequestButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    paddingTop: (StatusBar.currentHeight || 20) + 5,
    paddingBottom: 20,
  },
  requestCard: {
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  requestImage: {
    height: 200,
    width: '100%',
  },
  requestContent: {
    paddingBottom: 10,
  },
  requestText: {
    fontSize: 18,
    marginBottom: 8,
  },
  optionContainer: {
    marginBottom: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  progressBarContainer: {
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 50,
    position: 'relative',
    height: 15,
  },
  progressBar: {
    height: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 10,
    backgroundColor: colors.text,
  },
  newRequestButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  newRequestButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default RequestsPage;
