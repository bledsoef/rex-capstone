import { Pressable, Text, View } from "react-native";
import { useMusicPlayer } from "./PlayerContext";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Artists } from "./Artists";
export function Song({ song, album, artist }: any) {
  const { currentSong, playSong } = useMusicPlayer();
  const updatePlaybar = () => {
    playSong(song, album, artists);
  };
  const [artists, setArtists] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  return (
    <Pressable
      className={` bg-slate-50 border border-slate-100 w-full`}
      onPress={updatePlaybar}
      // activeOpacity={0.7}
    >
      <View className="flex flex-row justify-between items-center">
        <View className="py-[2px]">
          <Text
            className={`font-jregular ${
              currentSong && song.id == currentSong.id ? "text-rex" : ""
            } text-xl px-4`}
          >
            {song.title}
          </Text>
         <Artists artists={artists} artist={artist}/> 
        </View>
        <Pressable className="pr-3">
          <AntDesign size={33} name="ellipsis1" />
        </Pressable>
      </View>
    </Pressable>
  );
}
