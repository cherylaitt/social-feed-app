import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { Pressable, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { formatCount } from "@/utils/format";

type FeedActionButtonProps = {
  icon: SymbolViewProps["name"];
  label: string;
  count?: number;
  onPress?: () => void;
};

export function FeedActionButton({
  icon,
  label,
  count,
  onPress,
}: FeedActionButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      className="flex-1 items-center py-2 active:opacity-60"
      onPress={onPress}
    >
      <View className="flex-row items-center gap-1.5">
        <SymbolView name={icon} size={18} tintColor={theme.textSecondary} />
        {count !== undefined && count > 0 ? (
          <ThemedText type="small" themeColor="textSecondary">
            {formatCount(count)}
          </ThemedText>
        ) : null}
      </View>
    </Pressable>
  );
}
