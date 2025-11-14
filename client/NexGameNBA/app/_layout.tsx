import { request } from "@/api/client";
import { DateProvider } from "@/contexts/DateContext";
import { Stack, useSegments } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import mobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./utils";


mobileAds().initialize().then((adapterStatuses) => { /*innitialization complete*/ });

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-5726946755878714/3394649247';

export default function RootLayout() {
  //const bannerRef = useRef<BannerAd>(null);
  const segments = useSegments(); 
  const currentPage = segments.join('/');
  const pageTitles: { [key: string]: string } = {
    index: 'Nex Game\nNBA',
    bets: 'Bets',
    prediction: 'Prediction',
    results: 'Results',
  };
  useEffect(() => {
    request.train.get().then(e => console.log("önce"));
    console.log("sonra")
  }, [])
  return (
    <SafeAreaProvider style={{paddingTop: 20, backgroundColor: colors.primaryColor}}>
      <View style={{flexDirection: "row", padding: 10, height: 100, justifyContent: "center", alignItems: "center"}}>
        <Image
          source={require('../assets/images/nba.png')}
          style={{width: 40, height: 90, position:"absolute", top: 10, left: 20}}
          resizeMode="contain"
        />
        <View>
          <Text style={{color: "white", fontSize: 30, textAlign: "center", fontWeight: "bold"}}>
            {pageTitles[currentPage] || 'Nex Game\nNBA'}
          </Text>
        </View>
      </View>
      <DateProvider>
        <Stack>
          <Stack.Screen name="index" options={{headerShown: false}}/>
          <Stack.Screen name="bets" options={{headerShown: false}}/>
          <Stack.Screen name="prediction" options={{headerShown: false}}/>
          <Stack.Screen name="results" options={{headerShown: false}}/>
        </Stack>
      </DateProvider>
      <View style={{ alignItems: "center", backgroundColor: 'white' }}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdFailedToLoad={(error) => console.log('Banner failed to load:', error)}
          onAdLoaded={() => console.log('Banner loaded successfully')}
        />
      </View>
    </SafeAreaProvider>
  );
  
}
