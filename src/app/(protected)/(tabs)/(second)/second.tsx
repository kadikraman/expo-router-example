import { ScrollView } from "react-native";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function Second() {
  const router = useRouter();

  return (
    <ScrollView contentContainerClassName="p-4">
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
      <Box text="Item 1" color="blue" />
      <Box text="Item 2" color="blue" />
      <Box text="Item 3" color="blue" />
      <Box text="Item 4" color="blue" />
      <Box text="Item 5" color="blue" />
      <Box text="Item 6" color="blue" />
      <Box text="Item 7" color="blue" />
      <Box text="Item 8" color="blue" />
      <Box text="Item 9" color="blue" />
      <Box text="Item 10" color="blue" />
    </ScrollView>
  );
}
