import BaseTextInput from "@/component/BaseTextInput";
import Line from "@/component/Line";
import SubmitButton from "@/component/SubmitButton";
import { ConnectionContext } from "@/contexts/ConnectionContext";
import { useSearchParams } from "expo-router/build/hooks";
import { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { AdEventType, RewardedAdEventType, RewardedInterstitialAd } from "react-native-google-mobile-ads";
import { adIds, colors, getLogo } from "./utils";

const adUnitId = adIds.rewardedIntAdId;

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});


export default function Prediction() {
  const [adLoaded, setAdLoaded] = useState<boolean>(true);
  useEffect(() => {
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
  }, []);
  const [date,
        regular,
        playoff,
        away,
        home,
        spread,
        total,
        away_moneyline,
        home_moneyline,
        total_score,
        q1_score,
        q2_score,
        q3_score,
        q4_score,
        ot_score,
        winner] = useSearchParams();
  const params = {
    away:away[1],
    home:home[1],
    spread: Number(spread[1]),
    total: Number(total[1]),
    away_moneyline: Number(away_moneyline[1]),
    home_moneyline: Number(home_moneyline[1]),
    total_score: Number(total_score[1]),
    q1_score:Number(q1_score[1]),
    q2_score:Number(q2_score[1]),
    q3_score:Number(q3_score[1]),
    q4_score:Number(q4_score[1]),
    ot_score:Number(ot_score[1]),
    winner:winner[1]
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
  const isHomeWinner = params.winner === params.home;
  const chanceToWin = isHomeWinner ? 1 / params.home_moneyline : 1 / params.away_moneyline;
  const winnerTeamRisk = {
    text: chanceToWin < 0.5 ? "(High Risk)" : chanceToWin < 0.7 ? "(Medium Risk)" : "(Low Risk)",
    color: chanceToWin < 0.5 ? colors.secondaryColor : chanceToWin < 0.7 ? colors.yellow : colors.green,
  }
  const totalScoreCal = Math.abs(params.total - params.total_score);
  const totalScoreCal2 = Math.abs(Math.abs(params.total - params.total_score) - params.spread);
  const totalScoreRisk = {
    text: totalScoreCal < params.spread ? "(Low Risk)" : totalScoreCal2 <= 15 ? "(Medium Risk)" : "(High Risk)",
    color: totalScoreCal < params.spread ? colors.green : totalScoreCal2 <= 15 ? colors.yellow : colors.secondaryColor
  }
  const totalScoreOtRisk = {
    text: totalScoreOt < 11 ? "(Low Risk)" : totalScoreOt < 20 ? "(Medium Risk)" : "(High Risk)",
    color: totalScoreOt < 11 ? colors.green : totalScoreOt < 20 ? colors.yellow : colors.secondaryColor,
  }
  function getQuarterPred(quarter: number){
    try{
      switch(quarter){
        case 1:
          setTotalScoreq1(() => params.q1_score);
          break;
        case 2:
          setTotalScoreq2(() => params.q2_score);
          break;
        case 3:
          setTotalScoreq3(() => params.q3_score);
          break;
        case 4:
          setTotalScoreq4(() => params.q4_score);
          break;
        default:
          setTotalScoreot(() => params.ot_score);
          break;
      }
      if(totalScoreq1 > 0 && totalScoreq2 > 0)
        setTotalScoreh1(() => totalScoreq1 + totalScoreq2);
      if(totalScoreq3 > 0 && totalScoreq4 > 0)
        setTotalScoreh2(() => totalScoreq3 + totalScoreq4);
      rewardedInterstitial.show();
    }catch(e){
      console.log(e);
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
          source={getLogo(params.winner)}
          style={{width: 50, height: 50, margin: 5}}
          resizeMode="contain"
        />
        <Text style={{color: colors.white, fontWeight: "bold", fontSize: 20}}>{params.winner}</Text>
      </View>
      <Line/>
      <ScrollView style={{width: "100%", marginBottom: 0}}>
        <BaseTextInput 
          value={`${params.total_score} (${params.total_score > params.total ? "Under" : "Over"})`} 
          text={`Total Score ${totalScoreRisk.text}`} 
          backgroundColor={totalScoreRisk.color} 
          editable={false}/>
        <BaseTextInput
          value={totalScoreh1 < 0 ? totalScoreh1Text : totalScoreh1.toString()}
          text="1st Half Total Score (Medium Risk)"
          backgroundColor={colors.yellow} 
          editable={false}
          />
        {totalScoreq1 < 0 ? 
        <SubmitButton text={"Click to See 1st Quarter"} onPress={() => getQuarterPred(1)} disabled={!adLoaded}/>
        : <View style={{paddingHorizontal: 20}}>
            <BaseTextInput
              value={totalScoreq1.toString()} 
              text="1st Quarter Total Score (High Risk)"
              backgroundColor={colors.secondaryColor}
              editable={false}/>
          </View>
        }
        {totalScoreq2 < 0 ?
        <SubmitButton text={"Click to See 2nd Quarter"} onPress={() => getQuarterPred(2)} disabled={!adLoaded}/>
        : <View style={{paddingHorizontal: 20}}>
            <BaseTextInput
                value={totalScoreq2.toString()} 
                text="2nd Quarter Total Score (High Risk)"
                backgroundColor={colors.secondaryColor}
                editable={false}/>
          </View>
        }
        <BaseTextInput
          value={totalScoreh2 < 0 ? totalScoreh2Text : totalScoreh2.toString()}
          text="2nd Half Total Score (Medium Risk)"
          backgroundColor={colors.yellow} 
          editable={false}
          />
        {totalScoreq3 < 0 ?<SubmitButton text={"Click to See 3rd Quarter"} onPress={() => getQuarterPred(3)} disabled={!adLoaded}/>
        : <View style={{paddingHorizontal: 20}}>
            <BaseTextInput
                value={totalScoreq3.toString()} 
                text="3rd Quarter Total Score (High Risk)"
                backgroundColor={colors.secondaryColor}
                editable={false}/>
          </View>
        }
        {totalScoreq4 < 0 ? 
        <SubmitButton text={"Click to See 4th Quarter"} onPress={() => getQuarterPred(4)} disabled={!adLoaded}/>
        : <View style={{paddingHorizontal: 20}}>
            <BaseTextInput
                value={totalScoreq4.toString()} 
                text="4th Quarter Total Score (High Risk)"
                backgroundColor={colors.secondaryColor}
                editable={false}/>
          </View>
        }
        {totalScoreOt < 0 ?
        <SubmitButton text={"Click to See Over Time"} onPress={() => getQuarterPred(0)} disabled={!adLoaded}/>
        : <View style={{paddingHorizontal: 20}}>
            <BaseTextInput 
                value={totalScoreOt < 11 ? "0" : totalScoreOt.toString()} 
                text={`Over Time Total Score ${totalScoreOtRisk.text}`}  
                backgroundColor={totalScoreOtRisk.color} />
          </View>
        }
      </ScrollView>
    </View>
  );
}