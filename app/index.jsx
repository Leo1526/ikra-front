import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { Link } from 'expo-router';

const RootLayout = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">hacep</Text>
      <StatusBar style='auto' />
      <Link href="/sign-in" style={{color: 'blue'}} >Go to Sign In</Link>
    </View>
  )
}

export default RootLayout
