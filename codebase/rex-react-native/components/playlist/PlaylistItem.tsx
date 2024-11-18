import { Pressable, Text, View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { images } from "@/constants";
import { useUserContext } from "../globalContexts/UserContext";
export function PlaylistItem({ playlist, song, handleAdd, handleRemove }: any) {
  const { currentUser } = useUserContext();
  const [playlistMediaURL, setPlaylistMediaURL] = useState<any>("");
  const [songCount, setSongCount] = useState<number>(0);
  const [selected, setSelected] = useState<boolean>(false);
  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getPlaylist?playlist_id=${playlist.id}&user_id=${currentUser.id}`
        );
        const data = await response.json();
        setSongCount(data["songCount"]);
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
    const checkSongInPlaylist = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/checkSongInPlaylist?playlist_id=${playlist.id}&song_id=${song.id}&user_id=${currentUser.id}`
      );
      const data = await response.json();
      setSelected(data);
    };
    checkSongInPlaylist();
    fetchPlaylistData();
  }, [playlist]);

  return (
    <Pressable
      className={` bg-slate-50 border border-slate-100 w-full`}
      onPress={!selected ? () => handleAdd(playlist) : () => handleRemove(playlist)}
      // activeOpacity={0.7}
    >
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center h-full ">
          <Image
            source={
              playlistMediaURL
                ? { uri: playlistMediaURL }
                : images.default_cover
            }
            className="w-[60] h-[60]"
            resizeMode="contain"
          ></Image>
          <View className="py-[2px] px-4">
            <Text
              className={`font-jregular
              } text-xl`}
            >
              {playlist.title}
            </Text>
            <Text className="font-jregular">
              {songCount > 1 && `${songCount} Songs`}
              {songCount == 0 && "Empty"}
              {songCount == 1 && "1 Song"}
            </Text>
          </View>
        </View>

        <View className="pr-3">
          {selected && <Feather size={25} name="check-circle" />}
          {!selected && <Feather size={25} name="plus-circle" />}
        </View>
      </View>
    </Pressable>
  );
}
