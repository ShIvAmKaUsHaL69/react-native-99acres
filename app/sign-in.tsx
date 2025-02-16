import React, { Component } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'

const signin = () => {
  const handlelogin = () => {

  }
    return (
      <SafeAreaView className='bg-white h-full'>
        <ScrollView contentContainerClassName='h-full'>
          <Image source={images.onboarding} className='w-full h-4/6 mt-5 contain-size' resizeMode='contain'/>
          <View className='px-10'>
            <Text className='text-base text-center font-rubik uppercase text-black-200'>Welcome to Restate</Text>
            <Text className='text-3xl font-rubik-bold text-black-300 text-center mt-2'>
              Let's Get You Closer to {"\n"}
                <Text className='text-primary-300'>Your Ideal Home</Text>
            </Text>
            <Text className='text-lg font-rubik text-black-200 text-center mt-8'>Login to Restate with Google</Text>
            <TouchableOpacity onPress={handlelogin} className='bg-white shadow-md shadow-zinc-400 rounded-full w-full py-4 mt-5'>
              <View className='flex flex-row items-center justify-center'>
              <Image source={icons.google} className='w-5 h-5' resizeMode='contain'/>
              <Text className='text-lg font-rubik-medium text-black-300 ml-2'>Continue with Google</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}

export default signin
