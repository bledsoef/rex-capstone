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
import { CreateRecButton } from "@/components/rex/CreateRecButton";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { router } from "expo-router";
import { useUserContext } from "@/components/UserContext";
import { images } from "@/constants";
import { CreateRecModal } from "@/components/rex/CreateRecModal";
import { RecIcon } from "@/components/rex/RecIcon";
import { SendingReceivedToggle } from "@/components/SendingReceivedToggle";
export default function Rex() {
  const { currentUser, profileImage, setProfileImage, setCurrentUser } =
    useUserContext();
  const [sentRecs, setSentRecs] = useState<any>({});
  const [receivedRecs, setReceivedRecs] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [toggleStatus, setToggleStatus] = useState<any>("received");
  const handleShowModal = (bool: boolean) => {
    setModalVisible(bool);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getRecs?user_id=${currentUser.id}`
        );
        const data = await response.json();
        console.log(data);
        setSentRecs(data["sent"]);
        setReceivedRecs(data["received"]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const getPending = (recs: any[]) => {
    return recs.filter((rec: any) => rec.status == 'Pending');
  };
  const getCompleted = (recs: any) => {
    return recs.filter((rec: any) => rec.status == 'Completed');
  };
  const getArchived = (recs: any) => {
    return recs.filter((rec: any) => rec.status == 'Archived');
  };
  return (
    <SafeAreaView className="bg-white min-h-screen">
      <ScrollView className="h-full">
        <View className="w-full h-full px-4">
          <View className="relative mt-5 flex flex-row justify-between">
            <Text className="text-3xl text-rex font-jbold pb-4">Rex</Text>
            <View className="flex flex-row space-x-3">
              <CreateRecButton handlePress={() => handleShowModal(true)} />
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
          <SendingReceivedToggle onToggle={setToggleStatus} toggleStatus={toggleStatus}/>
          <View className="p-2">
            <View className="flex flex-col">
              <Text className="text-lg font-jsemibold">Pending</Text>
              <View className="flex flex-row">
                {receivedRecs["pending"] &&
                  receivedRecs["pending"].map((item: any, index: number) => (
                    <RecIcon
                      key={index}
                      rec={item["rec"]}
                      sender={item["sender"]}
                      media={item["media"]}
                    />
                  ))}
              </View>
            </View>
            <View className="">
              <Text className="text-lg font-jsemibold">Accepted</Text>
            </View>
            {/* <View className="">
              <Text className="">Pending</Text>
            </View> */}
          </View>

          <CreateRecModal
            isVisible={modalVisible}
            onModalVisibilityChange={handleShowModal}
          />
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
