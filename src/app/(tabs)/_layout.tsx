import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="feeds" options={{ title: "Home" }} />
    </Tabs>
  );
}
