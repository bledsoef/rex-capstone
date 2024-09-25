import { Link } from "expo-router";
import { type ComponentProps } from "react";
import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useState, useEffect } from "react";
export function Rec({
  media,
  sender,
  description,
  recID,
  mediaCreator,
  timeCreated,
  containerStyles,
  textStyles,
}: any) {
  const [senderImageUrl, setSenderImageUrl] = useState<any>("");
  const [authorImageUrl, setAuthorImageUrl] = useState<any>("");
  const [mediaImageUrl, setMediaImageUrl] = useState<any>("");
  useEffect(() => {
    fetcherSenderImageDownloadUrl();
    fetchAuthorImageDownloadUrl();
    fetchMediaImageDownloadUrl();
  }, []);
  async function fetcherSenderImageDownloadUrl() {
    const fileRef = ref(storage, `/profileImages/${sender.email}.jpg`);
    getDownloadURL(fileRef)
      .then((res) => setSenderImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }
  async function fetchAuthorImageDownloadUrl() {
    const fileRef = ref(storage, `/artistImages/${mediaCreator.id}.jpg`);
    getDownloadURL(fileRef)
      .then((res) => setAuthorImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }
  async function fetchMediaImageDownloadUrl() {
    const fileRef = ref(storage, `/albumImages/${media.id}.jpg`);
    getDownloadURL(fileRef)
      .then((res) => setMediaImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }
  return (
    <View
      className={`rounded-xl bg-[#F6F6F6] flex-col justify-between flex-grow items-center ${containerStyles}`}
      // activeOpacity={0.7}
    >
      <View className="flex flex-row border-b-[1px] border-[#E2E2E2] justify-between w-full items-center p-3">
        <View className="flex flex-row items-center">
          <Image
            source={{ uri: senderImageUrl }}
            style={styles.image}
            className="w-[30] h-[30]"
            resizeMode="cover"
          />
          <Text className="ml-2 text-base font-jsemibold">
            {sender.username}
          </Text>
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
              source={{ uri: authorImageUrl }}
              style={styles.image}
              className="w-[30] h-[30]"
              resizeMode="cover"
            />
            <Text
              className={`font-jsemibold ml-3 text-[#3D3D3D] text-xl ${textStyles}`}
            >
              {mediaCreator.name}
            </Text>
          </View>
        </View>
      </View>
      <Text className="py-2 px-1 font-jregular text-xl">{description}</Text>

      <Image
        source={{ uri: mediaImageUrl }}
        className="w-full h-[350px] pb-5"
        resizeMode="contain"
      />
      <View>
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
