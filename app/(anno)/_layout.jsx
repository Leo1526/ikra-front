import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants'

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />

      <Text className={`${focused ? 'font-psemibold' : 
      'font-pregular'} text-xs`} style= {{ color: color}}
      >
        {name}
      </Text>
    </View>
  )
}

const AnnoLayout = () => {
  return (
    <>
      <Tabs 
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
          }
        }}
      >
        <Tabs.Screen
          name="createAnno"
          options={{
            title: 'create',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name={"create"}
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="commAnno"
          options={{
            title: 'Community',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name={"commAnno"}
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="depAnno"
          options={{
            title: 'Department',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.bookmark}
                color={color}
                name={"depAnno"}
                focused={focused}
              />
            )
          }}
        />
        
      </Tabs>
    </>
  )
}

export default AnnoLayout