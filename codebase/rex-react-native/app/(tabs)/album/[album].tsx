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
  const [albumData, setAlbum] = useState<any>({});
  const [artists, setArtists] = useState<any>([]);
  const [albumImage, setAlbumImage] = useState<any>([]);
  const [authorImageUrls, setAuthorImageUrls] = useState<any>([]);

  const fetchArtistImages = async () => {
    try {
      const imageURLs = await Promise.all(
        artists.map(async (artist: any) => {
          const authorFileRef = ref(storage, `/artistImages/${artist.id}.jpg`);
          const url = await getDownloadURL(authorFileRef);
          return url;
        })
      );
      setAuthorImageUrls(imageURLs);
    } catch (error) {
      console.error("Error fetching artist images:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      var data;
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getSongsForAlbum?album_id=${album}`
        );
        data = await response.json();
        setSongs(data["songs"]);
        setAlbum(data["album"]);
        setArtists(data["artists"]);
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
      const albumFileRef = ref(
        storage,
        `/albumImages/${data["album"]["id"]}.jpg`
      );
      getDownloadURL(albumFileRef)
        .then((res) => {
          setAlbumImage(res);
        })
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
      fetchArtistImages();
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
            <Text className="text-3xl text-rex font-jbold pb-1">
              {albumData["title"]}
            </Text>
            <View className="flex flex-col">
              {artists &&
                authorImageUrls &&
                artists.map((artist: any, index: any) => {
                  return (
                    <View
                      key={index}
                      className="flex flex-row items-center pb-2 space-x-2"
                    >
                      <Image
                        source={{
                          uri: authorImageUrls
                            ? authorImageUrls[index]
                            : images.default_cover,
                        }}
                        style={styles.image}
                        className="w-[30] h-[30]"
                        resizeMode="cover"
                      />
                      <Text className="text-2xl text-rex font-jsemibold">
                        {artist["name"]}
                      </Text>
                    </View>
                  );
                })}
            </View>
          </View>
          <View className="rounded-xl flex flex-col w-full">
            {songs &&
              songs.map((song, index) => {
                return (
                  <Song
                    key={index}
                    album={albumData}
                    artists={artists}
                    song={song}
                  ></Song>
                );
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
