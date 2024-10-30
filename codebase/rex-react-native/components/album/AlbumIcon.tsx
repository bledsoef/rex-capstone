import { Link } from "expo-router";
import { type ComponentProps } from "react";
import { Pressable, Text, Image } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useState, useEffect } from "react";
import { images } from "@/constants";
import { router } from "expo-router";
export function AlbumIcon({ album, route }: any) {
  const [mediaImageUrl, setMediaImageUrl] = useState<any>("");
  async function fetchMediaImageDownloadUrl() {
    const fileRef = ref(storage, `/albumImages/${album.id}.jpg`);
    getDownloadURL(fileRef)
      .then((res) => setMediaImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }
  useEffect(() => {
    fetchMediaImageDownloadUrl();
  }, []);
  return (
      <Pressable
        className={`rounded-xl justify-center mb-6 h-[190px] flex w-[48%] items-center p-3`}
        onPress={() => router.replace(route)}
      >
        <Image
          source={{ uri: mediaImageUrl ? mediaImageUrl : images.default_cover}}
          className="w-full h-full"
          resizeMode="contain"
        ></Image>
        <Text className={`font-jsemibold p-4`}>{album.title}</Text>
      </Pressable>
  );
}
