import { SymbolView } from "expo-symbols";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";

type FeedHeaderProps = {
  pageName: string;
};

export function FeedHeader() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ThemedView
      className="border-b border-neutral-200 dark:border-neutral-800"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row items-center justify-between px-4 py-3">
        <SymbolView
          name={{ ios: "person.crop.circle", android: "person", web: "person" }}
          size={28}
          tintColor={theme.text}
        />

        <View className="items-center">
          <ThemedText type="smallBold" className="text-base">
            Home
          </ThemedText>
        </View>

        <SymbolView
          name={{ ios: "magnifyingglass", android: "search", web: "search" }}
          size={22}
          tintColor={theme.text}
        />
      </View>
    </ThemedView>
  );
}
