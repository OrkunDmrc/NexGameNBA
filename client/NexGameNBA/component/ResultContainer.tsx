import { colors, logos } from "@/app/utils";
import { Image, Text, View } from "react-native";

type ResultContainerProps = {
    text: string,
    away: string,
    home: string,
    awayScore: number,
    homeScore: number,
    totalScore: number,
    color?: string
}

export default function ResultContainer({text, away, home, awayScore, homeScore, totalScore, color}: ResultContainerProps){
    return (
        <>
            <Text style={{color: colors.white}}>{text}</Text>
            <View style={{
                flexDirection: "row", 
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: color || colors.primaryColor,
                borderRadius: 10,
                padding: 5,
                marginVertical: 5}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{ color: colors.white, textAlign: "right", fontSize: 15, fontWeight: 'bold'}}>
                        {away}
                    </Text>
                    <Image
                        source={logos["Nuggets"/*homeTeam*/]}
                        style={{width: 30, height: 30}}
                        resizeMode="contain"
                    />
                </View>
                <View style={{flexDirection: "column", alignItems: "center"}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{ color: awayScore!! > homeScore!! ? colors.green : colors.yellow, textAlign: "center", fontSize: 13, fontWeight: 'bold'}}>
                            {awayScore}
                        </Text>
                        <Text style={{color: colors.white}}> - </Text>
                        <Text style={{color: homeScore!! > awayScore!!  ? colors.green : colors.yellow, textAlign: "center", fontSize: 13, fontWeight: 'bold'}}>
                            {homeScore}
                        </Text>
                    </View>
                    <Text style={{color: colors.white, fontWeight: "bold"}}>{totalScore}</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image
                        source={logos["Nuggets"/*homeTeam*/]}
                        style={{width: 30, height: 30}}
                        resizeMode="contain"
                    />
                    <Text style={{color: colors.white, fontSize: 15, fontWeight: 'bold'}}>
                        {home}
                    </Text>
                </View>
            </View>
      </>
    );
}