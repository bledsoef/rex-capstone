import { Image, StyleSheet, Pressable, View, Text } from "react-native";
import { CreateRecButton } from "@/components/rex/CreateRecButton";
import { router } from "expo-router";
import { images } from "@/constants";
export default function Rex({ profileImage, onShowModal }: any) {
  return (
    <View className="relative mt-5 flex flex-row justify-between">
      <Text className="text-3xl text-rex font-jbold pb-4">Rex</Text>
      <View className="flex flex-row space-x-3">
        <CreateRecButton handlePress={() => onShowModal(true)} />
        <Pressable onPress={() => router.push("/")}>
          <Image
            source={{ uri: profileImage ? profileImage : images.profile }}
            style={styles.image}
            resizeMode="cover"
            className="w-[40] h-[40]"
          ></Image>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
