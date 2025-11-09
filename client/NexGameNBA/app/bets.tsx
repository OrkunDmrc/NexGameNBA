import { request } from "@/api/client";
import { Prediction } from "@/api/objects";
import AwayHome from "@/component/AwayHome";
import BaseTextInput from "@/component/BaseTextInput";
import Line from "@/component/Line";
import SubmitButton from "@/component/SubmitButton";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { colors } from "./utils";

export default function Bets() {
  const [away, home, postSeason] = useSearchParams();
  const params = {
    away: away[1],
    home: home[1],
    postseason: postSeason[1].toLowerCase() === "true"
  }
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [spread, setSpread] = useState<string>("");
  const [spreadError, setSpreadError] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [totalError, setTotalError] = useState<string>("");
  const [moneylineAway, setMoneylineAway] = useState<string>("");
  const [moneylineAwayError, setMoneylineAwayError] = useState<string>("");
  const [moneylineHome, setMoneylineHome] = useState<string>("");
  const [moneylineHomeError, setMoneylineHomeError] = useState<string>("");
  function americanToDecimal(odds: number): number {
    if (odds >= 100) {
      return (odds / 100) + 1;
    } else if(odds <= -100) {
      return (-100 / odds) + 1;
    }
    return odds;
  }
  async function submit(){
    setSpreadError("");
    setTotalError("");
    setMoneylineAwayError("");
    setMoneylineHomeError("");
    if(spread === ""){
      setSpreadError("This field is required.");
      return;
    }else if(!Number.isFinite(Number(spread))){
      setSpreadError("This field must be number.");
      return;
    }else if(total === ""){
      setTotalError("This field is required.");
      return;
    }else if(!Number.isFinite(Number(total))){
      setTotalError("This field must be number.");
      return;
    }else if(moneylineAway === ""){
      setMoneylineAwayError("This field is required.");
      return;
    }else if(!Number.isFinite(Number(moneylineAway))){
      setMoneylineAwayError("This field must be number.");
      return;
    }else if(moneylineHome === ""){
      setMoneylineHomeError("This field is required.");
      return;
    }else if(!Number.isFinite(Number(moneylineHome))){
      setMoneylineHomeError("This field must be number.");
      return;
    }
    const moneylineAwayNum = Number(moneylineAway);
    const moneylineHomeNum = Number(moneylineHome);
    setIsLoading(() => true);
    const res = await request.train.getTotalWinnerPredicts({
      regular: params.postseason === false,
      playoffs: params.postseason === true,
      away: params.away,
      home: params.home,
      spread: Number(spread.replace(",",".")),
      total: Number(total.replace(",",".")),
      moneyline_away: americanToDecimal(moneylineAwayNum),
      moneyline_home: americanToDecimal(moneylineHomeNum)
    });
    console.log(res);
    if(res.status === 200){
      const prediction = res.data as Prediction
      setIsLoading(() => false);
      router.push({
        pathname: "/prediction",
        params: {
          winnerTeam: prediction.winner_team,
          totalScore: prediction.total_score,
          totalScoreq1: prediction.total_score_q1,
          totalScoreq2: prediction.total_score_q2,
          totalScoreq3: prediction.total_score_q3,
          totalScoreq4: prediction.total_score_q4,
          totalScoreOt: prediction.total_score_ot,
          total: total,
          spread: spread,
          moneylineAway: moneylineAway,
          moneylineHome: moneylineHome
        }
      })
    }
    setIsLoading(() => false);
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
        <BaseTextInput value={spread} onChange={(e) => setSpread(e.nativeEvent.text)} text="Spread" errorText={spreadError}/>
        <BaseTextInput value={total} onChange={(e) => setTotal(e.nativeEvent.text)} text="Total" errorText={totalError}/>
        <BaseTextInput value={moneylineAway} onChange={(e) => setMoneylineAway(e.nativeEvent.text)} text="Moneyline Away" errorText={moneylineAwayError}/>
        <BaseTextInput value={moneylineHome} onChange={(e) => setMoneylineHome(e.nativeEvent.text)} text="Moneyline Home" errorText={moneylineHomeError}/>
        {isLoading ?
        <View style={{alignItems: "center", justifyContent: "center", margin:10 }}>
            <ActivityIndicator size="large" color={colors.white}/>
        </View>
        : <SubmitButton text="PREDICT" onPress={submit}/>}
      </ScrollView>
    </View>
  );
}