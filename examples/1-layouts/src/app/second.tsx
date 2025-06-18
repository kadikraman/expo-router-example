import { View } from "react-native";
import { AppText } from "@/components/AppText";

export default function SecondScreen() {
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading" bold>
        Second Screen
      </AppText>
    </View>
  );
}
