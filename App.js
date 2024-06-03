import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Assuming you're using MaterialCommunityIcons
import SignIn from './app/(auth)/sign-in';
import SignUp from './app/(auth)/sign-up';
import Home from './app/(screens)/home';
import Settings from './app/(screens)/settings';
import DepartmentAnnouncement from './app/(anno)/depAnno';
import FinanceScreen from './app/(screens)/finance';
import Profile from './app/(tabs)/profile'; 
import {colors} from './design/themes'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomHeader = ({ navigation }) => {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content title="" />
      <Image
        source={require('./assets/images/logo-text.png')} 
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
      />
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
      <Stack.Screen name="depAnno" component={DepartmentAnnouncement} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='HomeStack' >
      <Tab.Screen
        name="finance"
        component={FinanceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="credit-card" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="sign-in"
        component={SignIn}
        options={{
          gestureEnabled: false, // Disable swipe back
        }}
      />
      <Stack.Screen
        name="sign-up"
        component={SignUp}
        options={{
          gestureEnabled: false, // Disable swipe back
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
  },
  header: {
    backgroundColor: colors.primary,
  }
});

export default App;
