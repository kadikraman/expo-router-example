import { View } from "react-native";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View className="p-4 flex-1 justify-center">
      <Button
        title="Navigate within this tab"
        onPress={() => router.push("/details")}
      />
      <Button
        title="Open a shared page"
        theme="secondary"
        onPress={() => router.push("/shared")}
      />
      <Button
        title='Open "products/item-1"'
        theme="tertiary"
        onPress={() => router.push("/products/item-1")}
      />
    </View>
  );
}
