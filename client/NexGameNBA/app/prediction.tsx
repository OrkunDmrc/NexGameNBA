import { request } from "@/api/client";
import { BetsForm, TotalScoreOTPrediction, TotalScoreQ1Prediction, TotalScoreQ2Prediction, TotalScoreQ3Prediction, TotalScoreQ4Prediction } from "@/api/objects";
import BaseTextInput from "@/component/BaseTextInput";
import Line from "@/component/Line";
import SubmitButton from "@/component/SubmitButton";
import { ConnectionContext } from "@/contexts/ConnectionContext";
import { useSearchParams } from "expo-router/build/hooks";
import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { adIds, colors, getLogo } from "./utils";
import { AdEventType, RewardedAdEventType, RewardedInterstitialAd, TestIds } from "react-native-google-mobile-ads";
import { useFocusEffect } from "@react-navigation/native";

const adUnitId = adIds.rewardedIntAdId;

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});


export default function Prediction() {
  const [adLoaded, setAdLoaded] = useState<boolean>(true);
  /*useEffect(() => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        //setAdLoaded(true);
        console.log("Rewarded Interstitial loaded successfully");
      },
    );
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        //setAdLoaded(false);
        console.log('User earned reward of ', reward);
        console.log("Rewarded Interstitial loading...");
        rewardedInterstitial.load();
      },
    );
    const unsubscribeError = rewardedInterstitial.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.log("Rewarded Interstitial ERROR:", error);
        setIsLoading(() => false);
      }
    );
    console.log("Rewarded Interstitial loading...");
    rewardedInterstitial.load();
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeError();
    };
  }, []);*/
  const [winnerTeam,
    totalScore,
    away,
    home,
    regular,
    playoffs,
    total,
    spread,
    moneylineAway,
    moneylineHome] = useSearchParams();
  const params = {
    winnerTeam: winnerTeam[1],
    totalScore: Number(totalScore[1]),
    /*totalScoreh1: Number(totalScoreq1[1]) + Number(totalScoreq2[1]),
    totalScoreq1: totalScoreq1[1],
    totalScoreq2: totalScoreq2[1],
    totalScoreh2: Number(totalScoreq3[1]) + Number(totalScoreq4[1]),
    totalScoreq3: totalScoreq3[1],
    totalScoreq4: totalScoreq4[1],
    totalScoreOt: Number(totalScoreOt[1]),*/
    away: away[1],
    home: home[1],
    regular: regular[1].toString().toLocaleLowerCase() === "true",
    playoffs: playoffs[1].toString().toLocaleLowerCase() === "true",
    total: Number(total[1]),
    spread: Number(spread[1]),
    moneylineAway: Number(moneylineAway[1]),
    moneylineHome: Number(moneylineHome[1])
  }
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const totalScoreh1Text = "Click on 1st and 2nd Quarters to See";
  const [totalScoreh1, setTotalScoreh1] = useState<number>(-1);
  const [totalScoreq1, setTotalScoreq1] = useState<number>(-1);
  const [totalScoreq2, setTotalScoreq2] = useState<number>(-1);
  const totalScoreh2Text = "Click on 3rd and 4th Quarters to See";
  const [totalScoreh2, setTotalScoreh2] = useState<number>(-1);
  const [totalScoreq3, setTotalScoreq3] = useState<number>(-1);
  const [totalScoreq4, setTotalScoreq4] = useState<number>(-1);
  const [totalScoreOt, setTotalScoreot] = useState<number>(-1);
  const connectionContext = useContext(ConnectionContext);
  if(!connectionContext){
      throw new Error("Connection error");
  }
  const {setIsConnected} = connectionContext;
  const isHomeWinner = params.winnerTeam === params.home;
  const chanceToWin = isHomeWinner ? 1 / params.moneylineHome : 1 / params.moneylineAway;
  const winnerTeamRisk = {
    text: chanceToWin < 0.5 ? "(High Risk)" : chanceToWin < 0.7 ? "(Medium Risk)" : "(Low Risk)",
    color: chanceToWin < 0.5 ? colors.secondaryColor : chanceToWin < 0.7 ? colors.yellow : colors.green,
  }
  const totalScoreCal = Math.abs(params.total - params.totalScore);
  const totalScoreCal2 = Math.abs(Math.abs(params.total - params.totalScore) - params.spread);
  const totalScoreRisk = {
    text: totalScoreCal < params.spread ? "(Low Risk)" : totalScoreCal2 <= 15 ? "(Medium Risk)" : "(High Risk)",
    color: totalScoreCal < params.spread ? colors.green : totalScoreCal2 <= 15 ? colors.yellow : colors.secondaryColor
  }
  const totalScoreOtRisk = {
    text: totalScoreOt < 11 ? "(Low Risk)" : totalScoreOt < 20 ? "(Medium Risk)" : "(High Risk)",
    color: totalScoreOt < 11 ? colors.green : totalScoreOt < 20 ? colors.yellow : colors.secondaryColor,
  }
  async function getQuarterPred(quarter: number){
    setIsLoading(() => true);
    const reqItem : BetsForm = {
      regular: params.regular,
      playoffs: params.playoffs,
      away: params.away,
      home: params.home,
      spread: params.spread,
      total: params.total,
      moneyline_away: params.moneylineAway,
      moneyline_home: params.moneylineHome
    }
    try{
      switch(quarter){
        case 1:
          request.train.getTotalScoreQ1Pred(reqItem)
          .then(res => {
            if(res.status === 200){
              const data = res.data as TotalScoreQ1Prediction
              setTotalScoreq1(() => data.total_score_q1);
              if(totalScoreh1 < 0 && data.total_score_q1 > 0 && totalScoreq2 > 0) setTotalScoreh1(() => data.total_score_q1 + totalScoreq2);
            }else{
              setIsConnected(false);
            }
            //rewardedInterstitial.show();
            setIsLoading(() => false);
          });
          break;
        case 2:
          request.train.getTotalScoreQ2Pred(reqItem)
          .then(res => {
            if(res.status === 200){
              const data = res.data as TotalScoreQ2Prediction
              setTotalScoreq2(() => data.total_score_q2);
              if(totalScoreh1 < 0 && totalScoreq1 > 0 && data.total_score_q2 > 0) setTotalScoreh1(() => totalScoreq1 + data.total_score_q2);
            }else{
              setIsConnected(false);
            }
            //rewardedInterstitial.show();
            setIsLoading(() => false);
          });
          break;
        case 3:
          request.train.getTotalScoreQ3Pred(reqItem)
          .then(res => {
            if(res.status === 200){
              const data = res.data as TotalScoreQ3Prediction
              setTotalScoreq3(() => data.total_score_q3);
              if(totalScoreh2 < 0 && data.total_score_q3 > 0 && totalScoreq4 > 0) setTotalScoreh2(() => data.total_score_q3 + totalScoreq4);
            }else{
              setIsConnected(false);
            }
            //rewardedInterstitial.show();
            setIsLoading(() => false);
          });
          break;
        case 4:
          var res = await request.train.getTotalScoreQ4Pred(reqItem)
          .then(res => {
            if(res.status === 200){
              const data = res.data as TotalScoreQ4Prediction
              setTotalScoreq4(() => data.total_score_q4);
              if(totalScoreh2 < 0 && totalScoreq3 > 0 && data.total_score_q4 > 0) setTotalScoreh2(() => totalScoreq3 + data.total_score_q4);
            }else{
              setIsConnected(false);
            }
            //rewardedInterstitial.show();
            setIsLoading(() => false);
          });
          break;
        default:
          request.train.getTotalScoreOTPred(reqItem)
          .then(res => {
            if(res.status === 200){
              const data = res.data as TotalScoreOTPrediction
              setTotalScoreot(() => data.total_score_ot);
            }else{
              setIsConnected(false);
            }
            //rewardedInterstitial.show();
            setIsLoading(() => false);
          });
          break;
      }
    }catch{
      setIsLoading(() => false);
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
      <Text style={{color: colors.white}}>Winner {winnerTeamRisk.text}</Text>
      <View style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: winnerTeamRisk.color,
        borderRadius: 10,
        padding: 5,
        marginVertical: 5
      }}>
        <Image
          source={{uri: getLogo(params.winnerTeam)}}
          style={{width: 50, height: 50, margin: 5}}
          resizeMode="contain"
        />
        <Text style={{color: colors.white, fontWeight: "bold", fontSize: 20}}>{params.winnerTeam}</Text>
      </View>
      <Line/>
      <ScrollView style={{width: "100%", marginBottom: 0}}>
        <BaseTextInput 
          value={`${params.totalScore} (${params.totalScore > params.total ? "Under" : "Over"})`} 
          text={`Total Score ${totalScoreRisk.text}`} 
          backgroundColor={totalScoreRisk.color} 
          editable={false}/>
        <BaseTextInput
          value={totalScoreh1 < 0 ? totalScoreh1Text : totalScoreh1.toString()} 
          text="1st Half Total Score Comming Soon"  //(Medium Risk)
          backgroundColor={colors.yellow} 
          editable={false}
          />
        {/*totalScoreq1 < 0 ? 
        isLoading ? 
          <View style={{alignItems: "center", justifyContent: "center", margin:10 }}>
              <ActivityIndicator size="large" color={colors.white}/>
          </View>
        : <SubmitButton text={adLoaded ? "Click to See 1st Quarter" : "Loading..."} onPress={() => getQuarterPred(1)} disabled={!adLoaded}/>
        : <View style={{paddingHorizontal: 20}}>
            <BaseTextInput
              value={totalScoreq1.toString()} 
              text="1st Quarter Total Score (High Risk)"
              backgroundColor={colors.secondaryColor}
              editable={false}/>
          </View>
        */}
        {/*totalScoreq2 < 0 ? 
        isLoading ? 
          <View style={{alignItems: "center", justifyContent: "center", margin:10 }}>
              <ActivityIndicator size="large" color={colors.white}/>
          </View>
        : <SubmitButton text={adLoaded ? "Click to See 2nd Quarter" : "Loading..."} onPress={() => getQuarterPred(2)} disabled={!adLoaded}/>
        : <View style={{paddingHorizontal: 20}}>
            <BaseTextInput
                value={totalScoreq2.toString()} 
                text="2nd Quarter Total Score (High Risk)"
                backgroundColor={colors.secondaryColor}
                editable={false}/>
          </View>
        */}
        <BaseTextInput
          value={totalScoreh2 < 0 ? totalScoreh2Text : totalScoreh2.toString()}
          text="2nd Half Total Score Comming Soon" //(Medium Risk)
          backgroundColor={colors.yellow} 
          editable={false}
          />
        {/*totalScoreq3 < 0 ? 
        isLoading ? 
          <View style={{alignItems: "center", justifyContent: "center", margin:10 }}>
              <ActivityIndicator size="large" color={colors.white}/>
          </View>
        : <SubmitButton text={adLoaded ? "Click to See 3rd Quarter" : "Loading..."} onPress={() => getQuarterPred(3)} disabled={!adLoaded}/>
        : <View style={{paddingHorizontal: 20}}>
            <BaseTextInput
                value={totalScoreq3.toString()} 
                text="3rd Quarter Total Score (High Risk)"
                backgroundColor={colors.secondaryColor}
                editable={false}/>
          </View>
        */}
        {/*totalScoreq4 < 0 ? 
        isLoading ? 
          <View style={{alignItems: "center", justifyContent: "center", margin:10 }}>
              <ActivityIndicator size="large" color={colors.white}/>
          </View>
        : <SubmitButton text={adLoaded ? "Click to See 4th Quarter" : "Loading..."} onPress={() => getQuarterPred(4)} disabled={!adLoaded}/>
        : <View style={{paddingHorizontal: 20}}>
            <BaseTextInput
                value={totalScoreq4.toString()} 
                text="4th Quarter Total Score (High Risk)"
                backgroundColor={colors.secondaryColor}
                editable={false}/>
          </View>
        */}
        {/*totalScoreOt < 0 ? 
        isLoading ? 
          <View style={{alignItems: "center", justifyContent: "center", margin:10 }}>
              <ActivityIndicator size="large" color={colors.white}/>
          </View>
        : <SubmitButton text={adLoaded ? "Click to See Over Time" : "Loading..."} onPress={() => getQuarterPred(0)} disabled={!adLoaded}/>
        : <View style={{paddingHorizontal: 20}}>
            <BaseTextInput 
                value={totalScoreOt < 11 ? "0" : totalScoreOt.toString()} 
                text={`Over Time Total Score ${totalScoreOtRisk.text}`}  
                backgroundColor={totalScoreOtRisk.color} />
          </View>
        */}
      </ScrollView>
    </View>
  );
}