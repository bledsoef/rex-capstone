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
import { useUserContext } from "@/components/globalContexts/UserContext";
import NetworkDropdown from "@/components/NetworkDropdown";
import MediaSelect from "@/components/MediaSelect";
import MediaSelectButton from "@/components/MediaSelectButton";
import SelectRecipients from "./SelectRecipients";
import CreateRecModalFooter from "./CreateRecModalFooter";
export function CreateRecModalContent({
  onContentVisibilityChange,
  selectedMediaOverride = null,
  selectedMediaTypeOverride = "album",
  selectedMediaImageIDOverride = null,
  disableMediaSelect = false,
}: any) {
  const { currentUser } = useUserContext();
  const [description, setDescription] = useState<any>();
  const [network, setNetwork] = useState<any>([]);
  const [mediaSelect, setMediaSelect] = useState<any>(false);
  const [recipients, setRecipients] = useState<any>({});
  const [isPost, setIsPost] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(
    selectedMediaOverride
  );
  const [selectedMediaType, setSelectedMediaType] = useState<any>(
    selectedMediaTypeOverride
  );

  const [selectedMediaImageID, setSelectedMediaImageID] = useState<any>(
    selectedMediaImageIDOverride
  );

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
    onContentVisibilityChange(bool);
  };
  const toggleMediaSelect = () => {
    setMediaSelect(!mediaSelect);
  };
  const handleRemoveRecipients = (id: number) => {
    const updatedItems = recipients.filter(
      (recipient: any) => recipient.id !== id
    );
    setRecipients(updatedItems);
  };
  const submitRec = async () => {
    if (
      selectedMedia == null ||
      selectedMediaType == null ||
      (isPost == false && recipients?.length == 0)
    ) {
      console.log("not all fields are filled out");
      return;
    }
    var data = {
      sender_id: currentUser.id,
      recipients: recipients,
      media: selectedMedia.id,
      media_type: selectedMediaType,
      body: description,
      is_post: isPost,
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
    <View
      className="h-2/3 bg-white p-[20px] rounded-t-xl"
      style={styles.modalContainer}
    >
      {!mediaSelect && (
        <>
          <Text className={`text-xl text-gray-900 font-jsemibold rounded-xl`}>
            Create Rec
          </Text>
          <View className="flex-col flex w-full">
            <MediaSelectButton
              onButtonClick={!disableMediaSelect ? toggleMediaSelect : () => {}}
              selectedMedia={selectedMedia}
              selectedMediaType={selectedMediaType}
              selectedMediaImageID={selectedMediaImageID}
            />
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
        <MediaSelect
          onBack={toggleMediaSelect}
          onSelect={(media: any, imageID: number, type: any) => {
            setSelectedMedia(media);
            setSelectedMediaImageID(imageID);
            setSelectedMediaType(type);
          }}
          selectedMedia={selectedMedia}
          selectedMediaType={selectedMediaType}
          className="mb-1"
        />
      )}
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
