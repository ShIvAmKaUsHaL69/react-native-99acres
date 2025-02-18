import { settings } from '@/constants/data'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { logout } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import React, { Component } from 'react'
import { Alert, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Settingsitemprop {
  icon: ImageSourcePropType;
  title: string;
  onpress?: () => void;
  textstyle?: any;
  showarrow?: boolean;
}

const Settingsitem = ({icon, title, onpress, textstyle, showarrow = true}: Settingsitemprop) => (
  <TouchableOpacity onPress={onpress} className='flex flex-row items-center justify-between py-3'>
    <View className='flex flex-row items-center gap-3'>
      <Image source={icon} className='size-6' />
      <Text className={`text-lg font-rubik-semibold text-black-300 ${textstyle}`}>{title}</Text>
    </View>
    {showarrow && <Image source={icons.rightArrow} className='size-5'/>}
  </TouchableOpacity>
)
const profile = () => {
  const {user, refetch} = useGlobalContext();

  const handlelogout = async () => {
      const result = await logout();
      if(result) {
        Alert.alert("success", "You have been logged out successfully");
        refetch();
      }else {
        Alert.alert("Error", "An error occured")
      }
  }

    return (
      <SafeAreaView className='h-full bg-white'>
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-rubik-bold'>Profile</Text>
          <Image source={icons.bell} className='size-5' />
        </View>
        <View className='flex-row justify-center flex mt-5'>
           <View className='flex flex-col items-center relative mt-5'>
            <Image source={{ uri: user?.avatar}} className='size-44 relative rounded-full' />
            <TouchableOpacity className='absolute bottom-11 right-2'>
              <Image source={icons.edit} className='size-9'/>
            </TouchableOpacity>
            <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
           </View>
        </View>
        <View className='flex flex-col mt-10'>
          <Settingsitem icon={icons.calendar} title='My Bookings'/>
          <Settingsitem icon={icons.wallet} title='Payment'/>
        </View>
        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200' >
          {settings.slice(2).map((item, i) => (
            <Settingsitem key={i} {...item}/>
          ))}
        </View>
        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200' >
          <Settingsitem icon={icons.logout} title='Logout' textstyle='text-danger' showarrow={false} onpress={handlelogout}/>
        </View>
        </ScrollView>
      </SafeAreaView>
    )
}

export default profile
