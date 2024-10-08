import {
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { CreateRecButton } from "@/components/CreateRecButton";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { router } from "expo-router";
import { useUserContext } from "@/components/UserContext";
import { images } from "@/constants";
export default function Rex() {
  const { currentUser, profileImage, setProfileImage, setCurrentUser } = useUserContext();
  const [sentRecs, setSentRecs] = useState<any[]>([]);
  async function apiCall() {
    var rec_data = {
      title: "Test",
      body: "Super sweet song",
      sender_id: "bledsoef",
      recipient_id: "bahrs",
      created_at: Date(),
      song_id: 1,
      is_post: false,
    };
    var response = await fetch(`http://127.0.0.1:8000/createRec`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rec_data),
    });
    var data = await response.json();
    setSentRecs(data);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/getPendingSentRecsForUser?username=1"
        );
        const data = await response.json();
        setSentRecs(data);
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
            <Text className="text-3xl text-rex font-jbold pb-4">Rex</Text>

            <View className="flex flex-row space-x-3">
              <CreateRecButton handlePress={apiCall} />
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
          {sentRecs &&
            sentRecs.map((rec, index) => (
              <ThemedText key={index} type="title">
                {rec.title}
              </ThemedText>
            ))}
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
