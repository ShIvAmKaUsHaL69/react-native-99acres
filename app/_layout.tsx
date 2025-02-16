import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import './globals.css'
import { useFonts } from "expo-font"
import GlobalProvider from "@/lib/global-provider";
export default function RootLayout() {
  const [fontsloaded] = useFonts({
    "Rubik-Bold": require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-ExtraBold": require('../assets/fonts/Rubik-ExtraBold.ttf'),
    "Rubik-Light": require('../assets/fonts/Rubik-Light.ttf'),
    "Rubik-Medium": require('../assets/fonts/Rubik-Medium.ttf'),
    "Rubik-Regular": require('../assets/fonts/Rubik-Regular.ttf'),
    "Rubik-SemiBold": require('../assets/fonts/Rubik-SemiBold.ttf'),
  })

  useEffect(() => {
    if (fontsloaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsloaded])

  if (!fontsloaded) return null

  return (
    <GlobalProvider>
        <Stack screenOptions={{headerShown: false}}/>
    </GlobalProvider>
    


  )
}
