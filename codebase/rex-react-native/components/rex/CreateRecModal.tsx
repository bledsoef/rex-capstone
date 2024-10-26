import { Link } from "expo-router";
import { useEffect, useState, type ComponentProps } from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { useUserContext } from "@/components/UserContext";
import NetworkDropdown from "@/components/NetworkDropdown";
import MediaSelect from "@/components/MediaSelect";
import MediaSelectButton from "@/components/MediaSelectButton";
import SelectRecipients from "./SelectRecipients";
import CreateRecModalFooter from "./CreateRecModalFooter";
export function CreateRecModal({ isVisible, onModalVisibilityChange }: any) {
  const { currentUser } = useUserContext();
  const [description, setDescription] = useState<any>();
  const [media, setMedia] = useState<any>();
  const [network, setNetwork] = useState<any>([]);
  const [mediaType, setMediaType] = useState<any>();
  const [mediaSelect, setMediaSelect] = useState<any>(false);
  const [recipients, setRecipients] = useState<any>({});
  const [isPost, setIsPost] = useState<boolean>();
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const fetchNetwork = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/getNetworkForUser?user_id=${currentUser.id}`
      );
      const data = await response.json();
      setNetwork(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNetwork();
  }, []);

  const handleChangeDescription = (e: any) => {
    setDescription(e);
  };
  const handleChangeMedia = (e: any) => {
    setDescription(e);
  };
  const handleChangeRecipients = (e: any) => {
    setRecipients(e);
  };
  const toggleChangeIsPost = (e: any) => {
    setIsPost(!isPost);
  };
  const handleShowModal = (bool: boolean) => {
    onModalVisibilityChange(bool);
  };
  const toggleMediaSelect = () => {
    setMediaSelect(!mediaSelect)
  }
  const handleRemoveRecipients = (id: number) => {
    const updatedItems = recipients.filter(
      (recipient: any) => recipient.id !== id
    );
    setRecipients(updatedItems);
  };
  const submitRec = async () => {
    if (
      media == null ||
      mediaType == null ||
      (isPost == false && recipients?.length == 0)
    ) {
      console.log("not all fields are filled out");
      return;
    }
    var data = {
      sender: currentUser.id,
      recipients: recipients,
      media: media,
      mediaType: mediaType,
      description: description,
      isPost: isPost,
    };
    var res = await fetch("http://127.0.0.1:8000/createRec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  };
  return (
    <View className="flex-1 justify-center items-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => handleShowModal(false)}
      >
        <View className="flex-1 justify-end bg-transparent">
          <Pressable
            className="flex-1 justify-end bg-transparent"
            onPress={() => handleShowModal(false)}
          />
          <View
            className="h-2/3 bg-white p-[20px] rounded-t-xl"
            style={styles.modalContainer}
          >
            {!mediaSelect && (
              <>
                <Text
                  className={`text-xl text-gray-900 font-jsemibold rounded-xl`}
                >
                  Create Rec
                </Text>
                <View className="flex-col flex space-y-3 w-full">
                  <MediaSelectButton onButtonClick={toggleMediaSelect} />
                  <NetworkDropdown
                    options={network}
                    onSelect={handleChangeRecipients}
                  />
                  <SelectRecipients
                    onRemoveRecipients={handleRemoveRecipients}
                    recipients={recipients}
                  />
                  <View className="border-2 flex flex-row items-center px-4 border-gray-100 w-full h-16 bg-gray-100 rounded-2xl focus:border-rex">
                    <TextInput
                      className="text-base flex-1 font-jregular w-full"
                      placeholder={"Description"}
                      placeholderTextColor={"#7b7b8b"}
                      value={description}
                      onChangeText={handleChangeDescription}
                      autoCapitalize="none"
                    />
                  </View>
                  <CreateRecModalFooter
                    onSubmit={submitRec}
                    onCancel={handleShowModal}
                  />
                </View>
              </>
            )}
            {mediaSelect && (
              <MediaSelect onBack={toggleMediaSelect} selectedMedia={selectedMedia} className="mb-1" />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});
