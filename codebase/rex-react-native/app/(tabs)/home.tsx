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
import { useEffect, useState } from "react";
import { RecPost } from "@/components/rex/RecPost";
import { useUserContext } from "@/components/globalContexts/UserContext";
import RexHeader from "@/components/rex/RexHeader";
export default function Home() {
  const { currentUser, profileImage, setProfileImage, setCurrentUser } =
    useUserContext();
  const [posts, setPosts] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getFeedForUser?user_id=${currentUser["id"]}`
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
          <View className="px-4">
            <RexHeader title={"Feed"} profileImage={profileImage}></RexHeader>
          </View>
          {posts &&
            posts.map((rec: { [x: string]: any }, index: any) => {
              return (
                <RecPost
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
              );
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
