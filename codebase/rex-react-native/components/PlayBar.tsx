import { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useMusicPlayer } from "./globalContexts/PlayerContext";
import { images } from "@/constants";

export function PlayBar() {
  const {
    currentSong,
    currentAlbum,
    currentArtists,
    isPlaying,
    sound,
    position,
    totalLength,
    playSong,
    togglePlayPause,
    setSound,
    setPosition,
    setTotalLength,
  } = useMusicPlayer();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0)
  useEffect(() => {
    sound &&
      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.isLoaded && status.isPlaying) {
          setPosition(status.positionMillis);
          setTotalLength(status.durationMillis);
          setPercentage((status.positionMillis/status.durationMillis) * 100)
        }
      });
      
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);
  useEffect(() => {
    if (currentSong) {
      fetchImageDownloadUrl(); // Keep the image loading logic
    }
  }, [currentSong]);

  async function fetchImageDownloadUrl() {
    const fileRef = ref(storage, `/albumImages/${currentAlbum.id}.jpg`);
    getDownloadURL(fileRef)
      .then((res) => setImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }

  const formatTime = (millis: any) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <>
      {currentSong && (
        <View
          className={`w-[95%] flex flex-col bottom-[10%] rounded-lg justify-center opacity-95 absolute mb-1 right-2 left-2 bg-slate-50 border-slate-100 border`}
        >
          <View className="p-2">
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
                <View>
                  <Text>
                    {formatTime(position)} / {formatTime(totalLength)}
                  </Text>
                </View>
              </View>
              <Pressable onPress={togglePlayPause} className="pr-2">
                <FontAwesome size={25} name={isPlaying ? "pause" : "play"} />
              </Pressable>
            </View>
          </View>
          <View className="w-full rounded-lg h-[1.5px] bg-transparent">
            <View className={`h-[1.5px] bg-rex`} style={{width: `${percentage}%`}}></View>
          </View>
        </View>
      )}
    </>
  );
}