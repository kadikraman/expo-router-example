import { View } from "react-native";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function Third() {
  const router = useRouter();
  return (
    <View className="p-4 flex-1 justify-center">
      <Button
        title="Navigate within this tab "
        onPress={() => router.push("/third/inner")}
      />
    </View>
  );
}
