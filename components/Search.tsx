import icons from '@/constants/icons';
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDebouncedCallback } from 'use-debounce'

const Search = () =>  {
    const path = usePathname();
    const params = useLocalSearchParams<{query?: string}>();
    const [Search, Setsearch] = useState(params.query)

    const debouncesearch = useDebouncedCallback(
        (text: string) => router.setParams({ query: text }), 500
    )

    const handlesearch = (text: string) => {
        Setsearch(text);
        debouncesearch(text);
    }

    return (
      <View className='flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2'>
        <View className='flex-1 flex flex-row items-center justify-start z-50'>
            <Image source={icons.search} className='size-5' />
            <TextInput value={Search} onChangeText={handlesearch} placeholder='Search for anything' className='text-sm font-rubik text-black-300 ml-2 flex-1'/>
        </View>
        <TouchableOpacity>
            <Image source={icons.filter} className='size-5' />
        </TouchableOpacity> 
      </View>
    )
  }

export default Search
