import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Link } from "expo-router";
import { Button } from "@/components/Button";

export default function IndexScreen() {
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading" bold>
        Index Screen
      </AppText>
      <Link href="/second" push asChild>
        <Button title="Push to /second" />
      </Link>
      <Link href="/third" push asChild>
        <Button title="Push to /third" />
      </Link>
      <Link href="/fifth/sixth" push asChild>
        <Button title="Push to /fifth/sixth" />
      </Link>
    </View>
  );
}
