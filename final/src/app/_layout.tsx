import { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import "../../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Adding a delay to simulate async setup, e.g. fetching auth state
    setTimeout(() => {
      setIsReady(true);
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(protected)"
        options={{ animation: "none", headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ animation: "none", headerShown: false }}
      />
      <Stack.Screen
        name="onboarding"
        options={{ animation: "none", headerShown: false }}
      />
    </Stack>
  );
}
