import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function Details() {
  const router = useRouter();

  return (
    <View className="p-4 flex-1 justify-center">
      <AppText size="large" center>
        This page that is opened within the home tab
      </AppText>

      <Button title="Open more nested details" onPress={() => router.push('/moreDetails')} />
    </View>
  );
}
