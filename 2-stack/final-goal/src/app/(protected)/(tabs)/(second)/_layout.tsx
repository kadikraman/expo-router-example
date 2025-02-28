import { Stack } from "expo-router";

export default function SecondPageLayout() {
  return (
    <Stack>
      <Stack.Screen name="second" options={{ title: "Second" }} />
      <Stack.Screen name="shared" options={{ title: "Shared page (second)" }} />
    </Stack>
  );
}
