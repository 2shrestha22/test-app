import { LanguageToggleButton } from "@/core/components/language-button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, TouchableOpacity } from "react-native";

export default function TabLayout() {
  const { t } = useTranslation();

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
          title: t("todo.title"),
          headerTitle: t("todo.title"),
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
          headerLeft: () => <LanguageToggleButton />,
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
        name="deleted-todos"
        options={{
          title: t("todo.deletedTodos"),
          headerTitle: t("todo.deletedTodos"),
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="accessibility" color={color} />
          ),
          headerLeft: () => <LanguageToggleButton />,
        }}
      />
    </Tabs>
  );
}
