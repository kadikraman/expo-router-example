import { Redirect } from "expo-router";

export default function Index() {
  // For now, redirect directly to home
  // In a real app, you might want to check authentication status here
  return <Redirect href="/(root)/(tabs)/home" />;
}
