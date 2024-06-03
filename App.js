import * as React from 'react';
import { Image, StyleSheet , View} from 'react-native';
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
import {colors,text,} from './design/themes'
import settingsLogo from './assets/icons/settings.png'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SettingsIcon = () => (
  <Image
    source={settingsLogo}
    style={{ width: 24, height: 24 }}
  />
);

const CustomHeader = ({ navigation, title }) => {
  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.leftContainer}>
        <Image
          source={require('./assets/images/logo-text.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.centerContainer}>
        <Appbar.Content
          title={title}
          titleStyle={styles.title}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        />
      </View>
      <View style={styles.rightContainer}>
        <Appbar.Action icon={() => <SettingsIcon />} onPress={() => navigation.navigate('settings')} />
      </View>
    </Appbar.Header>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: (props) => {
          let title;
          switch (route.name) {
            case 'home':
              title = 'Anasayfa';
              break;
            case 'settings':
              title = 'Ayarlar';
              break;
            case 'depAnno':
              title = 'Duyurular';
              break;
            default:
              title = '';
          }
          return <CustomHeader {...props} title={title} />;
        },
      })}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="depAnno" component={DepartmentAnnouncement} />
    </Stack.Navigator>
  );
};


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='HomeStack'>
      <Tab.Screen
        name="finance"
        component={FinanceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="credit-card" color={color} size={size} />
          ),
          header: (props) => <CustomHeader {...props} title="Kartım" />,
        }}
      />
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
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
          header: (props) => <CustomHeader {...props} title="Profil" />,
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
  header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderBottomColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 52,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  logo: {
    width: 100,
    height: 40,
  },
  title: {
    textAlign: 'center',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});




export default App;
