import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const CourseLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name='myCourses'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='courseAttendance'
          options={{
            headerShown: false
          }}
        />
      </Stack>
    
      <StatusBar backgroundColor='#161622' style='light' />
    </>
  );
};

export default CourseLayout;
