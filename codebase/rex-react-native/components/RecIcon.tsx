import { Link } from "expo-router";
import { type ComponentProps } from "react";
import { ActivityIndicator, Text, StyleSheet, View, Image } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useState, useEffect } from "react";
import { images } from "@/constants";
export function RecIcon({ media, rec, sender, mediaCreators }: any) {
  const [senderImageUrl, setSenderImageUrl] = useState<any>("");
  //   const [authorImageUrl, setAuthorImageUrl] = useState<any>("");
  const [mediaImageUrl, setMediaImageUrl] = useState<any>("");
  useEffect(() => {
    async function fetchData() {
      await fetcherSenderImageDownloadUrl();
      //   await fetchAuthorImageDownloadUrl();
      await fetchMediaImageDownloadUrl();
    }
    fetchData();
  }, []);
  useEffect(() => {}, []);
  async function fetcherSenderImageDownloadUrl() {
    const fileRef = ref(storage, `/profileImages/${sender.email}.jpg`);
    getDownloadURL(fileRef)
      .then((res) => setSenderImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }
  //   async function fetchAuthorImageDownloadUrl() {
  //     const fileRef = ref(storage, `/artistImages/${mediaCreators[0].id}.jpg`);
  //     getDownloadURL(fileRef)
  //       .then((res) => setAuthorImageUrl(res))
  //       .catch((error) => {
  //         console.error("Error getting download URL:", error);
  //       });
  //   }
  async function fetchMediaImageDownloadUrl() {
    const fileRef = ref(storage, `/albumImages/${media.id}.jpg`);
    getDownloadURL(fileRef)
      .then((res) => setMediaImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }
  return (
    <>
      <View
        className={` bg-[#F6F6F6] flex-col justify-between flex-grow items-center`}
        // activeOpacity={0.7}
      >
        <View className="flex flex-row border-b-[1px] border-[#E2E2E2] justify-between w-full items-center py-3 px-5">
          <View className="flex flex-row items-center">
            <Image
              source={{
                uri: senderImageUrl ? senderImageUrl : images.default_cover,
              }}
              style={styles.image}
              className="w-[30] h-[30]"
              resizeMode="cover"
            />
            <Text className="ml-2 text-base font-jsemibold">
              {sender.username}
            </Text>
          </View>
        </View>
        <View className="flex flex-row p-5 w-full justify-between items-center">
          <View className="flex flex-col">
            <Text className={`font-jsemibold text-2xl`}>{media.title}</Text>

            <Text className={`font-jsemibold ml-3 text-[#3D3D3D] text-xl`}>
              {mediaCreators[0].name}
            </Text>
          </View>
        </View>

        <Image
          source={{
            uri: mediaImageUrl ? mediaImageUrl : images.default_cover,
          }}
          className="w-full h-full pb-5"
          resizeMode="contain"
        />
        {/* <Text className="py-2 px-1 font-jregular text-xl">{description}</Text> */}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
