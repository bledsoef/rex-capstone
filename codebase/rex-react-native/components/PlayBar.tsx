// import { Link } from "expo-router";
// import { useState, useEffect, type ComponentProps } from "react";
// import { Pressable, Text, StyleSheet, View, Image } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { Audio } from "expo-av";
// import { ref, getDownloadURL } from "firebase/storage";
// import { storage } from "@/firebaseConfig";
// import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";

// export function PlayBar({ song, album }: any) {
//   const [sound, setSound] = useState<any>("");
//   const [isPlaying, setIsPlaying] = useState<any>(false);
//   const [imageUrl, setImageUrl] = useState<any>("");
//   useEffect(() => {
//     const loadSound = async () => {
//       const url = await getAudioDownloadURL(); // Get download URL from Firebase
//       const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
//       setSound(newSound);
//     };

//     loadSound();
//     fetchImageDownloadUrl();
//     return () => {
//       if (sound) {
//         sound.unloadAsync();
//       }
//     };
//   }, []);

//   const getAudioDownloadURL = async () => {
//     const fileRef = ref(storage, `/audioFiles/${song.id}.mp3`);
//     const res = await getDownloadURL(fileRef);
//     return res;
//   };
//   async function fetchImageDownloadUrl() {
//     const fileRef = ref(storage, `/albumImages/${album.id}.jpg`);
//     getDownloadURL(fileRef)
//       .then((res) => setImageUrl(res))
//       .catch((error) => {
//         console.error("Error getting download URL:", error);
//       });
//     console.log(imageUrl);
//   }
//   const togglePlayPause = async () => {
//     if (sound) {
//       if (isPlaying) {
//         await sound.pauseAsync();
//       } else {
//         await sound.playAsync();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };
//   return (
//     <BottomTabBarHeightContext.Consumer>
//       {(tabBarHeight) => {
        
//         return <View
//           className={`w-[95%] bottom-0 rounded-lg justify-center absolute mb-1 right-2 left-2 p-2 bg-[#E8E8E8]`}
//         >
//           <View className="flex flex-row justify-between items-center">
//             <View className="flex flex-row items-center">
//               <Image
//                 source={{ uri: imageUrl }}
//                 className={`w-[60] h-[60] mr-2`}
//                 resizeMode="cover"
//               ></Image>
//               <View className="flex flex-col">
//                 <Text className="flex text-lg font-jsemibold">{song.name}</Text>
//                 <Text className="flex text-base font-jregular">
//                   {song.artist}
//                 </Text>
//               </View>
//             </View>
//             <Pressable onPress={togglePlayPause} className="pr-2">
//               <FontAwesome size={25} name={isPlaying ? "pause" : "play"}/>
//             </Pressable>
//           </View>
//         </View>
//       }}
//     </BottomTabBarHeightContext.Consumer>
//   );
// }
import { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useMusicPlayer } from "./PlayerContext";

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
    <View className={`w-[95%] bottom-[70] rounded-lg justify-center absolute mb-1 right-2 left-2 p-2 bg-[#E8E8E8]`}>
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center">
          <Image
            source={{ uri: imageUrl }}
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