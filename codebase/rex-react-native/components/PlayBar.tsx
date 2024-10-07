import { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useMusicPlayer } from "./PlayerContext";
import { images } from "@/constants";

export function PlayBar() {
  const {
    currentSong,
    currentAlbum,
    currentArtists,
    isPlaying,
    sound,
    playSong,
    togglePlayPause,
    setSound,
  } = useMusicPlayer();
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (currentSong) {
      fetchImageDownloadUrl(); // Keep the image loading logic
    }
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentSong]);

  async function fetchImageDownloadUrl() {
    const fileRef = ref(storage, `/albumImages/${currentAlbum.id}.jpg`);
    getDownloadURL(fileRef)
      .then((res) => setImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }

  return (
    <>
      {currentSong && (
        <View
          className={`w-[95%] bottom-[10%] rounded-lg justify-center opacity-95 absolute mb-1 right-2 left-2 p-2 bg-slate-50 border-slate-100 border`}
        >
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row items-center">
              <Image
                source={{ uri: imageUrl ? imageUrl : images.default_cover }}
                className={`w-[60] h-[60] mr-2`}
                resizeMode="cover"
              />
              <View className="flex flex-col">
                <Text className="flex text-lg font-jsemibold">
                  {currentSong["title"]}
                </Text>
                <Text className="flex text-base font-jlight">
                  {currentArtists &&
                    currentArtists.map((artist: any, index: number) => {
                      if (index != currentArtists.length - 1) {
                        return `${artist.name}, `;
                      } else {
                        return artist.name;
                      }
                    })}
                </Text>
              </View>
            </View>
            <Pressable onPress={togglePlayPause} className="pr-2">
              <FontAwesome size={25} name={isPlaying ? "pause" : "play"} />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
}
