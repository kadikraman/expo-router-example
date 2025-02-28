import { View } from "react-native";
import { AppText } from "@/components/AppText";

export default function DeeplyNestedScreen() {
  return (
    <View className="justify-center flex-1 p-4 bg-green">
      <AppText center size="heading" bold>
        Deeply Nested Screen
      </AppText>
    </View>
  );
}
