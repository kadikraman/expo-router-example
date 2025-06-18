import { Slot } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";
import "../../global.css";

export default function RootLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Slot />
    </React.Fragment>
  );
}
