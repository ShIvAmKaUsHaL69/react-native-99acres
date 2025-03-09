import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import Noresults from "@/components/Noresults";


export default function Index() {
  const {user} = useGlobalContext()
  const params = useLocalSearchParams<{ query?: string, filter?: string }>()

  const {data: latestProperties, loading: latestPropertiesLoading} = useAppwrite({
    fn: getLatestProperties
  })

  const {data: properties, loading, refetch} = useAppwrite({
    fn: getProperties,
    params: {
      query: params.query!,
      filter: params.filter!,
      limit: 6,
    },
    skip: true,
  })

  const handlecardpress = (id: string) => router.push(`/properties/${id}`)

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    })
  }, [params.query, params.filter])


  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList data={properties}
       renderItem={({item}) => <Card  item={item} onpress={() => handlecardpress(item.$id)} />}
       keyExtractor={(item) => item.$id}
       numColumns={2}
       contentContainerClassName="pb-32"
       columnWrapperClassName="flex gap-5 px-5"
       showsVerticalScrollIndicator={false}
       ListEmptyComponent={ loading ? <ActivityIndicator className="text-primary-300 mt-5" size="large" /> : <Noresults />}
        ListHeaderComponent={
              <View className="px-5">
              <View className='flex flex-row items-center justify-between mt-5'>
                <View className="flex flex-row items-center">
                    <Image source={{ uri: user?.avatar}} className="size-12 rounded-full"/>
                    <View className="flex flex-col items-start ml-2 justify-center">
                      <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                      <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                    </View>
                </View>
                <Image source={icons.bell} className="size-6" />
              </View>
              <Search />
              <View className="my-5 ">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300" >See All</Text>
                </TouchableOpacity>
              </View>
              {latestPropertiesLoading ? <ActivityIndicator className="text-primary-300" size="large" /> : !latestProperties || latestProperties.length === 0 ? <Noresults /> :
              <FlatList data={latestProperties}
              renderItem={({item}) => <FeaturedCard  item={item} onpress={() => handlecardpress(item.$id)}/>}
              keyExtractor={(item) => item.$id}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-5 mt-5"
                />
              }
             </View>
             <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">Our Recommendation</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300" >See All</Text>
                </TouchableOpacity>
              </View>
              <Filters />
            </View>
      }/>

    </SafeAreaView>
    
  );
}
