import { Text, View } from "react-native";
import { colors } from "./utils";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primaryColor
      }}
    >
      <Text>dümenden</Text>
    </View>
  );
}