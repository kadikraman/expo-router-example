import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Link } from "expo-router";
import { Button } from "@/components/Button";

export default function SecondNestedScreen() {
  return (
    <View className="justify-center flex-1 p-4 bg-pink-200">
      <AppText center>Second Nested Screen</AppText>
      <Link href="/second/also-nested" push asChild>
        <Button title="Push to /second/also-nested" />
      </Link>
    </View>
  );
}
