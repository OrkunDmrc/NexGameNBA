import { colors, getLogo } from "@/app/utils";
import { GestureResponderEvent, Image, Text, TouchableOpacity, View } from "react-native";


type RouteButtonProps = {
    awayTeam: string,
    homeTeam: string,
    onPress: ((event: GestureResponderEvent) => void) | undefined;
    awayScore?: number,
    homeScore?: number,
    time?: string
}

export default function RouteButton({awayTeam, homeTeam, onPress, awayScore, homeScore, time}: RouteButtonProps){
    return <TouchableOpacity
    onPress={onPress}
    style={{
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: colors.routeButtonColor, 
        borderColor: awayScore || homeScore ? colors.green : colors.white,
        borderWidth: 2,
        paddingVertical: 5,
        borderRadius: 10,
        //shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 8,
        width: '100%',
        marginVertical: 5}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{ color: colors.white, textAlign: "right", fontSize: 15, fontWeight: 'bold', width: 110}}>
                    {awayTeam}
                </Text>
                <Image
                    source={getLogo(awayTeam)}
                    style={{width: 25, height: 25, marginLeft: 5}}
                    resizeMode="contain"
                />
            </View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                {
                    awayScore && homeScore ? 
                    <>
                        <Text style={{ color: awayScore!! > homeScore!! ? colors.green : colors.yellow, textAlign: "center", fontSize: 13, fontWeight: 'bold', width: 25}}>
                            {awayScore}
                        </Text>
                        <Text style={{color: colors.white}}> - </Text>
                        <Text style={{color: homeScore!! > awayScore!!  ? colors.green : colors.yellow, textAlign: "center", fontSize: 13, fontWeight: 'bold', width: 25}}>
                            {homeScore}
                        </Text>
                    </> :
                    <Text style={{color: colors.white}}> - </Text>
                }
            </View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Image
                    source={getLogo(homeTeam)}
                    style={{width: 25, height: 25, marginRight: 5}}
                    resizeMode="contain"
                />
                <Text style={{ color: colors.white, textAlign: "left", fontSize: 15, fontWeight: 'bold', width: 110}}>
                    {homeTeam}
                </Text>
            </View>

        
        
      </TouchableOpacity>
}