import { Redirect, Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)", // anchor
};

const isLoggedIn = true;

export default function ProtectedLayout() {
  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modal-with-stack"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
