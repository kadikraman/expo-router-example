import { ScrollView } from "react-native";
import { AppText } from "@/components/AppText";

export default function MoreDetails() {
  return (
    <ScrollView contentContainerClassName="p-4">
      <AppText size="medium" center>
        This is another page within the home tab stack
      </AppText>
    </ScrollView>
  );
}
