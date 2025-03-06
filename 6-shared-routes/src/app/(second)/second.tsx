import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Link } from "expo-router";
import { Button } from "@/components/Button";

export default function SecondScreen() {
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading">
        Second Screen
      </AppText>
      <Link href="/details" push asChild>
        <Button title="Push to /details" />
      </Link>
      <Link href="(home)/details" push asChild>
        <Button title="Push to (home)/details" theme="secondary" />
      </Link>
    </View>
  );
}
