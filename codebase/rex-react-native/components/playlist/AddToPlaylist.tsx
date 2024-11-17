import { Link } from "expo-router";
import { useEffect, useState, type ComponentProps } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useUserContext } from "../globalContexts/UserContext";

export function AddToPlaylist({ song, onContentVisibilityChange }: any) {
  const { currentUser } = useUserContext();
  const [playlists, setPlaylists] = useState<any>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getPlaylists?user_id=${currentUser.id}`
        );
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <View
      className="h-2/3 bg-white p-[20px] rounded-t-xl"
      style={styles.modalContainer}
    >
      <Text className={`text-xl text-gray-900 font-jsemibold rounded-xl`}>
        Add To Playlist
      </Text>
      <View className="flex-col flex w-full"></View>
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
