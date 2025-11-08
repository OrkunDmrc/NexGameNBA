import { colors } from "@/app/utils";
import { DateContext } from "@/contexts/DateContext";
import { useContext } from "react";
import { Text } from "react-native";

export default function DateText(){
    const context = useContext(DateContext);
    if (!context) {
        throw new Error('DateDisplay must be used within a DateProvider');
    }
    const { selectedDate } = context;
    return <Text style={{fontSize: 20, color: colors.yellow, fontWeight: "bold", marginBottom: 5}}>{selectedDate}</Text>
}