import { useAuthStore } from "@/utils/authStore";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { isVip } = useAuthStore();

  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Protected guard={isVip}>
        <Tabs.Screen name="vip" />
      </Tabs.Protected>
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
