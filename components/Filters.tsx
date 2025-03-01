import { categories } from '@/constants/data';
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const Filters = () => {
    const params = useLocalSearchParams< {filter?: string}>();
    const [selectedcategory , Setselectedcategory] = useState(
        params.filter ||  'All'
    );

    const handlecategorypress = (category: string) => {
        if (selectedcategory === category) {
            Setselectedcategory('All');
            router.setParams({filter: 'All'})
            return;
        }
        Setselectedcategory(category);
        router.setParams({filter: category});
    }
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-3 mb-2'>
        {categories.map((item,i) => (
            <TouchableOpacity key={i} className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${selectedcategory === item.category ? 'bg-primary-300' : 'bg-primary-100 border border-primary-200'}`} onPress={() => handlecategorypress(item.category)}>
                <Text className={`text-sm ${selectedcategory === item.category ? 'text-white font-rubik-bold mt-0.5' : 'text-black-300 font-rubik'} `}>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    )
}

export default Filters
