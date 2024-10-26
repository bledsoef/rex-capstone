import { Image, StyleSheet, Pressable, View, Text } from "react-native";
import { CreateRecButton } from "@/components/rex/CreateRecButton";
import { router } from "expo-router";
import { images } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
export default function CreateRecModalFooter({
  onSubmit,
  onCancel,
}: any) {
  return (
    <View className="flex flex-row w-full justify-end p-2 space-x-1">
      <Pressable
        onPress={() => onCancel(false)}
        className="flex border rounded-lg border-gray-400  bg-gray-400 p-3"
      >
        <Text className="text-white font-jbold text-base">Cancel</Text>
      </Pressable>
      <Pressable
        onPress={onSubmit}
        className="border flex rounded-lg border-rex bg-rex p-3"
      >
        <Text className="text-white font-jbold text-base">Send</Text>
      </Pressable>
    </View>
  );
}
