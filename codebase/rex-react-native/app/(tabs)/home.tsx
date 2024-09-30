import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Rec } from "@/components/Rec";
import { PlayBar } from "@/components/PlayBar";
import { useMusicPlayer } from "@/components/PlayerContext";
import { useUserContext } from "@/components/UserContext";
export default function Home() {
  const { currentSong, currentAlbum, isPlaying, sound, playSong, togglePlayPause, setSound } = useMusicPlayer();
  const { currentUser, profileImage, setProfileImage, setCurrentUser } = useUserContext();
  // var currentUser = auth().currentUser;
  const [posts, setPosts] = useState<any>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getFeedForUser?email=${currentUser["email"]}`
        );
        const data = await response.json();
        setPosts(data);
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
            <Text className="text-3xl text-primary font-jbold pb-4">Feed</Text>
            <Pressable onPress={() => router.push("/")}>
              <Image
                source={{ uri: profileImage }}
                style={styles.image}
                resizeMode="cover"
                className="w-[40] h-[40]"
              ></Image>
            </Pressable>
          </View>
          {/* <Pressable onPress={() => togglePlayPause()}>
            <Text>Change state of button</Text>
          </Pressable> */}
          {posts &&
            posts.map((rec: { [x: string]: any }, index: any) => (
              <Rec
                index={index}
                sender={rec.user}
                mediaCreator={rec.media_creator}
                media={rec.media}
                description={rec.rec.body}
                timeCreated={rec.rec.created_at}
                recID={rec.rec.id}
              ></Rec>
            ))}
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
