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
import RexHeader from "@/components/rex/RexHeader";
import RexCollection from "@/components/rex/RexCollection";
export default function Rex() {
  const { currentUser, profileImage, setProfileImage, setCurrentUser } =
    useUserContext();
  const [sentRecs, setSentRecs] = useState<any>([]);
  const [receivedRecs, setReceivedRecs] = useState<any>([]);
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
        setSentRecs(data["sent"]);
        setReceivedRecs(data["received"]);
        console.log("DATAAAAA", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView className="bg-white min-h-screen">
      <View className="h-full">
        <View className="w-full h-full px-4">
          <RexHeader
            profileImage={profileImage}
            onShowModal={handleShowModal}
          />
          <SendingReceivedToggle
            onToggle={setToggleStatus}
            toggleStatus={toggleStatus}
          />
          <ScrollView nestedScrollEnabled={true}>
            {sentRecs && receivedRecs && (
              <RexCollection
                recs={toggleStatus == "sent" ? sentRecs : receivedRecs}
              />
            )}
          </ScrollView>

          <CreateRecModal
            isVisible={modalVisible}
            onModalVisibilityChange={handleShowModal}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
