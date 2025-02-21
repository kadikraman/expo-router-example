import { ScrollView } from "react-native";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/modalStack/index",
};

export default function RedScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerClassName="p-4 bg-red-200 flex-1">
      <Link href="/modalStack" asChild push>
        <Button theme="secondary" title='Open "Index screen"' />
      </Link>
      <Link href="/modalStack/green" asChild push>
        <Button theme="secondary" title='Open "Green 💚 screen"' />
      </Link>
      <Button theme="tertiary" title="Back" onPress={() => router.back()} />
    </ScrollView>
  );
}
