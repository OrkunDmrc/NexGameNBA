import { colors } from "@/app/utils";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

type SubmitButtonProps = {
    text: string,
    onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export default function SubmitButton({text, onPress}: SubmitButtonProps){
    return (
        <TouchableOpacity
          style={{
            flexDirection: "row", 
            justifyContent: "center", 
            alignItems: "center",
            backgroundColor: colors.green, 
            borderColor: colors.white,
            borderWidth: 2,
            paddingVertical: 5,
            borderRadius: 20,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 8,
            marginHorizontal: 20,
            marginVertical: 10}}
            onPress={onPress}>
          <Text style={{color: colors.white, fontWeight: "bold", fontSize: 20}}>{text}</Text>
        </TouchableOpacity>
    );
}