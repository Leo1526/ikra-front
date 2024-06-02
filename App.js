
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Appbar } from 'react-native-paper';
import SignIn from './app/(auth)/sign-in';
import SignUp from './app/(auth)/sign-up';
import Home from './app/(screens)/home';
import Settings from './app/(screens)/settings'; // Create a Settings screen

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomHeader = ({ navigation }) => {
  return (
    <Appbar.Header>
      <Appbar.Content title="HACEP" />
      <Appbar.Action icon="cog" onPress={() => navigation.navigate('settings')} />
    </Appbar.Header>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
      }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="settings" component={Settings} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator>
        <Drawer.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

