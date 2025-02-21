import { ScrollView } from "react-native";
import { Box } from "@/components/Box";

export default function Second() {
  return (
    <ScrollView contentContainerClassName="p-4">
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
