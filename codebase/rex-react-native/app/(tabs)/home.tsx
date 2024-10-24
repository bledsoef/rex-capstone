import {
  ActivityIndicator,
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
import { RecPost } from "@/components/RecPost";
import { PlayBar } from "@/components/PlayBar";
import { useMusicPlayer } from "@/components/PlayerContext";
import { useUserContext } from "@/components/UserContext";
import { images } from "@/constants";
export default function Home() {
  const { currentUser, profileImage, setProfileImage, setCurrentUser } =
    useUserContext();
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
        <View className="w-full h-full">
          <View className="relative mt-5 flex flex-row justify-between px-4">
            <Text className="text-3xl text-rex font-jbold pb-4">Feed</Text>
            <Pressable onPress={() => router.push("/")}>
              <Image
                source={{ uri: profileImage ? profileImage : images.profile }}
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
            posts.map((rec: { [x: string]: any }, index: any) => {
              return <RecPost
                currentUser={currentUser}
                key={index}
                index={index}
                sender={rec.user}
                mediaCreators={rec.media_creators}
                media={rec.media}
                description={rec.rec.body}
                timeCreated={rec.rec.created_at}
                recID={rec.rec.id}
              ></RecPost>
})}
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
