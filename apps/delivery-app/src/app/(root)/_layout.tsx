import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="find-ride" options={{ headerShown: false }} />
      <Stack.Screen
        name="confirm-ride"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="book-ride"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ride-details"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="message-thread"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="active-delivery"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="refer-friends"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="driver-onboarding"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="driver-application"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="driver-faq"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/personal-info"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/notifications"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/payment"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/help"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/contact"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="delivery-locations"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="delivery-type"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="delivery-vehicle"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="delivery-request"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
