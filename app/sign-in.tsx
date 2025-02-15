import React, { Component } from 'react'
import { Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'

const signin = () => {
    return (
      <SafeAreaView className='bg-white h-full'>
        <ScrollView contentContainerClassName='h-full'>
          <Image source={images.onboarding} className='w-full h-4/6' resizeMode='contain'/>
        </ScrollView>
      </SafeAreaView>
    )
}

export default signin
