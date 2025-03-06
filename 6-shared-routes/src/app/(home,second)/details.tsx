import { View } from "react-native";
import { AppText } from "@/components/AppText";

export default function DetailsScreen() {
  return (
    <View className="justify-center flex-1 p-4 bg-green-200">
      <AppText center size="heading">
        Details Screen
      </AppText>
    </View>
  );
}
