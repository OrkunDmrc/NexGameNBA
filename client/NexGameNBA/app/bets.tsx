import { request } from "@/api/client";
import { WinnerTotalScorePrediction } from "@/api/objects";
import AwayHome from "@/component/AwayHome";
import BaseTextInput from "@/component/BaseTextInput";
import Line from "@/component/Line";
import SubmitButton from "@/component/SubmitButton";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, ScrollView, View } from "react-native";
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

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
    const res = await request.train.getTotalWinnerPred({
      regular: params.postseason === false,
      playoffs: params.postseason === true,
      away: params.away,
      home: params.home,
      spread: Number(spread.replace(",",".")),
      total: Number(total.replace(",",".")),
      moneyline_away: americanToDecimal(moneylineAwayNum),
      moneyline_home: americanToDecimal(moneylineHomeNum)
    });
    if(res.status === 200){
      const prediction = res.data as WinnerTotalScorePrediction
      setIsLoading(() => false);
      router.push({
        pathname: "/prediction",
        params: {
          winnerTeam: prediction.winner_team,
          totalScore: prediction.total_score,
          away: params.away,
          home: params.home,
          regular: (params.postseason === false).toString(),
          playoffs: (params.postseason === true).toString(),
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
      <ScrollView style={{width: "100%", marginBottom: keyboardHeight ? keyboardHeight : 50}}>
        <BaseTextInput value={spread} onChange={(e) => setSpread(e.nativeEvent.text)} text="Spread" errorText={spreadError} maxLength={2}/>
        <BaseTextInput value={total} onChange={(e) => setTotal(e.nativeEvent.text)} text="Total" errorText={totalError} maxLength={5}/>
        <BaseTextInput value={moneylineAway} onChange={(e) => setMoneylineAway(e.nativeEvent.text)} text="Moneyline Away" errorText={moneylineAwayError} maxLength={5}/>
        <BaseTextInput value={moneylineHome} onChange={(e) => setMoneylineHome(e.nativeEvent.text)} text="Moneyline Home" errorText={moneylineHomeError} maxLength={5}/>
        {isLoading ?
        <View style={{alignItems: "center", justifyContent: "center", margin:10 }}>
            <ActivityIndicator size="large" color={colors.white}/>
        </View>
        : <SubmitButton text="PREDICT" onPress={submit}/>}
      </ScrollView>
    </View>
  );
}