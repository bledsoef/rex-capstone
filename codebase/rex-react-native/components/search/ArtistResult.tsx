import { Pressable, Image, Text, View } from "react-native";
import { useMusicPlayer } from "../globalContexts/PlayerContext";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { images } from "@/constants";
import { storage } from "@/firebaseConfig";
export function ArtistResult({ song, album, artists }: any) {
  const { currentSong, playSong } = useMusicPlayer();
  const updatePlaybar = () => {
    playSong(song, album, artists);
  };
  const [imageUrl, setImageUrl] = useState<any>("");
  useEffect(() => {
    fetchImageDownloadUrl();
  }, []);
  async function fetchImageDownloadUrl() {
    const fileRef = ref(storage, `/albumImages/${album.id}.jpg`);
    getDownloadURL(fileRef)
      .then((res) => setImageUrl(res))
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  }
  return (
    <Pressable
      className={` bg-slate-50 flex-row border justify-between items-center border-slate-100 w-full`}
      onPress={updatePlaybar}
      // activeOpacity={0.7}
    >
      <View className="flex flex-row items-center">
        <Image
          source={{ uri: imageUrl ? imageUrl : images.default_cover }}
          className={`w-[60] h-[60]`}
          resizeMode="cover"
        />
        <View className="flex flex-row justify-between items-center">
          <View className="py-2">
            <Text className={`font-jregular text-xl px-4`}>{song.title}</Text>
            <Text className={`font-jlight text-lg px-4`}>
              {artists &&
                artists.map((artist: any, index: number) => {
                  if (index != artists.length - 1) {
                    return `${artist.name}, `;
                  } else {
                    return artist.name;
                  }
                })}
            </Text>
          </View>
        </View>


      </View>
      <Pressable className="pr-3">
          <AntDesign size={33} name="ellipsis1" />
        </Pressable>
    </Pressable>
  );
}
