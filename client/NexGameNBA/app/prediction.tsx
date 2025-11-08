import { useSearchParams } from "expo-router/build/hooks";
import { ScrollView, Text, TextInput, View } from "react-native";
import { colors } from "./utils";

export default function Index() {
  const [away, home] = useSearchParams();
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primaryColor
      }}
    >
      <ScrollView style={{width: "100%", marginBottom: 50}}>
              <View style={{marginVertical: 5}}>
                <Text style={{color: colors.white}}>Away</Text>
                <TextInput style={{
                backgroundColor: colors.routeButtonColor, 
                borderColor: colors.green,
                borderWidth: 2,
                paddingVertical: 5,
                borderRadius: 10,
                //shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 8,
                width: '100%',
                color: colors.white,
                padding: 5,
                marginVertical: 5}} editable={false} value={away.toString().replace("away,", "")} />
              </View>
              <View style={{marginVertical: 5}}>
                <Text style={{color: colors.white}}>Home</Text>
                <TextInput style={{
                backgroundColor: colors.routeButtonColor, 
                borderColor: colors.yellow,
                borderWidth: 2,
                paddingVertical: 5,
                borderRadius: 10,
                //shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 8,
                width: '100%',
                color: colors.white,
                padding: 5,
                marginVertical: 5}} editable={false} value={home.toString().replace("home,", "")} />
              </View>
            </ScrollView>
    </View>
  );
}