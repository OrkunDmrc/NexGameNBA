import { colors } from "@/app/utils";
import { NativeSyntheticEvent, NativeTouchEvent, Text, TextInput, TextInputChangeEvent } from "react-native";

type BaseTextInputProps = {
    value: string,
    text: string,
    errorText?: string
    onChange?: ((e: TextInputChangeEvent) => void) | undefined;
    editable?: boolean
    backgroundColor?: string,
    maxLength?: number,
    onPress?: ((e: NativeSyntheticEvent<NativeTouchEvent>) => void) | undefined;
}

export default function BaseTextInput({value, text, errorText, onChange, editable = true, backgroundColor = colors.routeButtonColor, maxLength, onPress}: BaseTextInputProps){
    return (
        <>
            <Text style={{color: colors.white, marginTop: 5, textAlign: "center"}}>{text}</Text>
            <TextInput style={{
                textAlign: "center",
                cursor: "white",
                backgroundColor: backgroundColor, 
                borderColor: errorText ? colors.secondaryColor : colors.white,
                borderWidth: 1,
                paddingVertical: 5,
                borderRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 8,
                color: colors.white,
                width: '100%',
                padding: 5,
                marginVertical: 5}} 
                keyboardType="numeric" 
                value={value}
                onChange={onChange}
                editable={editable}
                maxLength={maxLength}
                onPress={onPress}/>
            {errorText && <Text style={{color: colors.secondaryColor}}>{errorText}</Text>}
        </>
        
    );
}