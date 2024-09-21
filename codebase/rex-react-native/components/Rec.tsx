import { Link } from "expo-router";
import { type ComponentProps } from "react";
import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebaseConfig';
import { useState, useEffect } from "react";
export function Rec({
  media,
  sender,
  timeCreated,
  containerStyles,
  textStyles,
}: any) {
  const [imageUrl, setImageUrl] = useState<any>("")
  useEffect(() => {
    fetchImageDownloadUrl()
  }, [])
  async function fetchImageDownloadUrl() {
    const fileRef = ref(storage, `/profileImages/${sender.email}.jpg`);
    getDownloadURL(fileRef)
          .then((res) => setImageUrl(res))
          .catch((error) => {
          // Handle any errors
          console.error("Error getting download URL:", error);
          });
    }
  return (
    <View
      className={`rounded-xl bg-[#F6F6F6] flex flex-col justify-between items-center ${containerStyles}`}
      // activeOpacity={0.7}
    >
      <View className="flex flex-row border-b-[1px] border-[#E2E2E2] justify-between w-full items-center p-3">
        <View className="flex flex-row items-center">
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            className="w-[30] h-[30]"
            resizeMode="cover"
          />
          <Text className="ml-2 text-base font-jsemibold">{sender.username}</Text>
        </View>
        <Text className="font-jregular">{timeCreated}</Text>
      </View>
      <View className="flex flex-row p-3 w-full ">
        <View className="flex flex-col w-full">
          <Text className={`font-jsemibold text-2xl ${textStyles}`}>
            {media.title}
          </Text>
          <View className="flex flex-row items-center">
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              className="w-[30] h-[30]"
              resizeMode="cover"
            />
            <Text className={`font-jsemibold ml-3 text-[#3D3D3D] text-xl ${textStyles}`}>
              {media.author}
            </Text>
          </View>
        </View>

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