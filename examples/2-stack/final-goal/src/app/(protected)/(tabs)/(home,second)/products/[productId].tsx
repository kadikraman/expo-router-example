import { ScrollView } from "react-native";
import { AppText } from "@/components/AppText";
import { Stack, useLocalSearchParams } from "expo-router";

export default function ProductId() {
  const { productId } = useLocalSearchParams();

  return (
    <ScrollView contentContainerClassName="p-4">
      <Stack.Screen options={{ title: `${productId}` }} />
      <AppText size="large" center bold>
        Product ID: {productId}
      </AppText>
      <AppText size="medium" center>
       This page is shared and can be opened in both the (home) and second stack
      </AppText>
    </ScrollView>
  );
}
