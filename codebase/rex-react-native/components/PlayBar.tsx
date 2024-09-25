import { Link } from "expo-router";
import { useState, useEffect, type ComponentProps } from "react";
import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";

export function PlayBar({ song }: any) {
  const [sound, setSound] = useState<any>("");
  const [isPlaying, setIsPlaying] = useState<any>(false);
  useEffect(() => {
    const loadSound = async () => {
      const url = await getAudioDownloadURL(); // Get download URL from Firebase

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
      setSound(newSound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const getAudioDownloadURL = async () => {
    const fileRef = ref(storage, `/audioFiles/${song.id}.jpg`);
    const res = getDownloadURL(fileRef)
      .then((res) => sound(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
    return res;
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <View className="w-[95%] rounded-lg justify-center absolute right-2 left-2 bottom-[50] p-2 bg-white">
      <View className="flex flex-row justify-between items-center">
        <Image className=""></Image>
        <View className="flex flex-col">
          <Text className="flex text-xl font-jregular">{song.name}</Text>
          <Text className="flex text-lg font-jregular">{song.artist}</Text>
        </View>
        <Pressable onPress={togglePlayPause}>
          <FontAwesome size={25} name={isPlaying ? "play" : "pause"} />
        </Pressable>
      </View>
    </View>
  );
}
