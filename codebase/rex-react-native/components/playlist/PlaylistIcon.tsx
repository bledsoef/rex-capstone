import { Link } from "expo-router";
import { type ComponentProps } from "react";
import { Pressable, Text, Image } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useState, useEffect } from "react";
import { images } from "@/constants";
import { router } from "expo-router";
export function PlaylistIcon({ playlist, route }: any) {
  const [mediaImageUrl, setMediaImageUrl] = useState<any>("");
  async function fetchMediaImageDownloadUrl() {
    var fileRef
    if (playlist.title == "My Liked Songs") {
      fileRef = ref(storage, `/playlistImages/liked.png`);
    } else if (playlist["has_image"] == false) {
      return
    } else {
      fileRef = ref(storage, `/playlistImages/${playlist.id}.jpg`);
    }
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
        className={`rounded-xl justify-center flex h-[190px] w-[48%] items-center p-3`}
        onPress={() => {router.push(route)}}
      >
        <Image
          source={ mediaImageUrl ? {uri: mediaImageUrl} : images.default_cover }
          className="w-full h-full"
          resizeMode="contain"
        ></Image>
        <Text className={`font-jsemibold p-4`}>{playlist.title}</Text>
      </Pressable>
  );
}
