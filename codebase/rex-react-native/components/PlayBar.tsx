import { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useMusicPlayer } from "./PlayerContext";
import { images } from "@/constants";

export function PlayBar() {
  const { currentSong, currentAlbum, isPlaying, sound, playSong, togglePlayPause, setSound } = useMusicPlayer();
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const loadSound = async () => {
      if (currentSong) {
        const url = await getAudioDownloadURL();
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
        setSound(newSound);
      }
    };

    if (currentSong) {
      loadSound();
      fetchImageDownloadUrl();
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentSong]);

  const getAudioDownloadURL = async () => {
    const fileRef = ref(storage, `/audioFiles/${currentSong.id}.mp3`);
    const res = await getDownloadURL(fileRef);
    return res;
  };

  async function fetchImageDownloadUrl() {
    const fileRef = ref(storage, `/albumImages/${currentAlbum.id}.jpg`);
    getDownloadURL(fileRef)
      .then((res) => setImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }

  return (
    <View className={`w-[95%] bottom-[9%] rounded-lg justify-center opacity-95 absolute mb-1 right-2 left-2 p-2 bg-[#E8E8E8]`}>
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center">
          <Image
            source={{ uri: imageUrl ? imageUrl : images.default_cover }}
            className={`w-[60] h-[60] mr-2`}
            resizeMode="cover"
          />
          <View className="flex flex-col">
            <Text className="flex text-lg font-jsemibold">{currentSong?.name}</Text>
            <Text className="flex text-base font-jregular">{currentSong?.artist}</Text>
          </View>
        </View>
        <Pressable onPress={togglePlayPause} className="pr-2">
          <FontAwesome size={25} name={isPlaying ? "pause" : "play"} />
        </Pressable>
      </View>
    </View>
  );
}