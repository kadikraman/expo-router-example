import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="details" options={{ title: "Details" }} />
      <Stack.Screen name="shared" options={{ title: "Shared page (home)" }} />
    </Stack>
  );
}
