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
    mediaId: ""
  };
  const [imageUrl, setImageUrl] = useState<any>("");
  useEffect(() => {
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
          <Rec sender={sender} media={media} timeCreated={"2 days ago"}></Rec>
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
