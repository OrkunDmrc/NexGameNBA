import { request } from "@/api/client";
import AwayHome from "@/component/AwayHome";
import BaseTextInput from "@/component/BaseTextInput";
import Line from "@/component/Line";
import SubmitButton from "@/component/SubmitButton";
import { useSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { colors } from "./utils";

export default function Prediction() {
  const [away, home, postSeason] = useSearchParams();
  const params = {
    away: away[1],
    home: home[1],
    postSeason: postSeason[1].toLowerCase() === "true"
  }
  const [spread, setSpread] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [moneylineAway, setMoneylineAway] = useState<string>("");
  const [moneylineHome, setMoneylineHome] = useState<string>("");
  async function submit(){
    const res = await request.train.getTotalWinnerPredicts({
      regular: params.postSeason === false,
      playoffs: params.postSeason === true,
      away: params.away,
      home: params.home,
      spread: Number(spread.replace(",",".")),
      total: Number(total.replace(",",".")),
      moneyline_away: Number(moneylineAway.replace(",",".")),
      moneyline_home: Number(moneylineHome.replace(",","."))
    });
    if(res){
      console.log(res);
    }
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
      <ScrollView style={{width: "100%", marginBottom: 50}}>
        <BaseTextInput value={spread} onChange={(e) => setSpread(e.nativeEvent.text)} text="Spread" errorText=""/>
        <BaseTextInput value={total} onChange={(e) => setTotal(e.nativeEvent.text)} text="Total" errorText=""/>
        <BaseTextInput value={moneylineAway} onChange={(e) => setMoneylineAway(e.nativeEvent.text)} text="Moneyline Away" errorText=""/>
        <BaseTextInput value={moneylineHome} onChange={(e) => setMoneylineHome(e.nativeEvent.text)} text="Moneyline Home" errorText=""/>
        <SubmitButton text="PREDICT" onPress={submit}/>
      </ScrollView>
    </View>
  );
}