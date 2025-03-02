import { View } from "react-native";
import { AppText } from "@/components/AppText";

export default function SecondAlsoNestedScreen() {
  return (
    <View className="justify-center flex-1 p-4 bg-yellow-200">
      <AppText center>Second Also Nested Screen</AppText>
    </View>
  );
}
