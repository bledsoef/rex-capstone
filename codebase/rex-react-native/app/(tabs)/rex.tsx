import { SafeAreaView, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { CreateRecButton } from "@/components/rex/CreateRecButton";
import { useUserContext } from "@/components/globalContexts/UserContext";
import { CreateRecModal } from "@/components/rex/CreateRecModal";
import { SendingReceivedToggle } from "@/components/SendingReceivedToggle";
import RexHeader from "@/components/rex/RexHeader";
import RexCollection from "@/components/rex/RexCollection";
import { useRexContext } from "@/components/globalContexts/RexContext";
export default function Rex() {
  const { currentUser, profileImage, setProfileImage, setCurrentUser } =
    useUserContext();
  const { sentRecs, receivedRecs, fetchRecData } =
    useRexContext();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [toggleStatus, setToggleStatus] = useState<any>("received");
  const handleShowModal = (bool: boolean) => {
    setModalVisible(bool);
  };
  useEffect(() => {
    fetchRecData(currentUser.id);
  }, []);
  return (
    <SafeAreaView className="bg-white min-h-screen">
      <View className="h-full">
        <View className="w-full h-full px-4">
          <RexHeader title={"Rex"} profileImage={profileImage}>
            <CreateRecButton handlePress={() => handleShowModal(true)} />
          </RexHeader>
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
