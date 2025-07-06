import { Stack, SplashScreen } from "expo-router";
import "../../global.css";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/utils/authStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const {
    isLoggedIn,
    shouldCreateAccount,
    hasCompletedOnboarding,
    _hasHydrated,
  } = useAuthStore();

  // https://zustand.docs.pmnd.rs/integrations/persisting-store-data#how-can-i-check-if-my-store-has-been-hydrated
  // Hide the splash screen after the store has been hydrated
  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated]);

  if (!_hasHydrated) {
    return null;
  }

  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
          <Stack.Screen name="sign-in" />
          <Stack.Protected guard={shouldCreateAccount}>
            <Stack.Screen name="create-account" />
          </Stack.Protected>
        </Stack.Protected>
        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </React.Fragment>
  );
}
