import DateCardSlider from "@/component/DateCardSlider";
import DateText from "@/component/DateText";
import Line from "@/component/Line";
import { View } from "react-native";
import { colors } from "./utils";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.primaryColor,
        padding: 10
      }}
    >
      <DateCardSlider />
      <Line/>
      <DateText/>
        
    </View>
  );
}
