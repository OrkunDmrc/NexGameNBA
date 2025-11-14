import { colors } from "@/app/utils";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

type SubmitButtonProps = {
    text: string,
    onPress: ((event: GestureResponderEvent) => void) | undefined;
    disabled?: boolean
}

export default function SubmitButton({text, onPress, disabled=false}: SubmitButtonProps){
    return (
        <TouchableOpacity
          style={{
            flexDirection: "row", 
            justifyContent: "center", 
            alignItems: "center",
            backgroundColor: disabled ? colors.secondaryColor : colors.green, 
            borderColor: colors.white,
            borderWidth: 2,
            paddingVertical: 5,
            borderRadius: 10,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 8,
            marginVertical: 10}}
            onPress={onPress}
            disabled={disabled}
            >
          <Text style={{color: colors.white, fontWeight: "bold", fontSize: 15}}>{text}</Text>
        </TouchableOpacity>
    );
}