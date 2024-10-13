import { Link } from "expo-router";
import { useState, type ComponentProps } from "react";
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
import { useUserContext } from "./UserContext";
import { AntDesign } from "@expo/vector-icons";
export function CreateRecModal({ isVisible, onModalVisibilityChange }: any) {
  const { currentUser } = useUserContext();
  const [description, setDescription] = useState<any>();
  const [media, setMedia] = useState<any>();
  const [mediaType, setMediaType] = useState<any>();
  const [recipientIDs, setRecipientIDs] = useState<any>();
  const [isPost, setIsPost] = useState<boolean>();
  const [selected, setSelected] = useState([]);
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];
  const [visible, setVisible] = useState<any>(false);

  const handleChangeDescription = (e: any) => {
    setDescription(e);
  };
  const handleChangeMedia = (e: any) => {
    setDescription(e);
  };
  const handleChangeRecipients = (e: any) => {
    setRecipientIDs([...recipientIDs, e]);
  };
  const toggleChangeIsPost = (e: any) => {
    setIsPost(!isPost);
  };
  const handleShowModal = (bool: boolean) => {
    onModalVisibilityChange(bool);
  };
  const submitRec = async () => {
    if (
      media == null ||
      mediaType == null ||
      (isPost == false && recipientIDs?.length == 0)
    ) {
      console.log("not all fields are filled out");
      return;
    }
    var data = {
      sender: currentUser.id,
      recipients: recipientIDs,
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
          <View className=" bg-slate-50 border-gray-300 w-11/12 border rounded-lg p-8 items-center m-5">
            <Text
              className={`text-base text-gray-900 font-jregular rounded-xl`}
            >
              Create Rec
            </Text>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={data}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={selected}
              onChange={(item: any) => {
                setSelected(item);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
              selectedStyle={styles.selectedStyle}
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
            <View className="flex flex-row w-full justify-end p-2 space-x-1">
              <Pressable
                onPress={() => handleShowModal(false)}
                className="flex border rounded-lg border-gray-400  bg-gray-400 p-3"
              >
                <Text className="text-white font-jbold text-base">Cancel</Text>
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
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: '100%',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: 
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});