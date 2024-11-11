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
import { useUserContext } from "@/components/globalContexts/UserContext";
import { useLocalSearchParams } from "expo-router";
import { PlaylistSong } from "@/components/playlist/PlaylistSong";
import { images } from "@/constants";
export default function PlaylistPage() {
  const { playlist } = useLocalSearchParams();
  const { currentUser, profileImage, setProfileImage, setCurrentUser } =
    useUserContext();
  const [songs, setSongs] = useState<any[]>([]);
  const [playlistData, setPlaylist] = useState<any>({});
  const [creators, setCreators] = useState<any>([]);
  const [playlistImage, setPlaylistImage] = useState<any>([]);
  const [authorImageUrls, setAuthorImageUrls] = useState<any>([]);

  const fetchArtistImages = async () => {
    try {
      const imageURLs = await Promise.all(
        creators.map(async (user: any) => {
          const authorFileRef = ref(
            storage,
            `/profileImages/${user["email"]}.jpg`
          );
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
          `http://127.0.0.1:8000/getSongsForPlaylist?playlist_id=${playlist}&user_id=${currentUser.id}`
        );
        data = await response.json();
        setSongs(data["songs"]);
        setPlaylist(data["playlist"]);
        setCreators(data["creators"]);
      } catch (error) {
        console.log(error);
      }
      var fileRef;
      if (data["playlist"]["title"] == "My Liked Songs") {
        fileRef = ref(storage, `/playlistImages/liked.png`);
      } else if (data["playlist"]["has_image"] == false) {
        return;
      } else {
        fileRef = ref(storage, `/playlistImages/${data["playlist"]["id"]}.jpg`);
      }
      getDownloadURL(fileRef)
        .then((res) => {
          setPlaylistImage(res);
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
            source={playlistImage ? {uri: playlistImage } : images.default_cover }
            resizeMode="contain"
            className="w-[75%] mx-auto mt-4 h-[75%]"
          ></Image>
          <View className="mt-5 flex flex-col">
            <Text className="text-3xl text-rex font-jbold pb-1">
              {playlistData["title"]}
            </Text>
            <View className="flex flex-col">
              {creators &&
                authorImageUrls &&
                creators.map((creator: any, index: any) => {
                  return (
                    <View
                      key={index}
                      className="flex flex-row items-center pb-2 space-x-2"
                    >
                      <Image
                        source={
                          authorImageUrls
                            ? { uri: authorImageUrls[index] }
                            : images.default_cover
                        }
                        style={styles.image}
                        className="w-[30] h-[30]"
                        resizeMode="cover"
                      />
                      <Text className="text-2xl text-black font-jregular">
                        {creator["first_name"]} {creator["last_name"]}
                      </Text>
                    </View>
                  );
                })}
            </View>
          </View>
          <View className="rounded-xl flex flex-col w-full">
            {songs &&
              songs.map((song, index) => {
                return <PlaylistSong key={index} song={song}></PlaylistSong>;
              })}
          </View>

          {/* <Rec sender={sender} media={media} description={"If you like Bloc Party you will love this song!"} timeCreated={"2 days ago"}></Rec> */}
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
