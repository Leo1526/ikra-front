import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack>
      <Stack.Screen 
          name='deneme'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
        name='sign-in'
        options={{
          headerShown: false
        }}
      />
        <Stack.Screen 
          name='sign-up'
          options={{
            headerShown: false
          }}
        />
<<<<<<< HEAD
        <Stack.Screen 
          name='transaction'
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen 
          name='finance'
=======
        <Stack.Screen 
          name='finance'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='transaction'
>>>>>>> f9c1efe38bef884c16d8fcead2631c61c3c1383e
          options={{
            headerShown: false
          }}
        />
      </Stack>
    
      <StatusBar backgroundColor='#161622'
      style='light' />
    </>
  )
}

export default AuthLayout