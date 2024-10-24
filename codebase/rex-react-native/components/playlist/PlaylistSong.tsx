import { Pressable, Text, View, Image } from "react-native";
import { useMusicPlayer } from "../PlayerContext";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { images } from "@/constants";
import { Artists } from "../Artists";
export function PlaylistSong({ song }: any) {
  const { currentSong, playSong } = useMusicPlayer();
  const [album, setAlbum] = useState<any[]>([]);
  const [albumMediaURL, setAlbumMediaURL] = useState<any>("");
  const updatePlaybar = () => {
    playSong(song, album, artists);
  };
  const [artists, setArtists] = useState<any[]>([]);
  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getArtistsForSong?song_id=${song.id}`
        );
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getAlbumForSong?song_id=${song.id}`
        );
        const data = await response.json();
        setAlbum(data);
        const albumFileRef = ref(storage, `/albumImages/${data["id"]}.jpg`);
        getDownloadURL(albumFileRef)
          .then((res) => {
            setAlbumMediaURL(res);
          })
          .catch((error) => {
            console.log("it is me");
            console.error("Error getting download URL:", error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlbumData();
    fetchArtistData();
  }, []);

  return (
    <Pressable
      className={` bg-slate-50 border border-slate-100 w-full`}
      onPress={updatePlaybar}
      // activeOpacity={0.7}
    >
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center h-full ">
          <Image
            source={{
              uri: albumMediaURL ? albumMediaURL : images.default_cover,
            }}
            className="w-[60] h-[60]"
            resizeMode="contain"
          ></Image>
          <View className="py-[2px]">
            <Text
              className={`font-jregular ${
                currentSong && song.id == currentSong.id ? "text-rex" : ""
              } text-xl px-4`}
            >
              {song.title}
            </Text>
            <Artists artists={artists} artist={null}/> 
          </View>
        </View>

        <Pressable className="pr-3">
          <AntDesign size={33} name="ellipsis1" />
        </Pressable>
      </View>
    </Pressable>
  );
}
