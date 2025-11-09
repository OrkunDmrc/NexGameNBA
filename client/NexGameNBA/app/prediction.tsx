import BaseTextInput from "@/component/BaseTextInput";
import Line from "@/component/Line";
import { useSearchParams } from "expo-router/build/hooks";
import { Image, ScrollView, Text, View } from "react-native";
import { colors, logos } from "./utils";

export default function Prediction() {
  const [winnerTeam,
    totalScore,
    totalScoreq1,
    totalScoreq2,
    totalScoreq3,
    totalScoreq4,
    totalScoreOt,
    total,
    spread,
    moneylineAway,
    moneylineHome] = useSearchParams();
  const params = {
    winnerTeam: winnerTeam[1],
    totalScore: Number(totalScore[1]),
    totalScoreh1: Number(totalScoreq1[1]) + Number(totalScoreq2[1]),
    totalScoreq1: totalScoreq1[1],
    totalScoreq2: totalScoreq2[1],
    totalScoreh2: Number(totalScoreq3[1]) + Number(totalScoreq4[1]),
    totalScoreq3: totalScoreq3[1],
    totalScoreq4: totalScoreq4[1],
    totalScoreOt: Number(totalScoreOt[1]),
    total: Number(total[1]),
    spread: Number(spread[1]),
    moneylineAway: Number(moneylineAway[1]),
    moneylineHome: Number(moneylineHome[1])
  }
  const moneyLineCal = Math.abs(params.moneylineAway - params.moneylineHome);
  const winnerTeamRisk = {
    text: moneyLineCal < 0.9 ? "(High Risk)" : moneyLineCal < 1.5 ? "(Medium Risk)" : "(Low Risk)",
    color: moneyLineCal < 0.9 ? colors.secondaryColor : moneyLineCal < 1.5 ? colors.yellow : colors.green,
  }
  const totalScoreCal = Math.abs(params.total - params.totalScore);
  const totalScoreCal2 = Math.abs(Math.abs(params.total - params.totalScore) - params.spread);
  const totalScoreRisk = {
    text: totalScoreCal < params.spread ? "(Low Risk)" : totalScoreCal2 <= 15 ? "(Medium Risk)" : "(High Risk)",
    color: totalScoreCal < params.spread ? colors.green : totalScoreCal2 <= 15 ? colors.yellow : colors.secondaryColor
  }
  const totalScoreOtRisk = {
    text: params.totalScoreOt < 11 ? "(Low Risk)" : params.totalScoreOt < 20 ? "(Medium Risk)" : "(High Risk)",
    color: params.totalScoreOt < 11 ? colors.green : params.totalScoreOt < 20 ? colors.yellow : colors.secondaryColor,
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
          source={logos["Nuggets"/*homeTeam*/]}
          style={{width: 50, height: 50}}
          resizeMode="contain"
        />
        <Text style={{color: colors.white, fontWeight: "bold", fontSize: 20}}>{params.winnerTeam}</Text>
      </View>
      <Line/>
      <ScrollView style={{width: "100%", marginBottom: 50}}>
        <BaseTextInput 
          value={`${params.totalScore} (${params.totalScore > params.total ? "Under" : "Over"})`} 
          text={`Total Score ${totalScoreRisk.text}`} 
          backgroundColor={totalScoreRisk.color} 
          editable={false}/>
        <BaseTextInput value={params.totalScoreh1.toString()} text="1st Half Total Score (Medium Risk)"  backgroundColor={colors.yellow} editable={false}/>
        <BaseTextInput value={params.totalScoreq1} text="1st Quarter Total Score (High Risk)"  backgroundColor={colors.secondaryColor} editable={false}/>
        <BaseTextInput value={params.totalScoreq2} text="2nd Quarter Total Score (High Risk)"  backgroundColor={colors.secondaryColor} editable={false}/>
        <BaseTextInput value={params.totalScoreh2.toString()} text="2nd Half Total Score (Medium Risk)"  backgroundColor={colors.yellow} editable={false}/>
        <BaseTextInput value={params.totalScoreq3} text="3rd Quarter Total Score (High Risk)"  backgroundColor={colors.secondaryColor} editable={false}/>
        <BaseTextInput value={params.totalScoreq4} text="4th Quarter Total Score (High Risk)"  backgroundColor={colors.secondaryColor} editable={false}/>
        <BaseTextInput 
          value={params.totalScoreOt < 11 ? "0" : params.totalScoreOt.toString()} 
          text={`Over Time Total Score ${totalScoreOtRisk.text}`}  
          backgroundColor={totalScoreOtRisk.color} 
          editable={false}/>
      </ScrollView>
    </View>
  );
}