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
import { AlbumIcon } from "@/components/AlbumIcon";
import { useUserContext } from "@/components/UserContext";
export default function Library() {
  const { currentUser, profileImage, setProfileImage, setCurrentUser } =
    useUserContext();
  const [likedAlbums, setLikedAlbums] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getUserLikedAlbums?user_id=${currentUser["id"]}`
        );
        const data = await response.json();
        setLikedAlbums(data);
        console.log(data);
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
          <View className="relative mt-5 flex flex-row justify-between">
            <Text className="text-3xl text-primary font-jbold pb-4">
              Library
            </Text>

            <View className="flex flex-row space-x-3">
              <Pressable onPress={() => router.push("/")}>
                <Image
                  source={{ uri: profileImage }}
                  style={styles.image}
                  resizeMode="cover"
                  className="w-[40] h-[40]"
                ></Image>
              </Pressable>
            </View>
          </View>
          <View className="flex flex-wrap flex-row w-full">
            {likedAlbums &&
              likedAlbums.map((album, index) => {
                return <AlbumIcon key={index} album={album} handlePress={() => router.push(`/album/${album["id"]}`)}></AlbumIcon>;
              })}
          </View>

          {/* <Rec sender={sender} media={media} description={"If you like Bloc Party you will love this song!"} timeCreated={"2 days ago"}></Rec> */}
        </View>
      </ScrollView>
      {/* <PlayBar song={{ name: "Banquet", artist: "Bloc Party", id: 2 }} album={{id: 1}}/> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
