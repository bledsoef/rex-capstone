import {
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { AlbumIcon } from "@/components/album/AlbumIcon";
import { useUserContext } from "@/components/UserContext";
import { images } from "@/constants";
import { PlaylistIcon } from "@/components/playlist/PlaylistIcon";
export default function Library() {
  const { currentUser, profileImage, setProfileImage, setCurrentUser } =
    useUserContext();
  const [likedPlaylists, setLikedPlaylists] = useState<any[]>([]);
  const [likedAlbums, setLikedAlbums] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getLibraryForUser?user_id=${currentUser["id"]}`
        );
        const data = await response.json();
        setLikedAlbums(data["albums"]);
        setLikedPlaylists(data["playlists"]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView className="bg-white min-h-screen">
      <ScrollView className="h-full">
        <View className="w-full h-full px-4">
          <View className="relative mt-5 mb-2 flex flex-row justify-between">
            <Text className="text-3xl text-rex font-jbold pb-4">
              Library
            </Text>

            <View className="flex flex-row space-x-3">
              <Pressable onPress={() => router.push("/")}>
                <Image
                  source={{ uri: profileImage ? profileImage : images.profile }}
                  style={styles.image}
                  resizeMode="cover"
                  className="w-[40] h-[40]"
                ></Image>
              </Pressable>
            </View>
          </View>
          <View className="flex items-center justify-around flex-wrap flex-row w-full">
            {likedAlbums &&
              likedAlbums.map((album, index) => {
                return (
                  <AlbumIcon
                    key={index}
                    album={album}
                    route={`/(tabs)/album/${album["id"]}`}
                  ></AlbumIcon>
                );
              })}
            {likedPlaylists &&
              likedPlaylists.map((playlist, index) => {
                return (
                  <PlaylistIcon
                    key={index}
                    playlist={playlist}
                    route={`/(tabs)/playlist/${playlist["id"]}`}
                  ></PlaylistIcon>
                );
            })}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
