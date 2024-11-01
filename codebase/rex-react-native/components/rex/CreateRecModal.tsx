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
import { MultiSelect } from "react-native-element-dropdown";
import { Menu, TextInput as TextInput2 } from "react-native-paper";
import { icons } from "@/constants";
import { useUserContext } from "@/components/UserContext";
import { AntDesign } from "@expo/vector-icons";
import NetworkDropdown from "@/components/NetworkDropdown";
import MediaSelect from "@/components/MediaSelect";
export function CreateRecModal({ isVisible, onModalVisibilityChange }: any) {
  const { currentUser } = useUserContext();
  const [description, setDescription] = useState<any>();
  const [media, setMedia] = useState<any>();
  const [network, setNetwork] = useState<any>([]);
  const [mediaType, setMediaType] = useState<any>();
  const [recipients, setRecipients] = useState<any>({});
  const [isPost, setIsPost] = useState<boolean>();

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
  const handleRemoveRecipients = (id: number) => {
    const updatedItems = recipients.filter((recipient: any) => recipient.id !== id);
    setRecipients(updatedItems)
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
    <View className={`space-y-2`}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          handleShowModal(false);
        }}
      >
        <View className="flex justify-center items-center h-full mt-6">
          <View className="bg-slate-50 border-gray-300 w-11/12 border rounded-lg p-8 items-center m-5">
            <Text className={`text-xl text-gray-900 font-jsemibold rounded-xl`}>
              Create Rec
            </Text>
            <View className="flex-col flex w-full">
              <MediaSelect className="mb-1" />
              <NetworkDropdown
                options={network}
                onSelect={handleChangeRecipients}
              />
              <View className="flex-wrap w-full flex-row justify-around">
                {recipients &&
                  Object.values(recipients).map(
                    (recipient: any, index: any) => {
                      return (
                        <Pressable
                          onPress={() => handleRemoveRecipients(recipient.id)}
                          key={index}
                          className="p-2 bg-gray-100 rounded-xl items-center justify-between w-[30%] flex-row flex"
                        >
                          <Text className="font-jregular text-base text-rex">
                            {recipient.username}
                          </Text>
                          <AntDesign name="close" size={15} />
                        </Pressable>
                      );
                    }
                  )}
              </View>
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
              <View className="flex flex-row w-full justify-end p-2 space-x-1">
                <Pressable
                  onPress={() => handleShowModal(false)}
                  className="flex border rounded-lg border-gray-400  bg-gray-400 p-3"
                >
                  <Text className="text-white font-jbold text-base">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={submitRec}
                  className="border flex rounded-lg border-rex bg-rex p-3"
                >
                  <Text className="text-white font-jbold text-base">Send</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
