import { Stack, Redirect } from "expo-router";
import { useAppState } from "@/utils/state";

export default function LoggedInLayout() {
  const [appState] = useAppState();

  if (!appState.hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (!appState.isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="modalStack"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
