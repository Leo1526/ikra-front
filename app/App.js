import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen'; // Ana ekran
import LoginScreen from './screens/LoginScreen'; // Giriş ekranı
import RegisterScreen from './screens/RegisterScreen'; // Kayıt ekranı
import * as common from "./common"

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    try {
        setUserToken(common.checkTokenExpiration());
    }
    catch(error) {

    }
    finally {
        setIsLoading(false)
    }
  }, []);

  if (isLoading) {
    return (
        <ActivityIndicator/>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          // Token geçerliyse HomeScreen'e yönlendir
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          // Token geçersizse LoginScreen'e yönlendir
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
