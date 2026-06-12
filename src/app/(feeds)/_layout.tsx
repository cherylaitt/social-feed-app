import { Stack } from "expo-router";

export default function FeedsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="feed-details"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
