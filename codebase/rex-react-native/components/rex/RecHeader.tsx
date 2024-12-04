import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Song } from "@/components/Song";
import { images } from "@/constants";
import { useMusicPlayer } from "@/components/globalContexts/PlayerContext";
export default function RecHeader({
  rec,
  isSender,
  mediaCreators,
  media,
  mediaType,
  mediaURL,
  sender,
}: any) {
  const [authorImageUrl, setAuthorImageUrl] = useState("");
  const [senderImageUrl, setSenderImageUrl] = useState("");
  async function fetchAuthorImageDownloadUrl() {
    if (mediaCreators) {
      const fileRef = ref(storage, `/artistImages/${mediaCreators[0].id}.jpg`);
      getDownloadURL(fileRef)
        .then((res) => setAuthorImageUrl(res))
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
    }
  }
  async function fetchSenderImageDownloadUrl() {
    if (mediaCreators) {
      const fileRef = ref(storage, `/profileImages/${sender.email}.jpg`);
      getDownloadURL(fileRef)
        .then((res) => setSenderImageUrl(res))
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
    }
  }
  useEffect(() => {
    fetchSenderImageDownloadUrl();
    fetchAuthorImageDownloadUrl();
  }, [mediaCreators]);
  const screenDimensions = Dimensions.get("screen");

  return (
    <View
      className="w-full bg-white flex flex-col"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      {!isSender && (
        <View className="px-3 pt-3 flex flex-row">
          <View className="flex flex-row items-center">
            <Image
              source={{
                uri: senderImageUrl ? senderImageUrl : images.default_cover,
              }}
              style={styles.image}
              className="w-[30] h-[30]"
              resizeMode="cover"
            />
            <Text className={`font-jsemibold ml-3 text-[#3D3D3D] text-xl`}>
              {sender.username}
            </Text>
          </View>
          <Text className="text-xl font-jsemibold text-rex">
            {" "}
            wants you to hear:
          </Text>
        </View>
      )}
      {isSender && (
        <View className="p-3 flex flex-row">
          <Text className="text-xl font-jsemibold text-rex">You wanted</Text>
          <View className="flex flex-row ml-2 items-center">
            <Image
              source={{
                uri: senderImageUrl ? senderImageUrl : images.default_cover,
              }}
              style={styles.image}
              className="w-[30] h-[30]"
              resizeMode="cover"
            />
            <Text className={`font-jsemibold ml-3 text-[#3D3D3D] text-xl`}>
              {sender.username}
            </Text>
          </View>
          <Text className="text-xl font-jsemibold text-rex"> to hear:</Text>
        </View>
      )}
      <View
        className="flex-row flex justify-between mx-1"
        style={{
          width: screenDimensions.width - 8,
          height: screenDimensions.width / 4,
        }}
      >
        <View className="p-3 h-full justify-center flex flex-col">
          <Text className={`font-jsemibold text-[#3D3D3D] text-2xl`}>
            {media.title}
          </Text>
          {mediaCreators && (
            <View className="flex flex-row items-center">
              <Image
                source={{
                  uri: authorImageUrl ? authorImageUrl : images.default_cover,
                }}
                style={styles.image}
                className="w-[30] h-[30]"
                resizeMode="cover"
              />
              <Text className={`font-jsemibold ml-3 text-[#3D3D3D] text-xl`}>
                {mediaCreators[0].name}
              </Text>
            </View>
          )}
        </View>
        <View className="justify-end items-end flex">
          <Image
            source={mediaURL ? { uri: mediaURL } : images.default_cover}
            resizeMode="contain"
            style={{
              width: screenDimensions.width / 4,
              height: screenDimensions.width / 4,
            }}
          ></Image>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
