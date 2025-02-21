import { ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();
  return (
    <ScrollView contentContainerClassName="p-4">
      <Button
        title="Open modal"
        onPress={() => {
          router.push("/modal");
        }}
      />
      <Button
        title="Open modal stack"
        onPress={() => {
          router.push("/modalStack");
        }}
      />
    </ScrollView>
  );
}
