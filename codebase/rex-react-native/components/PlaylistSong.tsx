import { Pressable, Text, View } from "react-native";
import { useMusicPlayer } from "./PlayerContext";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
export function PlaylistSong({
  song,
}: any) {
  const { currentSong, playSong } = useMusicPlayer();
  const [album, setAlbum] = useState<any[]>([]);
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtistData();
  }, []);

  return (
    <Pressable
      className={` bg-slate-50 border border-slate-100 w-full`}
      onPress={updatePlaybar}
      // activeOpacity={0.7}
    >
      <View className="flex flex-row justify-between items-center">
        <View className="py-2">
          <Text className={`font-jregular text-xl px-4`}>{song.title}</Text>
          <Text className={`font-jlight text-lg px-4`}>
            {artists && artists.map((artist: any, index: number) => {
              if (index != artists.length-1) {
                return `${artist.name}, `;
              } else {
                return artist.name
              }
            })}
          </Text>
        </View>
        <Pressable className="pr-3">
          <AntDesign size={33} name="ellipsis1" />
        </Pressable>
      </View>
    </Pressable>
  );
}
