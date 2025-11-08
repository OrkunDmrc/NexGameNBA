import { colors } from "@/app/utils";
import { Switch, Text, View } from "react-native";

type BaseSwitchProps = {
    text: string,
    value: boolean,
    onValueChange?:  ((value: boolean) => Promise<void> | void) | null | undefined;
}

export default function BaseSwitch({text, value, onValueChange}: BaseSwitchProps){
    return (
        <View style={{flexDirection: "row", justifyContent: "center", margin: 5}}>
            <Switch
                trackColor={{ false: colors.secondaryColor, true: colors.green }}
                thumbColor={value ? colors.green : colors.secondaryColor}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onValueChange}
                value={value}/>
            <Text style={{color: colors.white, marginHorizontal: 5}}>{text}</Text>
        </View>
    );
}