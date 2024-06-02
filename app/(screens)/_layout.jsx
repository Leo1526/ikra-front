import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const screensLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name='home'
          options={{
            headerShown: false
          }}
        />
      </Stack>
    
    </>
  );
};

export default screensLayout;
