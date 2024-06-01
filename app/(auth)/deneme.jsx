// SomeComponent.js
import React from 'react';
import { View, Text } from 'react-native';
import ApiQuery from '../../components/ApiQuery';

const SomeComponent = () => {
  const handleSuccess = (data) => {
    console.log('Data received:', data);
    // Burada alınan veriyi bir state'e kaydedebilir veya başka bir işlem yapabilirsiniz.
  };

  const handleError = (error) => {
    console.error('API error:', error);
    // Burada hata ile ilgili bir uyarı gösterebilir veya başka bir işlem yapabilirsiniz.
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Below is the fetch button handled by ApiQuery:</Text>
      <ApiQuery
        url="https://your-api-url.com/data"
        method="POST"
        body={{ key: 'value' }}
        headers={{ 'Content-Type': 'application/json' }}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </View>
  );
};

export default SomeComponent;
