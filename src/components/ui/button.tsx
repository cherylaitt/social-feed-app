import React from "react";
import { Pressable } from "react-native";

export default function Button({
  customClassName,
  onPress,
  children,
}: {
  customClassName: string;
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`py-2 rounded-lg items-center justify-center ${
        customClassName
      }`}
    >
      {children}
    </Pressable>
  );
}
