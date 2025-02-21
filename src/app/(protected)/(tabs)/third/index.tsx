import { ScrollView } from "react-native";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function Third() {
  const router = useRouter();
  return (
    <ScrollView contentContainerClassName="p-4">
      <Button
        title="Navigate within this tab "
        onPress={() => router.push("/third/inner")}
      />
      <Box text="Item 1" color="pink" size="small" />
      <Box text="Item 2" color="pink" size="small" />
      <Box text="Item 3" color="pink" size="small" />
      <Box text="Item 4" color="pink" size="small" />
      <Box text="Item 5" color="pink" size="small" />
      <Box text="Item 6" color="pink" size="small" />
      <Box text="Item 7" color="pink" size="small" />
      <Box text="Item 8" color="pink" size="small" />
      <Box text="Item 9" color="pink" size="small" />
      <Box text="Item 10" color="pink" size="small" />
    </ScrollView>
  );
}
