import { Stack } from "expo-router";
import "../../global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="proverbs/[id]"
          options={{
            animation: "none",
          }}
        />
      </Stack>
    </React.Fragment>
  );
}
