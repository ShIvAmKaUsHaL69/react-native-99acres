import { useLocalSearchParams } from 'expo-router'
import React, { Component } from 'react'
import { Text, View } from 'react-native'


const property = () => {
    const {id} = useLocalSearchParams();
    return (
      <View>
        <Text> properties {id}</Text>
      </View>
    )
}

export default property
