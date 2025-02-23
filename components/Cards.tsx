import icons from '@/constants/icons';
import images from '@/constants/images';
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

interface props {
    onpress?: () => void;
}

export const FeaturedCard = ({onpress}: props) => {
    return (
      <TouchableOpacity onPress={onpress} className='flex flex-col items-start w-60 h-80 relative'>
        <Image source={images.japan} className='size-full rounded-2xl' />
        <Image source={images.cardGradient} className='size-full rounded-2xl absolute bottom-0' />

        <View  className='flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5'>
            <Image source={icons.star} className='size-3.5 ' />
            <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>4.4</Text>
        </View>
      </TouchableOpacity>
    )
  }


export const Card = () => {
    return (
      <View>
        <Text> Cards </Text>
      </View>
    )
  }

