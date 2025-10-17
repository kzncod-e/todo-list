/* eslint-disable prettier/prettier */
import React from "react";
import { Tabs } from "expo-router";
import { } from "react-native";
import { List, Play, Check } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF4DD2",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "rgba(18,3,24,0.85)",
          borderTopColor: "rgba(255,255,255,0.06)",
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 12,
          borderRadius: 16,
        },
        tabBarLabelStyle: {
          fontFamily: "PressStart2P",
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="todo"
        options={{
          title: "To Do",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <List color={color} width={18} height={18} />
          ),
        }}
      />

      <Tabs.Screen
        name="inprogress"
        options={{
          title: "In Progress",
          tabBarIcon: ({ color }) => <Play color={color} width={18} height={18} />, 
        }}
      />

      <Tabs.Screen
        name="completed"
        options={{
          title: "Completed",
          tabBarIcon: ({ color }) => <Check color={color} width={18} height={18} />,
        }}
      />
    </Tabs>
  );
}
