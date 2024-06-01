// SomeComponent.js
import React from 'react';
import { View, Button, Text } from 'react-native';
import LoadingScreen from '../../components/LoadingScreen';
import * as Common from '../common.js';
const SomeComponent = () => {


  const handleSuccess = data => {
    console.log('Custom success:', data);
  };

  const handleError = error => {
    console.error('Custom error:', error);
  };

  const { loading, error, fetchData } = Common.useApiQuery({
    url: "https://your-api-url.com/data",
    method: "POST",
    data: { key: 'value' },
    headers: { 'Content-Type': 'application/json' },
    onSuccess: handleSuccess,
    onError: handleError
  });

  const handleSubmit = async () => {
    try {
      await fetchData();
    } catch (err) {
      console.error('Error while fetching:', err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Button title="Fetch Data" onPress={handleSubmit} />
      )}
      {error && <Text>Error: {error}</Text>}
    </View>
  );
};

export default SomeComponent;
