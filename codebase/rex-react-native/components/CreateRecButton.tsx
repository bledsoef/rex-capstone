import { Link } from "expo-router";
import { type ComponentProps } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export function CreateRecButton({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: any) {
  return (
    <View className={``}>
      <Pressable
        className={`rounded-full flex shadow-xl bg-rex justify-center w-[40] h-[40] items-center p-2`}
        onPress={handlePress}
      >
        <FontAwesome5 color={"white"} size={20} className="" name={"pen"} />
      </Pressable>
    </View>
  );
}
