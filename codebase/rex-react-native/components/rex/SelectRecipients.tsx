import { Image, StyleSheet, Pressable, View, Text } from "react-native";
import { CreateRecButton } from "@/components/rex/CreateRecButton";
import { router } from "expo-router";
import { images } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
export default function SelectRecipients({ onRemoveRecipients, recipients }: any) {
  return (
    <View className="flex-wrap w-full flex-row justify-around">
      {recipients &&
        Object.values(recipients).map((recipient: any, index: any) => {
          return (
            <Pressable
              onPress={() => onRemoveRecipients(recipient.id)}
              key={index}
              className="p-2 bg-gray-100 rounded-xl items-center justify-between w-[30%] flex-row flex"
            >
              <Text className="font-jregular text-base text-rex">
                {recipient.username}
              </Text>
              <AntDesign name="close" size={15} />
            </Pressable>
          );
        })}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
