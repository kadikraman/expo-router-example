import { Alert, ScrollView } from "react-native";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { useAppState } from "@/utils/state";

export default function Settings() {
  const [appState, setAppState] = useAppState();
  const router = useRouter();

  const confirmReset = () => {
    Alert.alert(
      "Are you sure you want to reset app state?",
      "This will reset onboarding and log you out",
      [
        {
          text: "Yes",
          onPress: () => {
            setAppState({
              isLoggedIn: false,
              hasCompletedOnboarding: false,
            });
            router.replace("/onboarding");
          },
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ],
    );
  };

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
          setAppState({ ...appState, isLoggedIn: false });
          router.replace("/login");
        }}
      />
      <Button title="Reset app state" onPress={confirmReset} />
    </ScrollView>
  );
}
