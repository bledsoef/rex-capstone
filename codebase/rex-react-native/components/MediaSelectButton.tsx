import {
  Text,
  Pressable,
  View,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
export default function MediaSelectButton({
  onButtonClick,
  selectedMedia,
  selectedMediaType,
}: any) {
  const [mediaImageUrl, setMediaImageUrl] = useState<string>("");
  async function fetchMediaImageDownloadUrl() {
    const fileRef = ref(
      storage,
      `/${selectedMediaType}Images/${selectedMedia.id}.jpg`
    );

    getDownloadURL(fileRef)
      .then((res) => setMediaImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }
  useEffect(() => {
    if (selectedMedia) {
      fetchMediaImageDownloadUrl();
    }
  }, []);
  return (
    <View>
      <Pressable
        className=" flex flex-row items-center border-[2px] border-gray-200 mb-2 p-1 w-full h-16"
        onPress={onButtonClick}
      >
        {selectedMedia && <Image source={{ uri: mediaImageUrl }}></Image>}
        {!selectedMedia && <AntDesign size={50} color={"#4b5563"} name="plussquareo" />}
        <Text className="ml-2 text-lg text-black flex-1 font-jregular w-full">
          Select Media
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  dropdown: {
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 5,
    maxHeight: 200, // Limit height to avoid overflowing screen
    padding: 10,
  },
});
