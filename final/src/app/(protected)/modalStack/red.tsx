import { View } from "react-native";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/modalStack/index",
};

export default function RedScreen() {
  const router = useRouter();

  return (
    <View className="p-4 bg-red-200 flex-1 justify-center">
      <Link href="/modalStack" asChild push>
        <Button theme="secondary" title='Open "Index screen"' />
      </Link>
      <Link href="/modalStack/green" asChild push>
        <Button theme="secondary" title='Open "Green 💚 screen"' />
      </Link>
      <Button theme="tertiary" title="Back" onPress={() => router.back()} />
    </View>
  );
}
