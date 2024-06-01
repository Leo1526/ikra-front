// ApiQuery.js
import React, { useState } from 'react';
import { View , Text} from 'react-native';
import LoadingScreen from './LoadingScreen';

const ApiQuery = ({ url, method = 'GET', body = null, headers = {}, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const config = {
      method: method,
      headers: new Headers(headers),
      body: method !== 'GET' ? JSON.stringify(body) : null
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      if (response.ok) {
        onSuccess && onSuccess(data);
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      onError && onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Text onPress={fetchData} style={{ padding: 10, backgroundColor: 'blue', color: 'white' }}>
          Fetch Data
        </Text>
      )}
    </View>
  );
};

export default ApiQuery;
