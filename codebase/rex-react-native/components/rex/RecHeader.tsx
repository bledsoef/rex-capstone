import { StyleSheet, View, Text, Image } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Song } from "@/components/Song";
import { images } from "@/constants";
import { useMusicPlayer } from "@/components/globalContexts/PlayerContext";
export default function RecHeader({ rec, media, mediaType, mediaURL }: any) {
  return (
    <View className="p-2 w-full bg-white rounded-lg m-2" style={styles.modalContainer}>
      <Text>{rec.id}</Text>
      <Image
        source={mediaURL ? { uri: mediaURL } : images.default_cover}
        resizeMode="contain"
        className="w-[75%] mx-auto h-[75%]"
      ></Image>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});
