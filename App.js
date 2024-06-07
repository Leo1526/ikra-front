import * as React from 'react';
import { Image, StyleSheet , View, TouchableOpacity} from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator  } from '@react-navigation/drawer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Assuming you're using MaterialCommunityIcons
import SignIn from './app/(auth)/sign-in';
import SignUp from './app/(auth)/sign-up';
import Home from './app/(screens)/home';

import ChangePasswordScreen from './app/(screens)/changePassword';

import { navigationRef } from './app/navigationService';

import Settings from './app/(screens)/settings';

import InternshipScreen from './app/(screens)/internship';
import FinanceScreen from './app/(screens)/finance';
import AllTransactionsScreen from './app/(screens)/allTransactions';
import TransactionPage from './app/(screens)/transaction';
import LostItemsPage from './app/(screens)/lostItems';
import MyLostItemsPage from './app/(screens)/myLostItems';
import CreateLostPage from './app/(screens)/createLostItem';
import DiningMenuScreen from './app/(screens)/dining'
import RequestsPage from './app/(screens)/allRequests';
import RequestComponent from './app/(screens)/createRequest';
import ProfileScreen from './app/(screens)/profile'; 
import GridItemsPage from './app/(screens)/courses';
import CourseDetailPage from './app/(screens)/oneCourse';
import CommentsPage from './app/(screens)/commentsPage';
import MyCoursesScreen from './app/(course)/myCourses';
import CourseAttendanceScreen from './app/(course)/courseAttendance';

import CommunityDetails from './app/(community)/communityDetails';

import AnnouncementsScreen from './app/(anno)/annoucements'
import CreateAnnouncementScreen from './app/(anno)/createAnnouncement'
import AnnouncementDetailsScreen from './app/(anno)/announcementDetails'

import {colors,text,} from './design/themes'
import settingsLogo from './assets/icons/settings.png'

const Stack = createNativeStackNavigator();
const AnnStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const FinanceStack = createNativeStackNavigator();
const ReqStack = createNativeStackNavigator();
const AllCoursesStack = createNativeStackNavigator();
const AttendanceStack = createNativeStackNavigator();
const LostItemsStack = createNativeStackNavigator();


const SettingsIcon = () => (
  <Image
    source={settingsLogo}
    style={{ width: 24, height: 24 }}
  />
);

const CustomHeader = ({ navigation, title }) => {
  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.centerContainer}>
        <Appbar.Content
          title={title}
          titleStyle={styles.title}
          style={styles.titleContainer}
        />
        <Image
          source={require('./assets/images/logo-text.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.rightContainer}>
        <Appbar.Action icon={() => <SettingsIcon />} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
      </View>
    </Appbar.Header>
  );
};

const AnnouncementHeader = ({navigation, title }) => {
  return (
    <Appbar.Header style={styles.announcementHeader}>
      <View style={styles.leftContainerAnn}>
        <TouchableOpacity onPress={() => navigation.navigate('schoolAnnouncements')}>
          <Image
            source={require('./assets/icons/school-dark.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.centerContainerAnn}>
      <TouchableOpacity onPress={() => navigation.navigate('departmentAnnouncements')}>
        <Image
          source={require('./assets/icons/department.png')}
          style={styles.icon}
          resizeMode="contain"
          />
      </TouchableOpacity>
      </View>
      <View style={styles.rightContainerAnn}>
        <TouchableOpacity onPress={() => navigation.navigate('communityAnnouncements')}>
          <Image
              source={require('./assets/icons/community-announcement.png')}
              style={styles.logo}
              resizeMode="contain"
              />
        </TouchableOpacity>
      </View>
    </Appbar.Header>
  );
};

const AnnouncementStack = () => {
  return (
    <AnnStack.Navigator
    // initialRouteName='announcementsScreen'
    screenOptions={{ headerShown: false}}
    >
      <AnnStack.Screen name='announcementsScreen' component={AnnouncementsScreen} />
      <AnnStack.Screen name='createAnnouncement' component={CreateAnnouncementScreen} />
    </AnnStack.Navigator>
  );
};

const FinStack = () => {
  return (
    <FinanceStack.Navigator screenOptions={{ headerShown: false}}>
      <FinanceStack.Screen name ='finance' component={FinanceScreen}/>
      <FinanceStack.Screen name ='allTransactions' component={AllTransactionsScreen}/>
      <FinanceStack.Screen name ='transaction' component={TransactionPage}/>
    </FinanceStack.Navigator>
  )
}

const RequestStack = () => {
  return (
    <ReqStack.Navigator screenOptions={{ headerShown: false}}>
      <ReqStack.Screen name ='requests' component={RequestsPage}/>
      <ReqStack.Screen name ='createRequest' component={RequestComponent}/>
    </ReqStack.Navigator>
  )
}

const CourseStack = () => {
  return (
    <AllCoursesStack.Navigator screenOptions={{ headerShown: false}}>
      <AllCoursesStack.Screen name ='courses' component={GridItemsPage}/>
      <AllCoursesStack.Screen name ='courseDetailPage' component={CourseDetailPage}/>
      <AllCoursesStack.Screen name ='commentsPage' component={CommentsPage}/>
      <AttendanceStack.Screen name ='profile' component={ProfileScreen}/>
    </AllCoursesStack.Navigator>
  )
}

const AttStack = () => {
  return (
    <AttendanceStack.Navigator screenOptions={{ headerShown: false}}>
      <AttendanceStack.Screen name ='myCourses' component={MyCoursesScreen}/>
      <AttendanceStack.Screen name ='attendances' component={CourseAttendanceScreen}/>
    </AttendanceStack.Navigator>
  )
}

const LostStack = () => {
  return (
  <LostItemsStack.Navigator 
    screenOptions={{ headerShown: false}}>
    <LostItemsStack.Screen name ='allLostItems' component={LostItemsPage}/>
    <LostItemsStack.Screen name ='myLostItems' component={MyLostItemsPage}/>
    <LostItemsStack.Screen name ='createLostItem' component={CreateLostPage}/>
  </LostItemsStack.Navigator>
  )
}

const HomeStack = () => {
  return (
    <Stack.Navigator
    initialRouteName='home'
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
          case 'announcements':
            title = 'Duyurular';
            break;
          case 'finance':
            title='Kartım'
            break;
          case 'internship':
            title='Stajlar'
            break;
          case 'lostItems':
            title='Kayıp Eşya'
            break;
          case 'dining':
            title='Yemek Listesi'
            break;
          case 'courses':
            title='Dersler'
            break;
          case 'requests':
            title='İstekler'
            break;
          default:
              title = '';
          }
          return <CustomHeader {...props} title={title} />;
        },
      })}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name='finance' component={FinStack}/>
      <Stack.Screen name='courses' component= {CourseStack}/>
      <Stack.Screen name='internship' component={InternshipScreen}/>
      <Stack.Screen name='announcements' component={AnnouncementStack} />
      <Stack.Screen name='dining' component={DiningMenuScreen}/>
      <Stack.Screen name='lostItems' component={LostStack}/>
      <Stack.Screen name='requests' component={RequestStack}/>
      <Stack.Screen name='myCourses' component={AttStack}/>
      <Stack.Screen name='announcementDetails' component={AnnouncementDetailsScreen}/>
      <Stack.Screen name='communityDetails' component={CommunityDetails}/>
      <Stack.Screen name='changePassword' component={ChangePasswordScreen}/> 
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => { 
  return (
    <Drawer.Navigator 
      drawerContent={props => <Settings {...props} />}
      initialRouteName="BottomTabNavigator"
      drawerPosition="right"
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerStyle: {
          width: 210,
        },
      }}
    >
      <Drawer.Screen name="BottomTabNavigator" component={BottomTabNavigator} /> 
    </Drawer.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Ev'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          let iconSize = focused ? size + 8 : size; // Aktif sekme için simge boyutunu artır
          let iconStyle = focused ? styles.focusedIcon : styles.icon;

          if (route.name === 'Ev') {
            iconSource = require('./assets/icons/home.png');
          } else if (route.name === 'Profil') {
            iconSource = require('./assets/icons/profile.png');
          } else if (route.name === 'Yoklama') {
            iconSource = require('./assets/icons/pan-tool.png');
          }

          return (
            <Image 
              source={iconSource} 
              style={[
                iconStyle, 
                { tintColor: color, width: iconSize, height: iconSize }
              ]} 
            />
          );
        },
        tabBarActiveTintColor: '#FFFFFF', // Aktif sekme simge rengi
        tabBarInactiveTintColor: '#FFFFFF', // Pasif sekme simge rengi
        tabBarStyle: { backgroundColor: colors.primary, height: 90, paddingBottom: 10 }, // Arka plan rengi ve yükseklik
        tabBarLabelStyle: { fontSize: 14, paddingBottom: 5 }, // Etiket boyutu ve padding
        tabBarItemStyle: { marginTop: 5 }, // Simgeyi yukarı taşımak için margin ekledik
      })}
    >
      <Tab.Screen
        name="Yoklama"
        component={AttStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image 
              source={require('./assets/icons/pan-tool.png')} 
              style={[
                focused ? styles.focusedIcon : styles.icon, 
                { tintColor: color, width: focused ? size + 8 : size, height: focused ? size + 8 : size }
              ]} 
            />
          ),
          header: (props) => <CustomHeader {...props} title="Yoklama" />,
        }}
      />
      <Tab.Screen
        name="Ev"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image 
              source={require('./assets/icons/home.png')} 
              style={[
                focused ? styles.focusedIcon : styles.icon, 
                { tintColor: color, width: focused ? size + 8 : size, height: focused ? size + 8 : size }
              ]} 
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image 
              source={require('./assets/icons/profile.png')} 
              style={[
                focused ? styles.focusedIcon : styles.icon, 
                { tintColor: color, width: focused ? size + 8 : size, height: focused ? size + 8 : size }
              ]} 
            />
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
      <NavigationContainer independent={true} ref={navigationRef} >
        <Stack.Navigator >
          <Stack.Screen name="AuthStack" component={AuthStack} options={{gestureEnabled: false, headerShown: false}}/>
          <Stack.Screen 
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{headerShown: false, gestureEnabled: false,}}
            />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderBottomColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 60, // Boyutu büyütmek için
  },
  announcementHeader: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.secondaryBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 42,
    position:'absolute',
    top: 0,
  },
  leftContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  leftContainerAnn: {
    height: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  centerContainerAnn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  rightContainerAnn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 100, // Boyutunu artırın
    height: 50, // Boyutunu artırın
    position: 'absolute',
    bottom: -10, // Logoyu başlığın altına taşır
    left: -10
  },
  titleContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    position: 'absolute',
    top: 0, // Başlığı üstte konumlandırır
    left: 10
  },
  title: {
    textAlign: 'center',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  icon: {
    width: 36,
    height: 36,
    marginHorizontal: 10,
  },
  focusedIcon: {
    width: 36,
    height: 36,
    marginTop: -5, // Aktif simgeyi de yukarı taşır
  }
});

export default App;