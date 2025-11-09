import Line from "@/component/Line";
import ResultContainer from "@/component/ResultContainer";
import { useSearchParams } from "expo-router/build/hooks";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, getLogo } from "./utils";

export default function Results() {
  const [
    winnerFullName,
    away, 
    home, 
    awayScore, 
    homeScore, 
    awayQ1,
    awayQ2,
    awayQ3,
    awayQ4,
    awayOT,
    homeQ1,
    homeQ2,
    homeQ3,
    homeQ4,
    homeOT
  ] = useSearchParams();
  const params = {
    winnerFullName: winnerFullName[1],
    away: away[1],
    home: home[1],
    awayScore: Number(awayScore[1]),
    homeScore: Number(homeScore[1]),
    awayQ1: Number(awayQ1[1]),
    awayQ2: Number(awayQ2[1]),
    awayQ3: Number(awayQ3[1]),
    awayQ4: Number(awayQ4[1]),
    awayOT: Number(awayOT[1]),
    homeQ1: Number(homeQ1[1]),
    homeQ2: Number(homeQ2[1]),
    homeQ3: Number(homeQ3[1]),
    homeQ4: Number(homeQ4[1]),
    homeOT: Number(homeOT[1])
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primaryColor,
        padding: 10,
        flexDirection: "column"
      }}
    >
      <Text style={{color: colors.white}}>Winner</Text>
      <View style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.routeButtonColor,
        borderRadius: 10,
        padding: 5,
        marginVertical: 5
      }}>
        <Image
          source={{uri: getLogo(params.winnerFullName)}}
          style={{width: 50, height: 50, margin: 5}}
          resizeMode="contain"
        />
        <Text style={{color: colors.white, fontWeight: "bold", fontSize: 20}}>{params.winnerFullName}</Text>
      </View>
      <Line/>
      <ScrollView style={{width: "100%", marginBottom: 50}}>
        <ResultContainer
          text={"Score"}
          away={params.away}
          home={params.home}
          awayScore={params.awayScore}
          homeScore={params.homeScore}
          totalScore={params.awayScore + params.homeScore}
          color={colors.routeButtonColor}/>
        <ResultContainer
          text={"1st Half"}
          away={params.away}
          home={params.home}
          awayScore={params.awayQ1 + params.awayQ2}
          homeScore={params.homeQ1 + params.homeQ2}
          totalScore={params.awayQ1 + params.awayQ2 + params.homeQ1 + params.homeQ2}
          color={colors.routeButtonColor}/>
        <ResultContainer
          text={"1st Quarter"}
          away={params.away}
          home={params.home}
          awayScore={params.awayQ1}
          homeScore={params.homeQ1}
          totalScore={params.awayQ1 + params.homeQ1}/>
        <ResultContainer
          text={"2nd Quarter"}
          away={params.away}
          home={params.home}
          awayScore={params.awayQ2}
          homeScore={params.homeQ2}
          totalScore={params.awayQ2 + params.homeQ2}/>
        <ResultContainer
          text={"2nd Half"}
          away={params.away}
          home={params.home}
          awayScore={params.awayQ3 + params.awayQ4}
          homeScore={params.homeQ3 + params.homeQ4}
          totalScore={params.awayQ3 + params.awayQ4 + params.homeQ3 + params.homeQ4}
          color={colors.routeButtonColor}/>
        <ResultContainer
          text={"3rd Quarter"}
          away={params.away}
          home={params.home}
          awayScore={params.awayQ3}
          homeScore={params.homeQ3}
          totalScore={params.awayQ3 + params.homeQ3}/>
        <ResultContainer
          text={"4th Quarter"}
          away={params.away}
          home={params.home}
          awayScore={params.awayQ4}
          homeScore={params.homeQ4}
          totalScore={params.awayQ4 + params.homeQ4}/>
        <ResultContainer
          text={"Over Time"}
          away={params.away}
          home={params.home}
          awayScore={params.awayOT}
          homeScore={params.homeOT}
          totalScore={params.awayOT + params.homeOT}/>
      </ScrollView>
    </SafeAreaView>
  );
}