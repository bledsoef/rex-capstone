import {
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { PlayBar } from "@/components/PlayBar";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { AlbumIcon } from "@/components/AlbumIcon";
import { useUserContext } from "@/components/UserContext";
import { useLocalSearchParams } from "expo-router";
import { Song } from "@/components/Song";
import { images } from "@/constants";
export default function AlbumPage() {
  const { album } = useLocalSearchParams();
  const { currentUser, profileImage, setProfileImage, setCurrentUser } =
    useUserContext();
  const [songs, setSongs] = useState<any[]>([]);
  const [albumData, setAlbum] = useState<any>([]);
  const [artist, setArtist] = useState<any>([]);
  const [albumImage, setAlbumImage] = useState<any>([]);
  const [authorImageUrl, setAuthorImageUrl] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      var data;
      try {
        console.log(album);
        const response = await fetch(
          `http://127.0.0.1:8000/getSongsForAlbum?album_id=${album}`
        );
        data = await response.json();
        setSongs(data["songs"]);
        setAlbum(data["album"]);
        setArtist(data["artist"]);
      } catch (error) {
        console.log(error);
      }
      const albumFileRef = ref(storage, `/albumImages/${data["album"]["id"]}.jpg`);
      getDownloadURL(albumFileRef)
        .then((res) => setAlbumImage(res))
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
      const authorFileRef = ref(
        storage,
        `/artistImages/${data["artist"]["id"]}.jpg`
      );
      getDownloadURL(authorFileRef)
        .then((res) => setAuthorImageUrl(res))
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className="bg-white min-h-screen">
      <ScrollView className="h-full">
        <View className="w-full h-full px-4">
          <Image
            source={{ uri: albumImage ? albumImage : images.profile }}
            resizeMode="contain"
            className="w-[75%] mx-auto mt-4 h-[75%]"
          ></Image>
          <View className="mt-5 flex flex-col">
            <Text className="text-3xl text-primary font-jbold pb-1">
              {albumData["title"]}
            </Text>
            <View className="flex flex-row items-center pb-2 space-x-2">
              <Image
                source={{
                  uri: authorImageUrl ? authorImageUrl : images.default_cover,
                }}
                style={styles.image}
                className="w-[30] h-[30]"
                resizeMode="cover"
              />
              <Text className="text-2xl text-primary font-jsemibold">
                {artist["name"]}
              </Text>
            </View>
          </View>
          <View className="rounded-xl flex flex-col w-full">
            {songs &&
              songs.map((song, index) => {
                return <Song key={index} album={albumData} artist={artist} song={song}></Song>;
              })}
          </View>

          {/* <Rec sender={sender} media={media} description={"If you like Bloc Party you will love this song!"} timeCreated={"2 days ago"}></Rec> */}
        </View>
      </ScrollView>
      <PlayBar />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
