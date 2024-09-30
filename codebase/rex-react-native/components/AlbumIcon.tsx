import { Link } from "expo-router";
import { type ComponentProps } from "react";
import { Pressable, Text, Image } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useState, useEffect } from "react";
export function AlbumIcon({ album, handlePress }: any) {
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
        className={`rounded-xl justify-center w-[45%] items-center p-3`}
        onPress={handlePress}
      >
        <Image
          source={{ uri: mediaImageUrl }}
          className="w-full h-full"
          resizeMode="contain"
        ></Image>
        <Text className={`font-jsemibold p-4`}>{album.title}</Text>
      </Pressable>
  );
}
