import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

// For deep linking to ensure the (tabs) is rendered in the background
export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function Modal() {
  const router = useRouter();
  return (
    <View className="p-4 flex-1 justify-center">
      <AppText size="heading" bold center>
        A modal with 3 screens in a stack
      </AppText>
      <Link href="/modalStack/green" asChild push>
        <Button theme="secondary" title='Open "Green 💚 screen"' />
      </Link>
      <Link href="/modalStack/red" asChild push>
        <Button theme="secondary" title='Open "Red 🔴 screen"' />
      </Link>
      <Button theme="tertiary" title="Back" onPress={() => router.back()} />
    </View>
  );
}
