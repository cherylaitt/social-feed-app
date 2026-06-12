import { ThemedView } from "@/components/themed-view";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();

  console.log("userId", id);

  return (
    <ThemedView className="flex-1">
      <Text>Hello</Text>
    </ThemedView>
  );
}
