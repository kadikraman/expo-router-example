import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Link } from "expo-router";
import { Button } from "@/components/Button";

export default function IndexScreen() {
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading">
        Index Screen
      </AppText>
      <Link href="/details" push asChild>
        <Button title="Push to /details" />
      </Link>
    </View>
  );
}
