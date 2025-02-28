import { ScrollView } from "react-native";
import { AppText } from "@/components/AppText";

export default function Shared() {
  return (
    <ScrollView contentContainerClassName="p-4">
      <AppText size="medium" center>
       This page is shared and can be opened in both the (home) and second stack
      </AppText>
    </ScrollView>
  );
}
