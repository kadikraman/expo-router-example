import { ScrollView } from "react-native";
import { AppText } from "@/components/AppText";

export default function Details() {
  return (
    <ScrollView contentContainerClassName="p-4">
      <AppText size="medium" center>
        A page that is opened within the home tab
      </AppText>
    </ScrollView>
  );
}
