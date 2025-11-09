import { DateProvider } from "@/contexts/DateContext";
import { Stack, useSegments } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./utils";

export default function RootLayout() {
  const segments = useSegments(); 
  const currentPage = segments.join('/');
  const pageTitles: { [key: string]: string } = {
    index: 'Nex Game\nNBA',
    bets: 'Bets',
    prediction: 'Prediction',
    results: 'Results',
  };
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
    </SafeAreaProvider>
  );
  
}
