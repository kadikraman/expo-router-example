import { View } from "react-native";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function Second() {
  const router = useRouter();

  return (
    <View className="p-4 flex-1 justify-center">
      <Button
        title="Open a shared page"
        theme="secondary"
        onPress={() => router.push("/shared")}
      />
      <Button
        title='Open "products/item-1"'
        theme="secondary"
        onPress={() => router.push("/products/item-1")}
      />
    </View>
  );
}
