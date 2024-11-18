import { Pressable, Text, View, Image } from "react-native";
import { useMusicPlayer } from "../globalContexts/PlayerContext";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { images } from "@/constants";
import { Artists } from "../Artists";
export function PlaylistItem({ playlist, song, handlePress }: any) {
  const [playlistData, setPlaylist] = useState<any[]>([]);
  const [playlistMediaURL, setPlaylistMediaURL] = useState<any>("");
  const [songCount, setSongCount] = useState<number>(0);
  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getPlaylist?playlist_id=${playlist.id}`
        );
        const data = await response.json();
        setPlaylist(data["playlist"]);
        if (playlist.has_image == true) {
          const playlistFileRef = ref(
            storage,
            `/playlistImages/${data["playlist"]["id"]}.jpg`
          );
          getDownloadURL(playlistFileRef)
            .then((res) => {
              setPlaylistMediaURL(res);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaylistData();
  }, []);

  return (
    <Pressable
      className={` bg-slate-50 border border-slate-100 w-full`}
      onPress={() => handlePress(playlist)}
      // activeOpacity={0.7}
    >
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center h-full ">
          <Image
            source={
              playlistMediaURL ? {uri: playlistMediaURL} : images.default_cover
            }
            className="w-[60] h-[60]"
            resizeMode="contain"
          ></Image>
          <View className="py-[2px]">
            <Text
              className={`font-jregular
              } text-xl px-4`}
            >
              {playlist.title}
            </Text>
            <Text>{songCount}</Text>
          </View>
        </View>

        <Pressable className="pr-3">
          <AntDesign size={33} name="ellipsis1" />
        </Pressable>
      </View>
    </Pressable>
  );
}
