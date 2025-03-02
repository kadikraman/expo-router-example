import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Onboarding" }} />
      <Stack.Screen name="stepTwo" options={{ title: "Onboarding (Step 2)" }} />
      <Stack.Screen
        name="stepThree"
        options={{ title: "Onboarding (final step)" }}
      />
    </Stack>
  );
}
