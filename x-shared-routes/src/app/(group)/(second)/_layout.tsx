import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "second",
};

export default function Layout() {
  return <Stack initialRouteName="second" />;
}
