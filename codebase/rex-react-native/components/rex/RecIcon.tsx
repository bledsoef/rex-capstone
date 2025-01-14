import { Link, router } from "expo-router";
import { type ComponentProps } from "react";
import { ActivityIndicator, Text, StyleSheet, View, Image, Pressable } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useState, useEffect } from "react";
import { images } from "@/constants";
export function RecIcon({ media, rec, mediaType, sender, mediaCreators }: any) {
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
  }, [sender, media]);
  async function fetcherSenderImageDownloadUrl() {
    const fileRef = ref(storage, `/profileImages/${sender.email}.jpg`);
    getDownloadURL(fileRef)
      .then((res) => setSenderImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }

  async function fetchMediaImageDownloadUrl() {
    const mediaID = mediaType == "song" ? media.album_id : media.id 
    const fileRef = ref(
      storage,
      `/${
        mediaType == "song" ? "album" : mediaType
      }Images/${mediaID}.jpg`
    );
    getDownloadURL(fileRef)
      .then((res) => setMediaImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }
  return (
    <>
      <Pressable
        className={`rounded-lg h-[285px] w-[150px] mr-5 bg-[#F6F6F6] flex-col justify-between items-center`}
        onPress={() => router.push(`/(tabs)/rec/${rec["id"]}`)}
      >
        <View className="flex flex-row border-b-[1px] border-[#E2E2E2] justify-between w-full items-center p-3">
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
        <View className="flex flex-row p-3 w-full justify-between items-center">
          <View className="flex flex-col">
            <Text className={`font-jsemibold text-xl`}>{media.title}</Text>

            <Text className={`font-jsemibold text-[#3D3D3D] text-lg`}>
              {mediaCreators[0].name}
            </Text>
          </View>
        </View>

        <Image
          source={{
            uri: mediaImageUrl ? mediaImageUrl : images.default_cover,
          }}
          className="h-[150px] w-[150px]"
          style={styles.media}
          resizeMode="contain"
        />
        {/* <Text className="py-2 px-1 font-jregular text-xl">{description}</Text> */}
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
  media: {
    borderRadius: 5,
    overflow: "hidden",
  },
});
