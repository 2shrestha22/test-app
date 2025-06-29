import { initDatabase } from "@/core/data/database/database";
import { RealmAppProvider } from "@/core/ui/provider/realm-provider";
import { initI18n } from "@/i18n/i18n";
import { useI18nStore } from "@/store/i18n-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    init();
  }, []);

  async function init() {
    initDatabase();
    useI18nStore.getState().initializeLocale();
    await initI18n(useI18nStore.getState().locale);
  }

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <RealmAppProvider>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="add-todo"
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </QueryClientProvider>
      </RealmAppProvider>
    </SafeAreaProvider>
  );
}
