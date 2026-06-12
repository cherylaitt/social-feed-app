import { useTheme } from "@/hooks/use-theme";
import { SymbolView } from "expo-symbols";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import BackButton from "./back-button";

export default function ScreenLayout({
  title,
  isBackButtonShown = false,
  isMyIconShown = false,
  children,
}: {
  title: string;
  isBackButtonShown?: boolean;
  isMyIconShown?: boolean;
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ThemedView className="flex-1" style={{ paddingTop: insets.top }}>
      <View className="px-4 py-2 flex-row items-center justify-between border-b border-neutral-100 dark:border-neutral-900">
        {isBackButtonShown && <BackButton />}

        {isMyIconShown && (
          <SymbolView
            name={{
              ios: "person.crop.circle",
              android: "person",
              web: "person",
            }}
            size={28}
            tintColor={theme.text}
          />
        )}

        <ThemedText type="smallBold" className="ml-2 text-lg">
          {title}
        </ThemedText>

        <View></View>
      </View>

      {children}
    </ThemedView>
  );
}
