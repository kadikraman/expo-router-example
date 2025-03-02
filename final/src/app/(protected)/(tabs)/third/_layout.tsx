import { Stack } from "expo-router";

export default function ThirdLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Third" }} />
      <Stack.Screen name="inner" options={{ title: "Inner" }} />
    </Stack>
  );
}
