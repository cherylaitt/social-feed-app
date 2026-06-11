import { ThemedView } from "@/components/themed-view";
import { useAppStore } from "@/stores/app-store";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ControlPanelScreen() {
  const {
    feedLayoutMode,
    showSystemAlert,
    setFeedLayoutMode,
    toggleSystemAlert,
  } = useAppStore();

  console.log("feedLayoutMode", feedLayoutMode);
  console.log("showSystemAlert", showSystemAlert);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ThemedView className="flex-1 p-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-[20px] text-gray-500 mt-2">Control Panel</Text>
        </View>

        <View className="py-5 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Feed Layout Mode
          </Text>

          {/* Segmented Control */}
          <View className="flex-row bg-gray-100 rounded-xl p-1">
            <TouchableOpacity
              onPress={() => setFeedLayoutMode("standard")}
              className={`flex-1 py-3 rounded-lg items-center ${
                feedLayoutMode === "standard" ? "bg-white" : ""
              }`}
            >
              <Text
                className={`font-semibold ${
                  feedLayoutMode === "standard"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Standard
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFeedLayoutMode("creatorFirst")}
              className={`flex-1 py-3 rounded-lg items-center ${
                feedLayoutMode === "creatorFirst" ? "bg-white" : ""
              }`}
            >
              <Text
                className={`font-semibold ${
                  feedLayoutMode === "creatorFirst"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Creator-First
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Toggle */}
        <View className="py-5 rounded-2xl flex-row justify-between items-center mb-6">
          <View className="flex-1 pr-4">
            <Text className="text-lg font-bold text-gray-800">
              System Alert Banner
            </Text>
            <Text className="text-sm text-gray-400 mt-1 leading-5">
              Simulates a remote Trust & Safety emergency broadcast globally.
            </Text>
          </View>

          <Switch
            value={showSystemAlert}
            onValueChange={toggleSystemAlert}
            // Red track color to indicate an "Alert" state
            trackColor={{ false: "#e5e7eb", true: "#ef4444" }}
            thumbColor={"#ffffff"}
            ios_backgroundColor="#e5e7eb"
          />
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}
