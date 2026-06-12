import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

export default function BackButton() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";

  return (
    <Pressable
      onPress={() => router.back()}
      className="p-2 -ml-2 active:opacity-70"
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <Ionicons name="chevron-back" size={28} color={iconColor} />
    </Pressable>
  );
}
