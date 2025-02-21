import { ScrollView } from "react-native";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { useAppState } from "@/utils/state";

export default function Settings() {
  const [, setAppState] = useAppState();
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
      <Button
        title="Logout"
        onPress={() => {
          setAppState({ isLoggedIn: false });
          router.replace("/login");
        }}
      />
    </ScrollView>
  );
}
