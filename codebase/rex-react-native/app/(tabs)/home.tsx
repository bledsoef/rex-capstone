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
export default function Home() {
  var currentUser = auth().currentUser;
  // var profileUrl = storage().ref(`/${currentUser}.png`).getDownloadURL()
  var sender = {
    username: "bahrs",
    email: "bahrs@berea.edu",
  };
  var media = {
    author: "Bloc Party",
    authorId: "",
    title: "Positive Tension",
    mediaId: "1",
  };
  const [imageUrl, setImageUrl] = useState<any>("");
  const [posts, setPosts] = useState<any>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getFeedForUser?email=${currentUser?.email}`
        );
        const data = await response.json();
        console.log("posts", data);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchImageDownloadUrl();
  }, []);
  async function fetchImageDownloadUrl() {
    const fileRef = ref(storage, `/profileImages/${currentUser?.email}.jpg`);
    getDownloadURL(fileRef)
      .then((res) => setImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }
  return (
    <SafeAreaView className="bg-white min-h-screen">
      <ScrollView className="h-full">
        <View className="w-full h-full px-4">
          <View className="relative mt-5 flex flex-row justify-between">
            <Text className="text-3xl text-primary font-jbold pb-4">Feed</Text>
            <Pressable onPress={() => router.push("/")}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
                className="w-[40] h-[40]"
              ></Image>
            </Pressable>
          </View>
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
      <PlayBar song={{ name: "Banquet", artist: "Bloc Party", id: 2 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
