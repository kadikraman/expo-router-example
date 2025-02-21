import { ScrollView } from "react-native";
import { AppText } from "@/components/AppText";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function Modal() {
  return (
    <ScrollView contentContainerClassName="p-4">
      <AppText size="xlarge" bold center>
        Simple one-screen modal
      </AppText>
      <AppText size="medium" center>
        This is a modal with a single screen. It displayed over the top of all
        other app content.
      </AppText>
    </ScrollView>
  );
}
