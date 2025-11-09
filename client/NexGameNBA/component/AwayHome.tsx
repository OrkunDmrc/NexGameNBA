import { colors, getLogo } from "@/app/utils";
import { Image, Text, TextInput, View } from "react-native";

type AwayHomeProps = {
    away: string,
    home: string
}

export default function AwayHome({away, home}: AwayHomeProps){
    return (
        <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
        <View style={{margin: 5, alignItems: "center", width: "40%"}}>
          <Text style={{color: colors.white, textAlign: "center"}}>Away</Text>
          <Image
            source={{uri: getLogo(away)}}
            style={{width: 50, height: 50, marginVertical: 10}}
            resizeMode="contain"
          />
          <TextInput style={{
            textAlign: "center",
            backgroundColor: colors.routeButtonColor, 
            borderColor: colors.white,
            borderWidth: 2,
            paddingVertical: 5,
            borderRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 8,
            color: colors.white,
            width: '100%',
            padding: 5,
            marginVertical: 5}} editable={false} value={away} />
        </View>
        <View style={{margin: 5, alignItems: "center", width: "40%"}}>
          <Text style={{color: colors.white, textAlign: "center"}}>Home</Text>
          <Image
            source={{uri: getLogo(home)}}
            style={{width: 50, height: 50, marginVertical: 10}}
            resizeMode="contain"
          />
          <TextInput style={{
            backgroundColor: colors.routeButtonColor,
            textAlign: "center",
            borderColor: colors.white,
            borderWidth: 2,
            paddingVertical: 5,
            borderRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 8,
            width: '100%',
            color: colors.white,
            padding: 5,
            marginVertical: 5}} editable={false} value={home} />
        </View>
      </View>
    )
}