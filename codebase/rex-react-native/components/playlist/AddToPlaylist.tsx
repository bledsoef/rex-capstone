import { Link } from "expo-router";
import { useEffect, useState, type ComponentProps } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useUserContext } from "../globalContexts/UserContext";
import { PlaylistItem } from "@/components/playlist/PlaylistItem";
export function AddToPlaylist({ song, onContentVisibilityChange }: any) {
  const { currentUser } = useUserContext();
  const [update, setUpdate] = useState(0)
  const [playlists, setPlaylists] = useState<any>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getPlaylistsForUser?user_id=${currentUser.id}`
        );
        const data = await response.json();
        setPlaylists(data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [update]);

  const addToPlaylist = async (playlist: any) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/addSongToPlaylist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            song_id: song.id,
            playlist_id: playlist.id,
          }),

        }
      );
      setUpdate(update + 1)
    } catch (error) {
      console.log(error);
    }
  }
  const removeFromPlaylist = async (playlist: any) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/removeSongFromPlaylist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            song_id: song.id,
            playlist_id: playlist.id,
          }),

        }
      );
      setUpdate(update + 1)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View
      className="h-2/3 bg-white p-[20px] rounded-t-xl"
      style={styles.modalContainer}
    >
      <Text className={`text-xl text-gray-900 font-jsemibold rounded-xl`}>
        Add To Playlist
      </Text>
      <View className="flex-col flex w-full">
        {playlists && playlists.map((item: any, index: any) => {
          return <PlaylistItem key={index} playlist={item} song={song} handleRemove={removeFromPlaylist} handleAdd={addToPlaylist}/>
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});
