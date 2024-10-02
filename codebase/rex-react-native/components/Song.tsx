import { Link } from "expo-router";
import { type ComponentProps } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export function Song({
  song,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: any) {
  return (
    <Pressable
      className={`rounded w-full justify-center items-center ${containerStyles}`}
      onPress={handlePress}
      // activeOpacity={0.7}
    >
      <Text className={`font-jsemibold text-2xl p-4 ${textStyles}`}>
        {song.title}
      </Text>
    </Pressable>
  );
}
