import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(second)"
        options={{
          title: "Second",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flower" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="third"
        options={{
          title: "Third",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="balloon-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
