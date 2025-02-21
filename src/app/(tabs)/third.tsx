import { ScrollView } from "react-native";
import { Box } from "../../components/Box";

export default function Second() {
  return (
    <ScrollView contentContainerClassName="p-4">
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
