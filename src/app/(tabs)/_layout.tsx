import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Todos",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/add-todo")}
              style={{ marginRight: 15 }}
            >
              <Ionicons size={24} name="add" color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerTitle: "Explore",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="planet" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
