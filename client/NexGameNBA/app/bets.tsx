import { request } from "@/api/client";
import { NexGameNBAPred } from "@/api/objects";
import AwayHome from "@/component/AwayHome";
import BaseTextInput from "@/component/BaseTextInput";
import Line from "@/component/Line";
import SubmitButton from "@/component/SubmitButton";
import { ConnectionContext } from "@/contexts/ConnectionContext";
import { router, useFocusEffect } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, ScrollView, Text, View } from "react-native";
import { AdEventType, RewardedAd, RewardedAdEventType } from "react-native-google-mobile-ads";
import { adIds, colors } from "./utils";

const adUnitId = adIds.rewardedAdId;
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

export default function Bets() {
  //const [adLoaded, setAdLoaded] = useState<boolean>(false);
  useFocusEffect(
    useCallback(() => {
      const unsubscribeLoaded = rewarded.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          //setAdLoaded(true);
          console.log("Rewarded loaded successfully");
        },
      );
      const unsubscribeEarned = rewarded.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
          //setAdLoaded(false);
          console.log('User earned reward of ', reward);
        },
      );
      const unsubscribeError = rewarded.addAdEventListener(
        AdEventType.ERROR,
        (error) => {
          console.log("Rewarded ERROR:", error);
        }
      );
      console.log("Rewarded loading...");
      rewarded.load();
      return () => {
        unsubscribeLoaded();
        unsubscribeEarned();
        unsubscribeError();
      };
    }, [])
  );
  const [date, away, home] = useSearchParams();
  const params = {
    date: date[1],
    away: away[1],
    home: home[1]
  }
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [nexGameNBAPred, setNexGameNBAPred] = useState<NexGameNBAPred | null>(null);
  const connectionContext = useContext(ConnectionContext);
  if(!connectionContext){
      throw new Error("Connection error");
  }
  const {setIsConnected} = connectionContext;
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    try{
      request.supabase.getPredictions(params.date, params.away, params.home)
      .then(data => {
        setNexGameNBAPred(data as NexGameNBAPred)
      });
    }catch(e){
      console.log("error", e);
    }
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  function americanToDecimal(odds: number): number {
    if (odds >= 100) {
      return (odds / 100) + 1;
    } else if(odds <= -100) {
      return (-100 / odds) + 1;
    }
    return odds;
  }
  function decimalToAmerican(decimal: number): number {
    if (decimal >= 2.0) {
      return Math.round((decimal - 1) * 100);
    } else {
      return Math.round(-100 / (decimal - 1));
    }
  }
  function formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  function submit(){
    rewarded.show();
    router.push({
      pathname: "/prediction",
      params: {
        date: nexGameNBAPred?.date,
        regular: "" + nexGameNBAPred?.regular,
        playoff:  "" + nexGameNBAPred?.playoff,
        away: nexGameNBAPred?.away,
        home: nexGameNBAPred?.home,
        spread: nexGameNBAPred?.spread,
        total: nexGameNBAPred?.total,
        away_moneyline: nexGameNBAPred?.away_moneyline,
        home_moneyline: nexGameNBAPred?.home_moneyline,
        total_score: nexGameNBAPred?.total_score,
        q1_score: nexGameNBAPred?.q1_score,
        q2_score: nexGameNBAPred?.q2_score,
        q3_score: nexGameNBAPred?.q3_score,
        q4_score: nexGameNBAPred?.q4_score,
        ot_score: nexGameNBAPred?.ot_score,
        winner: nexGameNBAPred?.winner
      }
    });
  }
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primaryColor,
        padding: 10
      }}
    >
      <AwayHome away={params.away} home={params.home}/>
      <Line />
      {
        params.date !== formatDate(new Date()) ?
        <View style={{alignItems: "center", justifyContent: "center" }}>
          <Text style={{color: colors.white, fontWeight: "bold", textAlign: "center" }}>No moneyline data is available for today.</Text>
        </View> :
        !nexGameNBAPred ?
        <View style={{alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color={colors.white}/>
        </View> :
        <ScrollView style={{width: "100%", marginBottom: keyboardHeight ? keyboardHeight : 0}}>
          <BaseTextInput editable={false} value={"" + nexGameNBAPred?.spread} text="Spread"/>
          <BaseTextInput editable={false} value={"" + nexGameNBAPred?.total} text="Total"/>
          <BaseTextInput editable={false} value={`${nexGameNBAPred?.away_moneyline} (${decimalToAmerican(nexGameNBAPred?.away_moneyline!)})`} text="Moneyline Away"/>
          <BaseTextInput editable={false} value={`${nexGameNBAPred?.home_moneyline} (${decimalToAmerican(nexGameNBAPred?.home_moneyline!)})`} text="Moneyline Home"/>
          <SubmitButton text={"PREDICT"} onPress={submit}/>
        </ScrollView>
      }
    </View>
  );
}