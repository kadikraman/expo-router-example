import { ScrollView } from "react-native";
import { AppText } from "@/components/AppText";

export default function Inner() {

  return (
    <ScrollView contentContainerClassName="p-4">
      <AppText size="medium" center>
        A page that is opened within the third tab
      </AppText>
    </ScrollView>
  );
}
