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
=======
        <Stack.Screen 
          name='finance'
>>>>>>> origin/transaction-component
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