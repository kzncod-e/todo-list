import { Slot } from "expo-router";
import "../../global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { TodosProvider } from "@/state/TodosContext";

export default function RootLayout() {
  return (
    <TodosProvider>
      <StatusBar style="auto" />
      <Slot />
    </TodosProvider>
  );
}
