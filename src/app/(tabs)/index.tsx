import { ScrollView } from "react-native";
import { Box } from "../../components/Box";

export default function Home() {
  return (
    <ScrollView contentContainerClassName="p-4">
      <Box text="Item 1" size="large" />
      <Box text="Item 2" size="large" />
      <Box text="Item 3" size="large" />
      <Box text="Item 4" size="large" />
      <Box text="Item 5" size="large" />
      <Box text="Item 6" size="large" />
      <Box text="Item 7" size="large" />
      <Box text="Item 8" size="large" />
      <Box text="Item 9" size="large" />
      <Box text="Item 10" size="large" />
    </ScrollView>
  );
}
