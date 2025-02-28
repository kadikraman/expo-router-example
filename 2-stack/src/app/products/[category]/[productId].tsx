import { AppText } from "@/components/AppText";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function ProductScreen() {
  const params = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center">
      <AppText>{JSON.stringify(params, null, " ")}</AppText>
    </View>
  );
}
