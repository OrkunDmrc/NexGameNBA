import { request } from "@/api/client";
import { DateProvider } from "@/contexts/DateContext";
import { Stack, useSegments } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, Text, View } from "react-native";
//import mobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { ConnectionContext } from "@/contexts/ConnectionContext";
import Constants from 'expo-constants';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./utils";

//mobileAds().initialize().then((adapterStatuses) => { /*innitialization complete*/ });

//const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER :  TestIds.ADAPTIVE_BANNER;

export default function Main(){
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
        request.train.get().then(e => {
            setIsConnected(true);
            console.log("connected");
        });
        console.log("connecting");
    }, []);
    const connectionContext = useContext(ConnectionContext);
    if(!connectionContext){
        throw new Error("Connection error");
    }
    const {isConnected, setIsConnected} = connectionContext;
    return (
        <SafeAreaProvider style={{paddingTop: Constants.statusBarHeight, backgroundColor: colors.primaryColor}}>
            <View style={{backgroundColor: isConnected ? colors.green : colors.secondaryColor, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <Text style={{color: "white", fontSize: 12, textAlign: "center", fontWeight: "bold", padding:1}}>
                {isConnected ? "Server connected" : "Connecting to the server..."}
                </Text>
            </View>
            <View style={{flexDirection: "column", padding: 10, height: 95, justifyContent: "center", alignItems: "center"}}>
                <View>
                <Text style={{color: "white", fontSize: 30, textAlign: "center", fontWeight: "bold"}}>
                    {pageTitles[currentPage] || 'Nex Game\nNBA'}
                </Text>
                </View>
            </View>
            <Image
                source={require('../assets/images/nba.png')}
                style={{width: 40, height: 90, position:"absolute", top: 20, left: 10}}
                resizeMode="contain"
            />
            
                <DateProvider>
                <Stack>
                    <Stack.Screen name="index" options={{headerShown: false}}/>
                    <Stack.Screen name="bets" options={{headerShown: false}}/>
                    <Stack.Screen name="prediction" options={{headerShown: false}}/>
                    <Stack.Screen name="results" options={{headerShown: false}}/>
                </Stack>
                </DateProvider>
            <View style={{ alignItems: "center", backgroundColor: colors.primaryColor, height: 50}}>
                {/*<BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
                onAdFailedToLoad={(error) => console.log('Banner failed to load:', error)}
                onAdLoaded={() => console.log('Banner loaded successfully')}
                />*/}
            </View>
        </SafeAreaProvider>
    );
}