import { ScrollView } from "react-native";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function Details() {
  const router = useRouter();

  return (
    <ScrollView contentContainerClassName="p-4">
      <AppText size="medium" center>
        A page that is opened within the home tab
      </AppText>

      <Button title="Open more nested details" onPress={() => router.push('/moreDetails')} />
    </ScrollView>
  );
}
